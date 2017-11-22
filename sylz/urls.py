from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from main.views import IndexView, PlaceViewSet

router = DefaultRouter()
router.register(r'places', PlaceViewSet, base_name='place')

urlpatterns = [
    # API urls
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Templated views
    url(r'^$', IndexView.as_view(), name='home'),
    url(r'^admin/', admin.site.urls),
]

# API views
urlpatterns += router.urls
