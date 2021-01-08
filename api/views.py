from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import TitleSerializer, ImageSerializer
from .models import Title, Image


class ListTitles(ListAPIView):
    """Returns all titles"""
    serializer_class = TitleSerializer
    queryset = Title.objects.all()


class GetImages(APIView):
    """Returns all images for a specific title"""
    permission_classes = (AllowAny, )

    def get(self, request, pk):
        images = Image.objects.filter(title__pk=pk)
        serializer = ImageSerializer(images, context={"request": request}, many=True)
        return Response(serializer.data)


class UploadImages(APIView):
    """Api to add new title and its images"""
    permission_classes = (AllowAny, )
    parser_classes = (MultiPartParser, FormParser, )

    def post(self, *args, **kwargs):
        title = self.request.data['title']
        images = self.request.FILES.getlist('file')
        title = Title.objects.create(title=title)
        title.save()
        for i in images:
            image = Image.objects.create(
                title=title,
                image=i
            )
            image.save()
        return Response("Successful", status=status.HTTP_200_OK)
