from django.db import models
from api.models import CustomUser
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
class Courses(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    CATEGORY = [
        ('Full Stack Development', 'Full Stack Development'),
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Data Science', 'Data Science'),
        ('Machine Learning', 'Machine Learning'),
        ('Cybersecurity', 'Cybersecurity'),
        ('Mobile App Development', 'Mobile App Development')
    ]
    category = models.CharField(max_length=100, choices=CATEGORY)
    price = models.FloatField(null=False, blank=False)
    offer_percentage = models.FloatField(null=True, blank=True)
    description = models.TextField(max_length=1500, null=False, blank=False)
    thumbnail = models.ImageField(upload_to='course_thumbnail/')
    points = models.PositiveIntegerField(default=0) 
    rating= models.PositiveIntegerField(default=0) 

    def __str__(self):
        return self.name

class Lesson(models.Model):
    course = models.ForeignKey(Courses, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    description = models.TextField(max_length=1500)
    duration = models.DurationField()  # This allows you to store time in hours, minutes, and seconds
    lesson_number = models.PositiveIntegerField()
    thumbnail = models.ImageField(upload_to='lesson_thumbnails/', null=True, blank=True)
    video_url = models.URLField()  # For storing YouTube or other video URLs
    points = models.PositiveIntegerField(default=0)  # Points for individual lesson

    def __str__(self):
        return f"{self.course.name} - Lesson {self.lesson_number}: {self.title}"

class LessonProgress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    progress_percentage = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    last_watched_position = models.DurationField(default=0)  # To store where the user left off

    class Meta:
        unique_together = ['user', 'lesson']

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title} Progress"




