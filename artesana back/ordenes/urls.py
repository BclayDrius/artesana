from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarritoViewSet, OrdenViewSet

router = DefaultRouter()
router.register(r'carritos', CarritoViewSet, basename='carrito')
router.register(r'ordenes', OrdenViewSet, basename='orden')

urlpatterns = [
    path('', include(router.urls)),
]