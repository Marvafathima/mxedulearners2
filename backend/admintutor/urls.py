from django.urls import path
from .views import ApprovedTutorListView,TutorToggleActiveView

urlpatterns = [
    path('approved-tutors/',ApprovedTutorListView.as_view(), name='admin_approved_tutors'),
    path('tutors/<int:pk>/toggle-active/', TutorToggleActiveView.as_view(), name='tutor-toggle-active'),
   ]