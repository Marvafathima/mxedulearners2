
from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path,include
router = DefaultRouter()
router.register(r'quizzes', QuizViewSet)
router.register(r'questions',QuestionViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('courses/<int:course_id>/quizzes/', CourseQuizzesView.as_view(), name='course-quizzes'),
]


