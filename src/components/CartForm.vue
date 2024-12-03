<template>
  <div>
    <input
      v-model="productId"
      type="number"
      placeholder="ID del Producto"
      class="p-2 border rounded"
    />
    <input v-model="quantity" type="number" placeholder="Cantidad" class="p-2 border rounded" />
    <button @click="handleAddProduct" class="bg-blue-500 text-white p-2 rounded">
      Agregar Producto
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const productId = ref(0)
const quantity = ref(1)

const handleAddProduct = async () => {
  if (productId.value > 0 && quantity.value > 0) {
    await cartStore.addProduct(productId.value, quantity.value)
    productId.value = 0
    quantity.value = 1
  } else {
    console.error('ID de producto o cantidad inválidos')
  }
}
</script>
