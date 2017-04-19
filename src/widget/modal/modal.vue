<template>
	<div class="modal">
		<component :is="modal" :id="id" :option="option" @onTrigger='eventListener'></component>
		</div>
</template>
<script>
import './modal.less'
export default {
	name:"modal",
	data(){
		return {

		}
	},
	props:['id','modal','option'],
	methods:{
		eventListener(type,params){
			if (type == "close") {
				param = this.id;
				this.$emit("onTrigger", this.id);
				return;
			}
			
			return this.$emit("onTrigger", param);
		}
	}

}


</script>