# Generated by Django 3.1.6 on 2021-02-25 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vinerfiav1', '0003_auto_20210224_1218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.CharField(default='None', max_length=50),
        ),
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(default='None', max_length=50),
        ),
    ]
