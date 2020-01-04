import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.http = 'http://cim.kaifanzhe.club';  
//Vue.prototype.http = 'http://localhost:8088/coupon';  

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

