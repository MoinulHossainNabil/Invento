from django.urls import path
from .views import ListTitles, UploadImages, GetImages

urlpatterns = [
    path('list-titles/', ListTitles.as_view()),
    path('upload-images/', UploadImages.as_view()),
    path('get-images/<int:pk>/', GetImages.as_view()),
]