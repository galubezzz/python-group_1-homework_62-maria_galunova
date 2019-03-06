from webapp.models import Movie, Category, Show, Hall, Seat, Discount, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, CategorySerializer, ShowSerializer, SeatSerializer, HallSerializer, \
    DiscountSerializer, TicketSerializer, BookingSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer


class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by("name")
    serializer_class = ShowSerializer


class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.all().order_by("name")
    serializer_class = HallSerializer


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all().order_by("hall")
    serializer_class = SeatSerializer


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all().order_by("name")
    serializer_class = DiscountSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by("show")
    serializer_class = TicketSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by("-created_date")
    serializer_class = BookingSerializer
