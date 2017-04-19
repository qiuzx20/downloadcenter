<template>
	<div id="contain">
		<Tophead></Tophead>
	    <div class="contain" :style="">
	        <div class="content"><router-view></router-view></div>
	    </div>
	    <Modal v-if="getModal" v-for="item in getModal" :key="item.id" :id="item.timeid" :modal="item.Dialog" :option="item.option" @onTrigger="eventListener"></Modal>
	    
    </div>
</template>
<script>
import Tophead from 'frame/head.vue'
import Modal from 'pubwidget/modal/modal.vue'
import Dialog from 'pubwidget/dialog/dialog.vue'
import {mapGetters} from "vuex"

export default {
	name:'app',
	computed:{
		...mapGetters(['getModal'])
	},
	mounted(){
		this.resize()
	},
	methods:{
		resize(){
			const headobj = document.getElementsByClassName("head")[0]
			const containobj = document.getElementsByClassName("contain")[0]
			const containheight = document.body.clientHeight - headobj && headobj.offsetHeight
			containobj && (containobj.style.height = containheight+'px')
		}
	},
	components:{
		Tophead,
		Modal
	}
}
</script>