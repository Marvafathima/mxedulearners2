
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from .models import Courses, Lesson
# from .serializers import CourseSerializer, LessonSerializer
# import logging

# logger = logging.getLogger(__name__)

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
#             # If no file is uploaded, use the name that was sent
#             course_data['thumbnail'] = course_data['thumbnail']

#         course_serializer = CourseSerializer(data=course_data)
#         if course_serializer.is_valid():
#             course = course_serializer.save(user=request.user)
            
#             for lesson_data in lessons_data:
#                 lesson_data['course'] = course.id
#                  # Handle lesson thumbnail
#                 lesson_index = lessons_data.index(lesson_data)
#                 lesson_file_key = f"lessons[{lesson_index}][thumbnail_file]"
#                 # if lesson_file_key in request.FILES:
#                 #     lesson_data['thumbnail'] = request.FILES[lesson_file_key]
#                 # elif 'thumbnail' in lesson_data:
#                 #     # If no file is uploaded, remove the thumbnail field
#                 #     # to avoid the "not a file" error
#                 #     del lesson_data['thumbnail']
    
                
#                 # Handle lesson thumbnail
#                 if 'thumbnail_file' in request.FILES:
#                     lesson_file_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
#                     if lesson_file_key in request.FILES:
#                         lesson_data['thumbnail'] = request.FILES[lesson_file_key]
#                 elif 'thumbnail' in lesson_data:
#                     # If no file is uploaded, use the name that was sent
#                     lesson_data['thumbnail'] = lesson_data['thumbnail']
                
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
    


from django.core.files.base import ContentFile
import base64
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Courses, Lesson
from .serializers import CourseSerializer, LessonSerializer
import logging

logger = logging.getLogger(__name__)

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
            print("yes we got the course thumbnail")
            course_data['thumbnail'] = request.FILES['thumbnail_file']
        elif 'thumbnail' in course_data:
            # If no file is uploaded, use the name that was sent
            print("noooooo we didnt got the course thumbnail")
            course_data['thumbnail'] = course_data['thumbnail']

        course_serializer = CourseSerializer(data=course_data)
        if course_serializer.is_valid():
            print("course serializer is valid")
            course = course_serializer.save(user=request.user)
            for lesson_data in lessons_data:
                lesson_data['course'] = course.id
                
                lesson_file_key = f"lessons[{lessons_data.index(lesson_data)}][thumbnail_file]"
                if lesson_file_key in request.FILES:
                    lesson_data['thumbnail'] = request.FILES[lesson_file_key]
                elif 'thumbnail' in lesson_data and lesson_data['thumbnail'].startswith('data:image'):
                    # Handle base64 encoded image
                    format, imgstr = lesson_data['thumbnail'].split(';base64,')
                    ext = format.split('/')[-1]
                    lesson_data['thumbnail'] = ContentFile(base64.b64decode(imgstr), name=f'lesson_thumbnail_{lessons_data.index(lesson_data)}.{ext}')
                else:
                    lesson_data['thumbnail'] = None
                
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
    
class AllCoursesView(APIView):
    def get(self, request):
        courses = Courses.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)