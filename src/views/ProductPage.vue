<template>
  <div class="product-page" v-if="product">
    <div class="product-page-header">
      <div class="product-page-header-image">
        <img :src="convertByteToImage(product.byteImage || '')" alt="" />
      </div>
      <div class="product-page-header-info">
        <p class="product-page-header-info-name">{{ product.name }}</p>
        <p class="product-page-header-info-price">{{ product.price }} Den</p>
        <p class="product-page-header-info-description" v-if="product.description">{{ product.description }}</p>
        <div class="product-page-header-info-sizes" v-if="product.sizes && product.sizes.length > 0">
          <p class="product-page-header-info-sizes-title">Select size:</p>
          <div class="product-page-header-info-sizes-box">
            <button
              class="product-page-header-info-sizes-box-size"
              v-for="size in product.sizes"
              :key="size.id"
              :disabled="size.quantity === 0"
              @click="selectSize(size.id as number)"
              :class="{ 'product-page-header-info-sizes-box-size-selected': sizeSelected === size.id }">
              {{ size.name }}
            </button>
          </div>
        </div>
        <button class="product-page-header-info-button" @click="addToCard()">Add to cart</button>
      </div>
    </div>
    <div class="best-seller-box">
      <p class="best-seller-box-title">Similar products</p>
      <div class="best-seller-box-items">
        <!-- FIX ROUTING -->
        <router-link
          v-for="product in products"
          :key="product.name"
          :to="{ name: 'ProductPage', params: { id: product.id } }">
          <ItemCard :product="product" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Product } from '@/types';
import ItemCard from '@/components/ItemCard.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const products = ref<Product[]>([]);
const product = ref<Product | null>(null);
const route = useRoute();
const sizeSelected = ref<number | null>(null);

onMounted(() => {
  Promise.all([getProduct(), getProducts()]);
});

function getProduct() {
  axios.get(`/api/product/${route.params.id}`).then((response) => {
    product.value = response.data;
    if (response.data.sizes && response.data.sizes.length > 0) {
      sizeSelected.value = response.data.sizes[0].id;
    }
  });
}

function getProducts() {
  axios.get('/api/product/all').then((response) => {
    products.value = response.data.slice(0, 4);
  });
}

function convertByteToImage(byteImage: string) {
  return `data:image/png;base64,${byteImage}`;
}

function selectSize(sizeId: number) {
  sizeSelected.value = sizeId;
}

function addToCard() {
  const cartId = 1;
  axios.post(`/api/user/shoppingCart/${cartId}/product/${product.value?.id}/size/${sizeSelected.value}/addCartItem`, {
    quantity: 1,
  });
}
</script>
