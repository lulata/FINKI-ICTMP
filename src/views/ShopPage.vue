<template>
  <div class="shop-page">
    <div class="shop-page-header">
      <div class="shop-page-header-title">REFINED SPORTSWEAR</div>
    </div>
    <img src="@/assets/shopBanner.png" alt="" />
    <div class="shop-page-must-have">
      <router-link
        v-for="product in random3Products"
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
    <div class="shop-page-cta">
      <div class="shop-page-cta-box">
        <img src="@/assets/shopPageCoupon.png" alt="" />
        <div class="shop-page-cta-box-info">
          <div class="shop-page-cta-box-info-title">Never Miss a Sale</div>
          <div class="shop-page-cta-box-info-cta">
            <InputComponent :place-holder="'Email'" image="/icons/mailIcon.svg" :input-type="'email'" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
    <div class="shop-page-best-sellers">
      <p class="shop-page-best-sellers-title">Best Sellers</p>
      <div class="shop-page-best-sellers-items">
        <router-link
          v-for="product in firstFourProducts"
          :key="product.name"
          :to="{ name: 'ProductPage', params: { id: product.id } }">
          <ItemCard :product="product" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ItemCard from '@/components/ItemCard.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Product } from '@/types';
import InputComponent from '@/components/InputComponent.vue';

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
