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
          <ItemCard v-for="product in products" :key="product.title" :product="product" />
        </div>
      </div>
    </div>

    <div class="categories-box">
      <router-link
        v-for="category in categories"
        :key="category.category"
        :to="{
          name: 'LandingPage',
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
import { ref } from 'vue';


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

let products:any=ref([]);
function getProductsForLandingPage(){
  axios.get('/api/product/all').then((response) => {
    products.value=response.data;
  })
}
getProductsForLandingPage();

</script>
