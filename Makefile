default: help

RED:=$(shell tput setaf 1)
YLW:=$(shell tput setaf 3)
GRN:=$(shell tput setaf 2)
NOP:=$(shell tput sgr0)


help:
	@echo ""
	@echo "${RED}Popular Make Targets:${NOP}"
	@echo "   ${YLW}build${NOP}                   - build containers"
	@echo "   ${YLW}start${NOP}                   - start the app"
	@echo "   ${YLW}start-follow${NOP}            - start the app without detatching"
	@echo "   ${YLW}test${NOP}                    - start the app without nginx"
	@echo "   ${YLW}stop${NOP}                    - stop the app"
	@echo "   ${YLW}delete${NOP}                  - delete containers"
	@echo "${RED}Here Be Dragons:${NOP}"
	@echo "   ${YLW}deploy${NOP}                  - build from zero and start running"
	@echo "   ${YLW}renew-cert${NOP}              - to renew ssl certificates"
	@echo ""


build: stop delete
	@docker-compose build;

start:
	@docker-compose up --build -d;

start-follow:
	@docker-compose up --build;

stop:
	@docker-compose stop;

delete: stop
	@docker-compose rm -f -s -v;

deploy: stop build
	@docker-compose up -d;

test: stop build ## Start docker for local dev (w/o nginx)
	@docker-compose up --scale router=0;

create-cert:
	@docker compose run --entrypoint="/bin/sh -c" --rm certbot "rm -r /etc/letsencrypt/live && certbot certonly --webroot --webroot-path /var/www/certbot/ -d guillermoortega.me -n -m memo.or99@hotmail.com --agree-tos"

renew-cert:
	@docker compose run --rm certbot renew