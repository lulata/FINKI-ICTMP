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
    path: '/checkout',
    name: 'CheckoutPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/CheckoutPage.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/category/:id',
    name: 'CategoryPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/CategoryPage.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/ProductPage.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import(/* webpackChunkName: "user" */ '@/views/ProfilePage.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },

  {
    path: '/admin/categories',
    name: 'AdminPageCategory',
    component: () => import(/* webpackChunkName: "user" */ '@/views/admin/AdminPageCategory.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/orders',
    name: 'AdminPageOrders',
    component: () => import(/* webpackChunkName: "user" */ '@/views/admin/AdminPageOrders.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/products',
    name: 'AdminPageProduct',
    component: () => import(/* webpackChunkName: "user" */ '@/views/admin/AdminPageProduct.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/products/:id/sizes',
    name: 'AdminPageProductSizes',
    component: () => import(/* webpackChunkName: "user" */ '@/views/admin/AdminPageProductSizes.vue'),
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
