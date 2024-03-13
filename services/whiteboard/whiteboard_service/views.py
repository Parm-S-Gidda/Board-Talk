from django.shortcuts import render
from django.http import JsonResponse


# CURRENTLY the view functions are returning HTMl files but in the future, will change to JSON responses.
# Like so: return JsonResponse({"key": "value"})

def index(request):
    return render(request, "whiteboard_service/index.html")

def room(request, room_name):
    return render(request, "whiteboard_service/room.html", {
        "room_name": room_name
    })