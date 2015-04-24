from django.conf.urls import patterns, include, url
from django.contrib import admin

from rest_framework_nested import routers

from .views import IndexView
from authentication.views import AccountViewSet, UserView


router = routers.SimpleRouter(trailing_slash=False)
router.register(r'users', AccountViewSet)


urlpatterns = patterns('',
	url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/me', UserView.as_view()),

    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)
