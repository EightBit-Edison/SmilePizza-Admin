from django.contrib.auth.models import User
from tracker.models import Geolabel
from rest_framework import serializers, viewsets,generics

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Serializers define the API representation.
class GeolabelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Geolabel
        fields = ('student', 'longitude', 'latitude', 'location_date')

# ViewSets define the view behavior.
class GeolabelViewSet(viewsets.ModelViewSet):
    queryset = Geolabel.objects.all()
    serializer_class = GeolabelSerializer

class GeolabelList(generics.ListAPIView):
    serializer_class = GeolabelSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        username = self.kwargs['username']
        return Geolabel.objects.filter(student__username=username)


