#!/bin/bash

cd /opt/app/about-me
sudo git pull

source /opt/app/about-me/app.env
echo "$DOCKER_LOGIN_PASSWORD" | docker login -u $DOCKER_LOGIN_USERNAME --password-stdin
make deploy
sudo rm /opt/app/about-me/app.env