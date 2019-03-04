
from webapp.models import Movie, Category, Show, Hall, Seat
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, CategorySerializer, ShowSerializer, SeatSerializer, HallSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer


class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by("movie")
    serializer_class = ShowSerializer


class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.all().order_by("name")
    serializer_class = HallSerializer

class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all().order_by("hall")
    serializer_class = SeatSerializer