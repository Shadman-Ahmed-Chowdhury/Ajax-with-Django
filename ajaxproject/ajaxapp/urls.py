from django.urls import path
from . import views
from .views import *


urlpatterns = [
    #path('index/', AjaxHandlerView.as_view()),
    path('', views.index, name='index'),
    path('run/', views.runCode, name='run'),
]