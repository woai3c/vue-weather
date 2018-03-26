<template>
	<ul class="ul-future"></ul>
</template>

<script>
export default {
	name: 'Future',
	data() {
		return {
			params: null
		}
	},
	created() {
		this.params = this.$route.params
	    this.$socket.emit('futureClient', this.params.city)	
	},
	sockets: {
		futureServer(obj) { // 监听futureServer事件
            if (!obj) {
                alert('未查询到数据')
                this.params.loading.style.display = 'none'
                return
            }
            this.render(obj)
            this.params.loading.style.display = 'none'
        }
	},
	methods: {
		render(obj) {
            let html = ''
            obj.forEach(e => {
                html += `<li style='background: ${e.bg}'>`
                        + `<p>${e.title}</p>`
                        + `<p>${e.status}</p>`
                        + `<p>${e.temp}</p>`
                if (e.wind[0] == e.wind[1]) {
                    html += `<p>${e.wind[0]}</p>`
                } else {
                    html += `<p>${e.wind[0]} - ${e.wind[1]}</p>`
                }
                        
                html += `<p>${e.windLevel}</p></li>`
            })
            document.querySelector('.ul-future').innerHTML = html
        }
	}
		
}	
</script>

<style>
	.ul-future {
		font-size: 0;
		margin-bottom: 2rem;
	}
	.ul-future li {
		display: inline-block;
		font-size: 14px;
		width: 33.33%;
		box-sizing: border-box;
		text-align: center;
		padding-top: 0.5rem;
		height: 10rem;
		border: 1px solid #e6e6e6;
		border-top: none;
		border-right: none;
		color: #fff;
		vertical-align: top;
	}
	.ul-future li:nth-child(1),
	.ul-future li:nth-child(4) {
		border-left: none;
	}
	.ul-future li:nth-child(1),
	.ul-future li:nth-child(2),
	.ul-future li:nth-child(3) {
		border-top: 1px solid #e6e6e6;
	}
	.ul-future li p {
		margin: 0.5rem 0;
	}
</style>