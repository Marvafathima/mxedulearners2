# serializers.py
from rest_framework import serializers
from api.models import CustomUser

class TutorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'profile_pic', 'joined_at', 'is_active']