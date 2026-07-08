variable "name_prefix" {
  type = string
}

variable "aliases" {
  type = list(string)
}

variable "acm_certificate_arn" {
  type = string
}

variable "s3_bucket_regional_domain_name" {
  type = string
}

variable "lambda_function_url_host" {
  description = "Host portion of the contact Lambda Function URL (no scheme / path)."
  type        = string
}

variable "default_root_object" {
  type    = string
  default = "index.html"
}

variable "price_class" {
  type    = string
  default = "PriceClass_100"
}

# AWS-managed policy IDs.
locals {
  cache_optimized_id     = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
  cache_disabled_id      = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
  all_viewer_except_host = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # AllViewerExceptHostHeader
  security_headers_id    = "67f7725c-6f97-4210-82d7-5512b31e9d03" # SecurityHeadersPolicy
}

resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.name_prefix}-url-rewrite"
  runtime = "cloudfront-js-2.0"
  code    = file("${path.module}/url-rewrite.js")
  publish = true
}

resource "aws_cloudfront_origin_access_control" "s3" {
  name                              = "${var.name_prefix}-s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_origin_access_control" "lambda" {
  name                              = "${var.name_prefix}-lambda-oac"
  origin_access_control_origin_type = "lambda"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = var.name_prefix
  aliases             = var.aliases
  default_root_object = var.default_root_object
  price_class         = var.price_class

  # Static site origin (private S3, OAC-signed).
  origin {
    origin_id                = "s3"
    domain_name              = var.s3_bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3.id
  }

  # Serverless contact API origin (Lambda Function URL, OAC-signed).
  origin {
    origin_id                = "lambda"
    domain_name              = var.lambda_function_url_host
    origin_access_control_id = aws_cloudfront_origin_access_control.lambda.id

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Default: static site.
  default_cache_behavior {
    target_origin_id           = "s3"
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    viewer_protocol_policy     = "redirect-to-https"
    compress                   = true
    cache_policy_id            = local.cache_optimized_id
    response_headers_policy_id = local.security_headers_id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }
  }

  # /api/* -> contact Lambda.
  ordered_cache_behavior {
    path_pattern             = "/api/*"
    target_origin_id         = "lambda"
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    viewer_protocol_policy   = "redirect-to-https"
    compress                 = false
    cache_policy_id          = local.cache_disabled_id
    origin_request_policy_id = local.all_viewer_except_host
  }

  # SPA-style fallback: the private S3 origin returns 403 for missing keys.
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/en.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/en.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

output "distribution_id" {
  value = aws_cloudfront_distribution.this.id
}

output "distribution_arn" {
  value = aws_cloudfront_distribution.this.arn
}

output "distribution_domain_name" {
  value = aws_cloudfront_distribution.this.domain_name
}

output "distribution_hosted_zone_id" {
  value = aws_cloudfront_distribution.this.hosted_zone_id
}
