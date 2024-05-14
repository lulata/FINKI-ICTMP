<template>
  <div class="admin-pages" v-if="userInfo?.role === 'ADMIN'">
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

    <router-link
      :to="{
        name: 'AdminPageOrders',
      }"
      class="admin-page">
      All Orders
    </router-link>
  </div>
  <div class="profile-page">
    <div class="profile-page-title">My profile</div>
    <div class="profile-page-box">
      <div class="profile-page-box-info">
        <div class="profile-page-box-info-title">
          {{ userInfo?.firstName }}
          {{ userInfo?.lastName }}
        </div>
        <div class="profile-page-box-info-sub-title">
          {{ userInfo?.email }}
        </div>
      </div>
      <div class="profile-page-box-orders" v-if="orders && orders.length">
        <div class="profile-page-box-orders-title">My orders</div>
        <div class="profile-page-box-orders-list">
          <div class="profile-page-box-orders-list-item" v-for="order in orders" :key="order.id">
            <div class="profile-page-box-orders-list-item-box">
              <div class="profile-page-box-orders-list-item-box-title">Order #{{ order.id }}</div>
              <ItemCardSmaller
                v-for="item in order.orderItems"
                :key="item.id"
                :product="item.productOrderItemResponse"
                :quantity="item.quantity"
                :review="true"
                :size-name="item.sizeName" />
            </div>
            <div class="profile-page-box-orders-list-item-box">
              <div class="profile-page-box-orders-list-item-box-delivered">Delivered to: {{ order.address }}</div>

              <div class="profile-page-box-orders-list-item-box-total">
                <div class="profile-page-box-orders-list-item-box-total-place-holder">Total:</div>
                <div class="profile-page-box-orders-list-item-box-total-value">{{ order.total }} DEN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Orders } from '@/types';
import axios from 'axios';
import ItemCardSmaller from '@/components/ItemCardSmaller.vue';

const userInfo = ref(window.userInfo);

const orders = ref<Orders[]>([]);

onMounted(() => {
  getOrders();
});

function getOrders() {
  axios
    .get('/api/user/orders')
    .then((response) => {
      orders.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
