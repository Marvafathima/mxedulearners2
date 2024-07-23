# usermanagement/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from api.models import CustomUser, TutorApplication
from .serializers import TutorRequestSerializer, TutorDetailSerializer

@api_view(['GET'])
@permission_classes([IsAdminUser])
def tutor_requests(request):
    print(request.user)
    print(request.user.is_authenticated)
    print(request.user.is_staff)
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
        tutor_application = TutorApplication.objects.get(user=tutor)
        serializer = TutorDetailSerializer(tutor_application)
        return Response(serializer.data)
    except (CustomUser.DoesNotExist, TutorApplication.DoesNotExist):
        return Response({'error': 'Tutor or application not found'}, status=status.HTTP_404_NOT_FOUND)

