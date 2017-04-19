<template>
	<div :id="option && option.id" :class="option && option.class" :style="option && option.style">
		<label class="control-label" v-if="option && option.type != 'single' && option.type">{{option && option.name}}:</label>
		<input ref="input" type="text" v-model="name" :placeholder="option && option.placeholder" @blur="changeVal" lazy/>
		
	</div>
</template>
<script>
export default {
	name:'inputcompt',
	data(){
		return {
			type:"text",
			name:'',
			val:''
		}
	},
	props:['option'],
	methods:{
		eventListener(type,params){
			this.$emit(type,params)
		},
		setData(val){
			this.showname=val.showname
			this.name=val.name
		},
		getData(){
			return this.name
		},
		focus(){
			this.$refs.input.focus()
		},
		changeVal(){
			this.eventListener("onTrigger",this.name)
		}
	}
}
</script>