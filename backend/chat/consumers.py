
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import ChatMessage
from api.models import CustomUser
import logging
logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        logger.info(f"WebSocket connection established for room: {self.room_name}")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        logger.info(f"WebSocket connection closed for room: {self.room_name}")

    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']
    #     sender_id = text_data_json['sender']
    #     receiver_id = text_data_json['receiver']  # New field

    #     # Save message to database
    #     await self.save_message(sender_id, receiver_id, self.room_name, message)

    #     # Send message to room group
    #     await self.channel_layer.group_send(
    #         self.room_group_name,
    #         {
    #             'type': 'chat_message',
    #             'message': message,
    #             'sender_id': sender_id,
    #             'receiver_id': receiver_id  # Include receiver_id
    #         }
    #     )
    #     logger.info(f"Message received and sent to group: {self.room_group_name}")
    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
            sender_id = text_data_json['sender_id']  # Changed from 'sender' to 'sender_id'
            receiver_id = text_data_json['receiver_id']

            # Save message to database
            await self.save_message(sender_id, receiver_id, self.room_name, message)

            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender_id': sender_id,
                    'receiver_id': receiver_id
                }
            )
            logger.info(f"Message received and sent to group: {self.room_group_name}")
        except KeyError as e:
            logger.error(f"Missing key in received data: {e}")
        except json.JSONDecodeError:
            logger.error("Received invalid JSON data")
        except Exception as e:
            logger.error(f"Error in receive method: {e}")
 
    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']
        receiver_id = event['receiver_id']  # Include receiver_id

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id,
            'receiver_id': receiver_id  # Include receiver_id
        }))

    @database_sync_to_async
    def save_message(self, sender_id, receiver_id, room_name, message):
        try:
            sender = CustomUser.objects.get(id=sender_id)
            receiver = CustomUser.objects.get(id=receiver_id)
            ChatMessage.objects.create(
                sender=sender,
                receiver=receiver,
                room_name=room_name,
                message=message
            )
            logger.info(f"Message saved to database: {message[:50]}...")
        except CustomUser.DoesNotExist:
            logger.error(f"User not found. Sender ID: {sender_id}, Receiver ID: {receiver_id}")
        except Exception as e:
            logger.error(f"Error saving message to database: {e}")
