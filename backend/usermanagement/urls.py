# usermanagement/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('tutor-requests/', views.tutor_requests, name='tutor_requests'),
    path('approve-tutor/<int:user_id>/', views.approve_tutor, name='approve_tutor'),
    path('reject-tutor/<int:user_id>/', views.reject_tutor, name='reject_tutor'),
    path('tutor-detail/<int:user_id>/', views.tutor_detail, name='tutor_detail'),
]