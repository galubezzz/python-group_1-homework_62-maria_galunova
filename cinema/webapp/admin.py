from django.contrib import admin
from webapp.models import Movie, Category, Hall, Seat, Show

# Register your models here.
class MovieAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'release_date']
    ordering = ['-release_date']
    search_fields = ['name', 'id']


admin.site.register(Movie, MovieAdmin)
admin.site.register(Category)
admin.site.register(Hall)
admin.site.register(Show)
admin.site.register(Seat)
