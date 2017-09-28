import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import Root from './components/Root.vue';
import Polls from './components/Polls.vue';
import News from './components/News.vue';
import Codex from './components/Codex.vue';
import Rules from './components/Rules.vue';
import Offers from './components/Offers.vue';
import NewOffer from './components/New-offer.vue';
import Offer from './components/Offer.vue';
import Requests from './components/Requests.vue';
import Companies from './components/Companies.vue';
import Yasr from './components/Yasr.vue';
import Company from './components/Company.vue';
import List from './components/List.vue';
import Profile from './components/Profile.vue';
import AppAuth from './components/App-auth.vue';
import NotFound from './components/App-404.vue';

// auth-components
import Registration from './components/user-auth/auth-registration.vue';
import Login from './components/user-auth/auth-login.vue';
import Recovery from './components/user-auth/auth-recovery.vue';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: '_active',
  routes: [
    { path: '/', component: Root, name: 'root' },
    { path: '/polls', component: Polls, name: 'polls' },
    { path: '/news', component: News, name: 'news' },
    { path: '/codex', component: Codex, name: 'codex' },
    { path: '/rules', component: Rules, name: 'rules' },
    { path: '/offers', component: Offers, name: 'offers' },
    { path: '/offers/new', component: NewOffer, name: 'new-offer' },
    { path: '/offers/:id', component: Offer, name: 'offer' },
    { path: '/requests', component: Requests, name: 'requests' },
    { path: '/companies', component: Companies, name: 'companies' },
    { path: '/yasr', component: Yasr, name: 'yasr' },
    { path: '/companies/:page', component: Company, name: 'company' },
    { path: '/my-company', component: List, name: 'my-company' },
    { path: '/users/:page', component: Profile, name: 'user' },
    { path: '/auth', component: AppAuth, name: 'auth' },
    { path: '/404', component: NotFound, name: '404' },
    { path: '/registration', component: Registration, name: 'registration' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/recovery', component: Recovery, name: 'recovery' }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: (h) => h(App)
})
