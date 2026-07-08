<p align="center">
  <img align="center" width="200" src="https://github.com/MemoOR/about-me/blob/master/assets/GDLogo.png">
  <h1 align="center" style="margin: 0 auto 0 auto;">Guillermo Ortega Romo</h1>
  <h3 align="center" style="margin: 0 auto 0 auto;">Personal Portfolio Website</h3>
</p>

<p align="center">
  <a href="https://github.com/GuillermoOrtegaTR" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Work_GitHub-GuillermoOrtegaTR-blue?style=for-the-badge&logo=github&logoColor=white" alt="Work GitHub Profile">
  </a>
</p>

<p align="center">
  <strong>👆 Check out my professional work account for real-world contributions! 👆</strong>
</p>

---

<p align="center">
    <img src="https://img.shields.io/github/last-commit/MemoOR/about-me?style=flat-square">
    <img src="https://img.shields.io/github/issues/MemoOR/about-me?label=issues&style=flat-square">
    <img src="https://img.shields.io/github/stars/MemoOR/about-me?color=purple&style=flat-square">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/MemoOR/about-me?color=purple&style=flat-square">
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/MemoOR/about-me?color=purple&style=flat-square">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/MemoOR/about-me?color=purple&style=flat-square">
  <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/MemoOR/about-me?color=purple&label=total%20lines&style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/MemoOR/about-me?color=purple&style=flat-square">
</p>

---

## 🌐 About This Project

This repository contains the source code for my personal portfolio website. Built with modern web technologies, it showcases my professional experience, skills, and projects in an interactive and visually appealing way.

