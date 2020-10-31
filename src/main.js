import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//加载全局样式

import Vant from 'vant';
import 'vant/lib/index.css';
import './style/index.less'


//移动端适配
import 'amfe-flexible'

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
