from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.utils import timezone
from .models import Carrito, ItemCarrito, Orden
from .serializers import CarritoSerializer, ItemCarritoSerializer, OrdenSerializer
from catalogo.models import Producto

class CarritoViewSet(viewsets.ModelViewSet):
    serializer_class = CarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Carrito.objects.filter(usuario=self.request.user)

    def get_object(self):
        obj = super().get_object()
        if obj.usuario != self.request.user:
            raise PermissionDenied("No tienes permiso para acceder a este carrito.")
        return obj

    @action(detail=True, methods=['post'])
    def agregar_item(self, request, pk=None):
        carrito = self.get_object()
        producto_id = request.data.get('producto')
        cantidad = int(request.data.get('cantidad', 1))

        if cantidad < 1:
            return Response({'error': 'Cantidad inválida. Debe ser mayor a 0.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            producto = Producto.objects.get(id=producto_id)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        item, created = ItemCarrito.objects.get_or_create(carrito=carrito, producto=producto)
        item.cantidad += cantidad
        item.save()

        return Response({'status': f'{cantidad} unidades del producto agregado al carrito correctamente.'})

    @action(detail=True, methods=['post'])
    def vaciar_carrito(self, request, pk=None):
        carrito = self.get_object()
        carrito.items.all().delete()
        return Response({'status': 'Carrito vaciado correctamente.'})

    @action(detail=True, methods=['post'])
    def eliminar_item(self, request, pk=None):
        carrito = self.get_object()
        producto_id = request.data.get('producto')

        try:
            item = carrito.items.get(producto_id=producto_id)
            item.delete()
            return Response({'status': 'Producto eliminado del carrito.'})
        except ItemCarrito.DoesNotExist:
            return Response({'error': 'Producto no encontrado en el carrito.'}, status=status.HTTP_404_NOT_FOUND)


class OrdenViewSet(viewsets.ModelViewSet):
    serializer_class = OrdenSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Orden.objects.filter(usuario=self.request.user)

    def get_object(self):
        obj = super().get_object()
        if obj.usuario != self.request.user:
            raise PermissionDenied("No tienes permiso para acceder a esta orden.")
        return obj

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user, fecha=timezone.now(), estado='pendiente')
