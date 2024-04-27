<template>
  <div class="landing-page">
    <div class="landing-page-header">
      <img src="@/assets/landingGirl.png" alt="" />
      <div class="landing-page-header-box">
        <p class="sub-title-text">Zero crows, multiple brands.</p>
        <p class="title-text">Welcome to Store 26!</p>
        <router-link
          :to="{
            name: 'ShopPage',
          }">
          SHOP NOW
        </router-link>
      </div>
    </div>
    <div class="best-seller-box">
      <p class="best-seller-box-title">Best Sellers</p>
      <div class="best-seller-box-items">
        <div class="best-seller-box-items-box">
          <router-link
            v-for="product in products"
            :key="product.name"
            :to="{ name: 'ProductPage', params: { id: product.id } }">
            <ItemCard :product="product" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="categories-box">
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

    <div class="promotions-box">
      <img src="/promotion/promotionBackground.png" class="promotion-background" />
      <img src="/promotion/promotion1.png" />
      <div class="promotions-box-inner">
        <img src="/promotion/promotion2.png" />
        <img src="/promotion/promotion3.png" />
      </div>
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

const products = ref<Product[]>([]);

onMounted(() => {
  getProductsForLandingPage();
});

function getProductsForLandingPage() {
  axios.get('/api/product/all').then((response) => {
    products.value = response.data.slice(0, 4);
  });
}
</script>
