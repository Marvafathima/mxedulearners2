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
from django.db.models import Sum

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
        print(request.data)
        quiz = self.get_object()
        print(quiz.id)

        # Check if user already has an attempt for this quiz
        attempt = UserQuizAttempt.objects.filter(user=request.user, quiz=quiz).first()

        if attempt:
            # Check if user has reached the maximum number of attempts or has already passed
            if attempt.totalattempts >= 2:
                return Response({'error': 'You have reached the maximum number of attempts for this quiz.'}, 
                                status=status.HTTP_400_BAD_REQUEST)
            if attempt.passed:
                return Response({'error': 'You have already passed this quiz.'}, 
                                status=status.HTTP_400_BAD_REQUEST)
        

        
        else:
            # Create a new attempt if one doesn't exist
            attempt = UserQuizAttempt.objects.create(
                user=request.user,
                quiz=quiz,
                passed=False,
                score=0,
                totalattempts=0
            )

        # Increment the total attempts
        attempt.totalattempts += 1

        new_score = 0
        for quizzes, selected_answer in request.data.items():
            for question_id, answer_id in selected_answer.items():
                try:
                    question = Question.objects.get(id=int(question_id), quiz=quiz)
                    correct_answer = Answer.objects.get(question=question, is_correct=True)

                    if correct_answer.id == int(answer_id):
                        new_score += question.marks
                    else:
                        new_score -= question.negative_marks
                except Question.DoesNotExist:
                    return Response({'error': f'Invalid question ID: {question_id}'}, 
                                    status=status.HTTP_400_BAD_REQUEST)
                except Answer.DoesNotExist:
                    return Response({'error': f'No correct answer found for question ID: {question_id}'}, 
                                    status=status.HTTP_400_BAD_REQUEST)

        # Calculate total marks for the quiz
        total_marks = Question.objects.filter(quiz=quiz).aggregate(total_marks=Sum('marks'))['total_marks']
        new_percentage = (new_score / total_marks) * 100 if total_marks else 0

        # Update the attempt only if the new score is higher
        if new_score > attempt.score:
            attempt.score = new_score
            attempt.percentage = new_percentage
            attempt.passed = new_percentage >= 40

        # Save the attempt
        attempt.save()

        return Response({
            'score': attempt.score, 
            'percentage': attempt.percentage,
            'attempts': attempt.totalattempts,
            'passed': attempt.passed
        }, status=status.HTTP_200_OK)
    # @action(detail=True, methods=['post'])
    # def submit(self, request, pk=None):
    #     print(request.data)
    #     quiz = self.get_object()
    #     print(quiz.id)
    #     attempt = UserQuizAttempt.objects.create(
    #         user=request.user,
    #         quiz=quiz,
    #         passed=False,
    #         score=0
    #     )

       
    #     for quizzes,selecetedanswer in request.data.items():
    #         selectedanswer=selecetedanswer
    #     for question_id,answer_id in selecetedanswer.items():
    #         try:
    #         # Fetch question and correct answer
    #             print("*****************************************",quiz,type(quiz),question_id,type(question_id),answer_id,type(answer_id))
    #             question = Question.objects.get(id=int(question_id), quiz=quiz)
    #             print("*****************************************",question_id,type(question_id),answer_id,type(answer_id))
                
    #             correct_answer = Answer.objects.get(question=question, is_correct=True)
    #             print("*****************************************",question_id,type(question_id),answer_id,type(answer_id))
                
    #             print("\n\n\n\n\n\n\n\n",correct_answer)
    #             print("****",answer_id)
    #             # Check if the submitted answer is correct
    #             if correct_answer.id == int(answer_id):
    #                 attempt.score += question.marks
    #             else:
    #                 attempt.score -= question.negative_marks
    #         except Question.DoesNotExist:
    #             return Response({'error': f'Invalid question ID: {question_id}'}, status=status.HTTP_400_BAD_REQUEST)
    #         except Answer.DoesNotExist:
    #             return Response({'error': f'No correct answer found for question ID: {question_id}'}, status=status.HTTP_400_BAD_REQUEST)

    #     # Calculate total marks for the quiz
    #     total_marks = Question.objects.filter(quiz=quiz).aggregate(total_marks=Sum('marks'))['total_marks']
    #     attempt.percentage = (attempt.score / total_marks) * 100 if total_marks else 0

    #     # Determine if the user passed
    #     if attempt.percentage >= 40:
    #         attempt.passed = True

    #     # Save the final attempt
    #     attempt.save()

    #     return Response({'score': attempt.score, 'percentage': attempt.percentage}, status=status.HTTP_200_OK)
   

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
# class CourseQuizzesView(generics.ListAPIView):
#     serializer_class = QuizSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         course_id = self.kwargs['course_id']
#         return Quiz.objects.filter(course_id=course_id)
from django.db.models import Exists, OuterRef

class CourseQuizzesView(generics.ListAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        user = self.request.user

        # Subquery to check if a UserQuizAttempt exists for each quiz
        attempt_exists = UserQuizAttempt.objects.filter(
            user=user,
            quiz=OuterRef('pk')
        )

        # Get all quizzes for the course, annotated with attempt information
        quizzes = Quiz.objects.filter(course_id=course_id).annotate(
            has_attempt=Exists(attempt_exists),
            attempt_count=Exists(attempt_exists.filter(totalattempts__gte=2)),
            is_passed=Exists(attempt_exists.filter(passed=True))
        )
        print("\n\n\n\n777777777777777",quizzes)
        return quizzes

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        result = []

        for quiz in queryset:
            if not quiz.has_attempt:
                # Quiz hasn't been attempted yet
                result.append(self.get_serializer(quiz).data)
            elif quiz.is_passed:
                result.append({
                    'id': quiz.id,
                    'title': quiz.title,
                    'status': 'Quiz passed'
                })
            elif quiz.attempt_count:
                result.append({
                    'id': quiz.id,
                    'title': quiz.title,
                    'status': 'Quiz failed and attempt is over'
                })
            else:
                # Quiz has been attempted but not passed and attempts remain
                result.append(self.get_serializer(quiz).data)
                print("\n\n\n\n777777777777777",result)
        return Response(result)