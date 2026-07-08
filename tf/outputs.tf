output "bucket_name" {
  description = "S3 bucket that stores the prerendered site (deploy target)."
  value       = module.site_bucket.bucket_id
}

output "cloudfront_distribution_id" {
  description = "Used by the deploy script to create cache invalidations."
  value       = module.cdn.distribution_id
}

output "cloudfront_domain_name" {
  description = "CNAME/alias target for your domain's DNS records."
  value       = module.cdn.distribution_domain_name
}

output "route53_name_servers" {
  description = "Set these as your domain's name servers at your registrar (replaces DigitalOcean)."
  value       = aws_route53_zone.primary.name_servers
}

output "route53_zone_id" {
  description = "Hosted zone id for the domain."
  value       = aws_route53_zone.primary.zone_id
}

output "acm_validation_records" {
  description = "ACM DNS validation CNAMEs. While your NS still points to DigitalOcean, create THESE (they belong to the new certificate) in DigitalOcean so the cert can validate before switching name servers."
  value = [
    for dvo in module.acm_cert.domain_validation_options : {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  ]
}

output "contact_secret_arn" {
  description = "Put the real SMTP + reCAPTCHA values into this secret."
  value       = module.contact_api.secret_arn
}

output "contact_function_url" {
  description = "Direct Lambda Function URL (normally reached via /api/* only)."
  value       = module.contact_api.function_url
}
