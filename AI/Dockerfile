FROM python:3.9

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt


WORKDIR /app 

COPY . .
EXPOSE 8888

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8888"]

