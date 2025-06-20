from rest_framework import serializers
from .models import Carrito, ItemCarrito, Orden, ItemOrden
from catalogo.models import Producto

class ItemCarritoSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto', 'cantidad']

class CarritoSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(many=True, read_only=True)

    class Meta:
        model = Carrito
        fields = ['id', 'usuario', 'items']

class ItemOrdenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOrden
        fields = ['producto', 'cantidad', 'precio_unitario']

class OrdenSerializer(serializers.ModelSerializer):
    items = ItemOrdenSerializer(many=True)

    class Meta:
        model = Orden
        fields = ['id', 'usuario', 'fecha', 'estado', 'total', 'items']
