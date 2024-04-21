<template>
  <div class="container">
    <h1>Products</h1>
    <hr />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Category</th>
          <th scope="col">Color</th>
          <th scope="col">Gender</th>
          <th scope="col">Description</th>
          <th scope="col">
            <div class="table-buttons">
              <button type="button" class="btn btn-outline-dark ml-auto" @click="modalOpen()">Add</button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td>
            <img :src="convertByteToImage(product.byteImage ?? '')" alt="" />
          </td>
          <td>
            {{ product.name }}
          </td>
          <td>
            {{ product.price }}
          </td>
          <td>
            {{ categories.find((category) => category.id === product.categoryId)?.name }}
          </td>
          <td>
            {{ product.color }}
          </td>
          <td>
            {{ product.gender }}
          </td>
          <td>
            {{ product.description }}
          </td>
          <td>
            <div class="table-buttons">
              <button type="button" class="btn btn-outline-dark" @click="modalOpen(product)">Edit</button>
              <button type="button" class="btn btn-outline-danger" @click="deleteCategory(product)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-container" v-if="newProduct">
    <div class="modal-box">
      <div class="modal-header">
        <h5 class="modal-title">Add Product</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addProduct">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="newProduct.name" />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control" id="price" v-model="newProduct.price" />
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <select class="form-select" id="category" v-model="newProduct.categoryId">
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="color" class="form-label">Color</label>
            <select class="form-select" id="color" v-model="newProduct.color">
              <option v-for="color in colors" :key="color" :value="color">
                {{ color }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select class="form-select" id="category" v-model="newProduct.gender">
              <option v-for="gender in genders" :key="gender" :value="gender">
                {{ gender }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" v-model="newProduct.description"></textarea>
          </div>

          <div class="mb-3">
            <label for="formFile" class="form-label"> Image </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="
                ($event:any) => {
                  if(newProduct)
                  newProduct.image = $event.target.files[0] ;
                }
              " />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Category, Product } from '@/types';
import axios from 'axios';

const categories = ref<Category[]>([]);
const newProduct = ref<Product | null>(null);
const products = ref<Product[]>([]);
const colors = window.colors;
const genders = window.genders;

onMounted(() => {
  Promise.all([getCategories(), getProducts()]);
});

function getCategories() {
  axios.get('/api/admin/category/all').then((response) => {
    categories.value = response.data;
  });
}

function getProducts() {
  axios.get('/api/product/all').then((response) => {
    products.value = response.data;
  });
}

function modalOpen(product: Product | null = null) {
  console.log(product);
  if (product) {
    newProduct.value = product;
  } else {
    newProduct.value = {
      name: '',
      price: 0,
      categoryId: 0,
      color: '',
      gender: '',
      description: '',
      image: null,
    };
  }
}

function addProduct() {
  if (newProduct.value) {
    const formData = new FormData();
    formData.append('name', newProduct.value.name);
    formData.append('price', newProduct.value.price.toString());
    formData.append('categoryId', newProduct.value.categoryId.toString());
    formData.append('color', newProduct.value.color);
    formData.append('description', newProduct.value.description);
    formData.append('image', newProduct.value.image as File);
    formData.append('gender', newProduct.value.gender);

    if (newProduct.value.id) {
      axios.put(`/api/admin/product/${newProduct.value.id}/edit`, formData).then(() => {
        getProducts();
        closeModal();
      });
    } else {
      axios.post('/api/admin/product/add', formData).then(() => {
        getProducts();
        closeModal();
      });
    }
  }
}

function closeModal() {
  newProduct.value = null;
}

function deleteCategory(category: Category) {
  axios.delete(`/api/admin/category/${category.id}/delete`).then(() => {
    getCategories();
  });
}

function convertByteToImage(byteImage: string) {
  return `data:image/png;base64,${byteImage}`;
}
</script>
