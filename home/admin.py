from django.contrib import admin
from .models import UsedLanguages
# Register your models here.

class LanguagesAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')

admin.site.register(UsedLanguages, LanguagesAdmin)