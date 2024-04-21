<template>
  <div class="admin-pages">
    <router-link
      :to="{
        name: 'AdminPageCategory',
      }"
      class="admin-page"
      >Category</router-link
    >

    <router-link
      :to="{
        name: 'AdminPageProduct',
      }"
      class="admin-page">
      Product
    </router-link>
  </div>
</template>
