# Generated by Django 4.2 on 2023-04-10 20:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0003_rename_employee_employees'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Employees',
            new_name='Employee',
        ),
    ]
