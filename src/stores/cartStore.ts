import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<any[]>([])
  const error = ref<string | null>(null)
  const creationDate = ref<string | null>(null)

  // Función para obtener el producto desde la API
  const fetchProduct = async (productId: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
      if (!response.ok) throw new Error('Error al obtener el producto.')
      const product = await response.json()
      return product
    } catch (err) {
      error.value = (err as Error).message
      return null
    }
  }

  // Función para agregar un producto al carrito
  const addProduct = async (productId: number, quantity: number) => {
    const existingProduct = items.value.find((item) => item.id === productId)

    if (existingProduct) {
      existingProduct.quantity += quantity // Si ya está en el carrito, incrementar cantidad
    } else {
      const product = await fetchProduct(productId)
      if (product) {
        items.value.push({ ...product, quantity })
        if (!creationDate.value) {
          creationDate.value = new Date().toLocaleString() // Establecer fecha de creación
        }
      }
    }
  }

  // Computed para obtener el total de productos
  const totalProducts = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  // Computed para obtener el costo total del carrito
  const totalCost = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // Computed para verificar si hay errores
  const hasError = computed(() => !!error.value)

  return {
    items,
    error,
    creationDate,
    totalProducts,
    totalCost,
    addProduct,
    hasError,
  }
})
