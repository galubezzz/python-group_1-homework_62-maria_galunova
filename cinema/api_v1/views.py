from webapp.models import Movie, Category, Show, Hall, Seat, Discount, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieCreateSerializer, MovieDisplaySerializer, CategorySerializer, ShowSerializer, \
    SeatSerializer, HallSerializer, \
    DiscountSerializer, TicketSerializer, BookingSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'is_admin': user.is_superuser,
            'is_staff': user.is_staff
        })


class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class BaseViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        permissions = super().get_permissions()
        if self.request.method in ["POST", "DELETE", "PUT", "PATCH"]:
            permissions.append(IsAuthenticated())
        return permissions


class UserViewSet(BaseViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MovieViewSet(BaseViewSet):
    queryset = Movie.objects.active().order_by('-release_date')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MovieDisplaySerializer
        else:
            return MovieCreateSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class CategoryViewSet(BaseViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class ShowViewSet(BaseViewSet):
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


class HallViewSet(BaseViewSet):
    queryset = Hall.objects.active().order_by("name")
    serializer_class = HallSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class SeatViewSet(BaseViewSet):
    queryset = Seat.objects.all().order_by("hall")
    serializer_class = SeatSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class DiscountViewSet(BaseViewSet):
    queryset = Discount.objects.all().order_by("name")
    serializer_class = DiscountSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class TicketViewSet(BaseViewSet):
    queryset = Ticket.objects.all().order_by("show")
    serializer_class = TicketSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class BookingViewSet(BaseViewSet):
    queryset = Booking.objects.all().order_by("-created_date")
    serializer_class = BookingSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
