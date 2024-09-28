from django.urls import path
from . import views
from .views import *

urlpatterns = [
      path('tutor/<int:tutor_id>/students/', TutorStudentsView.as_view(), name='tutor_students'),
      path('student/<int:student_id>/tutors/', StudentTutorsView.as_view(), name='student_tutors'),
    # path('<str:room_name>/', views.room, name='room'),

]