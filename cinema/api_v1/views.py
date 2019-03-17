from webapp.models import Movie, Category, Show, Hall, Seat, Discount, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieCreateSerializer, MovieDisplaySerializer, CategorySerializer, ShowSerializer, \
    SeatSerializer, HallSerializer, \
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


class ShowViewSet(NoAuthModelViewSet):
    queryset = Show.objects.all().order_by("name")
    serializer_class = ShowSerializer

    def get_queryset(self):
        queryset = self.queryset
        movie_id = self.request.query_params.get('movie_id', None)
        hall_id = self.request.query_params.get('hall_id', None)
        starts_after = self.request.query_params.get('starts_after', None)
        starts_before = self.request.query_params.get('starts_before', None)

        if movie_id:
            queryset = queryset.filter(name_id=movie_id)
        if starts_after:
            queryset = queryset.filter(start_time__gte=starts_after)
        if starts_before:
            queryset = queryset.filter(start_time__lte=starts_before)
        if hall_id:
            queryset = queryset.filter(hall_id=hall_id)
        return queryset

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
