# Generated by Django 2.2.6 on 2019-11-17 22:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scheduler', '0011_auto_20191117_2025'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employeeassignment',
            name='end',
        ),
    ]
