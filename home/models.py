from django.db import models

# Create your models here.
class UsedLanguages(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.name} ({self.code})"
    
    

class Voice(models.Model):
    audio_file = models.FileField(upload_to='audio/')