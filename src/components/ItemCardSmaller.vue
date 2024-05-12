<template>
  <div class="item-card-smaller">
    <img :src="convertByteToImage(product.byteImage || '')" />
    <div class="item-card-smaller-info">
      <p>{{ product.name }}</p>
      <p v-if="sizeName">
        Size:
        <span>
          {{ sizeName }}
        </span>
      </p>
      <p v-if="quantity">
        Quantity:
        <span>
          {{ quantity }}
        </span>
      </p>
      <span>{{ product.price }} DEN</span>
      <button v-if="review && reviewOpened != true" class="btn btn-outline-dark" @click="reviewOpened = true">
        Review
      </button>
      <div v-if="reviewOpened">
        <select v-model="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button class="btn btn-primary" @click="addReview">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Product } from '@/types';
import axios from 'axios';
import { defineProps, ref } from 'vue';
const props = defineProps<{
  product: Product;
  sizeName?: string;
  quantity?: number;
  review?: boolean;
}>();
const rating = ref(5);
const reviewOpened = ref(false);
function convertByteToImage(byteImage: string) {
  return `data:image/png;base64,${byteImage}`;
}

function addReview() {
  axios
    .post(`/api/user/${window.userInfo?.id ?? 0}/product/${props.product.id}/review/add`, {
      description: '',
      rating: rating.value,
    })
    .then(() => {
      reviewOpened.value = false;
    });
}
</script>

<!-- GET /api/user/review/{id} (find review by id)
GET /api/user/{id}/review (find all reviews for given user, you can access this also in user-info)
GET /api/user/product/{id}/review (find all reviews for given product, PRODUCT RESPONSE ALSO PROVIDES
LIST OF REVIEWS THAT BELONG TO THE PRODUCT)
POST api/user/{userId}/product/{productId}/review/add (add new review for given product, provide
description and rating in json)  -->
