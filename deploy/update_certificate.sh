#!/bin/bash

cd /opt/app/about-me
sudo git pull

export $(grep -v '^#' /opt/app/about-me/app.env | xargs) 
echo "$DOCKER_LOGIN_PASSWORD" | docker login -u $DOCKER_LOGIN_USERNAME --password-stdin
make renew-cert
sudo rm /opt/app/about-me/app.env