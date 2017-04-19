<template>
	<li class="clearfix">
			<div class="name fl"><span class="red-text">*</span>电子邮箱：</div>
			<div class="substance fl">
				<Inputtext 
					:type="type" 
					:tabindex="tabindex" 
					:placeholder="placeholder" 
					:unit="unit" 
					:errorText="errorText" 
					:tips="tips" 
					@onTrigger="eventListener"
				>
				</Inputtext>
			</div>
	</li>
</template>
<script>
import Inputtext from 'pubwidget/form/input/input.vue'
import Utils from 'lib/utils/utils'

export default {
	name:"email",
	data(){
		return {
			type:"",
			tabindex:"",
			placeholder:"请输入邮箱号",
			unit:'',
			errorText:'输入有误',
			tips:'请输入邮箱号',
			email:''
		}
		
	},
	methods:{
		eventListener(type,params){
			if(type=="blurHandler"){
				this.email = params
				console.log(this.email);
				this.check()

			}
			this.$emit("onTrigger",type,params)
		},
		check(){
			if(!this.email.length){
				this.type = "error"
				this.errorText = "邮箱不能为空"
				console.log(this.email.length);
				return
			}
			if(!Utils.isEmail(this.email)){
				this.type = "error"
				this.errorText = "邮箱格式不正确"
				return
			}
		}
	},
	components:{
		Inputtext
	}
}
</script>