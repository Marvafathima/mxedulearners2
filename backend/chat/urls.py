from django.urls import path
from . import views
from .views import *

urlpatterns = [
      path('tutor/<int:tutor_id>/students/', TutorStudentsView.as_view(), name='tutor_students'),
    # path('<str:room_name>/', views.room, name='room'),

]