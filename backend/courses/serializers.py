
from rest_framework import serializers
from .models import Courses, Lesson

# class LessonSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lesson
#         fields = ['id', 'title', 'description', 'duration', 'lesson_number', 'thumbnail', 'video_url', 'points']

# class CourseSerializer(serializers.ModelSerializer):
#     lessons = LessonSerializer(many=True, required=False)

#     class Meta:
#         model = Courses
#         fields = ['id', 'name', 'category', 'price', 'offer_percentage', 'description', 'thumbnail', 'points', 'lessons']

#     def create(self, validated_data):
#         lessons_data = validated_data.pop('lessons', [])
#         course = Courses.objects.create(**validated_data)
#         print(course.name,course.user,"yes course have created")
#         for lesson_data in lessons_data:
#             Lesson.objects.create(course=course, **lesson_data)
        
#         return course
# class LessonSerializer(serializers.ModelSerializer):
#     thumbnail = serializers.ImageField(required=False, allow_null=True)

#     class Meta:
#         model = Lesson
#         fields = ['title', 'description', 'duration', 'lesson_number', 'thumbnail', 'video_url', 'points']

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

