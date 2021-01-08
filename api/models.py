from django.db import models


def images_upload_path(instance, file_name):
    return f"{instance.title}/{file_name}"


class Title(models.Model):
    title = models.CharField(max_length=250, null=True)

    def __str__(self):
        return self.title


class Image(models.Model):
    title = models.ForeignKey('Title', on_delete=models.CASCADE, null=True)
    image = models.ImageField(null=True, upload_to=images_upload_path)

    def __str__(self):
        return self.image.url
