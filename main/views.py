from os import path

from django.views.generic import TemplateView, View
from django.http import JsonResponse, HttpResponse

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Place
from .serializers import PlaceSerializer

import json

class IndexView(TemplateView):
    template_name = 'index.html'

class PlaceViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

class NBADatasetView(View):
    """
    A simple View returning the data needed to display the Knicks Assists DataViz.
    """
    def get(self, request, *args, **kwargs):

        with open(path.relpath('utils/assists.json'), 'r') as jsonFile:
            dataset = json.loads(jsonFile.read())
            return JsonResponse(dataset, safe=False)