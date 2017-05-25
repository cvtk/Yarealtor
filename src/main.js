import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App.vue';

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: '_active',
  routes: [
    { path: '/', component: require('./views/Root.vue'), name: 'root' },
    { path: '/list', component: require('./views/List.vue'), name: 'list' }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
