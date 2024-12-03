<template>
  <tr>
    <td class="border border-gray-200 px-4 py-2">
      <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover" />
    </td>
    <td class="border border-gray-200 px-4 py-2">{{ item.title }}</td>
    <td class="border border-gray-200 px-4 py-2">{{ item.quantity }}</td>
    <td class="border border-gray-200 px-4 py-2">${{ item.price }}</td>
    <td class="border border-gray-200 px-4 py-2">${{ (item.price * item.quantity).toFixed(2) }}</td>
  </tr>
</template>

<script setup>
defineProps({
  item: Object,
})
</script>
