import Vue from 'vue'
import Index from '../views/Index'
import Login from '../views/Login'
import Register from '../views/Register'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: [
        { path: '*', component: Index },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
    ]
})