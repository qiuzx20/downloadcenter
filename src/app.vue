<template>
	<div id="contain">
		<Tophead></Tophead>
	    <div class="contain" :style="">
	        <div class="content"><router-view></router-view></div>
	    </div>
	    <Modal v-if="getModal.length" v-for="item in getModal" :key="item.id" :id="item.timeid" :modal="item.Dialog" :option="item.option" @onTrigger="eventListener"></Modal>
	    
    </div>
</template>
<script>
import Tophead from 'frame/head.vue';
import Modal from 'pubwidget/modal/modal.vue'
import Dialog from 'pubwidget/dialog/dialog.vue'
import {mapGetters} from "vuex"

export default {
	name:'app',
	computed:{
		...mapGetters(['getModal'])
	},
	created (){
		//this.login();
		
	},
	mounted(){
		this.resize()
	},
	/*watch:{
		getModal:function(val, oldVal){
				console.log(val);
			}
		//'$route':'login'
	},*/
	methods:{
		login(){
			/*console.log("登录并获取权限");
			this.$http.post(window.apiUrl+"/login/ssologin",{"token":"333333dddd"}).then((res)=>{
				//localStorage.set("haslogin")
			},function(error){alert("登陆失败！");})*/
			
		},
		resize(){
			const containheight = document.body.clientHeight - document.getElementsByClassName("head")[0].offsetHeight
			document.getElementsByClassName("contain")[0].style.height = containheight+'px';
		},
		eventListener(){

		}
	},
	components:{
		Tophead,
		Modal
	},
}
</script>