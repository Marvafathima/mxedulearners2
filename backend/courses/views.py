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
# class PurchasedCoursesView(APIView):
#     def get(self, request):
#         user = request.user

#         # Create a subquery to check if the course exists in user's OrdersItem
#         purchased_courses = OrdersItem.objects.filter(
#             order__user=user,
#             course=OuterRef('pk')
#         )

#         # Fetch all courses that the user has purchased
#         courses = Courses.objects.annotate(
#             is_purchased=Exists(purchased_courses)
#         ).filter(
#             is_purchased=True
#         ).select_related('user').prefetch_related(
#             Prefetch('user__tutorapplication', queryset=TutorApplication.objects.all(), to_attr='tutor_info')
#         )

#         # You can keep this for debugging, but remember to remove it in production
#         for course in courses:
#             print(f"Purchased course: {course.name} by {course.user.username}")

#         serializer = FetchCourseSerializer(courses, many=True)
       
#         return Response(serializer.data, status=status.HTTP_200_OK)
from .serializers import PurchasedCoursesSerializer

class PurchasedCoursesView(APIView):
    def get(self, request):
        user = request.user
        purchased_items = OrdersItem.objects.filter(user=user).select_related('course')
        serializer = PurchasedCoursesSerializer(purchased_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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


from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UserProgress
from .serializers import UserProgressSerializer

# class UserProgressViewSet(viewsets.ModelViewSet):
#     queryset = UserProgress.objects.all()
#     serializer_class = UserProgressSerializer

#     def get_queryset(self):
#         return UserProgress.objects.filter(user=self.request.user)

#     @action(detail=False, methods=['GET'])
#     def course_progress(self, request):
#         course_id = request.query_params.get('course_id')
#         progress = UserProgress.objects.filter(user=request.user, course_id=course_id)
#         serializer = self.get_serializer(progress, many=True)
#         return Response(serializer.data)

#     @action(detail=False, methods=['POST'])
#     def update_progress(self, request):
#         course_id = request.data.get('course_id')
#         lesson_id = request.data.get('lesson_id')
#         last_watched_position = request.data.get('last_watched_position')
#         is_completed = request.data.get('is_completed', False)
#         progress_percentage = request.data.get('progress_percentage', 0.0)

#         progress, created = UserProgress.objects.get_or_create(
#             user=request.user,
#             course_id=course_id,
#             lesson_id=lesson_id,
#             defaults={
#                 'last_watched_position': last_watched_position,
#                 'is_completed': is_completed,
#                 'progress_percentage': progress_percentage
#             }
#         )

#         if not created:
#             progress.last_watched_position = last_watched_position
#             progress.is_completed = is_completed
#             progress.progress_percentage = progress_percentage
#             progress.save()

#         serializer = self.get_serializer(progress)
#         return Response(serializer.data)

from datetime import timedelta
class UserProgressView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProgressSerializer

    def get_object(self):
        course_id = self.kwargs['course_id']
        user = self.request.user
        return UserProgress.objects.filter(user=user, course_id=course_id)
    # def update(self, request, *args, **kwargs):
    #     course_id = kwargs['course_id']
    #     lesson_id = request.data.get('lesson_id')
    #     progress = request.data.get('progress')

    #     logger.info(f"Update request received for course_id: {course_id}, lesson_id: {lesson_id}")
    #     logger.info(f"Progress data received: {progress}")

    #     user_progress, created = UserProgress.objects.get_or_create(
    #         user=request.user,
    #         course_id=course_id,
    #         lesson_id=lesson_id
    #     )

    #     logger.info(f"UserProgress instance - Created: {created}, Data: {user_progress}")

    #     # Convert the numeric value to a timedelta object
    #     last_watched_seconds = float(progress['last_watched_position'])
    #     user_progress.last_watched_position = timedelta(seconds=last_watched_seconds)

    #     logger.info(f"Last watched position (in seconds): {last_watched_seconds}")

    #     # Calculate the progress percentage based on total duration
    #     total_duration_seconds = user_progress.lesson.duration.total_seconds()
    #     user_progress.progress_percentage = (last_watched_seconds / total_duration_seconds) * 100

    #     logger.info(f"Total duration (in seconds): {total_duration_seconds}")
    #     logger.info(f"Calculated progress percentage: {user_progress.progress_percentage}%")

    #     user_progress.is_completed = progress['is_completed']
    #     user_progress.save()

    #     logger.info(f"UserProgress saved successfully: {user_progress}")

    #     return Response(self.get_serializer(user_progress).data)
    def update(self, request, *args, **kwargs):
        course_id = kwargs['course_id']
        lesson_id = request.data.get('lesson_id')
        progress = request.data.get('progress')
        print("/n/n/nprogress data we recieve\n\n",progress)
        user_progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            course_id=course_id,
            lesson_id=lesson_id
        )
        if not user_progress.is_completed:
            last_watched_seconds = float(progress['last_watched_position'])
            user_progress.last_watched_position = timedelta(seconds=last_watched_seconds)
            total_duration_seconds = user_progress.lesson.duration.total_seconds()
            # user_progress.progress_percentage = 0
            print("printing the toatla watched and duration",user_progress.last_watched_position,user_progress.lesson.duration)
            user_progress.progress_percentage = (float(last_watched_seconds) / float(total_duration_seconds)) * 100
            if user_progress.last_watched_position>=user_progress.lesson.duration:
                user_progress.is_completed=True
            else:
                user_progress.is_completed = progress['is_completed']
            print(user_progress.progress_percentage,user_progress.is_completed,"this is the progress percentage ")
            user_progress.save()
        else:
            print(user_progress.is_completed,"yes the course is completed")
        return Response(self.get_serializer(user_progress).data)
    

