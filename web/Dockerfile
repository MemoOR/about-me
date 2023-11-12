FROM python:3.11
LABEL maintainer "memo.or99@hotmail.com"

RUN mkdir -p /opt/app

WORKDIR /opt/app

# install
COPY requirements.txt ./
RUN pip install --progress-bar off --no-cache-dir -r requirements.txt

# copy app
COPY app /opt/app
COPY about-me.py /opt/app
COPY gunicorn.conf.py /opt/app
COPY instance /opt/app

EXPOSE 7168

WORKDIR /opt/app/app
CMD ["gunicorn", "about-me:app"]
