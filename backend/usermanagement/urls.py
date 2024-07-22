from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  approve_tutor, reject_tutor, TutorListView

urlpatterns = [
    path('admin/tutors', TutorListView.as_view(), name='tutor-list'),
    path('admin/tutors/<int:tutor_id>/approve/', approve_tutor, name='approve-tutor'),
    path('admin/tutors/<int:tutor_id>/reject/', reject_tutor, name='reject-tutor'),
    
]