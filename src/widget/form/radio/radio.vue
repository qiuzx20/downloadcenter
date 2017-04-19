<template>
	<label :class="option.class"  :style="option.style"><input type="radio" :value='option.value'  @change="changeHandle" :checked="option.value == val" />{{option.name}}</label>
</template>
<script>
	export default {
		name:'radio',
		data(){
			return {
			}
		},
		props:['option','val','id'],

		methods:{
			eventListener(type,params){
				this.$emit("onTrigger",type,params,this.id)
			},
			changeHandle(){
				this.eventListener("radioChangeHandle",this.option.value)
			}
		}
	}
</script>