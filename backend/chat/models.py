from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
from api.models import CustomUser


class ChatMessage(models.Model):
    room_name = models.CharField(max_length=255)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(CustomUser, related_name='sent_messages',default="", on_delete=models.CASCADE)
    receiver = models.ForeignKey(CustomUser, related_name='received_messages',default="",on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f'{self.sender} to {self.receiver}: {self.message[:50]}'