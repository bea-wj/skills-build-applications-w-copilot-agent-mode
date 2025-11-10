"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .views import UserViewSet, TeamViewSet, ActivityViewSet, LeaderboardViewSet, WorkoutViewSet
import os

@api_view(['GET'])
def codespace_api_root(request, format=None):
    """
    API root with codespace-aware URL generation
    """
    # Check if we're in a codespace
    codespace_name = os.environ.get('CODESPACE_NAME')
    
    if codespace_name:
        # Use codespace URL format
        base_url = f"https://{codespace_name}-8000.app.github.dev"
        return Response({
            'users': f"{base_url}/api/users/",
            'teams': f"{base_url}/api/teams/",
            'activities': f"{base_url}/api/activities/",
            'leaderboard': f"{base_url}/api/leaderboard/",
            'workouts': f"{base_url}/api/workouts/",
        })
    else:
        # Use Django's reverse for localhost/development
        return Response({
            'users': reverse('user-list', request=request, format=format),
            'teams': reverse('team-list', request=request, format=format),
            'activities': reverse('activity-list', request=request, format=format),
            'leaderboard': reverse('leaderboard-list', request=request, format=format),
            'workouts': reverse('workout-list', request=request, format=format),
        })

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'workouts', WorkoutViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', codespace_api_root, name='api-root'),
    path('api/', include(router.urls)),
]
