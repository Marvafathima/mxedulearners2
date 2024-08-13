from django.urls import path
from .views import ApprovedTutorListView

urlpatterns = [
    path('approved-tutors/',ApprovedTutorListView.as_view(), name='admin_approved_tutors'),
   ]