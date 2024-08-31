from django.core.files.base import ContentFile
import base64
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Courses, Lesson
from .serializers import (CourseSerializer, LessonSerializer,
                          FetchCourseSerializer,LessonDetailSerializer,CourseDetailSerializer
)
from django.core.files.uploadedfile import InMemoryUploadedFile
import logging
from django.db.models import Prefetch
from api.models import TutorApplication
logger = logging.getLogger(__name__)



class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.info(f"Received request from user: {request.user}")
        logger.info(f"Request data: {request.data}")
        logger.info(f"Request FILES: {request.FILES}")

        # Manually construct course_data without deepcopy
        course_data = {
            'name': request.data.get('name'),
            'category': request.data.get('category'),
            'price': request.data.get('price'),
            'offer_percentage': request.data.get('offer_percentage'),
            'description': request.data.get('description'),
            'points': request.data.get('points'),
            'user': request.user.id
        }

        # Handle course thumbnail
        if 'thumbnail_file' in request.FILES:
            course_data['thumbnail'] = request.FILES['thumbnail_file']
        
        # Extract lessons data
        lessons_data = []
        for key, value in request.data.items():
            if key.startswith('lessons['):
                index = int(key.split('[')[1].split(']')[0])
                field = key.split(']')[1][1:]
                if len(lessons_data) <= index:
                    lessons_data.append({})
                lessons_data[index][field] = value

        # Handle lesson files
        for index, lesson in enumerate(lessons_data):
            video_key = f'lessons[{index}][video]'
            thumbnail_key = f'lessons[{index}][thumbnail]'
            if video_key in request.FILES:
                lesson['video'] = request.FILES[video_key]
            if thumbnail_key in request.FILES:
                lesson['thumbnail'] = request.FILES[thumbnail_key]

        logger.info(f"Course data before serialization: {course_data}")
        course_serializer = CourseSerializer(data=course_data)
        if course_serializer.is_valid():
            course = course_serializer.save()
            logger.info(f"Course saved. ID: {course.id}, Thumbnail: {course.thumbnail}")

            for lesson_data in lessons_data:
                lesson_data['course'] = course.id
                logger.info(f"Lesson data before serialization: {lesson_data}")
                lesson_serializer = LessonSerializer(data=lesson_data)
                if lesson_serializer.is_valid():
                    lesson = lesson_serializer.save()
                    logger.info(f"Lesson saved. ID: {lesson.id}, Thumbnail: {lesson.thumbnail}, Video: {lesson.video}")
                else:
                    logger.error(f"Lesson serializer errors: {lesson_serializer.errors}")
                    course.delete()
                    return Response(lesson_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        
        logger.error(f"Course serializer errors: {course_serializer.errors}")
        return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from razorpay_backend.models import OrdersItem,Orders
from django.db.models import Prefetch, Exists, OuterRef
class AllCoursesView(APIView):
    def get(self, request):
        user = request.user

        # Create a subquery to check if the course exists in user's OrdersItem
        purchased_courses = OrdersItem.objects.filter(
            order__user=user,
            course=OuterRef('pk')
        )

        # Fetch all courses, excluding the ones the user has purchased
        courses = Courses.objects.annotate(
            is_purchased=Exists(purchased_courses)
        ).filter(
            is_purchased=False
        ).select_related('user').prefetch_related(
            Prefetch('user__tutorapplication', queryset=TutorApplication.objects.all(), to_attr='tutor_info')
        )

        for course in courses:
            print(course.user.username)

        serializer = FetchCourseSerializer(courses, many=True)
       
        return Response(serializer.data)
from rest_framework import generics
class TutorCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Courses.objects.filter(user=self.request.user)
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Courses.objects.all()
    serializer_class = CourseDetailSerializer
    lookup_field = 'pk'