from django.urls import path
from home import views

urlpatterns = [
    path('', views.home, name='home'),
    path('translate/', views.TranslateAPIView.as_view(), name='translate'),
    path('speak-translate/', views.speak_translate, name='speak-translate'),
    path('speak-translate/save-voice/', views.save_voice, name='save_voice'),
    


]
