<template>
  <div class="product-page" v-if="product">
    <div class="product-page-header">
      <div class="product-page-header-image">
        <img :src="convertByteToImage(product.byteImage || '')" alt="" />
        <div
          class="product-page-header-reviews"
          v-if="product.reviews && product.reviews.length"
          @click="reviewsOpened = true">
          {{ calculateReviews() }}
          <div class="product-page-header-reviews-box">
            <div v-html="calculateStars()" class="product-page-header-reviews-stars"></div>
            <p class="product-page-header-reviews-text">based on {{ product.reviews.length }} reviews</p>
          </div>
        </div>
      </div>
      <div class="product-page-header-info">
        <p class="product-page-header-info-name">{{ product.name }}</p>
        <p class="product-page-header-info-price">{{ product.price }} Den</p>
        <p class="product-page-header-info-description" v-if="product.description">{{ product.description }}</p>
        <div class="product-page-header-info-sizes" v-if="product.sizes && product.sizes.length > 0">
          <p class="product-page-header-info-sizes-title">Select size:</p>
          <div class="product-page-header-info-sizes-box">
            <button
              class="product-page-header-info-sizes-box-size"
              v-for="size in product.sizes"
              :key="size.id"
              :disabled="size.quantity === 0"
              @click="selectSize(size.id as number)"
              :class="{ 'product-page-header-info-sizes-box-size-selected': sizeSelected === size.id }">
              {{ size.name }}
            </button>
          </div>
        </div>
        <button class="product-page-header-info-button" @click="addToCard()">Add to cart</button>
      </div>
    </div>
    <div class="best-seller-box">
      <p class="best-seller-box-title">Similar products</p>
      <div class="best-seller-box-items">
        <router-link
          v-for="product in products"
          :key="product.name"
          :to="{ name: 'ProductPage', params: { id: product.id } }">
          <ItemCard :product="product" />
        </router-link>
      </div>
    </div>

    <div class="product-page-reviews" v-if="reviewsOpened === true">
      <div class="product-page-reviews-box">
        <svg
          class="product-page-reviews-box-close"
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="reviewsOpened = false">
          <path
            d="M16.8 34L24 26.8L31.2 34L34 31.2L26.8 24L34 16.8L31.2 14L24 21.2L16.8 14L14 16.8L21.2 24L14 31.2L16.8 34ZM24 44C21.2333 44 18.6333 43.4747 16.2 42.424C13.7667 41.3733 11.65 39.9487 9.85 38.15C8.05 36.35 6.62533 34.2333 5.576 31.8C4.52667 29.3667 4.00133 26.7667 4 24C4 21.2333 4.52533 18.6333 5.576 16.2C6.62667 13.7667 8.05133 11.65 9.85 9.85C11.65 8.05 13.7667 6.62533 16.2 5.576C18.6333 4.52667 21.2333 4.00133 24 4C26.7667 4 29.3667 4.52533 31.8 5.576C34.2333 6.62667 36.35 8.05133 38.15 9.85C39.95 11.65 41.3753 13.7667 42.426 16.2C43.4767 18.6333 44.0013 21.2333 44 24C44 26.7667 43.4747 29.3667 42.424 31.8C41.3733 34.2333 39.9487 36.35 38.15 38.15C36.35 39.95 34.2333 41.3753 31.8 42.426C29.3667 43.4767 26.7667 44.0013 24 44ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40Z"
            fill="black" />
        </svg>

        <div class="product-page-reviews-box-title">Reviews ({{ product.reviews.length }})</div>
        <div class="product-page-reviews-box-info">
          <div class="product-page-reviews-box-info-rating">
            <div class="product-page-reviews-box-info-rating-box">
              <div class="product-page-reviews-box-info-rating-box-details">
                {{ calculateReviews() }}
                <div class="product-page-reviews-box-info-rating-box-details-info">out of 5</div>
              </div>
              <div v-html="calculateStars()" class="product-page-header-reviews-stars"></div>
            </div>
            <div class="product-page-reviews-box-info-rating-box">
              <div class="product-page-reviews-box-info-rating-box-item">
                <p class="product-page-reviews-box-info-rating-box-item-title">Excellent</p>
                <div class="product-page-reviews-box-info-rating-box-item-bar">
                  <div
                    class="product-page-reviews-box-info-rating-box-item-bar-fill"
                    :style="{
                      width:
                        (product.reviews.filter((review) => review.rating === 5).length / product.reviews.length) *
                          100 +
                        '%',
                    }"></div>
                </div>
                <p class="product-page-reviews-box-info-rating-box-item-value">
                  {{ product.reviews.filter((review) => review.rating === 5).length }}
                </p>
              </div>

              <div class="product-page-reviews-box-info-rating-box-item">
                <p class="product-page-reviews-box-info-rating-box-item-title">Very Good</p>
                <div class="product-page-reviews-box-info-rating-box-item-bar">
                  <div
                    class="product-page-reviews-box-info-rating-box-item-bar-fill"
                    :style="{
                      width:
                        (product.reviews.filter((review) => review.rating === 4).length / product.reviews.length) *
                          100 +
                        '%',
                    }"></div>
                </div>
                <p class="product-page-reviews-box-info-rating-box-item-value">
                  {{ product.reviews.filter((review) => review.rating === 4).length }}
                </p>
              </div>

              <div class="product-page-reviews-box-info-rating-box-item">
                <p class="product-page-reviews-box-info-rating-box-item-title">Average</p>
                <div class="product-page-reviews-box-info-rating-box-item-bar">
                  <div
                    class="product-page-reviews-box-info-rating-box-item-bar-fill"
                    :style="{
                      width:
                        (product.reviews.filter((review) => review.rating === 3).length / product.reviews.length) *
                          100 +
                        '%',
                    }"></div>
                </div>
                <p class="product-page-reviews-box-info-rating-box-item-value">
                  {{ product.reviews.filter((review) => review.rating === 3).length }}
                </p>
              </div>

              <div class="product-page-reviews-box-info-rating-box-item">
                <p class="product-page-reviews-box-info-rating-box-item-title">Poor</p>
                <div class="product-page-reviews-box-info-rating-box-item-bar">
                  <div
                    class="product-page-reviews-box-info-rating-box-item-bar-fill"
                    :style="{
                      width:
                        (product.reviews.filter((review) => review.rating === 2).length / product.reviews.length) *
                          100 +
                        '%',
                    }"></div>
                </div>
                <p class="product-page-reviews-box-info-rating-box-item-value">
                  {{ product.reviews.filter((review) => review.rating === 2).length }}
                </p>
              </div>

              <div class="product-page-reviews-box-info-rating-box-item">
                <p class="product-page-reviews-box-info-rating-box-item-title">Terrible</p>
                <div class="product-page-reviews-box-info-rating-box-item-bar">
                  <div
                    class="product-page-reviews-box-info-rating-box-item-bar-fill"
                    :style="{
                      width:
                        (product.reviews.filter((review) => review.rating === 1).length / product.reviews.length) *
                          100 +
                        '%',
                    }"></div>
                </div>
                <p class="product-page-reviews-box-info-rating-box-item-value">
                  {{ product.reviews.filter((review) => review.rating === 1).length }}
                </p>
              </div>
            </div>
          </div>
          <div class="product-page-reviews-box-info-details"></div>
        </div>
        <div class="product-page-reviews-box-reviews">
          <div class="product-page-reviews-box-reviews-item" v-for="review in product.reviews" :key="review.id">
            <p class="product-page-reviews-box-reviews-item-header-name">{{ review.user }}</p>
            <div v-html="calculateStarsForUser(review.rating)" class="product-page-header-reviews-stars"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Product } from '@/types';
