from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Producto
from .serializers import ProductoSerializer

class SoloAdminPuedeModificar(permissions.BasePermission):
    def has_permission(self, request, view):
        # Solo los métodos seguros (GET, HEAD, OPTIONS) están permitidos para todos
        if request.method in permissions.SAFE_METHODS:
            return True
        # Solo los usuarios admin pueden crear, modificar o eliminar
        return request.user and request.user.is_staff

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [SoloAdminPuedeModificar]

    # AGREGAMOS filtros y búsqueda:
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # Filtrar directamente por estos campos: ?categoria=Postres&stock=10
    filterset_fields = ['categoria', 'stock']

    # Buscar texto en estos campos: ?search=capuccino
    search_fields = ['nombre', 'descripcion']

    # Ordenar por estos campos: ?ordering=precio o ?ordering=-precio
    ordering_fields = ['precio', 'nombre', 'stock']