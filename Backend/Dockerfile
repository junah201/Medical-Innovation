FROM python:3.10-slim-buster
EXPOSE 80 443 22 8080

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--ssl-keyfile", "./host/etc/letsencrypt/live/api.medicalinnovation.or.kr/privkey.pem", "--ssl-certfile", "./host/etc/letsencrypt/live/api.medicalinnovation.or.kr/fullchain.pem"]
