<template>
  <div class="input-component">
    <img :src="image" v-if="image" />
    <input
      :id="id"
      v-model="value"
      :type="inputType"
      :placeholder="placeHolder ? placeHolder : '' + (errorMessage ? ' - ' + errorMessage : '')" />
    <label :for="id"></label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineModel, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    inputType?: string;
    errorMessage?: string;
    image?: string;
    placeHolder?: string;
  }>(),
  {
    inputType: 'text',
  }
);

const value = defineModel();

const id = Math.random().toString(36).slice(2);
</script>
