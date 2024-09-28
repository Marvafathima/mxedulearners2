from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from razorpay_backend.models import OrdersItem
from api.models import CustomUser
from courses.models import Courses
from rest_framework import serializers
from .serializers import StudentSerializer

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