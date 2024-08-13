from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import CustomUser
from .serializers import TutorListSerializer,TutorToggleActiveSerializer
from rest_framework.permissions import IsAdminUser
class ApprovedTutorListView(APIView):
    def get(self, request):
        tutors = CustomUser.objects.filter(role='tutor', is_approved=True)
        serializer = TutorListSerializer(tutors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
class TutorToggleActiveView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            tutor = CustomUser.objects.get(pk=pk, role='tutor')
        except CustomUser.DoesNotExist:
            return Response({"error": "Tutor not found"}, status=status.HTTP_404_NOT_FOUND)

        tutor.is_active = not tutor.is_active
        tutor.save()

        serializer = TutorToggleActiveSerializer(tutor)
        return Response(serializer.data)