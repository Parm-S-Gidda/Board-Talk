import json

from channels.generic.websocket import AsyncWebsocketConsumer


class WhiteBoardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = "chat_%s" % self.room_name


            # Join room group
            await self.channel_layer.group_add(
                self.room_group_name, self.channel_name
            )

            await self.accept()
        except Exception as e:
            await self.close(code=1011)  # Close the connection with a custom close code
            print(f"Connection failed: {e}")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):

        print("got message")

        text_data_json = json.loads(text_data)
        message = text_data_json["data"] #"data"

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message, "sender_channel": self.channel_name}
        )

    # Receive message from room group
    async def chat_message(self, event):

        print("recieved message")
        message = event["message"]
        sender_channel = event["sender_channel"]

         # Exclude the sender from receiving the message
        if sender_channel != self.channel_name:
            # Send message to WebSocket
            await self.send(text_data=json.dumps({"message": message}))