<template>
	<label :id="option.id" :class="option.class"  :style="option.style"><input type="checkbox" v-model='val' lazy @change="changeVal(val)"/>{{option.name}}</label>
</template>
<script>
	export default {
		name:'checkbox',
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
			setData(val){
				this.val=val
			},
			getData(){
				return this.val
			},
			changeVal(event){
				this.eventListener("onTrigger",event)
			}
		}
	}
</script>