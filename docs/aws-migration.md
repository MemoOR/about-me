# AWS migration — React (Vite SSG) on S3 + CloudFront

This is the zero-cost replacement for the Flask + DigitalOcean droplet setup. The
site is now a **statically prerendered React app** on a **private S3 bucket**
served through **CloudFront**, with the contact form handled by a **serverless
Lambda** that still sends mail through the **existing Gmail SMTP account** (no
SES). It follows [docs/stack-blueprint.md](./stack-blueprint.md).

The original Flask app under `web/` is untouched — this lives alongside it.

## Layout

| Path | What |
| --- | --- |
| `app/` | React + Vite + `vite-react-ssg` site (TypeScript). Prerenders `/en`, `/es`, `/en/3dworld`, `/es/mundo3d`. |
| `app/public/static/` | The original CSS/JS/fonts/images/HDR/3D assets, reused **verbatim** for a pixel-identical look. |
| `lambda/contact/handler.py` | Contact handler: reCAPTCHA verify + Gmail SMTP send. Stdlib + boto3 only. |
| `tf/` | Terraform: `site_bucket`, `acm_cert`, `cdn`, `contact_api` modules. |
| `scripts/deploy-aws.sh` | Build → `s3 sync` → CloudFront invalidation. |

## How the look stays identical

The site is prerendered, so the initial HTML already contains the full DOM. The
same vendor libraries (jQuery, OwlCarousel, Isotope, Magnific-Popup, WOW.js,
Splitting, parallax, …) and the original `all.js` are loaded via `defer` from
`app/index.html` and initialise the prerendered DOM on `window.load`, exactly
like the Flask site. React hydrates the same markup first. The CSS files are the
originals, unchanged.

## Prerequisites

- Node 20+ and npm
- Terraform ≥ 1.6, AWS CLI configured with credentials
- A registrar/DNS provider for `guillermoortega.me`

## Local development

```bash
cd app
cp .env.example .env      # fill in the public values (see below)
npm install
npm run dev               # http://localhost:5173/en
npm run build             # SSG build -> app/dist
npm run typecheck
```

### Environment variables (`app/.env`)

These are **public**, build-time values (safe in the client bundle):

- `VITE_RECAPTCHA_SITE_KEY` — the reCAPTCHA v3 **site** key (was `RECAPTCHA_SITE_KEY`).
- `VITE_IELTS_CERTIFICATE_URL`, `VITE_{SPANISH,ENGLISH}_CV_URL_{PREVIEW,DOWNLOAD}`,
  `VITE_UDEMY_DEVOPS`, `VITE_UDEMY_THREEJS` — the PDF / certificate links.
- `VITE_API_BASE` — leave empty in production (the API is same-origin `/api/*`).

The **secret** values (SMTP credentials, reCAPTCHA secret key) never touch the
client — they live in Secrets Manager and are read by the Lambda.

## One-time infrastructure bootstrap

DNS is now managed in **Route 53** (no DigitalOcean). Terraform creates the
hosted zone, the ACM validation records, and the CloudFront alias records — you
only switch the name servers at your registrar.

```bash
cd tf
cp terraform.tfvars.example terraform.tfvars   # edit domain / aliases (+ google_site_verification)
terraform init
```

Because Route 53 must be authoritative before the ACM certificate can validate,
bootstrap in two steps:

1. **Create the hosted zone and read its name servers:**
   ```bash
   terraform apply -target=aws_route53_zone.primary
   terraform output route53_name_servers
   ```
   Set those 4 name servers at your registrar (replacing the DigitalOcean ones),
   then wait for propagation (minutes to a few hours).

2. **Full apply.** Once the NS switch has propagated, Route 53 answers for the
   domain, so ACM validation completes automatically and CloudFront + the A/AAAA
   alias records are created:
   ```bash
   terraform apply
   ```

Apex (`guillermoortega.me`) and `www` are both served directly by CloudFront via
A/AAAA alias records — no manual DNS entries needed. If you kept a Google Search
Console TXT record, set `google_site_verification` in `terraform.tfvars`.

### Put the real secret in place

Terraform creates the secret with placeholder values. Set the real ones once:

```bash
aws secretsmanager put-secret-value \
  --secret-id "$(terraform output -raw contact_secret_arn)" \
  --secret-string '{
    "mail_username": "you@gmail.com",
    "mail_password": "your-gmail-app-password",
    "mail_default_sender": "you@gmail.com",
    "recaptcha_private_key": "your-recaptcha-secret-key"
  }'
```

> Gmail requires an **App Password** (not your account password) for SMTP.

## Deploy the site

```bash
./scripts/deploy-aws.sh
```

This builds the SSG output, uploads it to the bucket (immutable cache for
assets, no-cache for HTML), and invalidates CloudFront.

## Contact form flow

Browser → `POST /api/contact` (same-origin) → CloudFront (`/api/*`, OAC-signed)
→ Lambda. The Lambda verifies the reCAPTCHA token (score ≥ 0.5), validates the
e-mail, and sends the message via `smtp.gmail.com:465` to `contact_recipient`
(default `memo.or99@hotmail.com`). It returns `{ "text": ..., "type": "success"|"error" }`
localised to the submitted language — same contract the old Flask endpoint used.

## Cost

Within the AWS free tier / a few cents a month for this traffic profile:
CloudFront (`PriceClass_100`), a tiny private S3 bucket, an occasionally-invoked
Lambda, and one Secrets Manager secret.
