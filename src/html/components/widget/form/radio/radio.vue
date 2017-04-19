<template>
	<label :id="option.id" :for="option.leaf" :class="option.class"  :style="option.style"><input type="radio" v-model='val' lazy @change="changeVal(val)"/>{{option.name}}</label>
</template>
<script>
	export default {
		name:'radio',
		data(){
			return {
				val:false
			}
		},
		props:["option"],
		methods:{
			eventListener(type,params){
				this.$emit(type,params)
			},
			changeVal(event){
				this.eventListener("onTrigger",event)
			}
		}
	}
</script>