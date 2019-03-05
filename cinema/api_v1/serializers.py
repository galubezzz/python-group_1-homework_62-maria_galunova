from webapp.models import Movie, Category, Show, Hall, Seat
from rest_framework import serializers

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name', 'description', 'poster', 'release_date', 'finish_date')

class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')
    class Meta:
        model = Category
        fields= ("id", "name", "description")

class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields= ("id", "name", "hall", "start_time", "end_time", "price")

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields= ("id", "name")

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields= ("id", "hall", "row", "seat")