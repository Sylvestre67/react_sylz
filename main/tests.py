from django.test import TestCase, Client
from django.contrib.gis.geos import Point
from django.core.urlresolvers import reverse

from rest_framework_gis.fields import GeoJsonDict
from rest_framework.test import APIClient

from .models import Place
from .serializers import PlaceSerializer


class PlaceTestCase(TestCase):

    def setUp(self):
        london_point = Point(51.5074, 0.1278)
        new_york_point = Point(40.7128, 74.0060)
        self.new_york = Place.objects.create(name="new york", location=new_york_point, instagram_url='testing')
        self.london = Place.objects.create(name="london", location=london_point, instagram_url='testing')

        self.london_serialized = PlaceSerializer(self.london).data
        self.client = APIClient()

    def test_places_have_name(self):
        """Places are correctly identified"""
        self.assertEqual(self.london.name, 'london')

    def test_places_serializer(self):
        """Places are correctly serialized"""
        self.assertEqual(self.london_serialized.get('name'), 'london')

    def test_places_instagram_url(self):
        """Places are have instagram_url serialized"""
        self.assertEqual(self.london_serialized.get('instagram_url'), 'testing')

    def test_places_geo_json(self):
        """Places.location are correctly geo-serialized"""
        self.assertEqual(type(self.london_serialized.get('location')), GeoJsonDict)

    def test_view_for_list_of_places(self):
        """A list of places is available via a places endpoint"""
        response = self.client.get('/api/places/')
        self.assertEqual(len(response.json()['results']), 2)

class NBADatasetViewTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.json_response = self.client.get(reverse('nba'))
        self.playerList = b'[{"_name": "Lee", "assists": [{"name": "Lee", "pass_from": 0, "pass_to": 0}, {"name": "Porzingis", "pass_from": 1, "pass_to": 1}, {"name": "Jack", "pass_from": 1, "pass_to": 2}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 1}, {"name": "O\'Quinn", "pass_from": 1, "pass_to": 0}, {"name": "Beasley", "pass_from": 0, "pass_to": 0}, {"name": "Thomas", "pass_from": 1, "pass_to": 0}, {"name": "Kanter", "pass_from": 0, "pass_to": 1}]}, {"_name": "Porzingis", "assists": [{"name": "Lee", "pass_from": 1, "pass_to": 1}, {"name": "Porzingis", "pass_from": 0, "pass_to": 0}, {"name": "Jack", "pass_from": 0, "pass_to": 5}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 1}, {"name": "O\'Quinn", "pass_from": 0, "pass_to": 0}, {"name": "Beasley", "pass_from": 0, "pass_to": 0}, {"name": "Thomas", "pass_from": 0, "pass_to": 0}, {"name": "Kanter", "pass_from": 0, "pass_to": 0}]}, {"_name": "Jack", "assists": [{"name": "Lee", "pass_from": 2, "pass_to": 1}, {"name": "Porzingis", "pass_from": 5, "pass_to": 0}, {"name": "Jack", "pass_from": 0, "pass_to": 0}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 0}, {"name": "O\'Quinn", "pass_from": 0, "pass_to": 0}, {"name": "Beasley", "pass_from": 1, "pass_to": 1}, {"name": "Thomas", "pass_from": 0, "pass_to": 0}, {"name": "Kanter", "pass_from": 0, "pass_to": 0}]}, {"_name": "Ntilikina", "assists": [{"name": "Lee", "pass_from": 1, "pass_to": 0}, {"name": "Porzingis", "pass_from": 1, "pass_to": 0}, {"name": "Jack", "pass_from": 0, "pass_to": 0}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 0}, {"name": "O\'Quinn", "pass_from": 1, "pass_to": 0}, {"name": "Beasley", "pass_from": 0, "pass_to": 0}, {"name": "Thomas", "pass_from": 0, "pass_to": 0}, {"name": "Kanter", "pass_from": 1, "pass_to": 0}]}, {"_name": "O\'Quinn", "assists": [{"name": "Lee", "pass_from": 0, "pass_to": 1}, {"name": "Porzingis", "pass_from": 0, "pass_to": 0}, {"name": "Jack", "pass_from": 0, "pass_to": 0}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 1}, {"name": "O\'Quinn", "pass_from": 0, "pass_to": 0}, {"name": "Beasley", "pass_from": 0, "pass_to": 0}, {"name": "Thomas", "pass_from": 0, "pass_to": 0}, {"name": "Kanter", "pass_from": 0, "pass_to": 0}]}, {"_name": "Beasley", "assists": [{"name": "Lee", "pass_from": 0, "pass_to": 0}, {"name": "Porzingis", "pass_from": 0, "pass_to": 0}, {"name": "Jack", "pass_from": 1, "pass_to": 1}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 0}, {"name": "O\'Quinn", "pass_from": 0, "pass_to": 0}, {"name": "Beasley", "pass_from": 0, "pass_to": 0}, {"name": "Thomas", "pass_from": 0, "pass_to": 0}, {"name": "Kanter", "pass_from": 0, "pass_to": 0}]}, {"_name": "Thomas", "assists": [{"name": "Lee", "pass_from": 0, "pass_to": 1}, {"name": "Porzingis", "pass_from": 0, "pass_to": 0}, {"name": "Jack", "pass_from": 0, "pass_to": 0}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 0}, {"name": "O\'Quinn", "pass_from": 0, "pass_to": 0}, {"name": "Beasley", "pass_from": 0, "pass_to": 0}, {"name": "Thomas", "pass_from": 0, "pass_to": 0}, {"name": "Kanter", "pass_from": 0, "pass_to": 0}]}, {"_name": "Kanter", "assists": [{"name": "Lee", "pass_from": 1, "pass_to": 0}, {"name": "Porzingis", "pass_from": 0, "pass_to": 0}, {"name": "Jack", "pass_from": 0, "pass_to": 0}, {"name": "Ntilikina", "pass_from": 0, "pass_to": 1}, {"name": "O\'Quinn", "pass_from": 0, "pass_to": 0}, {"name": "Beasley", "pass_from": 0, "pass_to": 0}, {"name": "Thomas", "pass_from": 0, "pass_to": 0}, {"name": "Kanter", "pass_from": 0, "pass_to": 0}]}]'
    def test_nba_url_serve_view(self):
        """The NBA url endpoints works"""
        self.assertEqual(self.json_response.status_code, 200)

    def test_nba_serves_list_of_player(self):
        """The NBA view serves the list of players"""
        self.assertEqual(self.json_response.content, self.playerList)