<template>
    <div class="app">
        <button @click="clickButton('新丰')">测试</button>
        <section class="sec-first">
            <p>{{ city }}</p>
            <p>{{ temp }}</p>
            <p>{{ warn }}</p>
            <p>{{ wind }}</p>
            <p>相对湿度 {{ humidity }}</p>
        </section>
        <section>
            <ul>
                <li>
                    白天
                    {{ day.temp }}
                    {{ day.status }}
                    {{ day.time }}
                </li>
                <li>
                    夜间
                    {{ night.temp }}
                    {{ night.status }}
                    {{ night.time }}
                </li>
            </ul>
        </section>
        <section>
            <ul>
                <li>
                    <div>
                        <img src="./images/life/ray.png">
                        <span>紫外线指数</span>
                    </div>
                    <div>
                        <p>{{ ray.title }}</p>
                        <p>{{ ray.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/blood.png">
                        <span>血糖指数</span>
                    </div>
                    <div>
                        <p>{{ blood.title }}</p>
                        <p>{{ blood.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/cold.png">
                        <span>感冒指数</span>
                    </div>
                    <div>
                        <p>{{ cold.title }}</p>
                        <p>{{ cold.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/clothes.png">
                        <span>穿衣指数</span>
                    </div>
                    <div>
                        <p>{{ clothes.title }}</p>
                        <p>{{ clothes.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/car.png">
                        <span>洗车指数</span>
                    </div>
                    <div>
                        <p>{{ car.title }}</p>
                        <p>{{ car.text }}</p>
                    </div>                   
                </li>
                <li>
                    <div>
                        <img src="./images/life/pollute.png">
                        <span>空气污染扩散指数</span>
                    </div>
                    <div>
                        <p>{{ pollute.title }}</p>
                        <p>{{ pollute.text }}</p>
                    </div>                   
                </li>
            </ul>
        </section>
    </div> 
</template>

<script>

import cloudImg from './images/weather/cloud.jpg'
import hazeImg from './images/weather/haze.jpg'
import overcastImg from './images/weather/overcast.jpg'
import rainImg from './images/weather/rain.jpg'
import sanddustImg from './images/weather/sanddust.jpg'
import snowImg from './images/weather/snow.jpg'
import sunImg from './images/weather/sun.jpg'
import thunderImg from './images/weather/thunder.jpg'

export default {
    name: 'App',
    data() {
    	return {
    		city: returnCitySN.cname.replace(/市|县/, ''),
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
		clickButton: function(val){
			console.log(val)
	    	this.$socket.emit('client', val)
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