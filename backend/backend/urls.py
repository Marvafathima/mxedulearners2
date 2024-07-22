from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
urlpatterns = [
    path('api/users/', include('api.urls')),
    path('user_management/', include('usermanagement.urls')),
    path('admin/', admin.site.urls),
    # other paths
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


