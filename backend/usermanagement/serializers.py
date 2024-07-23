
from rest_framework import serializers
from api.models import CustomUser, TutorApplication

class TutorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username']

# class TutorDetailSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(source='user.email')
#     username = serializers.CharField(source='user.username')
#     phone_number = serializers.CharField(source='user.phone_number')

#     class Meta:
#         model = TutorApplication
#         fields = ['email', 'username', 'phone_number', 'education_qualification', 'job_experience']

# usermanagement/serializers.py


class TutorDetailSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    
    class Meta:
        model = TutorApplication
        fields = ['user', 'education_qualification', 'job_experience']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'email': obj.user.email,
            'username': obj.user.username,
            'phone_number': obj.user.phone_number,
            'profile_pic': obj.user.profile_pic.url if obj.user.profile_pic else None,
            'is_approved': obj.user.is_approved,
            'is_rejected': obj.user.is_rejected
        }