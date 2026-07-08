# Primary region (S3, Secrets Manager, Lambda, CloudFront distribution).
provider "aws" {
  region = var.region

  default_tags {
    tags = local.tags
  }
}

# CloudFront requires its ACM certificate to live in us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.tags
  }
}
