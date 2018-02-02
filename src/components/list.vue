<template>
	<div class="contain">
		<input type="text" placeholder="Your to-do item.(Enter)" v-model="newItem" v-on:keyup.enter="addItem">
		<ul class="items">
			<li v-for="item in items" v-bind:class="{'finished':item.finish}" v-on:click="toggleFinish(item)">
				<span class="finish"> {{item.createtime}} </span>
				<span>{{item.label}}</span>
			</li>
		</ul>
		<div class="footer">
			<strong>Total:{{items.length}} &nbsp; Finished:{{getFinishedCount()}}  </strong>
		</div>

	</div>
</template>
<script>
	export default {
		data:function() {
			return {
				newItem:'',
				items:[]
			}
		},
		mounted:function(){
			if(localStorage.getItem('todo-items')) {
				this.items = JSON.parse(localStorage.getItem('todo-items'));
			}
		},
		methods:{
			addItem:function() {
				var date = new Date();
				if(this.newItem!='') {
					this.items.push({
						label:this.newItem,
						finish:false,
						createtime:date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
					});
					this.newItem = '';
				} else {
					alert('You must enter a string.');
				}
			},
			toggleFinish:function(item) {
				item.finish = !item.finish;
				window.localStorage.setItem('todo-items',JSON.stringify(this.items));
			},
			getFinishedCount:function() {
				var a = 0;
				for(var i=0;i<this.items.length;i++) {
					if(this.items[i].finish == true) {
						a++;
					}
				}
				return a;
			}
		},
		watch:{
			items:function(val,old) {
				window.localStorage.setItem('todo-items',JSON.stringify(val));
			}
		}
	}
</script>
<style>
	.contain>input[type=text]{
		width: 480px;
		height: 30px;
		border-radius: 3px;
		border:1px solid #eee;
		padding:0 10px;
		display: block;
		margin:0 auto;
		outline: none;
	}
	.footer{
		width: 500px;
		margin:20px auto;
		text-align: left;
	}
	.contain>ul.items{
		width: 500px;
		margin:20px 0;
		padding:0;
		display: inline-block;
		height: auto;
		list-style: none;
		text-align: left;
		max-height: 500px;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.contain>ul.items li .finish{
		float: right;
	}
	.contain>ul.items li{
		cursor: pointer;
		font-size: 14px;
		color: #333;
		display: block;
		line-height: 35px;
		height: 35px;
		padding: 0 20px;
		background-color: #f1f1f1;
		border-radius: 3px;
		margin:5px 0;
	}
	.contain>ul.items li.finished{
		color: #fff;
		background-color: #51c851
	}
</style>