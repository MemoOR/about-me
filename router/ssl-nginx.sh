#!/bin/sh

certbot_file="/etc/nginx/ssl/live/guillermoortega.me/fullchain.pem"
ssl_file="/etc/nginx/_template/ssl.conf"

if [ -e "$certbot_file" ]; then
    echo "Certbot certificate found"
    sed -i '1s|.*|ssl_certificate /etc/nginx/ssl/live/guillermoortega.me/fullchain.pem;|' "$ssl_file"
    sed -i '2s|.*|ssl_certificate_key /etc/nginx/ssl/live/guillermoortega.me/privkey.pem;|' "$ssl_file"
else
    echo "No certbot certificate found, using self signed"
    sed -i '1s|.*|ssl_certificate /etc/ssl/nginx.crt;|' "$ssl_file"
    sed -i '2s|.*|ssl_certificate_key /etc/ssl/nginx.key;|' "$ssl_file"
fi
