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
#         print("\n\n\n\n\n",lessons_data,"\n\n\n\n\n")
#         # Remove lessons data from course_data
#         for key in list(course_data.keys()):
#             if key.startswith('lessons['):
#                 del course_data[key]

#         # Handle course thumbnail
#         if 'thumbnail_file' in request.FILES:
#             course_data['thumbnail'] = request.FILES['thumbnail_file']
#         elif 'thumbnail' in course_data:
#             course_data['thumbnail'] = course_data['thumbnail']

#         course_serializer = CourseSerializer(data=course_data)
#         if course_serializer.is_valid():
#             course = course_serializer.save(user=request.user)
#             for lesson_data in lessons_data:
#                 lesson_data['course'] = course.id
               
#                 lesson_thumbnail_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
#                 print(lesson_thumbnail_key,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
#                 if lesson_thumbnail_key in request.FILES:
#                     lesson_data['thumbnail'] = request.FILES[lesson_thumbnail_key]
#                     print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", lesson_data['thumbnail'])
#                 elif 'thumbnail' in lesson_data and lesson_data['thumbnail'].startswith('data:image'):
#                     format, imgstr = lesson_data['thumbnail'].split(';base64,')
#                     ext = format.split('/')[-1]
#                     lesson_data['thumbnail'] = ContentFile(base64.b64decode(imgstr), name=f'lesson_thumbnail_{lessons_data.index(lesson_data)}.{ext}')
#                 else:
#                     lesson_data['thumbnail'] = None
                
#                 # Handle lesson video
                
#                 lesson_video_key = f"lessons[{lessons_data.index(lesson_data)}][video_file]"
#                 print(lesson_video_key,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
#                 if lesson_video_key in request.FILES:
#                     lesson_data['video'] = request.FILES[lesson_video_key]
#                 else:
#                     lesson_data['video'] = None
                
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
#             course_data['thumbnail'] = request.FILES['thumbnail_file']
#         elif 'thumbnail' in course_data:
#             course_data['thumbnail'] = course_data['thumbnail']

#         course_serializer = CourseSerializer(data=course_data)
#         if course_serializer.is_valid():
#             course = course_serializer.save(user=request.user)
#             for lesson_data in lessons_data:
#                 lesson_data['course'] = course.id
               
#                 # Handle lesson thumbnail
#                 lesson_thumbnail_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
#                 if lesson_thumbnail_key in request.FILES:
#                     lesson_data['thumbnail'] = request.FILES[lesson_thumbnail_key]
#                 elif 'thumbnail' in lesson_data and lesson_data['thumbnail'].startswith('data:image'):
#                     format, imgstr = lesson_data['thumbnail'].split(';base64,')
#                     ext = format.split('/')[-1]
#                     lesson_data['thumbnail'] = ContentFile(base64.b64decode(imgstr), name=f'lesson_thumbnail_{lessons_data.index(lesson_data)}.{ext}')
#                 else:
#                     lesson_data['thumbnail'] = None
                
#                 # Handle lesson video
#                 lesson_video_key = f"lessons[{lessons_data.index(lesson_data)}][video_file]"
#                 if lesson_video_key in request.FILES:
#                     lesson_data['video'] = request.FILES[lesson_video_key]
#                 elif 'video' in lesson_data and isinstance(lesson_data['video'], str):
#                     # If video is a string (filename), we need to handle it differently
#                     # For now, we'll set it to None, but you might want to implement a way to handle this
#                     lesson_data['video'] = None
#                 else:
#                     lesson_data['video'] = None
                
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
# class CourseCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         logger.info(f"Received request from user: {request.user}")
#         logger.info(f"Request data: {request.data}")
#         logger.info(f"Request FILES: {request.FILES}")  # Debug: Print all files in the request

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
        
#         logger.info(f"Extracted lessons data: {lessons_data}")  # Debug: Print extracted lessons data

#         # Remove lessons data from course_data
#         for key in list(course_data.keys()):
#             if key.startswith('lessons['):
#                 del course_data[key]

#         # Handle course thumbnail
#         if 'thumbnail_file' in request.FILES:
#             course_data['thumbnail'] = request.FILES['thumbnail_file']
#         elif 'thumbnail' in course_data:
#             course_data['thumbnail'] = course_data['thumbnail']

#         course_serializer = CourseSerializer(data=course_data)
#         if course_serializer.is_valid():
#             course = course_serializer.save(user=request.user)
#             for lesson_data in lessons_data:
#                 lesson_data['course'] = course.id
               
#                 # Handle lesson thumbnail
#                 lesson_thumbnail_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
#                 logger.info(f"Looking for lesson thumbnail with key: {lesson_thumbnail_key}")  # Debug
#                 if lesson_thumbnail_key in request.FILES:
#                     lesson_data['thumbnail'] = request.FILES[lesson_thumbnail_key]
#                     logger.info(f"Found thumbnail file for lesson: {lesson_data['thumbnail']}")  # Debug
#                 elif 'thumbnail' in lesson_data and lesson_data['thumbnail'].startswith('data:image'):
#                     format, imgstr = lesson_data['thumbnail'].split(';base64,')
#                     ext = format.split('/')[-1]
#                     lesson_data['thumbnail'] = ContentFile(base64.b64decode(imgstr), name=f'lesson_thumbnail_{lessons_data.index(lesson_data)}.{ext}')
#                     logger.info(f"Created thumbnail from base64 for lesson: {lesson_data['thumbnail']}")  # Debug
#                 else:
#                     lesson_data['thumbnail'] = None
#                     logger.warning(f"No thumbnail found for lesson at index {lessons_data.index(lesson_data)}")  # Debug
                
