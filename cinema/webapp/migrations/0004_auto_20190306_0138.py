# Generated by Django 2.1 on 2019-03-06 01:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0003_auto_20190304_0613'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=255, unique=True, verbose_name='Код')),
                ('status', models.CharField(choices=[('created', 'Создано'), ('paid', 'Выкуплено'), ('cancel', 'Отмена')], max_length=20, verbose_name='Статус')),
                ('created_date', models.DateField(blank=True, null=True, verbose_name='Дата создания')),
                ('renew_date', models.DateField(blank=True, null=True, verbose_name='Дата обновления')),
                ('seats', models.ManyToManyField(related_name='seats', to='webapp.Seat', verbose_name='Места')),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='bookings_for_show', to='webapp.Show', verbose_name='Сеанс')),
            ],
        ),
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название')),
                ('discount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Скидка')),
                ('start_date', models.DateField(blank=True, null=True, verbose_name='Дата начала')),
                ('end_date', models.DateField(blank=True, null=True, verbose_name='Дата окончания')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exchange', models.BooleanField(verbose_name='Возврат')),
                ('discount', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='discounted_tickets', to='webapp.Discount', verbose_name='Скидка')),
                ('seat', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='tickets_for_seat', to='webapp.Seat', verbose_name='Место')),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='tickets_for_show', to='webapp.Show', verbose_name='Сеанс')),
            ],
        ),
        migrations.AlterField(
            model_name='movie',
            name='category',
            field=models.ManyToManyField(blank=True, related_name='movie_in_category', to='webapp.Category', verbose_name='Категория'),
        ),
    ]
