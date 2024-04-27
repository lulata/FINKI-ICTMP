<template>
  <div class="item-card">
    <img :src="convertByteToImage(product.byteImage || '')" />
    <p>{{ product.name }}</p>
    <p>{{ product.price }} Den</p>
  </div>
</template>

<script lang="ts" setup>
import { Product } from '@/types';
import { defineProps } from 'vue';
defineProps<{
  product: Product;
}>();

function convertByteToImage(byteImage: string) {
  return `data:image/png;base64,${byteImage}`;
}
</script>
