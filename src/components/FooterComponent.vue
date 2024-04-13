<template>
  <footer>
    <div class="footer-box">
      <div class="footer-box-container">
        <div class="footer-box-container-title">NewsLetter</div>
        <div class="footer-box-container-input">
          <InputComponent image="/icons/mailIcon.svg" placeHolder="Email" />
          <button>Subscribe</button>
        </div>
      </div>
      <div class="footer-box-container">
        <div class="footer-box-container-title">Social Media</div>
        <div class="footer-box-container-social-media">
          <img src="/icons/instagram.svg" />
          <img src="/icons/facebook.svg" />
          <img src="/icons/twitter.svg" />
        </div>
      </div>
    </div>
    <div class="footer-box-bottom">
      <div class="footer-box-bottom-item">
        <div class="footer-box-bottom-item-title">Main Menu</div>
        <div class="footer-box-bottom-item-options">
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
            >Shop</router-link
          ><router-link
            :to="{
              name: 'LandingPage',
            }"
            >Option 3</router-link
          >
        </div>
      </div>

      <div class="footer-box-bottom-item">
        <div class="footer-box-bottom-item-title">Company</div>
        <div class="footer-box-bottom-item-options">
          <router-link
            :to="{
              name: 'LandingPage',
            }"
            >The company</router-link
          >
          <router-link
            :to="{
              name: 'LandingPage',
            }"
            >Careers</router-link
          ><router-link
            :to="{
              name: 'LandingPage',
            }"
            >Option 3</router-link
          >
        </div>
      </div>

      <div class="footer-box-bottom-item">
        <div class="footer-box-bottom-item-title">Discover</div>
        <div class="footer-box-bottom-item-options">
          <router-link
            :to="{
              name: 'LandingPage',
            }"
            >The team</router-link
          >
          <router-link
            :to="{
              name: 'LandingPage',
            }"
            >Our History</router-link
          ><router-link
            :to="{
              name: 'LandingPage',
            }"
            >Option 3</router-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import InputComponent from '@/components//InputComponent.vue';
</script>
