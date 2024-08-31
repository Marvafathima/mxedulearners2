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
import logging
from django.db.models import Prefetch
from api.models import TutorApplication
logger = logging.getLogger(__name__)

# class CourseCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         logger.info(f"Received request from user: {request.user}")
#         logger.info(f"Request data: {request.data}")

#         course_data = request.data.copy()
        
#         # Extract lessons data
#         lessons_data = []
#         for key, value in request.data.items():
#             if key.startswith('lessons[') and key.endswith(']'):
#                 index = int(key.split('[')[1].split(']')[0])
#                 field = key.split(']')[1][1:]
#                 if len(lessons_data) <= index:
#                     lessons_data.append({})
#                 lessons_data[index][field] = value
        
#         # Remove lessons data from course_data
#         for key in list(course_data.keys()):
#             if key.startswith('lessons['):
#                 del course_data[key]

#         # Handle course thumbnail
#         if 'thumbnail_file' in request.FILES:
#             print("yes we got the course thumbnail")
#             course_data['thumbnail'] = request.FILES['thumbnail_file']
#         elif 'thumbnail' in course_data:
#             # If no file is uploaded, use the name that was sent
#             print("noooooo we didnt got the course thumbnail")
#             course_data['thumbnail'] = course_data['thumbnail']

    
#         # course_serializer = CourseSerializer(data=course_data)
#         # if course_serializer.is_valid():
#         #     print("course serializer is valid")
#         #     course = course_serializer.save(user=request.user)
#         #     for lesson_data in lessons_data:
#         #         lesson_data['course'] = course.id
                
#         #         lesson_file_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
#         #         if lesson_file_key in request.FILES:
#         #             lesson_data['thumbnail'] = request.FILES[lesson_file_key]
#         #         elif 'thumbnail' in lesson_data and lesson_data['thumbnail'].startswith('data:image'):
#         #             # Handle base64 encoded image
#         #             format, imgstr = lesson_data['thumbnail'].split(';base64,')
#         #             ext = format.split('/')[-1]
#         #             lesson_data['thumbnail'] = ContentFile(base64.b64decode(imgstr), name=f'lesson_thumbnail_{lessons_data.index(lesson_data)}.{ext}')
#         #         else:
#         #             lesson_data['thumbnail'] = None
                
#         #         lesson_serializer = LessonSerializer(data=lesson_data)
#         #         if lesson_serializer.is_valid():
#         #             lesson_serializer.save()
#         #         else:
#         #             logger.error(f"Lesson serializer errors: {lesson_serializer.errors}")
#         #             course.delete()
#         #             return Response(lesson_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
          
#         #     return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        
#         # logger.error(f"Course serializer errors: {course_serializer.errors}")
#         # return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class CourseCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         logger.info(f"Received request from user: {request.user}")
#         logger.info(f"Request data: {request.data}")

#         course_data = request.data.copy()
        
#         # Extract lessons data
#         lessons_data = []
#         for key, value in request.data.items():
#             if key.startswith('lessons[') and key.endswith(']'):
#                 index = int(key.split('[')[1].split(']')[0])
#                 field = key.split(']')[1][1:]
#                 if len(lessons_data) <= index:
#                     lessons_data.append({})
#                 lessons_data[index][field] = value
        
#         # Remove lessons data from course_data
#         for key in list(course_data.keys()):
#             if key.startswith('lessons['):
#                 del course_data[key]

#         # Handle course thumbnail
#         if 'thumbnail_file' in request.FILES:
#             print("yes we got the course thumbnail")
#             course_data['thumbnail'] = request.FILES['thumbnail_file']
#         elif 'thumbnail' in course_data:
#             # If no file is uploaded, use the name that was sent
#             print("noooooo we didnt got the course thumbnail")
#             course_data['thumbnail'] = course_data['thumbnail']

#         course_serializer = CourseSerializer(data=course_data)
#         if course_serializer.is_valid():
#             print("course serializer is valid")
#             course = course_serializer.save(user=request.user)
#             for lesson_data in lessons_data:
#                 lesson_data['course'] = course.id
                
#                 lesson_file_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
#                 if lesson_file_key in request.FILES:
#                     lesson_data['thumbnail'] = request.FILES[lesson_file_key]
#                 elif 'thumbnail' in lesson_data and lesson_data['thumbnail'].startswith('data:image'):
#                     # Handle base64 encoded image
#                     format, imgstr = lesson_data['thumbnail'].split(';base64,')
#                     ext = format.split('/')[-1]
#                     lesson_data['thumbnail'] = ContentFile(base64.b64decode(imgstr), name=f'lesson_thumbnail_{lessons_data.index(lesson_data)}.{ext}')
#                 else:
#                     lesson_data['thumbnail'] = None
                
#                 lesson_serializer = LessonSerializer(data=lesson_data)
#                 if lesson_serializer.is_valid():
#                     lesson_serializer.save()
#                 else:
#                     logger.error(f"Lesson serializer errors: {lesson_serializer.errors}")
#                     course.delete()
#                     return Response(lesson_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
          
#             return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        
#         logger.error(f"Course serializer errors: {course_serializer.errors}")
#         return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logger.info(f"Received request from user: {request.user}")
        logger.info(f"Request data: {request.data}")

        course_data = request.data.copy()
        
        # Extract lessons data
        lessons_data = []
        for key, value in request.data.items():
            if key.startswith('lessons[') and key.endswith(']'):
                index = int(key.split('[')[1].split(']')[0])
                field = key.split(']')[1][1:]
                if len(lessons_data) <= index:
                    lessons_data.append({})
                lessons_data[index][field] = value
        
        # Remove lessons data from course_data
        for key in list(course_data.keys()):
            if key.startswith('lessons['):
                del course_data[key]

        # Handle course thumbnail
        if 'thumbnail_file' in request.FILES:
            course_data['thumbnail'] = request.FILES['thumbnail_file']
        elif 'thumbnail' in course_data:
            course_data['thumbnail'] = course_data['thumbnail']

        course_serializer = CourseSerializer(data=course_data)
        if course_serializer.is_valid():
            course = course_serializer.save(user=request.user)
            for lesson_data in lessons_data:
                lesson_data['course'] = course.id
                
                # Handle lesson thumbnail
                lesson_thumbnail_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
                if lesson_thumbnail_key in request.FILES:
                    lesson_data['thumbnail'] = request.FILES[lesson_thumbnail_key]
                elif 'thumbnail' in lesson_data and lesson_data['thumbnail'].startswith('data:image'):
                    format, imgstr = lesson_data['thumbnail'].split(';base64,')
                    ext = format.split('/')[-1]
                    lesson_data['thumbnail'] = ContentFile(base64.b64decode(imgstr), name=f'lesson_thumbnail_{lessons_data.index(lesson_data)}.{ext}')
                else:
                    lesson_data['thumbnail'] = None
                
                # Handle lesson video
                lesson_video_key = f"lessons[{lessons_data.index(lesson_data)}][video_file]"
                if lesson_video_key in request.FILES:
                    lesson_data['video'] = request.FILES[lesson_video_key]
                else:
                    lesson_data['video'] = None
                
                lesson_serializer = LessonSerializer(data=lesson_data)
                if lesson_serializer.is_valid():
                    lesson_serializer.save()
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