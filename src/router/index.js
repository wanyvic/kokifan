import Vue from 'vue'
import Index from '../views'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: [
        { path: '*', component: Index },
    ]
})