import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

import Default from './layouts/Default.vue'
import Guest from './layouts/Guest.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueMomentLib from "vue-moment-lib";
Vue.use(VueMomentLib);

import VueLodash from 'vue-lodash'
Vue.use(VueLodash)

Vue.use(VueRouter)
Vue.use(BootstrapVue);

Vue.component('default-layout', Default);
Vue.component('guest-layout', Guest);
Vue.component('font-awesome-icon', FontAwesomeIcon)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
