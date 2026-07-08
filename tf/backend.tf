# Remote state backend.
#
# Create the state bucket once (out of band) before `terraform init`, e.g.:
#   aws s3api create-bucket --bucket aboutme-memoor-website-prod-tfstate \
#     --region mx-central-1 \
#     --create-bucket-configuration LocationConstraint=mx-central-1
#   aws s3api put-bucket-versioning --bucket aboutme-memoor-website-prod-tfstate \
#     --versioning-configuration Status=Enabled
#
# Native S3 state locking (use_lockfile) requires Terraform >= 1.10 and removes
# the need for a DynamoDB lock table.
terraform {
  backend "s3" {
    bucket       = "aboutme-memoor-website-prod-tfstate"
    key          = "webpage/terraform.tfstate"
    region       = "mx-central-1"
    encrypt      = true
    use_lockfile = true
  }
}
