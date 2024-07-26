
from rest_framework import serializers
from api.models import CustomUser, TutorApplication

class TutorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username']



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
    


class TutorApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorApplication
        fields = ['education_qualification', 'job_experience']
class CustomUserSerializer(serializers.ModelSerializer):
    tutor_application = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'phone_number', 'username', 'profile_pic', 'role', 'is_approved', 'is_rejected', 'tutor_application']

    def get_tutor_application(self, obj):
        try:
            tutor_application = obj.tutorapplication
            return TutorApplicationSerializer(tutor_application).data
        except TutorApplication.DoesNotExist:
            return None
# class CustomUserSerializer(serializers.ModelSerializer):
#     tutor_application = TutorApplicationSerializer(source='tutorapplication', read_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ['id', 'email', 'phone_number', 'username', 'profile_pic', 'role', 'is_approved', 'is_rejected', 'tutor_application']