"""Serverless contact-form handler.

Replaces the Flask ``/send_email`` endpoint. It keeps the exact same behaviour:

1. Verify the reCAPTCHA v3 token (reject score < 0.5).
2. Validate the submitted e-mail address.
3. Send the message over the *existing* Gmail SMTP account (smtp.gmail.com:465,
   implicit SSL) via ``smtplib`` — no SES involved.

Secrets (SMTP credentials + reCAPTCHA secret key) are read at runtime from AWS
Secrets Manager, so nothing sensitive is ever bundled or exposed to the client.

Only the standard library and ``boto3`` (bundled in the Lambda runtime) are used,
so the function needs no dependency packaging.
"""

from __future__ import annotations

import html
import json
import logging
import os
import re
import smtplib
import ssl
import urllib.parse
import urllib.request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from functools import lru_cache

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

SECRET_NAME = os.environ["CONTACT_SECRET_NAME"]
RECAPTCHA_VERIFY_URL = os.environ.get(
    "RECAPTCHA_VERIFY_URL", "https://www.google.com/recaptcha/api/siteverify"
)
RECIPIENT = os.environ.get("CONTACT_RECIPIENT", "memo.or99@hotmail.com")
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SCORE_THRESHOLD = float(os.environ.get("RECAPTCHA_SCORE_THRESHOLD", "0.5"))

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

# Localised responses (mirror the original Flask/Babel strings).
MESSAGES = {
    "captcha": {
        "en": "You didn't pass the captcha, try again",
        "es": "No pasaste la prueba captcha, inténtalo de nuevo",
    },
    "invalid_email": {
        "en": "The email you entered is not valid",
        "es": "El correo electrónico que ingresaste no es válido",
    },
    "success": {
        "en": "I got your message and will contact you soon!",
        "es": "Recibí tu mensaje y me pondré en contacto contigo pronto",
    },
    "error": {
        "en": "Something went wrong",
        "es": "Algo salió mal",
    },
}


def msg(key: str, lang: str) -> str:
    lang = "es" if lang == "es" else "en"
    return MESSAGES[key][lang]


@lru_cache(maxsize=1)
def get_secret() -> dict:
    """Fetch and cache the contact secret (SMTP creds + reCAPTCHA secret)."""
    client = boto3.client("secretsmanager")
    response = client.get_secret_value(SecretId=SECRET_NAME)
    return json.loads(response["SecretString"])


def _response(text: str, type_: str, status: int = 200) -> dict:
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"text": text, "type": type_}),
    }


def verify_recaptcha(secret: str, token: str) -> bool:
    data = urllib.parse.urlencode({"secret": secret, "response": token}).encode()
    request = urllib.request.Request(RECAPTCHA_VERIFY_URL, data=data)
    with urllib.request.urlopen(request, timeout=10) as resp:
        result = json.loads(resp.read().decode())
    if not result.get("success"):
        return False
    return float(result.get("score", 0)) >= SCORE_THRESHOLD


def send_mail(secret: dict, user_name: str, user_email: str, user_message: str) -> None:
    sender = secret.get("mail_default_sender", secret["mail_username"])
    message = MIMEMultipart("alternative")
    message["Subject"] = f"Mensaje de mi pagina web: {user_email}"
    message["From"] = sender
    message["To"] = RECIPIENT
    message["Reply-To"] = user_email

    text_body = f"Mensaje de: {user_email}"
    html_body = (
        f"<h2>From: {user_name}</h2>"
        f"<h5>Email: {user_email}</h5>"
        f"<p>Message:<br>{user_message}</p>"
    )
    message.attach(MIMEText(text_body, "plain"))
    message.attach(MIMEText(html_body, "html"))

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
        server.login(secret["mail_username"], secret["mail_password"])
        server.sendmail(sender, [RECIPIENT], message.as_string())


def _parse_body(event: dict) -> dict:
    body = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
        import base64

        body = base64.b64decode(body).decode()
    try:
        return json.loads(body)
    except json.JSONDecodeError:
        return {}


def handler(event, _context):
    payload = _parse_body(event)
    lang = payload.get("lang", "en")

    user_name = html.escape((payload.get("userName") or "").strip())
    user_email = (payload.get("userEmail") or "").strip()
    user_message = html.escape((payload.get("userMessage") or "").strip())
    token = payload.get("token") or ""

    try:
        secret = get_secret()
    except Exception:  # pragma: no cover - defensive
        logger.exception("Unable to read contact secret")
        return _response(msg("error", lang), "error")

    # 1) reCAPTCHA
    try:
        if not token or not verify_recaptcha(secret["recaptcha_private_key"], token):
            return _response(msg("captcha", lang), "error")
    except Exception:
        logger.exception("reCAPTCHA verification failed")
        return _response(msg("captcha", lang), "error")

    # 2) Validate e-mail
    if not EMAIL_REGEX.match(user_email):
        return _response(msg("invalid_email", lang), "error")

    # 3) Send the mail
    try:
        send_mail(secret, user_name, user_email, user_message)
    except Exception:
        logger.exception("Error sending contact email")
        return _response(msg("error", lang), "error")

    return _response(msg("success", lang), "success")
