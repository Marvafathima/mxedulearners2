from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from api.models import CustomUser
from .serializers import StudentSerializer

class AllStudentsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        students = CustomUser.objects.filter(role='student')
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

class StudentToggleActiveView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            student = CustomUser.objects.get(pk=pk, role='student')
        except CustomUser.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        student.is_active = not student.is_active
        student.save()

        serializer = StudentSerializer(student)
        return Response(serializer.data)