from rest_framework import generics, status,viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import CustomUser,TutorApplication
from api.serializer import UserSerializer,OTPVerificationSerializer,TutorApplicationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes


class TutorListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer


    def get_queryset(self):
        try:
            return CustomUser.objects.filter(role='tutor', is_approved=False, is_rejected=False)
        except:   
            return CustomUser.objects.none()
@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_tutor(request, tutor_id):
    try:
        tutor = CustomUser.objects.get(id=tutor_id, role='tutor')
        tutor.is_approved = True
        tutor.is_rejected = False
        tutor.save()
        return Response({'status': 'Tutor approved'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Tutor not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def reject_tutor(request, tutor_id):
    try:
        tutor = CustomUser.objects.get(id=tutor_id, role='tutor')
        tutor.is_approved = False
        tutor.is_rejected = True
        tutor.save()
        return Response({'status': 'Tutor rejected'}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Tutor not found'}, status=status.HTTP_404_NOT_FOUND)

