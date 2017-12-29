from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from main.views import IndexView, PlaceViewSet, NBADatasetView

router = DefaultRouter()
router.register(r'places', PlaceViewSet, base_name='place')

urlpatterns = [
    # DataSets urls
    url(r'^api/nba/assists\.json', NBADatasetView.as_view(), name='nba'),

    # API urls
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Templated views
    url(r'^$', IndexView.as_view(), name='home'),
    url(r'^admin/', admin.site.urls),


    # Catch all others - React-router to handle 404...
    # (?!api) is necessary to let api/ routes being catched for DJRF ViewSets
    url(r'^(?!api)(?:.*)/?$', IndexView.as_view(), name='catch_all'),
]

# API views
urlpatterns += router.urls
