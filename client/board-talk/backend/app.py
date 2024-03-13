from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/notifications')
def get_notifications():
    response_body = {
        "title": "Notification title",
        "body": "Notification body..."
    }

    return response_body