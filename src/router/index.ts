import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/LandingPage.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/shop',
    name: 'ShopPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/ShopPage.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/category',
    name: 'CategoryPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/CategoryPage.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/product',
    name: 'ProductPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/ProductPage.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/AdminPage.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
