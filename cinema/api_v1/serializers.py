from webapp.models import Movie, Category, Show, Hall, Seat, Discount, Ticket, Booking
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ("url", "id", "name", "description")


class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class MovieSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')
    category = CategorySerializer(many=True)
    class Meta:
        model = Movie
        fields = ('url', 'id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'category')



class InlineSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ("url", 'id', 'row', 'seat')


class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')
    movie_url = serializers.HyperlinkedRelatedField(view_name='api_v1:movie-detail', read_only=True, source='name')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')

    class Meta:
        model = Show
        fields = ("url", "id", "hall", "start_time", "end_time", "price", "hall_url", "movie_url")


class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')
    seats = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Hall
        fields = ("url", "id", "name", "seats")


class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')

    class Meta:
        model = Seat
        fields = ("url", "id", "hall", "row", "seat", "hall_url")


class DiscountSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api_v1:discount-detail")

    class Meta:
        model = Discount
        fields = ("url", "id", "name", "discount", "start_date", "end_date")


class TicketSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api_v1:ticket-detail")
    show = serializers.HyperlinkedRelatedField(view_name="api_v1:show-detail", read_only=True)
    seat = serializers.HyperlinkedRelatedField(view_name="api_v1:seat-detail", read_only=True)
    discount = serializers.HyperlinkedRelatedField(view_name="api_v1:discount-detail", read_only=True)

    class Meta:
        model = Ticket
        fields = ("url", "id", "show", "seat", "discount")


class BookingSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api_v1:booking-detail")
    show = serializers.HyperlinkedRelatedField(view_name="api_v1:show-detail", read_only=True)
    seats = SeatSerializer(many=True)

    class Meta:
        model = Booking
        fields = ("url", "id", "code", "show", "seats", "status", "created_date", "renew_date")