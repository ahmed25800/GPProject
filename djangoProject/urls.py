"""djangoProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Gallery import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
                  path('', views.Index, name='index'),
                  path('/add_new_gallery', views.AddNewAlbum, name='add_new_gallery'),
                  path('/Galleries', views.ReadAllGalleries),
                  path('/add_new_images', views.AddImages, name='add_images'),
                  path('/GetImages', views.GetGalleryImages, name='get_images')
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
