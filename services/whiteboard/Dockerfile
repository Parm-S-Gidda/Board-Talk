FROM python:3.11.3

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /whiteboard_service

WORKDIR /whiteboard_service

ADD . /whiteboard_service/

RUN pip install -r requirements.txt

EXPOSE 8000
CMD python manage.py makemigrations && \
python manage.py migrate && \
| python manage.py shell && \
python manage.py runserver 0.0.0.0:8000