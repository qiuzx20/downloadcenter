<template>
	<div id="contain">
		<Tophead></Tophead>
	    <div class="contain" :style="{height:screenHeight+'px'}">
	        <div class="content"><router-view></router-view></div>
	    </div>
	    <Modal v-if="getModal" v-for="item in getModal" :key="item.id" :id="item.timeid" :modal="item.Dialog" :option="item.option"></Modal>
	    
    </div>
</template>
<script>
import Tophead from 'frame/head.vue'
import Modal from 'pubwidget/modal/modal.vue'
import Dialog from 'pubwidget/dialog/dialog.vue'
import {mapGetters} from "vuex"

export default {
	name:'app',
	data(){
		return {
			screenHeight:document.body.clientHeight - 56 || 500
		}
	},
	computed:{
		...mapGetters(['getModal'])
	},
	mounted(){
		window.addEventListener("resize",this.resize)//监听窗口尺寸变化
	},
	
	methods:{
		resize(){
			this.screenHeight = document.body.clientHeight - 56
		}
	},
	components:{
		Tophead,
		Modal
	}
}
</script>