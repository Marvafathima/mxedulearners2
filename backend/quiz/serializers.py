# from rest_framework import serializers
# from .models import Quiz, Question, Answer
# from courses.models import Courses
# import logging

# logger = logging.getLogger(__name__)

# # from django.utils.duration import duration_string

# class AnswerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Answer
#         fields = ['id', 'text', 'is_correct']

# class QuestionSerializer(serializers.ModelSerializer):
#     answers = AnswerSerializer(many=True)

#     class Meta:
#         model = Question
#         fields = ['id', 'text', 'marks', 'negative_marks', 'order', 'answers']

# from django.utils.duration import duration_string
# from datetime import timedelta

# class QuizSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Quiz
#         fields = ['id', 'title', 'course', 'description', 'time_limit', 'questions']
#     def to_internal_value(self, data):
#         # Handle nested QueryDict
#         logger.debug(f"Incoming data: {data}")
#         print("\n\n\n\n\n\n",data['title'],"**********************")
#         data = data.dict() if hasattr(data, 'dict') else data

#         # Handle timeLimit
#         if 'timeLimit[hours]' in data and 'timeLimit[minutes]' in data and 'timeLimit[seconds]' in data:
#             hours = int(data.pop('timeLimit[hours]')[0])
#             minutes = int(data.pop('timeLimit[minutes]')[0])
#             seconds = int(data.pop('timeLimit[seconds]')[0])
#             time_delta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
#             data['time_limit'] = duration_string(time_delta)
   
#         if 'courseId' in data:
#             data['course'] = data.pop('courseId')[0]

#         # Handle questions
#         questions = []
#         for key, value in list(data.items()):
#             if key.startswith('questions['):
#                 parts = key.split('[')
#                 index = int(parts[1].split(']')[0])
#                 if len(questions) <= index:
#                     questions.append({})
#                 if len(parts) > 2:
#                     subkey = parts[2].split(']')[0]
#                     if subkey == 'options':
#                         option_index = int(parts[3].split(']')[0])
#                         if 'options' not in questions[index]:
#                             questions[index]['options'] = []
#                         questions[index]['options'].append(value[0] if isinstance(value, list) else value)
#                     else:
#                         questions[index][subkey] = value[0] if isinstance(value, list) else value
#                 data.pop(key)
#         data['questions'] = questions

#         return super().to_internal_value(data)

      
#     def create(self, validated_data):
#         questions_data = validated_data.pop('questions')
#         quiz = Quiz.objects.create(**validated_data)
#         for question_data in questions_data:
#             options = question_data.pop('options')
#             correct_option = int(question_data.pop('correctOption'))
#             question = Question.objects.create(quiz=quiz, **question_data)
#             for index, option_text in enumerate(options):
#                 Answer.objects.create(
#                     question=question,
#                     text=option_text,
#                     is_correct=(index == correct_option)
#                 )
#         return quiz
# from rest_framework import serializers
# from .models import Quiz, Question, Answer
# from courses.models import Courses
# from django.utils.duration import duration_string
# from datetime import timedelta

# class QuizSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Quiz
#         fields = ['id', 'title', 'course', 'description', 'time_limit', 'questions']

#     def to_internal_value(self, data):
#         data = data.dict() if hasattr(data, 'dict') else data

#         # Handle timeLimit
#         if 'timeLimit[hours]' in data and 'timeLimit[minutes]' in data and 'timeLimit[seconds]' in data:
#             hours = int(data.pop('timeLimit[hours]')[0] if isinstance(data['timeLimit[hours]'], list) else data['timeLimit[hours]'])
#             minutes = int(data.pop('timeLimit[minutes]')[0] if isinstance(data['timeLimit[minutes]'], list) else data['timeLimit[minutes]'])
#             seconds = int(data.pop('timeLimit[seconds]')[0] if isinstance(data['timeLimit[seconds]'], list) else data['timeLimit[seconds]'])
#             time_delta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
#             data['time_limit'] = duration_string(time_delta)

#         # Handle courseId
#         if 'courseId' in data:
#             course_id = data.pop('courseId')[0] if isinstance(data['courseId'], list) else data.pop('courseId')
#             try:
#                 course = Courses.objects.get(name=course_id)
#                 data['course'] = course.id
#             except Courses.DoesNotExist:
#                 raise serializers.ValidationError({"course": "Invalid course ID"})

#         # Handle questions
#         questions = []
#         for key, value in list(data.items()):
#             if key.startswith('questions['):
#                 parts = key.split('[')
#                 index = int(parts[1].split(']')[0])
#                 if len(questions) <= index:
#                     questions.append({})
#                 if len(parts) > 2:
#                     subkey = parts[2].split(']')[0]
#                     if subkey == 'options':
#                         option_index = int(parts[3].split(']')[0])
#                         if 'options' not in questions[index]:
#                             questions[index]['options'] = []
#                         questions[index]['options'].append(value[0] if isinstance(value, list) else value)
#                     else:
#                         questions[index][subkey] = value[0] if isinstance(value, list) else value
#                 data.pop(key)
        
