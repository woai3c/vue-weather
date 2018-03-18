<template>
    <div class="app">
        <a @click="clickButton('新丰')">{{html}}</a>
    </div> 
</template>

<script>

export default {
    name: 'App',
    data() {
    	return {
    		html: 'aaa'
    	}
    },
    sockets:{
	    connect: function(){
	    	console.log('socket connected')
		},
	    server: function(val){
	    	this.html += val
	    	console.log(val)
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