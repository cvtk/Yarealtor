import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: '_active',
  routes: [
    { path: '/', component: require('./components/Root.vue'), name: 'root' },
    { path: '/codex', component: require('./components/Codex.vue'), name: 'codex' },
    { path: '/rules', component: require('./components/Rules.vue'), name: 'rules' },
    { path: '/offers', component: require('./components/Offers.vue'), name: 'offers' },
    { path: '/offers/new', component: require('./components/New-offer.vue'), name: 'new-offer' },
    { path: '/offers/:id', component: require('./components/Offer.vue'), name: 'offer' },
    { path: '/requests', component: require('./components/Requests.vue'), name: 'requests' },
    { path: '/companies', component: require('./components/Companies.vue'), name: 'companies' },
    { path: '/companies/:page', component: require('./components/Company.vue'), name: 'company' },
    { path: '/my-company', component: require('./components/List.vue'), name: 'my-company' },
    { path: '/users/:page', component: require('./components/Profile.vue'), name: 'user' },
    { path: '/auth', component: require('./components/App-auth.vue'), name: 'auth' },
    { path: '/404', component: require('./components/App-404.vue'), name: '404' }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: (h) => h(App)
})
