import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
// import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@views/Home.vue')
    // component: Home
  },
  // {
  //   path: '/user-center',
  //   name: 'UserCenter',
  //   component: () => import(/* webpackChunkName: "UserCenter" */'@/views/User/UserCenter/index.vue')
  // },
  {
    path: '/:pathMath(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
