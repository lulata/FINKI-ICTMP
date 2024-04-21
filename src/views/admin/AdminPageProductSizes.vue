<template>
  <div class="container" v-if="product">
    <h1>{{ product.name }} Sizes</h1>
    <hr />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">
            <div class="table-buttons">
              <button type="button" class="btn btn-outline-dark ml-auto" @click="modalOpen()">Add</button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(size, index) in product.sizes" :key="index">
          <td>
            {{ size.name }}
          </td>

          <td>
            {{ size.quantity }}
          </td>
          <td>
            <div class="table-buttons">
              <button type="button" class="btn btn-outline-dark" @click="modalOpen(size)">Edit</button>
              <button type="button" class="btn btn-outline-danger" @click="deleteCategory(size)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-container" v-if="newProduct">
    <div class="modal-box">
      <div class="modal-header">
        <h5 class="modal-title">Add Product Size</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addProduct">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="newProduct.name" />
          </div>
          <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="quantity" v-model="newProduct.quantity" />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Product, ProductSize } from '@/types';
import axios from 'axios';
import router from '@/router';

const newProduct = ref<ProductSize | null>(null);
const product = ref<Product | null>(null);

onMounted(() => {
  getProducts();
});

function getProducts() {
  axios.get('/api/product/' + router.currentRoute.value.params.id).then((response) => {
    product.value = response.data;
  });
}

function modalOpen(product: ProductSize | null = null) {
  if (product) {
    newProduct.value = structuredClone(product);
  } else {
    newProduct.value = {
      name: '',
      quantity: 0,
    };
  }
}

function addProduct() {
  if (newProduct.value) {
    if (newProduct.value.id) {
      axios.put(`/api/admin/product/size/${newProduct.value.id}/edit`, newProduct.value).then(() => {
        getProducts();
        closeModal();
      });
    } else {
      axios.post(`/api/admin/product/${router.currentRoute.value.params.id}/size/add`, newProduct.value).then(() => {
        getProducts();
        closeModal();
      });
    }
  }
}

function closeModal() {
  newProduct.value = null;
}

function deleteCategory(category: ProductSize) {
  axios.delete(`/api/admin/product/size/${category.id}/delete`).then(() => {
    getProducts();
  });
}
</script>
