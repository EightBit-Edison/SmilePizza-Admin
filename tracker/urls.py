from django.conf.urls import url
from . import views

urlpatterns = [

    url(r'^tracking/', views.LoginFormView.as_view()),
    url(r'^panel/', views.panel, name='panel'),
    url(r'^logout/', views.logoutfunc, name="logout"),
    url(r'^add/', views.add_view, name='add'),
]