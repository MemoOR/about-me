FROM nginx:alpine
LABEL maintainer="memo.or99@hotmail.com"

## Define mountable directories.
#VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# Define working directory.
WORKDIR /etc/nginx

# Define default command.
CMD ["nginx"]

# Get upstream updates
RUN apk upgrade --no-cache 

# Expose ports.
EXPOSE 80 443

COPY _template/ /etc/nginx/_template/
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.crt nginx.key /etc/ssl/