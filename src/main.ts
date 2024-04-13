import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);

declare global {
  interface Window {
    isAuthenticated: boolean;
    refreshToken: string;
  }
}

app.use(router);

window.isAuthenticated = false;
window.refreshToken = '';

const store26RefreshToken = document.cookie
  .split(';')
  .find((cookie) => cookie.trim().startsWith('store26RefreshToken='));
console.log(store26RefreshToken);

if (store26RefreshToken) {
  const refreshToken = store26RefreshToken.split('=')[1];
  window.refreshToken = refreshToken;
}

axios.interceptors.request.use(
  (config) => {
    if (window.refreshToken) {
      config.headers.Authorization = `Bearer ${window.refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios
  .post('/api/auth/refresh')
  .then((response) => {
    window.isAuthenticated = true;
    window.refreshToken = response.data.refreshToken;
    document.cookie = `store26RefreshToken=${response.data.refreshToken}`;
  })
  .catch(() => {
    window.isAuthenticated = false;
    window.refreshToken = '';
  })
  .finally(() => {
    app.mount('#app');
  });
