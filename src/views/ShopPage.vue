<template>
  <div class="shop-page">
    <div class="shop-page-header">
      <div class="shop-page-header-title">REFINED SPORTSWEAR</div>
    </div>
    <img src="@/assets/shopBanner.png" alt="" />
    <div class="shop-page-must-have">
      <router-link
        v-for="product in firstFourProducts"
        :key="product.name"
        :to="{ name: 'ProductPage', params: { id: product.id } }">
        <ItemCard :product="product" />
      </router-link>
    </div>
    <div class="shop-page-categories">
      <router-link
        v-for="category in categories"
        :key="category.category"
        :to="{
          name: 'CategoryPage',
          params: {
            id: category.category,
          },
        }">
        <img :src="category.image" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ItemCard from '@/components/ItemCard.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Product } from '@/types';

const categories = [
  {
    image: '/categories/men.png',
    category: 'men',
  },
  {
    image: '/categories/women.png',
    category: 'women',
  },
];

const allProducts = ref<Product[]>([]);
const firstFourProducts = ref<Product[]>([]);

const random3Products = ref<Product[]>([]);

onMounted(() => {
  getProductsForLandingPage();
});

function getProductsForLandingPage() {
  axios.get('/api/product/all').then((response) => {
    allProducts.value = response.data;
    firstFourProducts.value = response.data.slice(0, 4);
    random3Products.value = response.data.sort(() => Math.random() - Math.random()).slice(0, 3);
  });
}
</script>
