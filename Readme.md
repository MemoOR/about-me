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

- **Backend:** Python Flask
- **Frontend:** HTML, CSS, JavaScript, Three.js
- **Server:** Gunicorn, Nginx
- **Containerization:** Docker, Docker Compose
- **Infrastructure:** Terraform, DigitalOcean
- **SSL:** Let's Encrypt (Certbot)
- **Internationalization:** Babel (ES/EN)


## 📁 Project Structure

```
about-me/
├── web/              # Flask application
├── router/           # Nginx reverse proxy
├── deploy/           # Terraform & deployment scripts
├── certbot/          # SSL certificates
└── docker-compose.yml
```

---

## 🚀 Quick Start

### Local Development

```bash
# Build and start services
make build
make start

# Test without nginx
make test

# Stop services
make stop
```

### Environment Setup

Create an `app.env` file based on `.env.template` with your configuration.

---

## 📦 Deployment

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

---

## 🌍 Internationalization (Babel)

### Update translations after code changes:

```bash
cd web/
pybabel update -i app/translations/messages.pot -d app/translations
# Add new translations to .po files
```

### Test translations locally:

```bash
cd web/
pybabel compile -d app/translations
# Run the app
```

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
