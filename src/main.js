import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import firebase from './firebase.js';
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
    { path: '/profile', component: require('./components/List.vue'), name: 'profile' },
    { path: '/auth', component: require('./components/App-auth.vue'), name: 'auth' },
  ]
});

// router.beforeEach((to, from, next) => {
//   if ( to.name === 'auth' ) {
//     console.log(firebase.auth().currentUser)
//     next({ name: 'root'})
//   } else { next() }
// });
//   if (to.matched.some(record => record.meta.authOnly)) {
//     if (!firebase.auth().currentUser) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else { next() }
//   } else if ( to.name === 'login' && firebase.auth().currentUser ) {
//     next({ name: 'profile'})
//   } else { next() }
// });

new Vue({
  el: '#app',
  router,
  data() {
    return { auth: '' }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((auth)=> {
      if (!auth) { this.$router.push('/auth') }
      this.auth = auth;
    });

    this.$router.beforeEach((to, from, next) => {
      console.log(to.name)
      if ( to.name === 'auth' && this.auth ) {
        next({ name: 'root' })
      } else { next() }
    });
  },
  render(createElement) {
    return createElement(App, { props: { auth: this.auth } })
  }
})
