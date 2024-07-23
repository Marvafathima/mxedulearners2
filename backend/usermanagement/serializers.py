# usermanagement/serializers.py
from rest_framework import serializers
from api.models import CustomUser, TutorApplication

class TutorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username']

class TutorDetailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    username = serializers.CharField(source='user.username')
    phone_number = serializers.CharField(source='user.phone_number')

    class Meta:
        model = TutorApplication
        fields = ['email', 'username', 'phone_number', 'education_qualification', 'job_experience']