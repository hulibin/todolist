<template>
	<div id="app">
		<h1 v-text="title"></h1>
		<router-view/>
	</div>
</template>
<script>
export default {
	data:function(){
		return {
			title:'Todo list',
		};
	}
}
</script>
<style>
#app {
	margin: 20px;
	font-family: Arial,Helvetica, sans-serif;
	text-align: center;
}
#app>h1{
	font-weight: lighter;
}
</style>