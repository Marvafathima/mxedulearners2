from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,status,generics,serializers
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from razorpay_backend.models import OrdersItem
from api.models import CustomUser
from courses.models import Courses
from .serializers import StudentSerializer,TutorSerializer,ChatMessageSerializer,UserSerializer
from django.http import JsonResponse
from .models import ChatMessage

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


class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    @action(detail=False, methods=['GET'])
    def chat_history(self, request):
        room_name = request.query_params.get('room_name')
        if room_name:
            messages = self.queryset.filter(room_name=room_name).order_by('timestamp')
            serializer = self.get_serializer(messages, many=True)
            return Response(serializer.data)
        return Response({"error": "Room name is required"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def send_message(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# def get_chat_history(request, room_name):
#     messages = ChatMessage.objects.filter(room_name=room_name).order_by('timestamp')
#     return JsonResponse([{
#         'sender_id': msg.sender.id,
#         'receiver_id': msg.receiver.id,
#         'message': msg.message,
#         'timestamp': msg.timestamp.isoformat()
#     } for msg in messages], safe=False)