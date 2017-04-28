<template>
	<div class="dialog-confirm">
		<div class="dialog-hd">
			<h2>{{option.title || "提示"}}</h2>
			<span class="close" @click="closeHandler">×</span>
		</div>
		<div class="dialog-bd">
			<div :class="['pic', option.type].join(' ')"></div>
			<div class="content">{{option.content}}</div>
		</div>
		<div class="dialog-ft">
			<span class="btn-create" @click="okHandler">{{option.ok.text || "确定"}}</span>
			<span v-if='option.cancel' class="btn-close" @click="cancelHandler">{{option.cancel.text || "取消"}}</span>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import './dialog.less'

export default {
	name:'dialog',
	props:['option','id'],
	methods:{
		...mapActions(['closeModal']),
		closeHandler(){
			this.closeModal(this.id)
		},
		okHandler(){
			if (this.option.ok.callback) {
				this.option.ok.callback();
			}
			this.closeHandler()
		},
		cancelHandler(){
			if (this.option.cancel.callback) {
				this.option.cancel.callback();
			}
			this.closeHandler()
		}
	}
}

</script>