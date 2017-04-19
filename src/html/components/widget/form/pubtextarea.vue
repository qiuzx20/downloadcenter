<template>
	<li class="clearfix">
			<div class="name fl"><span class="red-text" v-if="option && option.mustbe">*</span>{{option && option.name}}：</div>
			<div class="substance fl">
				<Pubtextarea 
					ref="pubtextarea"
					:type="option && option.type" 
					:tabindex="option && option.tabindex" 
					:placeholder="option && option.placeholder" 
					:unit="option && option.unit" 
					:errorText="option && option.errorText" 
					:tips="option && option.tips" 
					@onTrigger="eventListener"
				>
				</Pubtextarea>
			</div>
	</li>
</template>
<script>
import Pubtextarea from 'pubwidget/form/textarea/textarea.vue'

export default {
	name:"pubtextarea",
	data(){
		return {

		}
	},
	props:["option"],
	methods:{
		getData(){
			return this.$refs.pubtextarea.getData()
		},
		setData(val){
			this.$refs.pubtextarea.setData(val)
		},
		focus(){
			this.$refs.pubtextarea.focus()
		},
		eventListener(type,params){
			if(type == "blurHandler" ){
				if(this.option.mustbe && !params){
					this.type = "error"
					this.errorText = this.option.name+"不能为空！"
				}else{
					this.type = ""
					this.errorText = ""
					this.$emit("onTrigger",params,this.option.id)
				}
				
			}
			

		}
	},
	components:{
		Pubtextarea
	}
}
</script>