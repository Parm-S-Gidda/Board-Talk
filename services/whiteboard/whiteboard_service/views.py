from django.shortcuts import render

def index(request):
    return render(request, "whiteboard_service/index.html")