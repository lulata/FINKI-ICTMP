<template>
  <div class="container">
    <h1>Categories</h1>
    <hr />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">
            <div class="table-buttons">
              <button type="button" class="btn btn-outline-dark ml-auto" @click="modalOpen()">Add</button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">{{ category.id }}</th>
          <td>
            {{ category.name }}
          </td>
          <td>
            {{ category.description }}
          </td>
          <td>
            <div class="table-buttons">
              <button type="button" class="btn btn-outline-dark" @click="modalOpen(category)">Edit</button>
              <button type="button" class="btn btn-outline-danger" @click="deleteCategory(category)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-container" v-if="newCategory">
    <div class="modal-box">
      <div class="modal-header">
        <h5 class="modal-title">Add Category</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addCategory">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="newCategory.name" />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" v-model="newCategory.description"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Category } from '@/types';
import axios from 'axios';

const categories = ref<Category[]>([]);
const newCategory = ref<Category | null>(null);

onMounted(() => {
  getCategories();
});

function getCategories() {
  axios.get('/api/admin/category/all').then((response) => {
    categories.value = response.data;
  });
}

function modalOpen(category: Category | null = null) {
  console.log(category);
  if (category) {
    newCategory.value = category;
  } else {
    newCategory.value = {
      name: '',
      description: '',
    };
  }
}

function addCategory() {
  console.log(newCategory.value);
  if (newCategory.value) {
    if (newCategory.value.id) {
      axios.put(`/api/admin/category/${newCategory.value.id}/edit`, newCategory.value).then(() => {
        getCategories();
        closeModal();
      });
    } else {
      axios.post('/api/admin/category/add', newCategory.value).then(() => {
        getCategories();
        closeModal();
      });
    }
  }
}

function closeModal() {
  newCategory.value = null;
}

function deleteCategory(category: Category) {
  axios.delete(`/api/admin/category/${category.id}/delete`).then(() => {
    getCategories();
  });
}
</script>
