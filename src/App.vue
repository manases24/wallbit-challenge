<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Carrito de Compras para Programadores</h1>

    <!-- Formulario para agregar productos -->
    <CartForm />

    <!-- Mostrar carrito con productos -->
    <Cart />
  </div>
</template>

<script setup>
import CartForm from './components/CartForm.vue'
import Cart from './components/Cart.vue'
</script>
