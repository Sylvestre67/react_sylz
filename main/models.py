import uuid

from django.contrib.gis.db import models
from django_extensions.db.models import TimeStampedModel


class UUIDModel(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Place(UUIDModel, TimeStampedModel):
    name = models.CharField(max_length=256)
    location = models.PointField(null=True, blank=True)
    instagram_url = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return "Place {} @ {}".format(self.name, self.location)
