<template>
  <div class="category-page">
    <div class="category-page-header">
      <img src="@/assets/menCategory.png" v-if="$route.params.id === 'men'" />
      <img src="@/assets/womenCategory.png" v-if="$route.params.id === 'women'" />
      <div class="category-page-header-title">
        {{ $route.params.id }}
      </div>
    </div>
    <div class="category-page-body">
      <div class="category-page-body-items">
        <router-link
          :to="{ name: 'ProductPage', params: { id: product.id } }"
          v-for="product in products"
          :key="product.id">
          <ItemCard :product="product" />
        </router-link>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <span v-for="(size, index) in 6" :key="index" class="col-md-1">
        <button type="button" class="btn btn-info">Info</button>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ItemCard from '@/components/ItemCard.vue';
import { Product } from '@/types';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = ref<Product[]>([]);

onMounted(() => {
  Promise.all([getProducts()]);
});

let categories: any = ref([]);
function getCategories() {
  axios.get('/api/admin/category/all').then((response) => {
    categories.value = response.data;
  });
}

function getProducts() {
  axios.get('/api/product/all').then((response) => {
    products.value = response.data;
  });
}
getCategories();
console.log(categories);
console.log(categories.value);
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
}
#mencontainer {
  text-align: center;
}
</style>
