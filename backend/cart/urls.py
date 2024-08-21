from django.urls import path
from .views import CartView

urlpatterns = [
    # ... other url patterns ...
    path('cart/', CartView.as_view(), name='cart'),
]