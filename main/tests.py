from django.test import TestCase
from django.contrib.gis.geos import Point

from rest_framework_gis.fields import GeoJsonDict
from rest_framework.test import APIClient

from .models import Place
from .serializers import PlaceSerializer


class PlaceTestCase(TestCase):

    def setUp(self):
        london_point = Point(51.5074, 0.1278)
        new_york_point = Point(40.7128, 74.0060)
        self.new_york = Place.objects.create(name="new york", location=new_york_point)
        self.london = Place.objects.create(name="london", location=london_point)

        self.london_serialized = PlaceSerializer(self.london).data
        self.client = APIClient()

    def test_places_have_name(self):
        """Places are correctly identified"""
        self.assertEqual(self.london.name, 'london')

    def test_places_serializer(self):
        """Places are correclty serialized"""
        self.assertEqual(self.london_serialized.get('name'), 'london')

    def test_places_geo_json(self):
        """Places.location are correclty geo-serialized"""
        self.assertEqual(type(self.london_serialized.get('location')), GeoJsonDict)

    def test_view_for_list_of_places(self):
        """A list of places is available via a places endpoint"""
        response = self.client.get('/api/places/')
        self.assertEqual(len(response.json()['results']), 2)