import ItemCard from '@/components/ItemCard.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const products = ref<Product[]>([]);
const product = ref<Product | null>(null);
const route = useRoute();
const sizeSelected = ref<number | null>(null);
const reviewsOpened = ref(false);

onMounted(() => {
  Promise.all([getProduct(), getProducts()]);
});

function getProduct() {
  axios.get(`/api/product/${route.params.id}`).then((response) => {
    product.value = response.data;
    if (response.data.sizes && response.data.sizes.length > 0) {
      sizeSelected.value = response.data.sizes[0].id;
    }
  });
}

function getProducts() {
  axios.get('/api/product/all').then((response) => {
    products.value = response.data.slice(0, 4);
  });
}

function convertByteToImage(byteImage: string) {
  return `data:image/png;base64,${byteImage}`;
}

function selectSize(sizeId: number) {
  sizeSelected.value = sizeId;
}

function addToCard() {
  let cartId = 1;

  console.log(product.value);

  if (
    product.value?.sizes === undefined ||
    product.value?.sizes === null ||
    product.value?.sizes.length === 0 ||
    sizeSelected.value === null
  ) {
    alert('Please select a size');
    return;
  }

  if (window.userInfo?.shoppingCart !== undefined && window.userInfo.shoppingCart !== null) {
    cartId = window.userInfo.shoppingCart;
  }

  axios.post(`/api/user/shoppingCart/${cartId}/product/${product.value?.id}/size/${sizeSelected.value}/addCartItem`, {
    quantity: 1,
  });
}

