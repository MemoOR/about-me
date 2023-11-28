<p align="center">
  <img align="center" width="200" src="https://github.com/MemoOR/about-me/blob/master/assets/GDLogo.png">
  <h1 align="center" style="margin: 0 auto 0 auto;">Guillermo Ortega Romo</h1>
  <h5 align="center" style="margin: 0 auto 0 auto;">About me</h5>
</p>

<p align="center">
    <img src="https://img.shields.io/github/last-commit/MemoOR/about-me">
    <img src="https://img.shields.io/github/issues/MemoOR/about-me?label=issues">
    <img src="https://img.shields.io/github/stars/MemoOR/about-me?color=purple&">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/MemoOR/about-me?color=purple">
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/MemoOR/about-me?color=purple">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/MemoOR/about-me?color=purple">
  <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/MemoOR/about-me?color=purple&label=total%20lines%20in%20repo">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/MemoOR/about-me?color=purple">
</p>


## In this repo lives the code for my personal website.

## In there you can learn more about me


### Provisioning. How to deploy the first time.

The Domain was purchased from Hostinger.

It is required to first point the Domain to use digitalocean nameservers to allow managing it with terraform. This step is done inside Hostinger web app.

This setup will create a digitalocean droplet, point the domain to its ip, trigger the setup inside cloud-init.yaml

It is necessary to have the 3 needed private files, app.env, terraform.tfstate, about_me_id_rsa

the repo should look like this
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

after having those files

```
cd about-me/deploy
make planout
make apply
```

wait to receive email notification that initial setup is done

```
cd deploy/
ssh -i ./about_me_id_rsa memoor@guillermoortega.me 'bash -s' < create_certificate.sh
```

This initial setup will ideally deploy a functional app and nothing else is required.

### Deploy after

To avoid deleting and creating a lot of droplets, and to avoid changing the domain records every time, another steps are to be followed to deploy a new version of the app once the droplet is in place

```
cd deploy/
ssh -i ./about_me_id_rsa memoor@guillermoortega.me 'bash -s' < deploy.sh
```

### Steps to update certbot certificate

```
cd deploy/
ssh -i ./about_me_id_rsa memoor@guillermoortega.me 'bash -s' < update_certificate.sh
```