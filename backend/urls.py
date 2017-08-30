"""Ortus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from backend.apps.api import viewsets
from backend.apps.api import urls

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^.*', TemplateView.as_view(template_name="index.html")),
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^sign_up/$', viewsets.SignUp.as_view(), name="sign_up"),
    # url(r'^social_sign_up/$', views.SocialSignUp.as_view(), name="social_sign_up"),
    url(r'^', include('backend.apps.api.urls'))
]
