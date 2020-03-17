import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue';
import './plugins/bootstrap-vue'
import App from './App.vue';
import router from './router';
import store from './store';
// import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';

// Now setup our socket and vuex configuration
Vue.use(new VueSocketIO({
  // debug: true,
  connection: 'https://imdb-game.azurewebsites.net',
  options: {} //Optional options
}))
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
