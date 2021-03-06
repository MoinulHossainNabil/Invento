# Generated by Django 3.0.7 on 2021-01-07 16:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210107_2142'),
    ]

    operations = [
        migrations.CreateModel(
            name='Title',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='image',
            name='title',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Title'),
        ),
    ]
