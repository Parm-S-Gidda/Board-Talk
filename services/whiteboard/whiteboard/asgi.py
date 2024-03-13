"""
ASGI config for whiteboard project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

import whiteboard_service.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "whiteboard.settings")
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app, # can change protocol later if we wish
    "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(whiteboard_service.routing.websocket_urlpatterns))
        ),
})
