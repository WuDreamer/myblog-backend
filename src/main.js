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

// Vue.interceptors.request.use(function (config) {
//   config.headers.Authorization = localStorage.token
//   return config;
// }, function (error) {
//   return Promise.reject(error)
// })


// http.interceptors.response.use(res => {
//   return res
// }, err => {
//   return Promise.reject(err)
// })


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')