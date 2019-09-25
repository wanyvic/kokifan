import Vue from 'vue';
import IpfsInfo from "../components/IpfsInfo.vue";
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'IpfsInfo',
            component: IpfsInfo
        }
    ]
});
