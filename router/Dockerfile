FROM nginx:alpine
LABEL maintainer="memo.or99@hotmail.com"

# Create necessary directories
RUN mkdir -p /etc/nginx/ssl/live/guillermoortega.me/

# Get upstream updates
RUN apk upgrade --no-cache 
RUN apk add openssl

# Generate SSL certificates
WORKDIR /etc/nginx/ssl/live/guillermoortega.me/
RUN openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout privkey.pem -out fullchain.pem -subj "/C=MX/ST=CDMX/L=Cuajimalpa/O=MemoOR/OU=MemoOR/CN=memo.or99@hotmail.com"

# Copy NGINX configuration and other files
WORKDIR /etc/nginx/
COPY _template/ /etc/nginx/_template/
COPY nginx.conf /etc/nginx/nginx.conf
COPY down.html /usr/share/nginx/html/down.html

# Expose ports
EXPOSE 80 443

# Define default command
CMD ["nginx"]
