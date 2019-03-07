from django.db import models
import random
import string
from django.conf import settings


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(max_length=2000, null=True, blank=True, verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'


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
    hall = models.ForeignKey(Hall, null=True, blank=True, on_delete=models.PROTECT, related_name='seat_in_hall',
                             verbose_name='Кинозал')
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
    discount = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Скидка')
    start_date = models.DateField(null=True, blank=True, verbose_name='Дата начала')
    end_date = models.DateField(null=True, blank=True, verbose_name='Дата окончания')

    def __str__(self):
        return self.name


class Ticket(models.Model):
    show = models.ForeignKey(Show, on_delete=models.PROTECT, related_name="tickets_for_show", verbose_name="Сеанс")
    seat = models.ForeignKey(Seat, on_delete=models.PROTECT, related_name="tickets_for_seat", verbose_name="Место")
    discount = models.ForeignKey(Discount, null=True, blank=True, on_delete=models.PROTECT,
                                 related_name="discounted_tickets", verbose_name="Скидка")
    exchange = models.BooleanField(verbose_name="Возврат")

    def __str__(self):
        return self.show


def generate_code():
    code = ""
    for i in range(0, settings.BOOKING_CODE_LENGTH):
        code += random.choice(string.digits)
    return code


class Booking(models.Model):
    STATUS_1 = 'created'
    STATUS_2 = 'paid'
    STATUS_3 = 'cancel'

    STATUS_CHOICES = (
        (STATUS_1, 'Создано'),
        (STATUS_2, 'Выкуплено'),
        (STATUS_3, 'Отмена')
    )
    code = models.CharField(max_length=6, unique_for_date='created_date', default=generate_code, editable=False, verbose_name='Код')
    show = models.ForeignKey(Show, on_delete=models.PROTECT, related_name="bookings_for_show", verbose_name="Сеанс")
    seats = models.ManyToManyField(Seat, blank=False, related_name="seats", verbose_name="Места")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, verbose_name='Статус')
    created_date = models.DateField(auto_now_add=True, verbose_name='Дата создания')
    renew_date = models.DateField(auto_now=True, verbose_name='Дата обновления')

    def __str__(self):
        return "%s, %s" % (self.show, self.code)
