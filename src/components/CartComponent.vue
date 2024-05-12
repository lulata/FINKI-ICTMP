<template>
  <div class="cart-component-background">
    <div class="cart-component">
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" @click="close">
        <path
          d="M16.8 34L24 26.8L31.2 34L34 31.2L26.8 24L34 16.8L31.2 14L24 21.2L16.8 14L14 16.8L21.2 24L14 31.2L16.8 34ZM24 44C21.2333 44 18.6333 43.4747 16.2 42.424C13.7667 41.3733 11.65 39.9487 9.85 38.15C8.05 36.35 6.62533 34.2333 5.576 31.8C4.52667 29.3667 4.00133 26.7667 4 24C4 21.2333 4.52533 18.6333 5.576 16.2C6.62667 13.7667 8.05133 11.65 9.85 9.85C11.65 8.05 13.7667 6.62533 16.2 5.576C18.6333 4.52667 21.2333 4.00133 24 4C26.7667 4 29.3667 4.52533 31.8 5.576C34.2333 6.62667 36.35 8.05133 38.15 9.85C39.95 11.65 41.3753 13.7667 42.426 16.2C43.4767 18.6333 44.0013 21.2333 44 24C44 26.7667 43.4747 29.3667 42.424 31.8C41.3733 34.2333 39.9487 36.35 38.15 38.15C36.35 39.95 34.2333 41.3753 31.8 42.426C29.3667 43.4767 26.7667 44.0013 24 44ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40Z"
          fill="black" />
      </svg>

      <div class="cart-component-title">My cart</div>
      <template v-if="cartItems && cartItems.length">
        <div class="cart-component-items">
          <ItemCardSmaller
            v-for="item in cartItems"
            :key="item.id"
            :product="item.productCartItemResponse"
            :quantity="item.quantity"
            :size-name="item.sizeName" />
        </div>
        <div class="cart-component-total">
          <div class="cart-component-total-text">Total:</div>
          <div class="cart-component-total-text">{{ total }} DEN</div>
        </div>

        <router-link
          :to="{
            name: 'CheckoutPage',
          }"
          @click="close"
          class="cart-component-checkout-button">
          Checkout
        </router-link>
        <p @click="close" class="cart-component-close-text">Continue shopping</p>
      </template>
      <p @click="close" class="cart-component-close-text" v-else>Your cart is empty</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, defineEmits } from 'vue';
import axios from 'axios';
import { CartItem } from '@/types';
import ItemCardSmaller from './ItemCardSmaller.vue';

const cartItems = ref<CartItem[]>([]);
const emit = defineEmits(['close']);

const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.quantity * item.productCartItemResponse.price, 0);
});

onMounted(() => {
  let cartId = 1;

  if (window.userInfo?.shoppingCartId) {
    cartId = window.userInfo.shoppingCartId;
  }
  axios.get(`/api/user/shoppingCart/${cartId}/items`).then((response) => {
    cartItems.value = response.data;
  });
});

function close() {
  emit('close');
}
</script>
