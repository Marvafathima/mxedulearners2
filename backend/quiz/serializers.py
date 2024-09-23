
from django.utils.duration import duration_string
from datetime import timedelta
from rest_framework import serializers
from .models import *
from courses.models import Courses
from courses.serializers import *
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id','text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = AnswerSerializer(many=True, source='answers', read_only=True)
    
    class Meta:
        model = Question
        fields = ['id','text', 'marks', 'negative_marks', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    time_limit = serializers.DurationField()
    creator = serializers.ReadOnlyField(source='creator.id')
    course = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'course', 'description', 'time_limit', 'questions', 'creator']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['course'] = instance.course.name  # Return course name instead of ID
        return representation


class UserQuizAttemptSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True)
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = UserQuizAttempt
        fields = ['id', 'user', 'quiz', 'score', 'start_time', 'end_time','passed','totalattempts','percentage']
        read_only_fields = ['start_time', 'end_time','passed']


class CourseCertificateSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = CourseCertificate
        fields = ['id', 'course', 'created_at', 'percentage_score']
