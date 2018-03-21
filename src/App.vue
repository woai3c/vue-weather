<template>
    <div class="app">
        <section class="sec-first">
            <p class="city"><span @click="search"><i class="iconfont icon-dingwei"></i> {{ city }}</span> {{ time }}</p>
            <p class="temp">{{ temp }}</p>            
            <p class="status" v-if="new Date().getHours() < 18">{{ day.status }}</p>
            <p class="status" v-else>{{ night.status }}</p>
            <p class="wind"><i class="iconfont icon-fengxiang"></i> {{ wind }}</p>
            <p class="hum"><i class="iconfont icon-shidu"></i> 相对湿度 {{ humidity }}</p>
            <a class="warn" v-if="warn">{{ warn }}</a>
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
                        <img src="./images/life/ray.png">
                        <p>紫外线指数</p>
                    </div>
                    <div>
                        <p>{{ ray.title }}</p>
                        <p>{{ ray.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/blood.png">
                        <p>血糖指数</p>
                    </div>
                    <div>
                        <p>{{ blood.title }}</p>
                        <p>{{ blood.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/cold.png">
                        <p>感冒指数</p>
                    </div>
                    <div>
                        <p>{{ cold.title }}</p>
                        <p>{{ cold.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/clothes.png">
                        <p>穿衣指数</p>
                    </div>
                    <div>
                        <p>{{ clothes.title }}</p>
                        <p>{{ clothes.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/car.png">
                        <p>洗车指数</p>
                    </div>
                    <div>
                        <p>{{ car.title }}</p>
                        <p>{{ car.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/pollute.png">
                        <p>空气污染扩散指数</p>
                    </div>
                    <div>
                        <p>{{ pollute.title }}</p>
                        <p>{{ pollute.text }}</p>
                    </div>                   
                </li>
            </ul>
        </section>
        <Search @transferCity="getCity" />
        <Loadding/>
    </div>
</template>

<script>
import Search from './components/Search'
import Loadding from './components/Loadding'
import cloudImg from './images/weather/cloud.jpg'
import hazeImg from './images/weather/haze.jpg'
import overcastImg from './images/weather/overcast.jpg'
import rainImg from './images/weather/rain.jpg'
import sanddustImg from './images/weather/sanddust.jpg'
import snowImg from './images/weather/snow.jpg'
import sunImg from './images/weather/sun.jpg'
import thunderImg from './images/weather/thunder.jpg'
import fogImg from './images/weather/fog.jpg'

export default {
    name: 'App',
    components: {
        Search,
        Loadding
    },
    data() {
    	return {
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
            humidity: '',
            temp: '',
            day: {
                temp: '',
                status: '',
                time: ''
            },
            night: {
                temp: '',
                status: '',
                time: ''
            },
            wind: '',
            warn: '',
            time: '',
            imgUrl: ''
    	}
    },
    mounted: function() {
        this.city = remote_ip_info['city'].replace(/市|县/, '') // 根据IP地址取得城市名称
        // this.$socket.emit('client', this.city)
        const obj = {
            "blood": {
                "text": "天气条件好，血糖不易波动，可适时进行户外锻炼。",
                "title": "不易波动"
            },
            "car": {
                "text": "无雨且风力较小，易保持清洁度。",
                "title": "较适宜"
            },
            "clothes": {
                "text": "建议穿薄外套或牛仔裤等服装。",
                "title": "较舒适"
            },
            "cold": {
                "text": "昼夜温差很大，注意预防感冒。",
                "title": "易发"
            },
            "day": {
                "status": "多云",
                "temp": "19",
                "time": "06:26"
            },
            "humidity": "50%",
            "night": {
                "status": "晴",
                "temp": "8",
                "time": "18:34"
            },
            "pollute": {
                "text": "易感人群应适当减少室外活动。",
                "title": "中"
            },
            "ray": {
                "text": "辐射较弱，涂擦SPF12-15、PA+护肤品。",
                "title": "弱"
            },
            "temp": "14℃",
            "time": "10:55 实况",
            "warn": "",
            "wind": "东风4级"
        }
        this.render(obj)
    },
    sockets:{
	    connect: function(){
	    	console.log('socket connected')
		},
	    server: function(obj){
            console.log(obj)
	    	this.render(obj)
	    }
	},
	methods: {
		search: function(event){
			this.$('.search').style.height = '100%'
            this.$('.input-div').style.display = 'block'
	    	// this.$socket.emit('client', val)
	    },
        $: function(selector) {
            return document.querySelector(selector)
        },
        getCity: function(msg) {
            console.log(msg)
            this.city = msg
            this.$socket.emit('client', msg)
        },
        render: function(obj) {
            this.temp = obj.temp
            this.day = obj.day
            this.night = obj.night
            this.wind = obj.wind
            this.humidity = obj.humidity
            this.time = obj.time
            this.warn = obj.warn
            this.pollute = obj.pollute
            this.blood = obj.blood
            this.car = obj.car
            this.clothes = obj.clothes
            this.cold = obj.cold
            this.ray = obj.ray

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

            for (let key in keys) {
                if (obj.day.status.indexOf(key) !== -1) {
                    document.querySelector('.sec-first').style.backgroundImage = 'url(' + keys[key] + ')'
                }
            }
        }
	}
}
</script>