from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name='Описание')

    def __str__(self):
        return self.name

class Movie(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name='Описание')
    poster = models.ImageField(upload_to='posters', null=True, blank=True, verbose_name='Постер')
    release_date = models.DateField(verbose_name='Дата релиза')
    finish_date = models.DateField(null=True, blank=True, verbose_name='Дата окончания показа')
    category = models.ManyToManyField(Category, blank=True, related_name="movie_in_category", verbose_name='Категория')

    def __str__(self):
        return self.name

class Hall(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

    def __str__(self):
        return self.name

class Seat(models.Model):
    hall = models.ForeignKey(Hall, null=True, blank=True, on_delete=models.PROTECT, related_name='seat_in_hall', verbose_name='Кинозал')
    row = models.IntegerField(verbose_name='Ряд')
    seat = models.IntegerField(verbose_name='Место')

    def __str__(self):
        return str(self.seat)

class Show(models.Model):
    name = models.ForeignKey(Movie, on_delete=models.PROTECT, related_name="show", verbose_name='Фильм')
    hall = models.ForeignKey(Hall, on_delete=models.PROTECT, related_name='hall', verbose_name='Зал')
    start_time = models.DateTimeField(verbose_name='Начало сеанса')
    end_time = models.DateTimeField(verbose_name='Окончание сеанса')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена')

    def __str__(self):
        return str(self.name)


class Discount(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    discount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Скидка')
    start_date = models.DateField(null=True, blank=True, verbose_name='Дата начала')
    end_date = models.DateField(null=True, blank=True, verbose_name='Дата окончания')

    def __str__(self):
        return self.name

