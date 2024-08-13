from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import CustomUser
from .serializers import TutorListSerializer

class ApprovedTutorListView(APIView):
    def get(self, request):
        tutors = CustomUser.objects.filter(role='tutor', is_approved=True, is_active=True)
        serializer = TutorListSerializer(tutors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