**🔗 Live Site:** [guillermoortega.me](https://guillermoortega.me)

> **Note:** This is my personal account. For my professional contributions and day-to-day work, please visit my work account: **[@GuillermoOrtegaTR](https://github.com/GuillermoOrtegaTR)**

## 🛠️ Tech Stack

**Current — static React site on AWS (near-zero hosting cost):**

- **Frontend:** React 18 + TypeScript, [Vite](https://vitejs.dev/) with [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) for static prerendering
- **3D / animations:** Three.js game and the original jQuery-plugin animations, reused verbatim for a pixel-identical look
- **Internationalization:** i18next / react-i18next (ES/EN)
- **Contact form:** AWS Lambda (Python) → reCAPTCHA v3 + Gmail SMTP, credentials in AWS Secrets Manager
- **Infrastructure:** Terraform — private S3 bucket, CloudFront (OAC), ACM (us-east-1)
- **Hosting cost:** ~$0/month (S3 + CloudFront free tier)

**Legacy — original containerized Flask app (still in the repo under `web/`, `router/`, `deploy/`):**

- Python Flask · Gunicorn · Nginx · Docker Compose · Terraform + DigitalOcean · Let's Encrypt (Certbot) · Babel


## 📁 Project Structure

```
about-me/
├── app/               # React + Vite (SSG) site — the current frontend
│   ├── src/           # components, sections, pages, i18n, lib
│   └── public/static/ # original CSS/JS/assets reused verbatim
├── lambda/contact/    # serverless contact-form handler (Python)
├── tf/                # Terraform — S3 + CloudFront + ACM + contact API
├── deploy/            # deploy-aws.sh (build → S3 sync → invalidation) + legacy scripts
├── docs/              # stack-blueprint.md, aws-migration.md
├── web/               # legacy Flask application
├── router/            # legacy Nginx reverse proxy
└── docker-compose.yml # legacy container stack
```

> The site was migrated from a Flask app on a DigitalOcean droplet to a
> statically prerendered React site on S3 + CloudFront. See
> [docs/aws-migration.md](docs/aws-migration.md) for the full guide.

---

## 🚀 Quick Start

### Local Development

```bash
cd app
cp .env.example .env      # fill in the public values (reCAPTCHA site key, PDF URLs)
npm install
npm run dev               # http://localhost:5173/en
```

Other scripts (run inside `app/`):

```bash
npm run build       # static SSG build -> app/dist
npm run typecheck   # tsc --noEmit
```

> Public, build-time values live in `app/.env` (see `app/.env.example`). Secret
> values (SMTP credentials, reCAPTCHA secret) never touch the client — they live
> in AWS Secrets Manager and are read by the contact Lambda.

---

## 📦 Deployment

Full walkthrough in **[docs/aws-migration.md](docs/aws-migration.md)**. Summary:

### 1. Provision infrastructure (one-time)

DNS is managed in Route 53 (no DigitalOcean). Bootstrap in two steps so the name
servers exist before ACM validates:

```bash
cd tf
cp terraform.tfvars.example terraform.tfvars   # edit domain / aliases
terraform init

# a) Create the hosted zone, then set its name servers at your registrar:
terraform apply -target=aws_route53_zone.primary
terraform output route53_name_servers          # update NS at the registrar, wait for propagation

# b) Full apply — ACM validates via Route 53, then CloudFront + DNS records:
terraform apply
```

### 2. Set the contact secret (SMTP + reCAPTCHA)

Terraform creates the secret with placeholders; set the real values once:

```bash
aws secretsmanager put-secret-value \
  --secret-id "$(terraform -chdir=tf output -raw contact_secret_arn)" \
  --secret-string '{
    "mail_username": "you@gmail.com",
    "mail_password": "gmail-app-password",
    "mail_default_sender": "you@gmail.com",
    "recaptcha_private_key": "recaptcha-secret-key"
  }'
```

### 3. Build & ship the site

```bash
./deploy/deploy-aws.sh    # npm build -> aws s3 sync -> CloudFront invalidation
```

---

<details>
<summary><strong>Legacy — Flask on a DigitalOcean droplet</strong></summary>

### Initial Provisioning

The domain was purchased from Hostinger and configured to use DigitalOcean nameservers for Terraform management.

This setup creates a DigitalOcean droplet, configures DNS, and triggers cloud-init provisioning.

**Required private files:**
- `app.env` - Application configuration
- `terraform.tfstate` - Terraform state
- `about_me_id_rsa` - SSH private key

**Repository structure for deployment:**
```
.
├── Makefile
├── Readme.md
├── app.env                      # .env file containing configurations for the app
├── assets
│   └── GDLogo.png
├── deploy
│   ├── tf
│   │   └── terraform.tfstate    # terraform state file stored in local to save costs
│   ├── Makefile
│   └── about_me_id_rsa          # private ssh key to connect to droplet
├── docker-compose.yml
├── router
│   ├── Dockerfile
│   ├── _template
│   │   ├── ...
│   ├── down.html
│   └── nginx.conf
└── web
    ├── Dockerfile
    ├── about-me.py
    ├── app
    │   ├── ...
    ├── babel.cfg
    ├── gunicorn.conf.py
    ├── instance
    │   ├── ...
    └── requirements.txt
```

**Initial deployment:**

```bash
cd about-me/deploy
make planout
make apply
```

Wait for email notification that initial setup is complete, then:

```bash
cd deploy/
cat ../app.env | ssh -i ./about_me_id_rsa memoor@guillermoortega.me "sudo tee -a /opt/app/about-me/app.env"
ssh -i ./about_me_id_rsa memoor@guillermoortega.me 'bash -s' < create_certificate.sh
```

### Subsequent Deployments

To deploy updates without recreating infrastructure:

```bash
cd deploy/
cat ../app.env | ssh -i ./about_me_id_rsa memoor@guillermoortega.me "sudo tee -a /opt/app/about-me/app.env"
ssh -i ./about_me_id_rsa memoor@guillermoortega.me 'bash -s' < deploy.sh
```

### SSL Certificate Management

Update SSL certificates:

```bash
cd deploy/
cat ../app.env | ssh -i ./about_me_id_rsa memoor@guillermoortega.me "sudo tee -a /opt/app/about-me/app.env"
ssh -i ./about_me_id_rsa memoor@guillermoortega.me 'bash -s' < update_certificate.sh
```

Or use the Makefile:

```bash
make renew-cert
```

</details>

---

## 🌍 Internationalization

The React site ships English and Spanish, each prerendered to its own route
(`/en`, `/es`). English strings live inline in the components as
`t('key', 'English default')`; Spanish lives in
[`app/src/locales/es.json`](app/src/locales/es.json).

To add or change copy: edit the `t(...)` default in the component (English) and
add the matching key to `es.json` (Spanish).

<details>
<summary><strong>Legacy — Flask / Babel</strong></summary>

The original app used Babel `.po` files under `web/app/translations`:

```bash
cd web/
pybabel update -i app/translations/messages.pot -d app/translations
pybabel compile -d app/translations
```

</details>

---

## 📞 Contact

- **Website:** [guillermoortega.me](https://guillermoortega.me)
- **Work GitHub:** [@GuillermoOrtegaTR](https://github.com/GuillermoOrtegaTR)
- **Personal GitHub:** [@MemoOR](https://github.com/MemoOR)

---

<p align="center">
  <strong>💼 For my professional work and contributions, visit <a href="https://github.com/GuillermoOrtegaTR">@GuillermoOrtegaTR</a></strong>
</p>

<p align="center">Made with ❤️ by Guillermo Ortega Romo</p>
