import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.http = 'http://127.0.0.1:8088';  


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

