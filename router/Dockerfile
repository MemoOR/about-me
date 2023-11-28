FROM nginx:alpine
LABEL maintainer="memo.or99@hotmail.com"

## Define mountable directories.
#VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# Define working directory.
WORKDIR /etc/nginx
RUN mkdir -p ssl/live/guillermoortega.me/

# Get upstream updates
RUN apk upgrade --no-cache 
RUN apk add openssl

COPY _template/ /etc/nginx/_template/
COPY nginx.conf /etc/nginx/nginx.conf
COPY down.html /usr/share/nginx/html/down.html

WORKDIR /etc/nginx/ssl/live/guillermoortega.me/
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privkey.pem -out fullchain.pem -subj "/C=MX/ST=CDMX/L=Cuajimalpa/O=MemoOR/OU=MemoOR/CN=memo.or99@hotmail.com"

# Expose ports.
EXPOSE 80 443

# Define default command.
CMD ["nginx"]