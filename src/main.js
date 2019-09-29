import Vue from 'vue'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './components/App'
import Dashboard from './view/Dashboard'
import Passport from './view/Passport'
import Contribute from './view/Contribute'
import store from './store'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '*', component: Dashboard },
    { path: '/passport', component: Passport },
    { path: '/contribute', component: Contribute }
  ]
})

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
