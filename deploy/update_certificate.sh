#!/bin/bash

cd /opt/app/about-me
sudo git pull
make renew-cert
make deploy