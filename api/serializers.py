from rest_framework import serializers
from .models import Title, Image


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    title = serializers.CharField(source='title.title')

    class Meta:
        model = Image
        fields = ('id', 'title', 'image', 'image_url', )

    # This functon is used to return the image url as hyperlink
    def get_image_url(self, image):
        request = self.context.get('request')
        image_url = image.image.url
        return request.build_absolute_uri(image_url)


class TitleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Title
        fields = '__all__'
