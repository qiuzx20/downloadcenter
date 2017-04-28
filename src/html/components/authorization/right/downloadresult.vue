<template>
	<div class="dialog expansion">
		<div class="dialog-hd clearfix">
			<h2 v-if="option.title">{{option.title}}</h2>
			<span class="close" @click="closeHandler">×</span>
		</div>
		<div class="dialog-bd plr-20 downloadresult clearfix">
			<div>{{option.tophead}}</div>
			<h3>抽样数据</h3>
			<div class="content">{{option.content}}</div>
		</div>
		<div class="dialog-ft">
			<span class="btn btn-create" @click="closeHandler">我知道了</span>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	name:"authormodal",
	props:['option','id'],
	methods:{
		...mapActions(['closeModal']),
		closeHandler(){
			this.closeModal(this.id)
		}
	}
}
</script>