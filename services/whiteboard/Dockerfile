FROM python:3.11.3

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /whiteboard_service

WORKDIR /whiteboard_service

ADD . /whiteboard_service/

RUN pip install -r requirements.txt

CMD python manage.py runserver 0.0.0.0:8080