#         # Remove empty questions
#         questions = [q for q in questions if q.get('question') and q.get('options')]
#         data['questions'] = questions

#         return super().to_internal_value(data)

#     def create(self, validated_data):
#         questions_data = validated_data.pop('questions')
#         quiz = Quiz.objects.create(**validated_data)
#         for question_data in questions_data:
#             options = question_data.pop('options')
#             correct_option = int(question_data.pop('correctOption'))
#             question = Question.objects.create(quiz=quiz, text=question_data['question'], marks=question_data['marks'], negative_marks=question_data['negativeMarks'])
#             for index, option_text in enumerate(options):
#                 Answer.objects.create(
#                     question=question,
#                     text=option_text,
#                     is_correct=(index == correct_option)
#                 )
#         return quiz


from rest_framework import serializers
from .models import Quiz, Question, Answer
from courses.models import Courses
from django.utils.duration import duration_string
from datetime import timedelta

# class AnswerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Answer
#         fields = ['text', 'is_correct']

# class QuestionSerializer(serializers.ModelSerializer):
#     options = AnswerSerializer(many=True, source='answers')
    
#     class Meta:
#         model = Question
#         fields = ['text', 'marks', 'negative_marks', 'options']

# class QuizSerializer(serializers.ModelSerializer):
#     questions = QuestionSerializer(many=True)
#     time_limit = serializers.DurationField()
#     creator = serializers.ReadOnlyField(source='creator.id')
#     class Meta:
#         model = Quiz
#         fields = ['id', 'title', 'course', 'description', 'time_limit', 'questions','creator']

#     def to_internal_value(self, data):
#         data = data.dict() if hasattr(data, 'dict') else data
#         print(data,"data in serializer")
#         # Handle timeLimit
#         if 'timeLimit[hours]' in data and 'timeLimit[minutes]' in data and 'timeLimit[seconds]' in data:
#             hours = int(data.pop('timeLimit[hours]')[0] if isinstance(data['timeLimit[hours]'], list) else data['timeLimit[hours]'])
#             minutes = int(data.pop('timeLimit[minutes]')[0] if isinstance(data['timeLimit[minutes]'], list) else data['timeLimit[minutes]'])
#             seconds = int(data.pop('timeLimit[seconds]')[0] if isinstance(data['timeLimit[seconds]'], list) else data['timeLimit[seconds]'])
#             time_delta = timedelta(hours=hours, minutes=minutes, seconds=seconds)
#             data['time_limit'] = duration_string(time_delta)

#         # Handle courseId
#         if 'courseId' in data:
#             course_id = data.pop('courseId')[0] if isinstance(data['courseId'], list) else data.pop('courseId')
#             try:
#                 course = Courses.objects.get(name=course_id)
#                 data['course'] = course.id
#             except Courses.DoesNotExist:
#                 raise serializers.ValidationError({"course": "Invalid course ID"})

#         # Handle questions
#         questions = []
#         for key, value in list(data.items()):
#             if key.startswith('questions['):
#                 parts = key.split('[')
#                 index = int(parts[1].split(']')[0])
#                 if len(questions) <= index:
#                     questions.append({'options': []})
#                 if len(parts) > 2:
#                     subkey = parts[2].split(']')[0]
#                     if subkey == 'options':
#                         option_index = int(parts[3].split(']')[0])
#                         questions[index]['options'].append({'text': value[0] if isinstance(value, list) else value, 'is_correct': False})
#                     elif subkey == 'correctOption':
#                         correct_option = int(value[0] if isinstance(value, list) else value)
#                         questions[index]['options'][correct_option]['is_correct'] = True
#                     else:
#                         questions[index][subkey] = value[0] if isinstance(value, list) else value
#                 data.pop(key)
        
#         # Remove empty questions
#         questions = [q for q in questions if q.get('text') and q.get('options')]
#         data['questions'] = questions

#         return super().to_internal_value(data)

#     def create(self, validated_data):
#         questions_data = validated_data.pop('questions')
#         quiz = Quiz.objects.create(**validated_data)
#         for question_data in questions_data:
#             options_data = question_data.pop('options')
#             question = Question.objects.create(quiz=quiz, **question_data)
#             for option_data in options_data:
#                 Answer.objects.create(question=question, **option_data)
#         return quiz
from rest_framework import serializers
from .models import Quiz, Question, Answer
from courses.models import Courses

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = AnswerSerializer(many=True, source='answers', read_only=True)
    
    class Meta:
        model = Question
        fields = ['text', 'marks', 'negative_marks', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    time_limit = serializers.DurationField()
    creator = serializers.ReadOnlyField(source='creator.id')
    course = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'course', 'description', 'time_limit', 'questions', 'creator']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['course'] = instance.course.name  # Return course name instead of ID
        return representation