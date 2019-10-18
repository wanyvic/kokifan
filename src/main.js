// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import VueTranslated from 'vue-translated'
 
Vue.use(VueTranslated);
Vue.use(ElementUI) //使用elementUI
Vue.use(VueLazyload)

import store from './store'
import i18n from './transfer'
/* eslint-disable no-new */
new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
