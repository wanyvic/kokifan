import Vue from 'vue'
import Index from '../views/Index'
import Login from '../views/Login'
import Register from '../views/Register'
import Upload from '../views/Upload'
import Video from '../components/video/BVideo'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: [
        { path: '*', component: Index },
        { name:'login',path: '/login', component: Login },
        {  name:'register',path: '/register', component: Register },
        {  name:'upload',path: '/upload', component: Upload },
        {  name:'video',path: '/video/:vid', component: Video ,props: true},
    ]
})