<template>
  <nav>
    <div class="navigation-section">
      <img src="@/assets/logo.svg" class="logo" />
      <router-link
        :to="{
          name: 'LandingPage',
        }"
        >Home</router-link
      >
      <router-link
        :to="{
          name: 'LandingPage',
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
      <img src="@/assets/accountIcon.svg" alt="" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import InputComponent from '@/components/InputComponent.vue';
</script>
