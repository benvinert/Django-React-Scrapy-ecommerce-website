# Generated by Django 3.1.6 on 2021-02-24 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vinerfiav1', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_code',
            field=models.CharField(max_length=20),
        ),
    ]
