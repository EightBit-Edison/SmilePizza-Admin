from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Geolabel(models.Model):
    student = models.ForeignKey(User)
    latitude = models.FloatField()
    longitude = models.FloatField()
    location_date = models.DateTimeField('date of tracking')
