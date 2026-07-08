variable "name_prefix" {
  type = string
}

variable "secret_name" {
  type = string
}

variable "contact_recipient" {
  type = string
}

variable "recaptcha_score_threshold" {
  type    = number
  default = 0.5
}

variable "source_dir" {
  description = "Path to the Lambda source directory (contains handler.py)."
  type        = string
}

variable "cors_allowed_origins" {
  description = "Origins allowed to call the Function URL (CORS). Empty = no CORS."
  type        = list(string)
  default     = []
}

# --- Secret: SMTP credentials + reCAPTCHA secret (read by the Lambda) ---------
resource "aws_secretsmanager_secret" "contact" {
  name        = var.secret_name
  description = "SMTP credentials + reCAPTCHA secret for the contact form."
}

# Placeholder so the stack applies cleanly; put the REAL values in afterwards
# (console/CLI) — Terraform ignores subsequent changes to the value.
resource "aws_secretsmanager_secret_version" "contact" {
  secret_id = aws_secretsmanager_secret.contact.id
  secret_string = jsonencode({
    mail_username         = "CHANGE_ME"
    mail_password         = "CHANGE_ME"
    mail_default_sender   = "CHANGE_ME"
    recaptcha_private_key = "CHANGE_ME"
  })

  lifecycle {
    ignore_changes = [secret_string]
  }
}

# --- IAM role -----------------------------------------------------------------
data "aws_iam_policy_document" "assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${var.name_prefix}-contact"
  assume_role_policy = data.aws_iam_policy_document.assume.json
}

data "aws_iam_policy_document" "lambda" {
  statement {
    sid       = "Logs"
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.lambda.arn}:*"]
  }

  statement {
    sid       = "ReadContactSecret"
    actions   = ["secretsmanager:GetSecretValue"]
    resources = [aws_secretsmanager_secret.contact.arn]
  }
}

resource "aws_iam_role_policy" "lambda" {
  name   = "${var.name_prefix}-contact"
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.lambda.json
}

# --- Lambda -------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${var.name_prefix}-contact"
  retention_in_days = 30
}

data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = var.source_dir
  output_path = "${path.module}/.build/contact.zip"
}

resource "aws_lambda_function" "contact" {
  function_name    = "${var.name_prefix}-contact"
  role             = aws_iam_role.lambda.arn
  runtime          = "python3.12"
  architectures    = ["arm64"]
  handler          = "handler.handler"
  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256
  timeout          = 15
  memory_size      = 256

  environment {
    variables = {
      CONTACT_SECRET_NAME       = aws_secretsmanager_secret.contact.name
      CONTACT_RECIPIENT         = var.contact_recipient
      RECAPTCHA_SCORE_THRESHOLD = tostring(var.recaptcha_score_threshold)
      SMTP_HOST                 = "smtp.gmail.com"
      SMTP_PORT                 = "465"
    }
  }

  depends_on = [aws_iam_role_policy.lambda, aws_cloudwatch_log_group.lambda]
}

# Function URL with IAM auth: CloudFront reaches it as an OAC-signed origin.
resource "aws_lambda_function_url" "contact" {
  function_name      = aws_lambda_function.contact.function_name
  authorization_type = "AWS_IAM"

  dynamic "cors" {
    for_each = length(var.cors_allowed_origins) > 0 ? [1] : []
    content {
      allow_origins  = var.cors_allowed_origins
      allow_methods  = ["POST"]
      allow_headers  = ["content-type"]
      expose_headers = ["content-type"]
      max_age        = 300
    }
  }
}

output "function_name" {
  value = aws_lambda_function.contact.function_name
}

output "function_arn" {
  value = aws_lambda_function.contact.arn
}

output "function_url" {
  value = aws_lambda_function_url.contact.function_url
}

output "secret_arn" {
  value = aws_secretsmanager_secret.contact.arn
}
