import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'


Vue.config.productionTip = false

// 创建axios请求实例，定义接口根地址
// Vue全局
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
})


new Vue({

  router,
  render: h => h(App)
}).$mount('#app')