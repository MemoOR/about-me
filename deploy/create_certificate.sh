#!/bin/bash

cd /opt/app/about-me
git pull
make create-cert
make deploy