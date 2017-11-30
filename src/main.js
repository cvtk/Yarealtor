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
import EditOffer from './components/Edit-Offer.vue';
import Requests from './components/Requests.vue';
import NewRequest from './components/New-request.vue';
import Request from './components/Request.vue';
import EditRequest from './components/Edit-Request.vue';
import Companies from './components/Companies.vue';
import Yasr from './components/Yasr.vue';
import Company from './components/Company.vue';
import List from './components/List.vue';
import Profile from './components/Profile.vue';
import Tickets from './components/Tickets.vue';
import AppAuth from './components/App-auth.vue';
import NotFound from './components/App-404.vue';

import YrlImport from './components/YrlImport.vue';

// auth-components
import Registration from './components/user-auth/auth-registration.vue';
import Login from './components/user-auth/auth-login.vue';
import Recovery from './components/user-auth/auth-recovery.vue';

require('./components.js');


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: '_active',
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
        return {selector: to.hash}
    } else {
        return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: '/', component: Root, name: 'root' },
    { path: '/polls', component: Polls, name: 'polls' },
    { path: '/news', component: News, name: 'news' },
    { path: '/codex', component: Codex, name: 'codex' },
    { path: '/rules', component: Rules, name: 'rules' },
    { path: '/offers', component: Offers, name: 'offers' },
    { path: '/offers/new', component: NewOffer, name: 'new-offer' },
    { path: '/offers/:id', component: Offer, name: 'offer' },
    { path: '/offers/edit/:id', component: EditOffer, name: 'edit-offer' },
    { path: '/requests', component: Requests, name: 'requests' },
    { path: '/requests/new', component: NewRequest, name: 'new-request' },
    { path: '/requests/:id', component: Request, name: 'request' },
    { path: '/requests/edit/:id', component: EditRequest, name: 'edit-request' },
    { path: '/companies', component: Companies, name: 'companies' },
    { path: '/yasr', component: Yasr, name: 'yasr' },
    { path: '/companies/:page', component: Company, name: 'company' },
    { path: '/my-company', component: List, name: 'my-company' },
    { path: '/users/:page', component: Profile, name: 'user' },
    { path: '/auth', component: AppAuth, name: 'auth' },
    { path: '/404', component: NotFound, name: '404' },
    { path: '/registration', component: Registration, name: 'registration' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/tickets', component: Tickets, name: 'tickets' },
    { path: '/recovery', component: Recovery, name: 'recovery' },
    { path: '/yrl-import', component: YrlImport, name: 'yrl-import' }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: (h) => h(App)
})
