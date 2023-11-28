FROM nginx:alpine
LABEL maintainer="memo.or99@hotmail.com"

# Define working directory.
WORKDIR /etc/nginx
RUN mkdir /etc/ssl || true
RUN mkdir /opt/app || true

# Get upstream updates
RUN apk upgrade --no-cache 
RUN apk add openssl

# Expose ports.
EXPOSE 80 443

COPY _template/ /etc/nginx/_template/
COPY nginx.conf /etc/nginx/nginx.conf
COPY down.html /usr/share/nginx/html/down.html

WORKDIR /etc/ssl
RUN openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout nginx.key -out nginx.crt -subj "/C=MX/ST=CDMX/L=Cuajimalpa/O=MemoOR/OU=MemoOR/CN=memo.or99@hotmail.com"

COPY ssl-nginx.sh /opt/app/ssl-nginx.sh
RUN chmod +x /opt/app/ssl-nginx.sh

WORKDIR /opt/app
RUN ./ssl-nginx.sh

# Define default command.
CMD ["nginx"]