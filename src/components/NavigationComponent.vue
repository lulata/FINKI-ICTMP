<template>
  <nav>
    <div class="navigation-section">
      <router-link
        :to="{
          name: 'LandingPage',
        }"
        ><img src="@/assets/logo.svg" class="logo"
      /></router-link>

      <router-link
        :to="{
          name: 'LandingPage',
        }"
        >Home</router-link
      >
      <router-link
        :to="{
          name: 'ShopPage',
        }"
        >Shop
      </router-link>
      <router-link
        :to="{
          name: 'CategoryPage',
          params: {
            id: 'men',
          },
        }"
        >Men</router-link
      >
      <router-link
        :to="{
          name: 'CategoryPage',
          params: {
            id: 'women',
          },
        }"
        >Women</router-link
      >
    </div>
    <div class="navigation-section">
      <InputComponent :image="'/icons/searchIcon.svg'" />
      <img
        src="@/assets/cartIcon.svg"
        @click="isAuthenticated ? (cartComponentOpened = true) : (authComponentOpened = true)" />
      <img src="@/assets/accountIcon.svg" @click="authComponentOpened = true" v-if="!isAuthenticated" />
      <router-link
        v-else
        :to="{
          name: 'ProfilePage',
        }">
        <img src="@/assets/accountIcon.svg" />
      </router-link>
    </div>
  </nav>
  <AuthComponent v-if="authComponentOpened" @close="authComponentOpened = false" />
  <CartComponent v-if="cartComponentOpened" @close="cartComponentOpened = false" />
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue';
import AuthComponent from '@/components/AuthComponent.vue';
import CartComponent from '@/components/CartComponent.vue';
import { ref, computed } from 'vue';

const authComponentOpened = ref(false);
const cartComponentOpened = ref(false);

const isAuthenticated = computed(() => {
  return window.isAuthenticated;
});
</script>
