import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

export default Firebase.initializeApp({
  apiKey: "AIzaSyDjqvK3CMo7ruLjdye9wFS_LBN4ZmKHSVo",
  authDomain: "yarealtor-a47f2.firebaseapp.com",
  databaseURL: "https://yarealtor-a47f2.firebaseio.com",
  projectId: "yarealtor-a47f2",
  storageBucket: "yarealtor-a47f2.appspot.com",
  messagingSenderId: "611168803631"
});

