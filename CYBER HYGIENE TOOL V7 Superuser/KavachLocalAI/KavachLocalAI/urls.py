# urls.py within your app

from django.urls import path
from . import views

urlpatterns = [
    path('data-page/', views.show_data_page, name='data_page'),
    # Other URL patterns...
]
