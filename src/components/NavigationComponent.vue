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
          name: 'LandingPage',
        }"
        >Men</router-link
      >
      <router-link
        :to="{
          name: 'LandingPage',
        }"
        >Women</router-link
      >
      <router-link
        :to="{
          name: 'LandingPage',
        }"
        >Kids</router-link
      >
    </div>
    <div class="navigation-section">
      <InputComponent :image="'/icons/searchIcon.svg'" />
      <img src="@/assets/heartIcon.svg" alt="" />
      <img src="@/assets/cartIcon.svg" alt="" />
      <img src="@/assets/accountIcon.svg" @click="authComponentOpened = true" v-if="!isAuthenticated" />
      <router-link
        v-else
        :to="{
          name: 'AdminPage',
        }">
        <img src="@/assets/accountIcon.svg" />
      </router-link>
    </div>
  </nav>
  <AuthComponent v-if="authComponentOpened" @close="authComponentOpened = false" />
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue';
import AuthComponent from '@/components/AuthComponent.vue';
import { ref, computed } from 'vue';

const authComponentOpened = ref(false);

const isAuthenticated = computed(() => {
  return window.isAuthenticated;
});
</script>
