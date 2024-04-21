import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { UserInfo } from '@/types';

const app = createApp(App);

declare global {
  interface Window {
    isAuthenticated: boolean;
    token: string;
    userInfo: UserInfo | null;
    colors: string[];
    genders: string[];
  }
}

window.isAuthenticated = false;
window.token = '';
window.userInfo = null;
window.colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Orange', 'Pink', 'Brown'];
window.genders = ['MALE', 'FEMALE', 'UNISEX'];

const store26Token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('store26Token='));

if (store26Token) {
  window.token = store26Token.split('=')[1];
}

axios.interceptors.request.use(
  (config) => {
    if (window.token) {
      config.headers.Authorization = `Bearer ${window.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

router.beforeEach(function (to, from, next) {
  console.log(to, window.isAuthenticated, window.userInfo?.role);
  if (to.meta.requiresAuth && !window.isAuthenticated) {
    next({ name: 'LandingPage' });
  } else if (
    to.meta.requiresAdmin &&
    window.isAuthenticated &&
    (window.userInfo?.role !== 'ADMIN' || !window.isAuthenticated)
  ) {
    next({ name: 'LandingPage' });
  }
  next();
});

axios
  .get('/api/auth/user-info')
  .then((response) => {
    window.isAuthenticated = true;
    window.userInfo = response.data;
  })
  .catch(() => {
    window.isAuthenticated = false;
    window.token = '';
    window.userInfo = null;
  })
  .finally(() => {
    app.use(router);
    app.mount('#app');
  });
