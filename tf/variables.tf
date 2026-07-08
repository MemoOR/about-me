variable "project" {
  description = "Short project name used as a resource name prefix."
  type        = string
  default     = "aboutme-memoor"
}

variable "environment" {
  description = "Deployment environment (used in the name prefix)."
  type        = string
  default     = "prod"
}

variable "region" {
  description = "Primary AWS region for S3, Secrets Manager and the Lambda."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Primary (apex) domain the site is served on."
  type        = string
  default     = "guillermoortega.me"
}

variable "aliases" {
  description = "All domain names served by the CloudFront distribution."
  type        = list(string)
  default     = ["guillermoortega.me", "www.guillermoortega.me"]
}

variable "bucket_name" {
  description = "Override the S3 site bucket name. Empty = auto-generated & globally unique."
  type        = string
  default     = ""
}

variable "contact_recipient" {
  description = "Where contact-form messages are delivered."
  type        = string
  default     = "memo.or99@hotmail.com"
}

variable "google_site_verification" {
  description = "Google Search Console TXT value (migrated from DigitalOcean). Empty = skip."
  type        = string
  default     = ""
}

variable "cors_extra_origins" {
  description = "Extra CORS origins for the contact Function URL, e.g. the CloudFront hostname (https://xxxx.cloudfront.net). The apex + www origins are added automatically."
  type        = list(string)
  default     = []
}

variable "recaptcha_score_threshold" {
  description = "Minimum reCAPTCHA v3 score to accept a submission."
  type        = number
  default     = 0.5
}
