from django.urls import path,include
from .views import RegisterView, LoginView,UserViewSet,VerifyOTPView,AdminLoginView,TutorApplicationView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router = DefaultRouter()
router.register(r'users', UserViewSet)
urlpatterns = [
    path('',include(router.urls)),
    path('register', RegisterView.as_view(), name='register'),
    path('admin/login', AdminLoginView.as_view(), name='admin_login'),
    path('verify-otp',VerifyOTPView.as_view(),name="verify-otp"),
    path('login', LoginView.as_view(), name='login'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('tutor_application', TutorApplicationView.as_view(), name='tutor_application'),

]