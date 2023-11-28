FROM python:3.11
LABEL maintainer "memo.or99@hotmail.com"

RUN mkdir -p /opt/app

WORKDIR /opt/app

# install
COPY . /opt/app/
RUN pip install --upgrade pip
RUN pip install --progress-bar off -r requirements.txt

RUN pybabel compile -d app/translations
RUN openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout instance/privateKey.pem -out instance/certificate.pem -subj "/C=MX/ST=CDMX/L=Cuajimalpa/O=MemoOR/OU=MemoOR/CN=memo.or99@hotmail.com"

EXPOSE 7168

WORKDIR /opt/app
CMD ["gunicorn", "about-me:app"]
