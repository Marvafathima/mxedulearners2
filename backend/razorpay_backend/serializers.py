from rest_framework import serializers

from .models import Orders,OrdersItem
class OrdersItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdersItem
        fields = ['id', 'user', 'order', 'course', 'price', 'iscomplete', 'isstart']
        read_only_fields = ['id', 'user', 'order', 'course', 'price']
class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Orders
        fields = '__all__'
        depth = 2
