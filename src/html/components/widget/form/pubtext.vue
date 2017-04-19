<template>
	<li class="clearfix">
			<div class="name fl"><span class="red-text" v-if="option && option.mustbe">*</span>{{option && option.name}}：</div>
			<div class="substance fl">
				<component :is= "currentView"
					ref="pubtext"
					:type="type || option && option.type" 
					:tabindex="option && option.tabindex" 
					:placeholder="option && option.placeholder" 
					:unit="option && option.unit" 
					:errorText="errorText || option && option.errorText" 
					:tips="option && option.tips" 
					@onTrigger="eventListener"
				>
				</component>
			</div>
	</li>
</template>
<script>
import Inputtext from 'pubwidget/form/input/input.vue'
import Inputpassword from 'pubwidget/form/input/password.vue'

export default {
	name:"pubtext",
	data(){
		return {
			value:'',
			type:'',
			errorText:'',
			currentView:'Inputtext'
		}
	},
	props:['option','defaultval'],
	mounted(){
		if(this.defaultval)this.setData(this.defaultval)
	},
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
		Inputtext,
		Inputpassword
	}
}
</script>