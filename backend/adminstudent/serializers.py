from rest_framework import serializers
from api.models import CustomUser

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'profile_pic', 'is_active', 'joined_at']