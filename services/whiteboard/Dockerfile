FROM python:3.11.3

ENV PYTHONUNBUFFERED 1

RUN mkdir /whiteboard_service

WORKDIR /whiteboard_service

ADD . /whiteboard_service/

RUN pip install -r requirements.txt

ENV PORT=8080
EXPOSE 8080