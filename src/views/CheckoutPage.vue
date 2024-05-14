<template>
  <div class="checkout-page">
    <p class="checkout-page-title">Checkout</p>
    <div class="checkout-page-box">
      <div class="checkout-page-box-item">
        <p class="checkout-page-box-item-title">Shipping Details</p>

        <InputComponent
          :place-holder="'Address'"
          v-model="orderInfo.address"
          :class="{
            'is-invalid': validation.address.$error,
          }"
          :error-message="validation.address.$error ? 'Required' : ''" />
        <InputComponent
          :place-holder="'Phone'"
          v-model="orderInfo.phoneNumber"
          :input-type="'tel'"
          :class="{
            'is-invalid': validation.phoneNumber.$error,
          }"
          :error-message="validation.phoneNumber.$error ? 'Required' : ''" />
        <InputComponent
          :place-holder="'Card Holder Name'"
          v-model="orderInfo.creditCardHolderName"
          :class="{
            'is-invalid': validation.creditCardHolderName.$error,
          }"
          :error-message="validation.creditCardHolderName.$error ? 'Required' : ''" />
        <InputComponent
          :place-holder="'Card Number'"
          v-model="orderInfo.creditCardNumber"
          :class="{
            'is-invalid': validation.creditCardNumber.$error,
          }"
          :input-type="'number'"
          :error-message="validation.creditCardNumber.$error ? 'Required' : ''" />
        <InputComponent
          :place-holder="'CCV'"
          v-model="orderInfo.creditCardCCV"
          :class="{
            'is-invalid': validation.creditCardCCV.$error,
          }"
          :input-type="'number'"
          :error-message="validation.creditCardCCV.$error ? 'Required' : ''" />
      </div>
      <div class="checkout-page-box-item">
        <p class="checkout-page-box-item-title">Your order</p>
        <div class="checkout-page-box-item-items">
          <ItemCardSmaller
            v-for="item in cartItems"
            :key="item.id"
            :product="item.productCartItemResponse"
            :quantity="item.quantity"
            :size-name="item.sizeName" />
        </div>
        <div class="checkout-page-box-item-total">
          <p>Total:</p>
          <p>{{ total }} DEN</p>
        </div>
        <button class="checkout-page-box-item-button" @click="createOrder">ORDER</button>
      </div>
    </div>
    <div class="checkout-page-success" v-if="orderSuccess">
      <div class="checkout-page-success-box">
        <div class="checkout-page-success-title">Your order has been successfully placed</div>
        <div class="checkout-page-success-sub-title">
          You will be redirected to the home page in {{ timeLeft }} seconds
        </div>
        <img src="@/assets/checkIcon.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import InputComponent from '@/components/InputComponent.vue';
import { onMounted, ref, computed } from 'vue';
import ItemCardSmaller from '@/components/ItemCardSmaller.vue';
import { CartItem } from '@/types';
import { useVuelidate, ValidationRule } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import router from '@/router';

const orderInfo = ref({
  address: '',
  phoneNumber: '',
  creditCardHolderName: '',
  creditCardNumber: '',
  creditCardCCV: '',
});
const cartItems = ref<CartItem[]>([]);
const orderSuccess = ref(false);
const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.quantity * item.productCartItemResponse.price, 0);
});
const timeLeft = ref(10);

const validationRules = computed(() => {
  const localRules: Record<string, Record<string, ValidationRule | Record<string, ValidationRule>>> = {};
  localRules.address = { required };
  localRules.phoneNumber = { required };
  localRules.creditCardHolderName = { required };
  localRules.creditCardNumber = { required };
  localRules.creditCardCCV = { required };

  return localRules;
});
const validation = useVuelidate(validationRules, orderInfo);

onMounted(() => {
  let cartId = 1;

  if (window.userInfo?.shoppingCart) {
    cartId = window.userInfo.shoppingCart;
  }
  axios.get(`/api/user/shoppingCart/${cartId}/items`).then((response) => {
    cartItems.value = response.data;

    if (cartItems.value.length === 0) {
      router.push({ name: 'LandingPage' });
    }
  });
});

function createOrder() {
  validation.value.$touch();
  if (validation.value.$invalid) {
    return;
  }

  axios
    .post(`/api/user/${window.userInfo?.id || 0}/creditCard/add`, {
      cardNumber: orderInfo.value.creditCardNumber,
      cvv: orderInfo.value.creditCardCCV,
      holderName: orderInfo.value.creditCardHolderName,
    })
    .then((response) => {
      const cardId = response.data.id;

      axios
        .post('/api/user/order/create', {
          address: orderInfo.value.address,
          phoneNumber: orderInfo.value.phoneNumber,
          creditCardId: cardId,
        })
        .then(() => {
          orderSuccess.value = true;
          setTimeout(() => {
            router.push({ name: 'LandingPage' });
          }, 10000);

          const interval = setInterval(() => {
            timeLeft.value -= 1;
            if (timeLeft.value === 0) {
              clearInterval(interval);
            }
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
