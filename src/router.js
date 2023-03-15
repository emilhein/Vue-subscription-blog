import { createWebHistory, createRouter } from 'vue-router';
import Subscribe from './components/Checkout.vue';
import Blogpost from './components/BlogPost.vue';
import SuccessPayment from './components/SuccessPayment.vue';
import CancelPayment from './components/CancelPayment.vue';
import Home from './components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: Subscribe,
  },

  {
    path: '/success',
    name: 'success',
    component: SuccessPayment,
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: CancelPayment,
  },
  {
    path: '/post/:id',
    name: 'BlogPost',
    component: Blogpost,
    // async beforeRouteUpdate(to, from) {
    //   // react to route changes...
    //   console.log('YOUUOU');
    // },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
