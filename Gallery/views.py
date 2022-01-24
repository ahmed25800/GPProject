import json

from django.shortcuts import render
from .models import *
from django.http import *


def Index(request):
    return render(request, 'index.html')


def AddNewAlbum(request):
    if request.method == 'POST':
        Gallery.objects.create(name=request.POST['name'])
        return JsonResponse('success', content_type='application/json', safe=False)


def ReadAllGalleries(request):
    if request.method == 'GET':
        objects = list(Gallery.objects.values('id', 'name'))
        return JsonResponse(json.dumps(objects), safe=False)


def AddImages(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        for image in images:
            GalleryImage.objects.create(Gallery_id=request.POST['gallery_id'], image=image, mode='happy')
    return JsonResponse('success', safe=False)


def GetGalleryImages(request):
    if request.method == 'GET':
        objs = list(GalleryImage.objects.filter(Gallery_id=request.GET['gallery_id']).values('id' , 'mode' , 'image' , 'Gallery_id'))
        return JsonResponse(json.dumps(objs), safe=False)
