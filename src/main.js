import Vue from "vue";
import App from "./App.vue";
// import ClickOutside from 'v-click-outside'

import store from "./store";
import "@fortawesome/fontawesome-free/css/all.css";
import "normalize.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Vuelidate from 'vuelidate'
import router from "./router";

Vue.use(Vuelidate)
Vue.config.productionTip = false;

new Vue({
  created() {
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD2googY-qaUPh0vOi0UVo3thgASGAB2fs",
    authDomain: "todo-1c45b.firebaseapp.com",
    databaseURL: "https://todo-1c45b.firebaseio.com",
    projectId: "todo-1c45b",
    storageBucket: "todo-1c45b.appspot.com",
    messagingSenderId: "882531318723",
    appId: "1:882531318723:web:8dd45c45f39a248546db76"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.$store.dispatch('loggedUser', user)  
    }
    this.$store.dispatch('loadFolder');
    this.$store.dispatch('loadTask') ; 
  })
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");

