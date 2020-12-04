import Vue from 'vue'
import App from './App'
import { http } from './static/utils/request.js'
import { GetUrlParam } from './static/utils/until.js'
// import {nativeMethods} from './static/utils/until.js'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$o2oApi = 'https://api1.51lzt.com/v4.2.0' //测试
// Vue.prototype.$o2oApi = 'https://api.51lzt.com/v4.2.0' //正式
// Vue.prototype.$o2oApi = parseInt(GetUrlParam('share')) === 1  ? 'http://api.51lzt.com/v4.2.0/' : 'https://api.51lzt.com/v4.2.0' //正式分享
Vue.prototype.$api = 'https://api1.51lzt.com:8095' //测试
// Vue.prototype.$api = 'https://o2o.zhilianiot.com:8095' //正式
// Vue.prototype.$api = parseInt(GetUrlParam('share')) === 1  ? 'http://o2o.zhilianiot.com:8095' : 'https://o2o.zhilianiot.com:8095'//正式分享
// vue.prototype.$tologin = nativeMethods
App.mpType = 'app'

const app = new Vue({
	...App,
})
app.$mount()
