# Generated by Django 2.1 on 2019-03-06 02:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0004_auto_20190306_0138'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='discount',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='discounted_tickets', to='webapp.Discount', verbose_name='Скидка'),
        ),
    ]
