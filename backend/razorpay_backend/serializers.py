from rest_framework import serializers

from .models import Orders

class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Orders
        fields = '__all__'
        depth = 2
