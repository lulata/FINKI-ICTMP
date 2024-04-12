<template>
  <div class="item-card">
    <img :src="product.image" />
    <p>{{ product.title }}</p>
    <div class="item-discount" v-if="product.discount">
      <p>{{ product.price }}</p>
      <p>{{ product.discount }}</p>
    </div>
    <p v-else>{{ product.price }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
  product: {
    image: string;
    title: string;
    price: string;
    discount: string | null;
  };
}>();
</script>
