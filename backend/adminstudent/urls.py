# urls.py
from django.urls import path
from .views import AllStudentsView, StudentToggleActiveView

urlpatterns = [
    # ... other urls
    path('all_students/', AllStudentsView.as_view(), name='all_students'),
    path('student/<int:pk>/toggle-active/', StudentToggleActiveView.as_view(), name='student_toggle_active'),
]