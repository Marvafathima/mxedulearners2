from django.shortcuts import render
from datetime import timedelta

from courses.models import Courses
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Quiz,Answer,Question,UserQuizAttempt
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        
        # Fetch questions and answers
        questions = Question.objects.filter(quiz=instance).prefetch_related('answers')
        question_data = []
        for question in questions:
            q_serializer = QuestionSerializer(question)
            q_data = q_serializer.data
            q_data['answers'] = [{'id': answer.id, 'text': answer.text} for answer in question.answers.all()]
            question_data.append(q_data)
        
        data['questions'] = question_data
        print(data,"this is the quiz data we are sending ")
        return Response(data)
    def create(self, request, *args, **kwargs):
        data = request.data

        # Handle course
        course_id = data.get('courseId')
        course = get_object_or_404(Courses, id=course_id)

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
    @action(detail=True, methods=['post'])
    def start(self, request, pk=None):
        quiz = self.get_object()
        attempt = UserQuizAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            score=0
        )
        return Response(UserQuizAttemptSerializer(attempt).data)

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        quiz = self.get_object()
        attempt = UserQuizAttempt.objects.get(
            user=request.user,
            quiz=quiz,
            completed=False
        )
        answers = request.data.get('answers', {})
        
        # Calculate score
        score = 0
        for question in quiz.questions.all():
            if str(question.id) in answers:
                answer = Answer.objects.get(id=answers[str(question.id)])
                if answer.is_correct:
                    score += question.marks
                else:
                    score -= question.negative_marks
        
        # Update the attempt
        attempt.score = score
        attempt.completed = True
        attempt.save()

        return Response({'score': score}, status=status.HTTP_200_OK)
    # @action(detail=True, methods=['post'])
    # def start(self, request, pk=None):
    #     quiz = self.get_object()
    #     attempt = UserQuizAttempt.objects.create(
    #         user=request.user,
    #         quiz=quiz,
    #         score=0
    #     )
    #     return Response(UserQuizAttemptSerializer(attempt).data)

    # @action(detail=True, methods=['post'])
    # def submit(self, request, pk=None):
    #     quiz = self.get_object()
    #     answers = request.data.get('answers', {})
        
    #     # Calculate score
    #     score = 0
    #     for question in quiz.questions.all():
    #         if str(question.id) in answers:
    #             answer = Answer.objects.get(id=answers[str(question.id)])
    #             if answer.is_correct:
    #                 score += question.marks
    #             else:
    #                 score -= question.negative_marks

    #     # You might want to save this score to a UserQuizAttempt model
    #     return Response({'score': score}, status=status.HTTP_200_OK)

from rest_framework.viewsets import ModelViewSet


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=True, methods=['post'])
    def answer(self, request, pk=None):
        question = self.get_object()
        answer_id = request.data.get('answerId')
        
        try:
            answer = Answer.objects.get(id=answer_id, question=question)
            return Response({
                'questionId': question.id,
                'answerId': answer.id,
                'isCorrect': answer.is_correct
            })
        except Answer.DoesNotExist:
            return Response({'error': 'Invalid answer'}, status=status.HTTP_400_BAD_REQUEST)
class CourseQuizzesView(generics.ListAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Quiz.objects.filter(course_id=course_id)
