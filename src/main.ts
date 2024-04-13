import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

declare global {
  interface Window {
    isAuthenticated: boolean;
    token: string;
  }
}

app.use(router);

window.isAuthenticated = false;
window.token = '';

const store26Token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('store26Token='));
console.log(store26Token);

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

axios
  .get('/api/auth/user-info')
  .then((response) => {
    window.isAuthenticated = true;
    window.token = response.data.token;
    document.cookie = `store26Token=${response.data.token}`;
  })
  .catch(() => {
    window.isAuthenticated = false;
    window.token = '';
  })
  .finally(() => {
    app.mount('#app');
  });
