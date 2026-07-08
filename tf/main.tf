data "aws_caller_identity" "current" {}

locals {
  name_prefix = "${var.project}-${var.environment}"

  tags = {
    Project     = var.project
    Environment = var.environment
    ManagedBy   = "terraform"
  }

  bucket_name = var.bucket_name != "" ? var.bucket_name : "${local.name_prefix}-site-${data.aws_caller_identity.current.account_id}"
  secret_name = "${local.name_prefix}-contact"

  # Function URL looks like https://<id>.lambda-url.<region>.on.aws/
  lambda_url_host = replace(replace(module.contact_api.function_url, "https://", ""), "/", "")
}

module "site_bucket" {
  source      = "./modules/site_bucket"
  bucket_name = local.bucket_name
}

module "acm_cert" {
  source = "./modules/acm_cert"
  providers = {
    aws = aws.us_east_1
  }
  domain_name               = var.domain_name
  subject_alternative_names = [for a in var.aliases : a if a != var.domain_name]
}

# --- DNS (Route 53) -----------------------------------------------------------
# Hosted zone for the domain. After the FIRST apply, set these name servers at
# your registrar (see the `route53_name_servers` output). Route 53 then becomes
# authoritative and the ACM validation below completes.
resource "aws_route53_zone" "primary" {
  name = var.domain_name
}

# ACM DNS-validation records (one per domain / SAN).
resource "aws_route53_record" "acm_validation" {
  for_each = {
    for dvo in module.acm_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id         = aws_route53_zone.primary.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 300
  allow_overwrite = true
}

# Completes once the validation records are authoritative (i.e. after the
# registrar NS switch has propagated). Runs in us-east-1 with the certificate.
resource "aws_acm_certificate_validation" "this" {
  provider                = aws.us_east_1
  certificate_arn         = module.acm_cert.certificate_arn
  validation_record_fqdns = [for r in aws_route53_record.acm_validation : r.fqdn]
}

module "contact_api" {
  source                    = "./modules/contact_api"
  name_prefix               = local.name_prefix
  secret_name               = local.secret_name
  contact_recipient         = var.contact_recipient
  recaptcha_score_threshold = var.recaptcha_score_threshold
  source_dir                = "${path.module}/../lambda/contact"

  # CORS: apex + www automatically; add the CloudFront hostname via
  # cors_extra_origins (see the note in variables.tf to avoid a dependency cycle).
  cors_allowed_origins = concat(
    [for a in var.aliases : "https://${a}"],
    var.cors_extra_origins,
  )
}

module "cdn" {
  source                         = "./modules/cdn"
  name_prefix                    = local.name_prefix
  aliases                        = var.aliases
  acm_certificate_arn            = aws_acm_certificate_validation.this.certificate_arn
  s3_bucket_regional_domain_name = module.site_bucket.bucket_regional_domain_name
  lambda_function_url_host       = local.lambda_url_host
}

# --- S3 read access for CloudFront only (scoped to this distribution) ---------
data "aws_iam_policy_document" "bucket" {
  statement {
    sid       = "AllowCloudFrontRead"
    actions   = ["s3:GetObject"]
    resources = ["${module.site_bucket.bucket_arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [module.cdn.distribution_arn]
    }
  }

  # Granting ListBucket makes S3 return 404 (not 403) for missing keys, so the
  # CloudFront 404 fallback works and real API 403s are not masked as HTML.
  statement {
    sid       = "AllowCloudFrontList"
    actions   = ["s3:ListBucket"]
    resources = [module.site_bucket.bucket_arn]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [module.cdn.distribution_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = module.site_bucket.bucket_id
  policy = data.aws_iam_policy_document.bucket.json
}

# --- CloudFront -> Lambda invoke permissions (BOTH are required) --------------
# Granting only InvokeFunctionUrl yields a silent 403. AWS:SourceArn (not
# SourceAccount) must be used for this call.
resource "aws_lambda_permission" "invoke_url" {
  statement_id           = "AllowCloudFrontInvokeUrl"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = module.contact_api.function_name
  principal              = "cloudfront.amazonaws.com"
  source_arn             = module.cdn.distribution_arn
  function_url_auth_type = "AWS_IAM"
}

resource "aws_lambda_permission" "invoke_fn" {
  statement_id  = "AllowCloudFrontInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.contact_api.function_name
  principal     = "cloudfront.amazonaws.com"
  source_arn    = module.cdn.distribution_arn
}

# --- DNS records pointing the domain at CloudFront ----------------------------
# Both the apex and www are served directly by CloudFront (the certificate
# covers both). A + AAAA aliases give IPv4 and IPv6.
resource "aws_route53_record" "apex_ipv4" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = module.cdn.distribution_domain_name
    zone_id                = module.cdn.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex_ipv6" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = module.cdn.distribution_domain_name
    zone_id                = module.cdn.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_ipv4" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = module.cdn.distribution_domain_name
    zone_id                = module.cdn.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_ipv6" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = module.cdn.distribution_domain_name
    zone_id                = module.cdn.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

# Google Search Console verification TXT (migrated from DigitalOcean). Optional:
# set `google_site_verification` to keep it, or leave empty to skip.
resource "aws_route53_record" "google_verification" {
  count   = var.google_site_verification != "" ? 1 : 0
  zone_id = aws_route53_zone.primary.zone_id
  name    = var.domain_name
  type    = "TXT"
  ttl     = 300
  records = [var.google_site_verification]
}
