# from django.urls import path,include
# from .views import CourseViewSet
# from rest_framework.routers import DefaultRouter
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
# router = DefaultRouter()
# router.register(r'courses', CourseViewSet)
# urlpatterns = [
#     path('',include(router.urls)),
#     path('register', RegisterView.as_view(), name='register'),
#     path('admin/login', AdminLoginView.as_view(), name='admin_login'),
# ]
from django.urls import path
from .views import CourseCreateView,AllCoursesView

urlpatterns = [
    path('courses/',CourseCreateView.as_view(), name='create_course'),
    path('courses_fetchall/', AllCoursesView.as_view(), name='all_courses'),
]