from rest_framework import generics, status,viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializer import UserSerializer,OTPVerificationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
from .utils import generate_otp, send_otp_email
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
# class RegisterView(generics.CreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(serializer,"****************************")
        if serializer.is_valid():
            # Instead of saving the user, we'll store the data in cache
            otp = generate_otp()
            if 'registration_data' in request.session:
                del request.session['registration_data']
            request.session['registration_data'] = {
                'data': serializer.validated_data,
                'otp': otp
            }
            print("Session Data Stored:", request.session['registration_data'])
            request.session.save()
            # cache_key = f"registration_{serializer.validated_data['email']}"
            # cache.set(cache_key, {'data': serializer.validated_data, 'otp': otp}, timeout=300)  # 5 minutes expiry
            # cached_data = cache.get(cache_key)
            # print("Cached OTP:", cached_data.get('otp'))
            print(f"OTP for {serializer.validated_data['email']}: {otp}")  # For development
            send_otp_email(serializer.validated_data['email'], otp)
            print("All session data:", dict(request.session))
            return Response({"message": "Please verify your email with the OTP sent."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    def post(self, request):
        print("function called")
        serializer = OTPVerificationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            print('Received OTP data:***************',otp)
            print("All session data:", dict(request.session))
            print("Session Data Stored:", request.session['registration_data'])
            session_data = request.session.get('registration_data')
            print('Session Data Retrieved:', session_data)
            if not session_data or session_data['otp'] != otp:
                return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
            user_data = session_data['data']
           
            # cache_key = f"registration_{email}"
            # cached_data = cache.get(cache_key)
            # print(cached_data.get('otp'))
            # if not cached_data or cached_data['otp'] != otp:
            #     return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
            # user_data = cached_data['data']
            user_data.pop('confirm_password', None)
            user = CustomUser.objects.create_user(**user_data)
            user.is_verified = True
            print("user saved sucess")
            user.save()
            del request.session['registration_data'] 
            # Clear cache
            # cache.delete(cache_key)
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                "message": "Email verified successfully. User registered.",
                "user": {
                    "id": user.id,
                    "email": user.email,
                   
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = CustomUser.objects.filter(email=email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                 'user': UserSerializer(user).data
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

