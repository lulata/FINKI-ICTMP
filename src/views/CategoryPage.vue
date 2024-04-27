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
      <div class="category-page-body-categories">
        <div
          class="category-page-body-categories-category"
          v-for="category in categories"
          :key="category.id"
          :class="{
              'category-page-body-categories-category-selected': selectedCategories.includes(category.id as number),
            }"
          @click="selectCategory(category)">
          {{ category.name }}
        </div>
      </div>
      <div class="category-page-body-items">
        <router-link
          :to="{ name: 'ProductPage', params: { id: product.id } }"
          v-for="product in filteredProducts"
          :key="product.id">
          <ItemCard :product="product" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ItemCard from '@/components/ItemCard.vue';
import { Category, Product } from '@/types';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const selectedCategories = ref<number[]>([]);

const filteredProducts = computed(() => {
  const category = router.currentRoute.value.params.id === 'men' ? 'MALE' : 'FEMALE';
  const filteredBySex = products.value.filter(
    (product) => product.gender === category || product.gender.toLowerCase() === 'unisex'
  );
  return selectedCategories.value.length === 0
    ? filteredBySex
    : filteredBySex.filter((product) => selectedCategories.value.includes(product.categoryId));
});

onMounted(() => {
  Promise.all([getProducts(), getCategories()]);
});

function getCategories() {
  return axios.get('/api/admin/category/all').then((response) => {
    categories.value = response.data;
  });
}

function getProducts() {
  return axios.get('/api/product/all').then((response) => {
    products.value = response.data;
  });
}

function selectCategory(category: Category) {
  if (selectedCategories.value.includes(category.id as number)) {
    selectedCategories.value = selectedCategories.value.filter((c) => c !== category.id);
  } else {
    selectedCategories.value = [...selectedCategories.value, category.id as number];
  }
}
</script>
