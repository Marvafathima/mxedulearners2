# usermanagement/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from api.models import CustomUser, TutorApplication
from .serializers import TutorRequestSerializer, TutorDetailSerializer
from rest_framework.permissions import IsAuthenticated
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
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tutor_details(request, user_id):
    try:
        tutor_application = TutorApplication.objects.get(user_id=user_id)
        serializer = TutorDetailSerializer(tutor_application)
        return Response(serializer.data)
    except TutorApplication.DoesNotExist:
        return Response({"error": "Tutor details not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile_pic(request):
    user = request.user
    profile_pic = request.FILES.get('profile_pic')
    
    if profile_pic:
        user.profile_pic = profile_pic
        user.save()
        return Response({
            "message": "Profile picture updated successfully",
            "profile_pic": user.profile_pic.url if user.profile_pic else None
        })
    else:
        return Response({"error": "No profile picture provided"}, status=400)
