<template>
  <div class="auth-component-background">
    <form class="auth-component" @submit.prevent="auth">
      <div class="auth-component-box">
        <div class="auth-component-box-title">
          {{ isSignIn ? 'Sign In' : 'Sign Up' }}
        </div>
        <InputComponent
          :place-holder="'First name'"
          image="/icons/accountIcon.svg"
          v-model="userInfo.firstName"
          :class="{
            'is-invalid': validation.firstName.$error,
          }"
          :error-message="validation.firstName.$error ? 'Required' : ''"
          v-if="!isSignIn" />
        <InputComponent
          :place-holder="'Last name'"
          image="/icons/accountIcon.svg"
          v-model="userInfo.lastName"
          :class="{
            'is-invalid': validation.lastName.$error,
          }"
          :error-message="validation.lastName.$error ? 'Required' : ''"
          v-if="!isSignIn" />
        <InputComponent
          :place-holder="'Email'"
          image="/icons/mailIcon.svg"
          v-model="userInfo.email"
          :input-type="'email'"
          :class="{
            'is-invalid': validation.email.$error,
          }"
          :error-message="validation.email.$error ? 'Required' : ''" />
        <InputComponent
          :place-holder="'Password'"
          image="/icons/passwordIcon.svg"
          v-model="userInfo.password"
          :input-type="'password'"
          :class="{
            'is-invalid': validation.password.$error,
          }"
          :error-message="validation.password.$error ? 'Required' : ''" />

        <button type="submit">{{ isSignIn ? 'Sign In' : 'Sign Up' }}</button>
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
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import { useVuelidate, ValidationRule } from '@vuelidate/core';
import { requiredIf, required, email } from '@vuelidate/validators';
import axios from 'axios';

const isSignIn = ref(true);
const emit = defineEmits(['close']);

const userInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const validationRules = computed(() => {
  const localRules: Record<string, Record<string, ValidationRule | Record<string, ValidationRule>>> = {};
  localRules.firstName = { required: requiredIf(() => !isSignIn.value) };
  localRules.lastName = { required: requiredIf(() => !isSignIn.value) };
  localRules.email = {
    required,
    email,
  };
  localRules.password = { required };

  return localRules;
});
const validation = useVuelidate(validationRules, userInfo);

function close() {
  emit('close');
  userInfo.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
}

function auth() {
  validation.value.$touch();
  if (validation.value.$invalid) {
    return;
  }

  if (isSignIn.value) {
    axios
      .post('/api/auth/login', {
        email: userInfo.value.email,
        password: userInfo.value.password,
      })
      .then((response) => {
        window.token = response.data.token;
        window.isAuthenticated = true;
        document.cookie = `store26Token=${window.token}`;
        axios.get('/api/auth/user-info').then((response) => {
          window.userInfo = response.data;
        });
        close();
      })
      .catch(() => {
        console.log('Sign In failed');
      });
  } else {
    axios
      .post('/api/auth/register', {
        firstName: userInfo.value.firstName,
        lastName: userInfo.value.lastName,
        email: userInfo.value.email,
        password: userInfo.value.password,
      })
      .then(() => {
        isSignIn.value = true;
      })
      .catch(() => {
        console.log('Sign Up failed');
      });
  }
}
</script>
