from webapp.models import Movie, Category, Show, Hall, Seat, Discount, Ticket, Booking
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # url = serializers.HyperlinkedIdentityField(view_name='api_v1:user-detail')



    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email')

class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class InlineSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'row', 'seat', "hall")


class InlineHallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = ('id', 'name')


class InlineMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name')

class InlineShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ("id", "name", "start_time")

class InlineDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ("id", "name")


class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ("url", "id", "name", "description")


class MovieCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')

    class Meta:
        model = Movie
        fields = ('url', 'id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'category')


# Сериализатор для просмотра фильмов
# выводит категории в виде списка вложенных объектов, представленных сериализатором InlineCategorySerializer.
class MovieDisplaySerializer(MovieCreateSerializer):
    category = InlineCategorySerializer(many=True, read_only=True)


class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')
    seats = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Hall
        fields = ("url", "id", "name", "seats")


class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')
    movie_url = serializers.HyperlinkedRelatedField(view_name='api_v1:movie-detail', read_only=True, source='name')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')
    name = InlineMovieSerializer()
    hall = InlineHallSerializer()

    class Meta:
        model = Show
        fields = ("url", "id", "hall", "name", "start_time", "end_time", "price", "hall_url", "movie_url")


class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')
    hall = InlineHallSerializer()

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
    show_url = serializers.HyperlinkedRelatedField(view_name="api_v1:show-detail", read_only=True, source="show")
    seat_url = serializers.HyperlinkedRelatedField(view_name="api_v1:seat-detail", read_only=True, source="seat")
    discount_url = serializers.HyperlinkedRelatedField(view_name="api_v1:discount-detail", read_only=True, source="discount")
    show = InlineShowSerializer()
    seat = InlineSeatSerializer()
    discount = InlineDiscountSerializer()

    class Meta:
        model = Ticket
        fields = ("url", "id", "show_url", "show", "seat_url", "seat", "discount_url", "discount")


class BookingSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="api_v1:booking-detail")
    show_url = serializers.HyperlinkedRelatedField(view_name="api_v1:show-detail", read_only=True)
    show = InlineShowSerializer()
    seats = InlineSeatSerializer(many=True)

    class Meta:
        model = Booking
        fields = ("url", "id", "code", "show_url", "show", "seats", "status", "created_date", "renew_date")
