from django.contrib import admin
from django.contrib.gis.db import models

from guardian.admin import GuardedModelAdmin

from mapwidgets.widgets import GooglePointFieldWidget

from .models import Place


class ModelAdmin(GuardedModelAdmin):
    list_display = ('name', 'id', 'created_on')
    list_display_links = ('name', 'id')
    search_fields = ('name',)
    ordering = ('name', 'created_on')


class PlaceAdmin(GuardedModelAdmin):

    formfield_overrides = {
        models.PointField: {"widget": GooglePointFieldWidget}
    }


admin.site.register(Place, PlaceAdmin)
