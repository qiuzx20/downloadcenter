<template>
	<li class="clearfix">
			<div class="name fl"><span class="red-text" v-if="option && option.mustbe">*</span>{{option && option.name}}：</div>
			<div class="substance fl">
				<Selecter 
					ref="pubtext"
					:option="option" 
					
					@onTrigger="eventListener"
				>
				</Selecter>
			</div>
	</li>
</template>
<script>
import Selecter from 'pubwidget/form/select/select.vue'

export default {
	name:"selecter",
	data(){
		return {
			value:'',
			type:'',
			errorText:'',
			currentView:'Inputtext'
		}
	},
	props:["option"],
	methods:{
		getData(){
			return this.$refs.pubtext.getData()
		},
		setData(val){
			this.$refs.pubtext.setData(val)
		},
		focus(){
			this.$refs.pubtext.focus()
		},
		eventListener(type,params){
			if(type == "blurHandler" ){
				if(this.option.mustbe && !params){
					this.type = "error"
					this.errorText = this.option.name+"不能为空！"
				}else{
					this.type = ""
					this.errorText = ""
					this.$emit("onTrigger",type,params,this.option.id)
				}
				
			}
			if(type == "clickHandler" ){
				this.$emit("onTrigger",type,params,this.option.id)
			}
			if(this.option.inputtype == "password"){
				this.currentView = 'Inputpassword'
			}

		}
	},
	components:{
		Selecter
	}
}
</script>