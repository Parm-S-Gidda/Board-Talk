from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/notifications')
def hello():
    response_body = {
        "title": "Notification title",
        "body": "Notification body..."
    }

    return response_body