<template>
	<ul class="ul-future"></ul>
</template>

<script>
export default {
	name: 'Future',
	created() {
	    this.$socket.emit('futureClient', this.$route.params.city)	
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