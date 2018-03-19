<template>
    <div class="app">
        <button @click="clickButton('新丰')">测试</button>
        <section class="sec-first">
            <p>{{ city }}</p>
            <p>9℃</p>
            <p>阴</p>
            <p>东北风 2级</p>
            <p>温度 43%</p>
            <p>空气质量 47优</p>
        </section>
        <section>
            <div>白天</div>
            <div>夜间</div>
        </section>
    </div> 
</template>

<script>
export default {
    name: 'App',
    data() {
    	return {
    		city: returnCitySN["cname"].replace(/市|县/, '')
    	}
    },
    sockets:{
	    connect: function(){
	    	console.log('socket connected')
		},
	    server: function(val){
	    	// this.html = val
            document.write(JSON.parse(val))
	    	console.log(JSON.parse(val))
	    }
	},
	methods: {
		clickButton: function(val){
			console.log(val)
	    	this.$socket.emit('client', val);
	    }
	}
}
</script>