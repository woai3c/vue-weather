<template>
    <div class="app">
        <section class="sec-first">
            <p class="city"><span @click="searchFunc"><i class="iconfont icon-dingwei"></i> {{ city }}</span> {{ time }}</p>
            <p class="temp">{{ temp }}</p>            
            <p class="status" v-if="new Date().getHours() < 18">{{ day.status }}</p>
            <p class="status" v-else>{{ night.status }}</p>
            <p class="wind"><i class="iconfont icon-fengxiang"></i> {{ wind }}</p>
            <p class="hum"><i class="iconfont icon-shidu"></i> 相对湿度 {{ humidity }}</p>
            <a class="aqi" :style="{ background: aqi.bgColor }">{{ aqi.text }} {{ aqi.num }}</a>
        </section>
        <section class="sec-second">
            <ul>
                <li>
                    <div class="day-div">
                        <p class="title">白天</p>
                        <p class="relative"><span>{{ day.status }}</span><span>{{ day.temp }}℃</span></p>
                        <p class="relative"><span>日出</span><span>{{ day.time }}</span></p>
                    </div>               
                </li>
                <li>
                    <div>
                        <p class="title">夜间</p>
                        <p class="relative"><span>{{ night.status }}</span><span>{{ night.temp }}℃</span></p>
                        <p class="relative"><span>日落</span><span>{{ night.time }}</span></p>
                    </div>                   
                </li>
            </ul>
        </section>
        <section class="sec-third">
            <ul>
                <li>
                    <div>
                        <img src="./images/life/car.svg">
                        <p>尾号限行</p>
                    </div>
                    <div class="car-number">
                        {{ limit }}
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/ray.svg">
                        <p>紫外线指数</p>
                    </div>
                    <div>
                        <p>{{ ray.title }}</p>
                        <p>{{ ray.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/sport.svg">
                        <p>血糖指数</p>
                    </div>
                    <div>
                        <p>{{ blood.title }}</p>
                        <p>{{ blood.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/cold.svg">
                        <p>感冒指数</p>
                    </div>
                    <div>
                        <p>{{ cold.title }}</p>
                        <p>{{ cold.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/clothes.svg">
                        <p>穿衣指数</p>
                    </div>
                    <div>
                        <p>{{ clothes.title }}</p>
                        <p>{{ clothes.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/wash.svg">
                        <p>洗车指数</p>
                    </div>
                    <div>
                        <p>{{ car.title }}</p>
                        <p>{{ car.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/pollute.svg">
                        <p>空气污染扩散指数</p>
                    </div>
                    <div>
                        <p>{{ pollute.title }}</p>
                        <p>{{ pollute.text }}</p>
                    </div>                   
                </li>
            </ul>
        </section>
        <!-- 接收子组件传值 并向子组件传3个值-->
        <Search @transferCity="getCity" :search="search" :loading="loading" :inputDiv="inputDiv"/>
        <!-- 向子组件传3个值 -->
        <loading :search="search" :loading="loading" :inputDiv="inputDiv"/>
    </div>
</template>

<script>
import Search from './components/Search'
import Loading from './components/loading'
import cloudImg from './images/weather/cloud.jpg'
import hazeImg from './images/weather/haze.jpg'
import overcastImg from './images/weather/overcast.jpg'
import rainImg from './images/weather/rain.jpg'
import sanddustImg from './images/weather/sanddust.jpg'
import snowImg from './images/weather/snow.jpg'
import sunImg from './images/weather/sun.jpg'
import thunderImg from './images/weather/thunder.jpg'
import fogImg from './images/weather/fog.jpg'
import nightImg from './images/weather/night.jpg'

export default {
    name: 'App',
    components: {
        Search, // 相当于Search:Search
        Loading
    },
    data() {
    	return {
            limit: '',
            serverTime: '',
            cacheCity: '',
    		city: '',
            blood: {
                title: '',
                text: ''
            },
            car: {
                title: '',
                text: ''
            },
            clothes: {
                title: '',
                text: ''
            },
            cold: {
                title: '',
                text: ''
            },
            ray: {
                title: '',
                text: ''
            },
            pollute: {
                title: '',
                text: ''
            },
            humidity: '暂无',
            temp: '',
            day: {
                temp: '暂无',
                status: '',
                time: ''
            },
            night: {
                temp: '暂无',
                status: '',
                time: ''
            },
            wind: '暂无',
            aqi: {
                num: '',
                bgColor: '',
                text: ''
            },
            time: '',
            imgUrl: '',
            loading: null,
            search: null,
            inputDiv: null
    	}
    },
    mounted: function() { 
        this.search = this.$('.search')
        this.loading = this.$('.loading')
        this.inputDiv = this.$('.input-div')
        // 根据IP地址取得城市名称 remote_ip_info['city']为IP接口方法 在index.html里引入JS
        this.city = remote_ip_info['city'].replace(/市|县/, '') 
        this.$socket.emit('client', this.city) // 向服务器传值
        this.loading.style.display = 'block'
    },
    sockets:{ // socket.io监听事件
	    connect: function(){
	    	console.log('socket connected')
		},
	    server: function(obj){ // 接收服务器传来的值
            if (!obj) {
                alert('获取数据失败')
                this.loading.style.display = 'none'
                return
            }
	    	this.render(obj)
            this.loading.style.display = 'none'
            if (this.cacheCity) {
                this.city = this.cacheCity
                this.cacheCity = ''
            }
	    }
	},
	methods: {
		searchFunc: function(event){ // 弹出搜索层
			this.$('.search').style.height = '100%'
            this.$('.input-div').style.display = 'block'
	    },
        $: function(selector) {
            return document.querySelector(selector)
        },
        getCity: function(msg) { // 接收子组件传值
            this.cacheCity = msg
            this.$socket.emit('client', msg)
            this.loading.style.display = 'block'
        },
        render: function(obj) {
            const keys = { 
                '云': cloudImg,
                '雨': rainImg,
                '霾': hazeImg,
                '尘': sanddustImg,
                '阴': overcastImg,
                '晴': sunImg,
                '雪': snowImg,
                '雷': thunderImg,
                '雾': fogImg
            }

            this.serverTime = obj.serverTime
            this.temp = obj.temp
            this.day = obj.day
            this.night = obj.night
            this.wind = obj.wind
            this.humidity = obj.humidity
            this.time = obj.time
            this.pollute = obj.pollute
            this.blood = obj.blood
            this.car = obj.car
            this.clothes = obj.clothes
            this.cold = obj.cold
            this.ray = obj.ray
            this.aqi = obj.aqi
            this.limit = obj.limit? obj.limit : '无'

            for (let key in keys) { // 根据天气情况展示背景图
                if (obj.day.status.indexOf(key) !== -1) {
                    if ('云晴'.indexOf(key) !== -1 && this.serverTime > 18) {
                        document.querySelector('.sec-first').style.backgroundImage = 'url(' + nightImg + ')'
                    } else {
                        document.querySelector('.sec-first').style.backgroundImage = 'url(' + keys[key] + ')'
                    }
                }
            }
        }
	}
}
</script>

<style>
    .app {
        max-width: 1000px;
    }
    .iconfont {
        font-size: 1.2rem !important;
    }
    .sec-first p {
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .sec-first {
        width: 100%;
        height: 400px;
        background: url('./images/weather/cloud.jpg');
        color: #fff;
        font-size: 16px;
    }
    .sec-first .city {
        padding-top: 20px;
        margin-bottom: 10px;
    }
    .sec-first .temp {
        margin-top: 80px;
        font-size: 40px;
        margin-bottom: 10px;
    }
    .sec-first .status {
        font-size: 20px;
    }
    .sec-first .wind {
        margin-top: 20px;
    }
    .sec-first .aqi {
        padding: 10px;
        border-radius: 10px;
        color: #fff;
        margin: auto;
        display: block;
        text-align: center;
        margin-top: 40px;
        width: 80px;
    }
    .sec-second li {
        padding-top: 1rem;
    }
    .sec-second p {
        text-align: center;
    }
    .sec-second .day-div {
        border-right: 1px solid #e3e3e3;
    }
    .sec-second .relative {
        display: flex;
        justify-content: space-around;
        height: 1.5rem;
    }
    .sec-second .relative span {
        vertical-align: middle;
        height: 1.2rem;
        line-height: 1.2rem;
    }
    .sec-second .title {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    .sec-third li {
        vertical-align: top;
        font-size: 0;
        box-sizing: border-box;
    }
    .sec-third li img {
        width: 2rem;
    }
    .sec-third li div {
        vertical-align: top;
        display: inline-block;
        width: 50%;
        height: 100%;
        font-size: 14px;
    }
    .sec-third li:first-child,
    .sec-third li:nth-child(2) {
        border-top: 1px solid #e6e6e6;
    }
    .sec-third li:nth-child(odd) {
        border-right: 1px solid #e6e6e6;
    }
    .sec-third li {
        border: 1px solid #e6e6e6;
        border-top: none;
        border-left: none;
    }
    .sec-third li div {
        box-sizing: border-box;
    }
    .sec-third li div:first-child img {
        display: block;
        margin: auto;
    }
    .sec-third li div:first-child {
        padding-top: 1.2rem;
    }
    .sec-third li div:first-child p {
        text-align: center;
    }
    .sec-third li div:last-child {
        padding-top: 0.5rem;
    }
    .sec-third li div:last-child p {
        font-size: 12px;
    }
    .sec-third li div:last-child p:first-child {
        text-align: center;
    }
    .sec-third li div p:first-child {
        font-size: 14px;
    }
    .sec-third .car-number {
        text-align: center;
        padding-top: 2rem !important;
    }
</style>