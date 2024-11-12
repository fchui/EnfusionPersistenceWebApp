from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('character-positions/', views.character_positions, name='character-positions/')
]
