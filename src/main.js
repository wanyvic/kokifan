import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './components/App'
import Dashboard from './view/Dashboard'
import Passport from './view/Passport'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '*', component: Dashboard },
    { path: '/passport', component: Passport }
  ]
})

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
