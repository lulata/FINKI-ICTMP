<template>
  <NavigationComponent />
  <router-view />
  <FooterComponent />
</template>

<script lang="ts" setup>
import NavigationComponent from '@/components/NavigationComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<style lang="scss">
@import '@/scss/main.scss';
</style>
