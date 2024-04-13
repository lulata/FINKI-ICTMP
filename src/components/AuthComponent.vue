<template>
  <div class="auth-component-background">
    <div class="auth-component">
      <div class="auth-component-box">
        <div class="auth-component-box-title">
          {{ isSignIn ? 'Sign In' : 'Sign Up' }}
        </div>
        <InputComponent :place-holder="'First name'" image="/icons/accountIcon.svg" />
        <InputComponent :place-holder="'Last name'" image="/icons/accountIcon.svg" />
        <InputComponent :place-holder="'Email'" image="/icons/mailIcon.svg" />
        <InputComponent :place-holder="'Password'" image="/icons/mailIcon.svg" />

        <button>{{ isSignIn ? 'Sign In' : 'Sign Up' }}</button>
        <div class="auth-component-box-link">
          {{ isSignIn ? 'Don’t have an account?' : 'Already have an account?' }}
          <span @click="isSignIn = !isSignIn">
            {{ isSignIn ? 'Sign Up' : 'Sign In' }}
          </span>
        </div>
        <button class="google-button">Sign in with Google</button>
      </div>
      <div class="auth-component-box">
        <img src="@/assets/logo.svg" alt="" />
      </div>
      <img src="@/assets/closeIcon.svg" class="close-icon" @click="close" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import InputComponent from '@/components/InputComponent.vue';

const isSignIn = ref(true);
const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>
