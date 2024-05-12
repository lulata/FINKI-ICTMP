<template>
  <div class="container">
    <h1>Orders</h1>
    <hr />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Items</th>
          <th scope="col">Total</th>
          <th scope="col">Time</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <template v-for="item in order.orderItems" :key="item.id">
              <p>{{ item.productOrderItemResponse.name }} x{{ item.quantity }}</p>
            </template>
          </td>
          <td>
            {{ order.total }}
          </td>
          <td>
            {{ order.time }}
          </td>
          <td>
            {{ order.status }}
          </td>

          <td>
            <div class="table-buttons">
              <button type="button" class="btn btn-outline-dark" @click="selectOrder(order)">Status</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-container" v-if="selectedOrder">
    <div class="modal-box">
      <div class="modal-header">
        <h5 class="modal-title">Set Status</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="setStatus">
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select class="form-select" id="status" v-model="selectedOrder.status">
              <option value="PROCESSING">PROCESSING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="IN_TRANSIT">IN_TRANSIT</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELED">CANCELED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Orders } from '@/types';
import axios from 'axios';

const orders = ref<Orders[]>([]);
const selectedOrder = ref<Orders | null>(null);

onMounted(() => {
  getOrders();
});

function getOrders() {
  axios.get('/api/admin/orders').then((response) => {
    orders.value = response.data;
  });
}

function closeModal() {
  selectedOrder.value = null;
}

function setStatus() {
  if (selectedOrder.value) {
    axios
      .put(`/api/admin/order/${selectedOrder.value.id}/updateStatus`, { status: selectedOrder.value.status })
      .then(() => {
        getOrders();
        closeModal();
      });
  }
}

function selectOrder(order: Orders) {
  selectedOrder.value = structuredClone(order);
}
</script>
