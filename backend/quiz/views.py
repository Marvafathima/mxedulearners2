from django.shortcuts import render
from datetime import timedelta

from courses.models import Courses
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Quiz,Answer,Question
from .serializers import QuizSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import generics
from django.shortcuts import get_object_or_404



class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        # Handle course
        course_name = data.get('courseId')
        course = get_object_or_404(Courses, name=course_name)

        # Handle time limit
        hours = int(data.get('timeLimit[hours]', 0))
        minutes = int(data.get('timeLimit[minutes]', 0))
        seconds = int(data.get('timeLimit[seconds]', 0))
        time_limit_duration = timedelta(hours=hours, minutes=minutes, seconds=seconds)

        # Create quiz
        quiz = Quiz.objects.create(
            title=data.get('title'),
            description=data.get('description'),
            course=course,
            creator=self.request.user,
            time_limit=time_limit_duration
        )

        # Process questions
        question_count = 0
        while f'questions[{question_count}][question]' in data:
            question_data = {
                'text': data.get(f'questions[{question_count}][question]'),
                'marks': int(data.get(f'questions[{question_count}][marks]', 0)),
                'negative_marks': float(data.get(f'questions[{question_count}][negativeMarks]', 0)),
            }
            
            if question_data['text']:  # Only create question if text is not empty
                question = Question.objects.create(quiz=quiz, **question_data)

                # Process options
                option_count = 0
                options = []
                while f'questions[{question_count}][options][{option_count}]' in data:
                    option_text = data.get(f'questions[{question_count}][options][{option_count}]')
                    if option_text:  # Only add option if text is not empty
                        options.append(option_text)
                    option_count += 1

                correct_option = int(data.get(f'questions[{question_count}][correctOption]', 0))

                for i, option_text in enumerate(options):
                    Answer.objects.create(
                        question=question,
                        text=option_text,
                        is_correct=(i == correct_option)
                    )

            question_count += 1

        serializer = self.get_serializer(quiz)
        return Response(serializer.data, status=status.HTTP_201_CREATED)