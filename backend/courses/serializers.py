
from rest_framework import serializers
from .models import Courses, Lesson
from django.contrib.auth import get_user_model
from api.models import TutorApplication
from datetime import timedelta



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'phone_number','profile_pic']
class LessonSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False, allow_null=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())
    video = serializers.FileField(required=False, allow_null=True)
    class Meta:
        model = Lesson
        fields = ['course', 'title', 'description', 'duration', 'video', 'lesson_number', 'thumbnail', 'points']       
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
        fields = ['id','name', 'user', 'category', 'price', 'offer_percentage', 'description', 'thumbnail', 'points', 'rating', 'lessons','tutor_education']

    def get_tutor_education(self, obj):
        try:
            tutor_application = TutorApplication.objects.get(user=obj.user)
            return tutor_application.education_qualification
        except TutorApplication.DoesNotExist:
            return None
        

class LessonDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'description', 'duration', 'lesson_number', 'thumbnail', 'video_url', 'points']

class CourseDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)
    total_duration = serializers.SerializerMethodField()

    class Meta:
        model = Courses
        fields = ['id', 'name', 'user', 'category', 'price', 'offer_percentage', 'description', 'thumbnail', 'points', 'rating', 'lessons', 'total_duration']

    def get_total_duration(self, obj):
        return sum((lesson.duration for lesson in obj.lessons.all()), timedelta())
    

