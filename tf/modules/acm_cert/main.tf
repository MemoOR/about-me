variable "domain_name" {
  type = string
}

variable "subject_alternative_names" {
  type    = list(string)
  default = []
}

# ACM certificate for CloudFront. Must be created in us-east-1 (the caller passes
# a us-east-1 provider). DNS validation records are created by the caller in
# Route 53 and the validation is completed there.
resource "aws_acm_certificate" "this" {
  domain_name               = var.domain_name
  subject_alternative_names = var.subject_alternative_names
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

output "certificate_arn" {
  description = "ARN of the certificate (validation is completed by the caller)."
  value       = aws_acm_certificate.this.arn
}

output "domain_validation_options" {
  description = "DNS validation records to create in Route 53."
  value       = aws_acm_certificate.this.domain_validation_options
}
