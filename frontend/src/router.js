import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './views/LandingPage.vue';
import AdminLogin from './views/AdminLogin.vue';
import AdminDashboard from './views/AdminDashboard.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/admin', component: AdminLogin },
  { path: '/admin/dashboard', component: AdminDashboard }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
