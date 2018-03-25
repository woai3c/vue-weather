import Vue from 'vue'
import App from './App'
import VueSocketio from 'vue-socket.io'
import router from './router'
import './css/common'
import './css/iconfont/iconfont.css'

Vue.use(VueSocketio, 'http://localhost:8080/')

new Vue({
	el: '#app',
	router,
	template: '<App/>',
    components: { App }
})