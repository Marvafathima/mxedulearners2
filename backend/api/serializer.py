from rest_framework import serializers
from .models import CustomUser
from django.utils import timezone
from datetime import timedelta
# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     confirm_password = serializers.CharField(write_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ('id', 'username', 'email', 'phone_number', 'password', 'confirm_password', 'profile_pic', 'role')
#         extra_kwargs = {'password': {'write_only': True}}
#     def validate_email(self, value):
#         if CustomUser.objects.filter(email=value).exists():
#             raise serializers.ValidationError("A user with this email already exists.")
#         return value

#     def validate_phone_number(self, value):
#         if CustomUser.objects.filter(phone_number=value).exists():
#             raise serializers.ValidationError("A user with this phone number already exists.")
#         return value

#     def validate(self, data):
#         if data['password'] != data['confirm_password']:
#             raise serializers.ValidationError("Passwords do not match")
#         return data

#     def create(self, validated_data):
#         validated_data.pop('confirm_password')
#         user = CustomUser.objects.create_user(**validated_data)
#         return user
# class OTPVerificationSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     otp = serializers.CharField(max_length=6)

#     def validate(self, data):
#         email = data.get('email')
#         otp = data.get('otp')
#         print(otp)
#         print(email)
#         if not email:
#             raise serializers.ValidationError("Email is required")
#         user = CustomUser.objects.filter(email=email).first()
#         if not user:
#             raise serializers.ValidationError("User not found")
#         if user.otp !=otp:
#             raise serializers.ValidationError("Invalid OTP")
#         if user.otp_created_at < timezone.now() - timedelta(minutes=5):
#             raise serializers.ValidationError("OTP has expired")
#         return data
    
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'phone_number','confirm_password', 'password', 'profile_pic', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password',None)
        user = CustomUser.objects.create_user(**validated_data)
        return user

class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)