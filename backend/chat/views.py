from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from razorpay_backend.models import OrdersItem
from api.models import CustomUser
from courses.models import Courses
from rest_framework import serializers
from .serializers import StudentSerializer,TutorSerializer

# def room(request, room_name):
#     return render(request, 'chat/room.html', {
#         'room_name': room_name
#     })
class TutorStudentsView(generics.RetrieveAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(role='student')

    def retrieve(self, request, *args, **kwargs):
        tutor_id = self.kwargs.get('tutor_id')
        tutor = get_object_or_404(CustomUser, id=tutor_id, role='tutor')
        
        # Get all courses belonging to the tutor
        tutor_courses = Courses.objects.filter(user=tutor)
        
        # Get all students who purchased these courses
        students = CustomUser.objects.filter(
            role='student',
            purchased_courses__course__in=tutor_courses
        ).distinct()

        serializer = self.get_serializer(students, many=True)
        
        return Response({
            'tutor_id': tutor.id,
            'tutor_name': tutor.username,
            'students': serializer.data
        }, status=status.HTTP_200_OK)
class StudentTutorsView(generics.RetrieveAPIView):
    serializer_class = TutorSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(role='tutor')

    def retrieve(self, request, *args, **kwargs):
        student_id = self.kwargs.get('student_id')
        student = get_object_or_404(CustomUser, id=student_id, role='student')
        
        # Get all courses purchased by the student
        purchased_courses = OrdersItem.objects.filter(user=student).values_list('course', flat=True)
        
        # Get all tutors who created these courses
        tutors = CustomUser.objects.filter(
            role='tutor',
            courses__in=purchased_courses
        ).distinct()

        serializer = self.get_serializer(tutors, many=True)
        print("\n\n\n\n\n&&&&&&&&&&&&&&&&&&&",serializer.data)
        return Response({
            'student_id': student.id,
            'student_name': student.username,
            'tutors': serializer.data
        }, status=status.HTTP_200_OK)