// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueIpfs from './plugins/vue-ipfs';
Vue.config.productionTip = false;

// Load our IPFS plugin.
Vue.use(VueIpfs);
/* eslint-disable no-new */

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  components: { App },
}).$mount('#app');
