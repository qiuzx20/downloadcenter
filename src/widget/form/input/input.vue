<template>
	<div class="input" :class="type">
				<input
					type="text"
					:tabindex="tabindex" 
					class="inputCls"
					:class="unit?'hasunit':''"
					:placeholder="placeholder || '请输入'"
					v-model="value"
					@click="clickHandler"
					@focus="focusHandler"
					@blur="blurHandler"
					@change="changeHandler"
					@keyPress="onKeyPress"
					:disabled="disabled"
					v-focus="focusStatus"
					lazy
				/>
				<span class="unit">{{unit || ' '}}</span>
				<em class="tipicon"></em>
				<span class="tiptext mt-5">{{errorText || '输入有误'}}</span>
				<div :class='showTip?"tips-input":"hide"'>
					<span class="tip-text">
						{{tips || ' '}}
					</span>
					<em><i></i></em>
				</div>
			</div>
</template>
<script>
import './input.less'

const inputCls = " "

export default {
	name:"Inputtext",
	data(){
		return {
			inputCls:inputCls,
			value:'',
			showTip:false,
			focusStatus:false,
			disabled:false
		}
	},
	directives:{
		focus:{
			 update(el,{value}){
			 	if(value){
			 		el.focus()
			 	}
			 }
		}
	},
	props:['unit','placeholder','type','errorText','tips','tabindex'],
	methods:{
		eventListener(type,params){
			this.$emit("onTrigger",type,params)
		},
		focus(val){
			this.focusStatus = true
		},
		getData(){
			return this.value
		},
		setData(val){
			this.value = val
		},
		changeHandler(){
			this.eventListener("changeHandler",this.value)
		},
		clickHandler(){
			this.eventListener("clickHandler",this.value)
		},
		blurHandler(){
			this.eventListener("blurHandler",this.value)
		},
		focusHandler(){
			this.eventListener("focusHandler",this.value)
		},
		onKeyPress(){
			this.eventListener("onKeyPress",this.value)
		}
	}
}

</script>