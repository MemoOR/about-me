FROM python:3.11

WORKDIR /app

ADD . /app

RUN pip install -r requirements.txt
RUN pip3 install --upgrade pip

CMD ["python3", "runApp.py"]