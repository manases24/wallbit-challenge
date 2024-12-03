<template>
  <div class="mt-4">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartStore.items" :key="item.id">
          <td><img :src="item.image" alt="product image" class="w-16 h-16" /></td>
          <td>{{ item.title }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ item.price }}</td>
          <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <p>Total de Productos: {{ cartStore.totalProducts }}</p>
      <p>Costo Total: ${{ cartStore.totalCost.toFixed(2) }}</p>
      <p>Fecha de Creación del Carrito: {{ cartStore.creationDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>
