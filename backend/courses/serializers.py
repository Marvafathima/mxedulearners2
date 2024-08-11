
from rest_framework import serializers
from .models import Courses, Lesson
from django.contrib.auth import get_user_model
from api.models import TutorApplication




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'phone_number','profile_pic']
class LessonSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False, allow_null=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())

    class Meta:
        model = Lesson
        fields = ['course', 'title', 'description', 'duration', 'lesson_number', 'thumbnail', 'video_url', 'points']       
class CourseSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False)
    lessons = LessonSerializer(many=True, read_only=True)
   
    class Meta:
        model = Courses
        fields = ['name', 'user', 'category', 'price', 'offer_percentage', 'description', 'thumbnail', 'points', 'rating', 'lessons']

class FetchCourseSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False)
    lessons = LessonSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    tutor_education = serializers.SerializerMethodField()
    class Meta:
        model = Courses
        fields = ['name', 'user', 'category', 'price', 'offer_percentage', 'description', 'thumbnail', 'points', 'rating', 'lessons','tutor_education']

    def get_tutor_education(self, obj):
        try:
            tutor_application = TutorApplication.objects.get(user=obj.user)
            return tutor_application.education_qualification
        except TutorApplication.DoesNotExist:
            return None