import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/LandingPage.vue'),
  },
  {
    path: '/shop',
    name: 'ShopPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/ShopPage.vue'),
  },
  {
    path: '/CategoryPage',
    name: 'CategoryPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/CategoryPage.vue'),
  },
  {
    path: '/ProductPage',
    name: 'ProductPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/ProductPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
