import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App.vue';

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: '_active',
  routes: [
    { path: '/', component: require('./components/Root.vue'), name: 'root' },
    { path: '/offers', component: require('./components/List.vue'), name: 'offers' },
    { path: '/requests', component: require('./components/List.vue'), name: 'requests' },
    { path: '/companies', component: require('./components/List.vue'), name: 'companies' },
    { path: '/my-company', component: require('./components/List.vue'), name: 'my-company' },
    { path: '/profile', component: require('./components/List.vue'), name: 'profile' }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
