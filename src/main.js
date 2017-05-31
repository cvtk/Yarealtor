import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: '_active',
  routes: [
    { path: '/', component: require('./components/Root.vue'), name: 'root' },
    { path: '/offers', component: require('./components/List.vue'), name: 'offers' },
    { path: '/requests', component: require('./components/List.vue'), name: 'requests' },
    { path: '/companies', component: require('./components/List.vue'), name: 'companies' },
    { path: '/my-company', component: require('./components/List.vue'), name: 'my-company' },
    { path: '/users/:page', component: require('./components/Profile.vue'), name: 'user' },
    { path: '/auth', component: require('./components/App-auth.vue'), name: 'auth' },
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: (h) => h(App)
})
