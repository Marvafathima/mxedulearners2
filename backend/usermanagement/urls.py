# usermanagement/urls.py
from django.urls import path
from . import views
from .views import TutorDetailsView,UserProfileUpdateView, UserPasswordUpdateView,StudentProfileView

urlpatterns = [
    path('tutor-requests/', views.tutor_requests, name='tutor_requests'),
    path('approve-tutor/<int:user_id>/', views.approve_tutor, name='approve_tutor'),
    path('reject-tutor/<int:user_id>/', views.reject_tutor, name='reject_tutor'),
    path('tutor-detail/<int:user_id>/', views.tutor_detail, name='tutor_detail'),
    path('tutor-details/<int:user_id>/', TutorDetailsView.as_view(), name='tutor-details'),
    path('student_details/<int:user_id>/', StudentProfileView.as_view(), name='student-details'),
    path('update-profile-picture/<int:user_id>/', views.update_profile_picture, name='update_profile_picture'),
    path('update-profile/<int:pk>/', UserProfileUpdateView.as_view(), name='update-profile'),
    path('update-password/<int:pk>/', UserPasswordUpdateView.as_view(), name='update-password'),
]