from rest_framework import generics, status,viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializer import UserSerializer,OTPVerificationSerializer,TutorApplicationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .utils import generate_otp, send_otp_email
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .models import TutorApplication

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
           
            otp = generate_otp()
            if 'registration_data' in request.session:
                del request.session['registration_data']
            request.session['registration_data'] = {
                'data': serializer.validated_data,
                'otp': otp
            }
            request.session.save()
          
            print(f"OTP for {serializer.validated_data['email']}: {otp}")  # For development
            send_otp_email(serializer.validated_data['email'], otp)
            return Response({"message": "Please verify your email with the OTP sent.",
                "email": serializer.validated_data['email'],
                "role": serializer.validated_data['role']}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    def post(self, request):
        serializer = OTPVerificationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            session_data = request.session.get('registration_data')
            if not session_data or session_data['otp'] != otp:
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
            user_data = session_data['data']
           
            user_data.pop('confirm_password', None)
            user = CustomUser.objects.create_user(**user_data)
            user.is_verified = True
            user.is_approved = user.role != 'tutor'
            print("user saved success")
            del request.session['registration_data'] 
            user.save()
            
            if user.role == 'tutor':
                print("user not approved")
               
                return Response({
                    "message": "Email verified successfully. Please complete your tutor application.",
                    "user": {
                    "id": user.id,
                    "email": user.email,
                     "role": user.role
                } 
                }, status=status.HTTP_201_CREATED)
            refresh = RefreshToken.for_user(user)
            del request.session['registration_data'] 
            return Response({
                "message": "Email verified successfully. User registered.",
                "user": {
                    "id": user.id,
                    "email": user.email,
                     "role": user.role
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = CustomUser.objects.filter(email=email).first()
        if user and user.check_password(password) and user.is_approved:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                 'user': UserSerializer(user).data
            })
        elif user and user.check_password(password) and user.is_approved==False:
            return Response({
                'detail':"Admin Approval pending"
            },status=status.HTTP_401_UNAUTHORIZED)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(request, email=email, password=password)

        if user and user.is_superuser:
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'isAdmin': user.is_superuser,
                'access': str(refresh.access_token),  # You may or may not need this based on your setup
            }, status=status.HTTP_200_OK)
        
        return Response({'detail': 'Invalid credentials or not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
class TutorApplicationView(APIView):
  
    def post(self, request):
        email = request.data.get('email')
        print("application clled")
        if not email:
            return Response({"detail": "Email is required to apply."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(email=email)
            print(user.email,"sucsse$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found. Please register first."}, status=status.HTTP_404_NOT_FOUND)
        
        if user.role != 'tutor':
            return Response({"detail": "Only tutors can submit this application."}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if a TutorApplication already exists for this user
        if TutorApplication.objects.filter(user=user).exists():
            return Response({"detail": "You have already submitted an application."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = TutorApplicationSerializer(data=request.data, context={'user': user})
     
        if serializer.is_valid():
            serializer.save()
            print("Tutor application submitted successfully. Waiting for admin approval.")
            return Response({
                "message": "Tutor application submitted successfully. Waiting for admin approval.",
                "user_id": user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    