from django.views.generic import TemplateView

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Place
from .serializers import PlaceSerializer

class IndexView(TemplateView):
    template_name = 'index.html'

class PlaceViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()
