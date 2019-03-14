from webapp.models import Movie, Category, Show, Hall, Seat, Discount, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieCreateSerializer, MovieDisplaySerializer, CategorySerializer, ShowSerializer, SeatSerializer, HallSerializer, \
    DiscountSerializer, TicketSerializer, BookingSerializer


class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []


class MovieViewSet(NoAuthModelViewSet):
    queryset = Movie.objects.active().order_by('-release_date')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MovieDisplaySerializer
        else:
            return MovieCreateSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class CategoryViewSet(NoAuthModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by("name")
    serializer_class = ShowSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.active().order_by("name")
    serializer_class = HallSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all().order_by("hall")
    serializer_class = SeatSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all().order_by("name")
    serializer_class = DiscountSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by("show")
    serializer_class = TicketSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by("-created_date")
    serializer_class = BookingSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
