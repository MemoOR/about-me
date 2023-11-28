#!/bin/bash

cd /opt/app/about-me
sudo git pull
make create-cert
make deploy