function calculateReviews() {
  const reviews = product.value?.reviews;
  if (!reviews) {
    return '';
  }
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

function calculateStars() {
  const reviews = product.value?.reviews;
  if (!reviews) {
    return '';
  }
  const notFilledStars = ` <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' viewBox='0 0 16 15' fill='none'>
    <path
      d='M3.78379 9.59355L2.91883 14.561C2.89597 14.7036 2.95312 14.8424 3.07124 14.9287C3.18937 15.0113 3.34559 15.0225 3.47134 14.9587L8.00191 12.6138L12.5325 14.9587C12.5896 14.9887 12.6506 15 12.7078 15C12.7878 15 12.864 14.9775 12.9326 14.9287C13.0507 14.8462 13.1078 14.7036 13.085 14.561L12.22 9.59355L15.8856 6.07429C15.9885 5.97299 16.0266 5.82666 15.9809 5.68784C15.9352 5.55278 15.817 5.45148 15.6722 5.43272L10.6044 4.7086L8.34484 0.191346C8.21529 -0.0637819 7.78852 -0.0637819 7.66278 0.191346L5.39559 4.71236L0.327754 5.43647C0.182959 5.45523 0.0648361 5.55653 0.0191113 5.6916C-0.0266136 5.82666 0.0114905 5.97674 0.114371 6.07804L3.78379 9.59355ZM5.70042 5.42521C5.82616 5.40645 5.93286 5.33142 5.9862 5.21886L8.00191 1.20435L10.0138 5.21886C10.071 5.33142 10.1776 5.40645 10.2996 5.42521L14.7997 6.07054L11.5418 9.19585C11.4503 9.28214 11.4122 9.40595 11.4313 9.52976L12.201 13.942L8.17718 11.8597C8.06668 11.8034 7.93332 11.8034 7.82282 11.8597L3.79903 13.942L4.56873 9.52976C4.59159 9.4097 4.54968 9.28214 4.45823 9.19585L1.20034 6.07054L5.70042 5.42521Z'
      fill='#D16E3F'
    />
  </svg>`;
  const filledStarts = `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path
                d="M8 12.0553L12.944 15L11.636 9.45L16 5.71974L10.248 5.23026L8 0L5.752 5.23026L0 5.71974L4.364 9.45L3.056 15L8 12.0553Z"
                fill="#D16E3F" />
            </svg>`;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);

  const filledStarsNumber = Math.floor(sum / reviews.length);
  const notFilledStarsNumber = 5 - filledStarsNumber;
  return filledStarts.repeat(filledStarsNumber) + notFilledStars.repeat(notFilledStarsNumber);
}

function calculateStarsForUser(rating: number) {
  const notFilledStars = `
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' viewBox='0 0 16 15' fill='none'>
    <path
      d='M3.78379 9.59355L2.91883 14.561C2.89597 14.7036 2.95312 14.8424 3.07124 14.9287C3.18937 15.0113 3.34559 15.0225 3.47134 14.9587L8.00191 12.6138L12.5325 14.9587C12.5896 14.9887 12.6506 15 12.7078 15C12.7878 15 12.864 14.9775 12.9326 14.9287C13.0507 14.8462 13.1078 14.7036 13.085 14.561L12.22 9.59355L15.8856 6.07429C15.9885 5.97299 16.0266 5.82666 15.9809 5.68784C15.9352 5.55278 15.817 5.45148 15.6722 5.43272L10.6044 4.7086L8.34484 0.191346C8.21529 -0.0637819 7.78852 -0.0637819 7.66278 0.191346L5.39559 4.71236L0.327754 5.43647C0.182959 5.45523 0.0648361 5.55653 0.0191113 5.6916C-0.0266136 5.82666 0.0114905 5.97674 0.114371 6.07804L3.78379 9.59355ZM5.70042 5.42521C5.82616 5.40645 5.93286 5.33142 5.9862 5.21886L8.00191 1.20435L10.0138 5.21886C10.071 5.33142 10.1776 5.40645 10.2996 5.42521L14.7997 6.07054L11.5418 9.19585C11.4503 9.28214 11.4122 9.40595 11.4313 9.52976L12.201 13.942L8.17718 11.8597C8.06668 11.8034 7.93332 11.8034 7.82282 11.8597L3.79903 13.942L4.56873 9.52976C4.59159 9.4097 4.54968 9.28214 4.45823 9.19585L1.20034 6.07054L5.70042 5.42521Z'
      fill='#D16E3F'
    />
  </svg>`;
  const filledStarts = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path
                d="M8 12.0553L12.944 15L11.636 9.45L16 5.71974L10.248 5.23026L8 0L5.752 5.23026L0 5.71974L4.364 9.45L3.056 15L8 12.0553Z"
                fill="#D16E3F" />
            </svg>`;

  const filledStarsNumber = rating;
  const notFilledStarsNumber = 5 - filledStarsNumber;
  return filledStarts.repeat(filledStarsNumber) + notFilledStars.repeat(notFilledStarsNumber);
}
</script>
