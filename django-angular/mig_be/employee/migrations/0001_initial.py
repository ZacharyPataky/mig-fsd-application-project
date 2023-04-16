# Generated by Django 4.2 on 2023-04-10 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('date_of_joining', models.DateField()),
                ('sex', models.CharField(max_length=1)),
            ],
        ),
    ]
