import Vue from 'vue'
import App from './App'
import VueSocketio from 'vue-socket.io'
import './css/common'

Vue.use(VueSocketio, 'http://localhost:8080')

new Vue({
	el: '#app',
	render: h => h(App)
})