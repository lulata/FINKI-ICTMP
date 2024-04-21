<template>
<div id="slikadiv">
      <div id="mencontainer">
        MEN
      </div>
</div>
    <div class="container">
                        <div class="row">
                            <span v-for="(size,index) in 6" :key="index" class="col-md-1">
                                <button type="button" class="btn btn-info">Info</button>
                            </span>
                        </div>
                    </div>
    <div class="container">
        <div class="row" v-for="index in 3" :key="index">
            <!-- <div v-for="(slikica,index) in 12" :key="index" class="col-md-4">BlahBlah</div> -->
            <div class="col-md-3" v-for="product in products" :key="product.title">
              <ItemCard :product="product" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ItemCard from '@/components/ItemCard.vue';
import axios from 'axios';
import { ref } from 'vue';

const products = [
  {
    image: '/clothes/shorts.png',
    title: 'Shorts',
    price: '890 MKD',
    discount: null,
  },
  {
    image: '/clothes/shirt.png',
    title: 'T-Shirt',
    price: '1090 MKD',
    discount: '790 MKD',
  },
  {
    image: '/clothes/trousers.png',
    title: 'Tracksuit',
    price: '1290 MKD',
    discount: null,
  },
  {
    image: '/clothes/hoodie.png',
    title: 'Hoodie',
    price: '1490 MKD',
    discount: null,
  },
];

let categories:any=ref([]);
function getCategories(){
  axios.get('/api/admin/category/all').then((response) => {
    categories.value=response.data;
  })
}
getCategories();
console.log(categories);
console.log(categories.value)

</script>
<style lang="scss" scoped> 
h1 {
    text-align: center;
}
#mencontainer{
  text-align: center
}
</style>