<template>
	<div class="dialog">
		<div class="dialog-hd clearfix">
					<h2 v-if="option.title">{{option.title}}</h2>
					<span class="close" @click="closeHandler(id)">×</span>
		</div>
		<div class="dialog-bd plr-20">
				<ul class="ulform">
				<li class="clearfix"><div class="name fl">接收者姓名：</div><div class="substance fl"><div class="input"><input type="text" class=""  value="占三" name="" disabled></div></div></li>
				<Email @onTrigger="eventListener"></Email>
				</ul>
		</div>
		<div class="dialog-ft">
			<span class="btn btn-create mr-10" @click="okHandler">确定</span>
			<span class="btn btn-close" @click="closeHandler(id)">取消</span>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import Email from './email.vue'


export default {
	name:"sendpw",
	data(){
		return {
		}

	},
	props:['id','option'],
	methods:{
		...mapActions(['closeModal']),
		emailcheck(){

		},
		eventListener(type,params){
			if("blurHandler" == type){
				this.emailcheck()
			}
		},
		okHandler(){

		},
		closeHandler(id){
			this.closeModal(id)
		}
	},
	components:{
		Email
	}
}
</script>