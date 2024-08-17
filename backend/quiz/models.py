from django.db import models

from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Courses

User = get_user_model()

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name='quizzes')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_quizzes')
    description = models.TextField(blank=True)
    time_limit = models.DurationField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Quizzes"
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    marks = models.PositiveIntegerField(default=1)
    negative_marks = models.FloatField(default=0)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.quiz.title} - Question {self.order}"

    class Meta:
        ordering = ['order']

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.text[:30]} - {'Correct' if self.is_correct else 'Incorrect'}"