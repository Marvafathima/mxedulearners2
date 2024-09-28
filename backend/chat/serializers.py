from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from razorpay_backend.models import OrdersItem
from api.models import CustomUser
from courses.models import Courses
from rest_framework import serializers


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['id', 'name']

class OrderItemSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = OrdersItem
        fields = ['course', 'price', 'iscomplete', 'isstart', 'progress']

class StudentSerializer(serializers.ModelSerializer):
    purchased_courses = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number', 'purchased_courses']
