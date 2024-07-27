# usermanagement/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from api.models import CustomUser, TutorApplication
from .serializers import TutorRequestSerializer, TutorDetailSerializer,CustomUserSerializer,UserUpdateSerializer, PasswordUpdateSerializer
from api.serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import update_session_auth_hash

@api_view(['GET'])
@permission_classes([IsAdminUser])
def tutor_requests(request):
   
    tutors = CustomUser.objects.filter(role='tutor', is_approved=False, is_rejected=False)
    serializer = TutorRequestSerializer(tutors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_tutor(request, user_id):
    try:
        tutor = CustomUser.objects.get(id=user_id, role='tutor')
        tutor.is_approved = True
        tutor.save()
        return Response({'message': 'Tutor approved successfully'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Tutor not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def reject_tutor(request, user_id):
    try:
        tutor = CustomUser.objects.get(id=user_id, role='tutor')
        tutor.is_rejected = True
        tutor.save()
        return Response({'message': 'Tutor rejected successfully'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Tutor not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def tutor_detail(request, user_id):
    try:
        tutor = CustomUser.objects.get(id=user_id, role='tutor')
        print(tutor.username)
        print("try is working..tutor detailis fetched")
        tutors=TutorApplication.objects.all()
        for t in tutors:
            print(t.id,"tutorsssss",t.user.username)
        tutor_application = TutorApplication.objects.get(user=tutor)
        print(tutor_application.job_experience,"this is the experience")
       
        serializer = TutorDetailSerializer(tutor_application)
        print(serializer.data)
        return Response(serializer.data)
    except (CustomUser.DoesNotExist, TutorApplication.DoesNotExist):
        return Response({'error': 'Tutor or application not found'}, status=status.HTTP_404_NOT_FOUND)
    

class TutorDetailsView(APIView):
    def get(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id, role='tutor')
            print(user.email)
            serializer =CustomUserSerializer(user)
            print("issue with serializer")
          
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Tutor not found'}, status=status.HTTP_404_NOT_FOUND)

# class UpdateProfilePicView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         user = request.user
#         if 'profile_pic' in request.FILES:
#             user.profile_pic = request.FILES['profile_pic']
#             user.save()
#             serializer =CustomUserSerializer(user)
#             return Response(serializer.data)
#         return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_picture(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.user != user:
        return Response({'error': 'You do not have permission to update this profile'}, status=status.HTTP_403_FORBIDDEN)

    if 'profile_pic' in request.FILES:
        user.profile_pic = request.FILES['profile_pic']
    elif request.data.get('profile_pic') is None:
        user.profile_pic = None
    else:
        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

    user.save()
    serializer = UserSerializer(user)
    print(serializer.data)
    return Response(serializer.data)

# class UserProfileUpdateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def patch(self, request, *args, **kwargs):
#         serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        print("patch called",request.user,request.data)
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            print("serialixer cvalid")
            serializer.save()
            return Response(serializer.data)
        print("serializer not valid at alllll")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPasswordUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = PasswordUpdateSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.validated_data['old_password']):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                update_session_auth_hash(request, user)  # To update session after password change
                return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
            return Response({"error": "Incorrect old password"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

