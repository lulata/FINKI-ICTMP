<template>
    
    <div class="container">
    <h4>Route</h4>
        <div class="container">
            <div class="card flex-row"><img class="card-img-left example-card-img-responsive" src=""/>
                <div class="card-body">
                <h4 class="card-title h3">Product Title</h4>
                <h6>Price $$$</h6>
                <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <div class="container">
                        <div class="row">
                            <span v-for="(size,index) in 5" :key="index" class="col-md-1">
                                <button type="button" class="btn btn-info" >Info</button>
                            </span>
                        </div>
                    </div>
                <button type="button" class="btn btn-primary">Add To Cart</button>
            </div>
            </div>
        </div>
    </div>
    <div class="container">
    <h3>More About the product</h3>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
    <div class="best-seller-box">
      <p class="best-seller-box-title">Similar products</p>
      <div class="best-seller-box-items">
        <div class="best-seller-box-items-box">
          <router-link
            v-for="product in products"
            :key="product.name"
            :to="{ name: 'ProductPage', params: { id: product.id } }">
            <ItemCard :product="product" />
          </router-link>
        </div>
      </div>
    </div>

</template>
<script lang="ts" setup>
import { Product } from '@/types';
import ItemCard from '@/components/ItemCard.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const products = ref<Product[]>([]);

onMounted(() => {
  getProductsForLandingPage();
});

function getProductsForLandingPage() {
  axios.get('/api/product/all').then((response) => {
    products.value = response.data.slice(0, 4);
  });
}
</script>
<style lang="scss" scoped> 
h4 {
    padding-top: 20px;

}
h3 {
    padding-top: 20px;
}
.col-md-1{
    margin-left: 130px;
}
</style>
