#!/usr/bin/env bash
#
# Build the static site and ship it: build (SSG) -> s3 sync -> CloudFront
# invalidation. Reads the bucket name and distribution id from Terraform state.
#
# Requirements: node/npm, awscli (configured), terraform.
# Build-time public values (reCAPTCHA site key, PDF URLs) come from app/.env
# (or app/.env.production). See app/.env.example.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$REPO_ROOT/app"
TF_DIR="$REPO_ROOT/tf"

echo "==> Reading Terraform outputs"
BUCKET="$(terraform -chdir="$TF_DIR" output -raw bucket_name)"
DISTRIBUTION_ID="$(terraform -chdir="$TF_DIR" output -raw cloudfront_distribution_id)"
echo "    bucket=$BUCKET"
echo "    distribution=$DISTRIBUTION_ID"

echo "==> Building the static site"
cd "$APP_DIR"
npm ci
npm run build

echo "==> Uploading static assets (immutable, long cache)"
aws s3 sync dist/ "s3://$BUCKET/" \
  --delete \
  --exclude "*.html" \
  --cache-control "public,max-age=31536000,immutable"

echo "==> Uploading HTML (no cache)"
aws s3 sync dist/ "s3://$BUCKET/" \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "public,max-age=0,must-revalidate"

echo "==> Creating CloudFront invalidation"
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' --output text

echo "==> Done."
