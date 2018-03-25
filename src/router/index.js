import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Future = () => import('../components/Future') // 懒加载

export default new Router({
    routes: [
        {
            path: '/future/:city',
            name: 'Future',
            component: Future
        }
    ]
})