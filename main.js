import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 导航栏全局注册
import hxNavbar from "./components/hx-navbar/hx-navbar.vue"
Vue.component('hx-navbar',hxNavbar)



App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
