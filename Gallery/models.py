from django.db import models

class Gallery(models.Model):
    name = models.CharField(max_length=100)


class GalleryImage(models.Model):
    image = models.ImageField(blank=True, upload_to='albums')
    mode = models.CharField(max_length=100)
    Gallery = models.ForeignKey(Gallery , on_delete=models.CASCADE)