#                 # Handle lesson video
#                 lesson_video_key = f"lessons[{lessons_data.index(lesson_data)}][video_file]"
#                 logger.info(f"Looking for lesson video with key: {lesson_video_key}")  # Debug
#                 if lesson_video_key in request.FILES:
#                     lesson_data['video'] = request.FILES[lesson_video_key]
#                     logger.info(f"Found video file for lesson: {lesson_data['video']}")  # Debug
#                 elif 'video' in lesson_data and isinstance(lesson_data['video'], str):
#                     logger.warning(f"Video for lesson at index {lessons_data.index(lesson_data)} is a string: {lesson_data['video']}")  # Debug
#                     lesson_data['video'] = None
#                 else:
#                     lesson_data['video'] = None
#                     logger.warning(f"No video found for lesson at index {lessons_data.index(lesson_data)}")  # Debug
                
#                 logger.info(f"Lesson data before serialization: {lesson_data}")  # Debug
#                 lesson_serializer = LessonSerializer(data=lesson_data)
#                 if lesson_serializer.is_valid():
#                     lesson = lesson_serializer.save()
#                     logger.info(f"Lesson saved. ID: {lesson.id}, Thumbnail: {lesson.thumbnail}, Video: {lesson.video}")  # Debug
#                 else:
#                     logger.error(f"Lesson serializer errors: {lesson_serializer.errors}")
#                     course.delete()
#                     return Response(lesson_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
#             return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        
#         logger.error(f"Course serializer errors: {course_serializer.errors}")
#         return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class CourseCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         logger.info(f"Received request from user: {request.user}")
#         logger.info(f"Request data: {request.data}")
#         logger.info(f"Request FILES: {request.FILES}")

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
        
#         logger.info(f"Extracted lessons data: {lessons_data}")

#         # Remove lessons data from course_data
#         for key in list(course_data.keys()):
#             if key.startswith('lessons['):
#                 del course_data[key]

#         # Handle course thumbnail
#         if 'thumbnail_file' in request.FILES:
#             course_data['thumbnail'] = request.FILES['thumbnail_file']
#         elif 'thumbnail' in course_data:
#             course_data['thumbnail'] = course_data['thumbnail']

#         logger.info(f"Course data before serialization: {course_data}")
#         course_serializer = CourseSerializer(data=course_data)
#         if course_serializer.is_valid():
#             course = course_serializer.save(user=request.user)
#             logger.info(f"Course saved. ID: {course.id}, Thumbnail: {course.thumbnail}")

#             for lesson_data in lessons_data:
#                 lesson_data['course'] = course.id
               
#                 # Handle lesson thumbnail
#                 lesson_thumbnail_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
#                 logger.info(f"Looking for lesson thumbnail with key: {lesson_thumbnail_key}")
#                 if lesson_thumbnail_key in request.FILES:
#                     lesson_data['thumbnail'] = request.FILES[lesson_thumbnail_key]
#                     logger.info(f"Found thumbnail file for lesson: {lesson_data['thumbnail']}")
#                 elif 'thumbnail' in lesson_data and isinstance(lesson_data['thumbnail'], str):
#                     logger.info(f"Thumbnail is a string: {lesson_data['thumbnail']}")
#                     # Here you might need to handle the S3 URL or key
#                     # For now, we'll leave it as is and let the serializer handle it
#                 else:
#                     lesson_data['thumbnail'] = None
#                     logger.warning(f"No thumbnail found for lesson at index {lessons_data.index(lesson_data)}")
                
#                 # Handle lesson video
#                 lesson_video_key = f"lessons[{lessons_data.index(lesson_data)}][video_file]"
#                 logger.info(f"Looking for lesson video with key: {lesson_video_key}")
#                 if lesson_video_key in request.FILES:
#                     lesson_data['video'] = request.FILES[lesson_video_key]
#                     logger.info(f"Found video file for lesson: {lesson_data['video']}")
#                 elif 'video' in lesson_data and isinstance(lesson_data['video'], str):
#                     logger.info(f"Video is a string: {lesson_data['video']}")
#                     # Here you might need to handle the S3 URL or key
#                     # For now, we'll leave it as is and let the serializer handle it
#                 else:
#                     lesson_data['video'] = None
#                     logger.warning(f"No video found for lesson at index {lessons_data.index(lesson_data)}")
                
#                 logger.info(f"Lesson data before serialization: {lesson_data}")
#                 lesson_serializer = LessonSerializer(data=lesson_data)
#                 if lesson_serializer.is_valid():
#                     lesson = lesson_serializer.save()
#                     logger.info(f"Lesson saved. ID: {lesson.id}, Thumbnail: {lesson.thumbnail}, Video: {lesson.video}")
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