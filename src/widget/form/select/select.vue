<template>
			<div :class="[chooseclasses,{error:type && !name}]">
				<input ref="selectlabel" 
				type="text" 
				:placeholder="option && option.placeholder ?option.placeholder:'请选择'" 
				@focus="focusInput" 
				@blur="blurInput" 
				v-model="showname" 
				@change="inputChange" lazy/>
				<span class="unit">{{unit || ' '}}</span>
				<em class="tipicon"></em>
				<span class="tiptext mt-5">{{errorText || '输入有误'}}</span>
				<div :class='showTip?"tips-input":"hide"'>
					<span class="tip-text">
						{{tips || ' '}}
					</span>
					<em><i></i></em>
				</div>
				<ul class="chosen-result" @wheel="mouseWheel" @mouseover="mouseOver" @mouseout="mouseOut">
					<li v-for="item in option.list" class="active-result" @click="clickHandler(item)">{{item.showname}}</li>
					<Scroll ref = "selfScroll" />
				</ul>
			</div>
</template>
<script>
import Scroll from 'pubwidget/scroll/scroll.vue'
import './select.less'

export default {
	name:"select",
	data(){
		return {
			showname:'',
			showlist:'',
			name:'',
			showul: false,
			showTip:false,
			canBlur:true
		}
	},
	props:['option','unit','placeholder','errorText','type','tips','tabindex'],
	computed:{
		chooseclasses:function(){
			if(this.showul){
				return "chosen-container input showul"
			}
			return "chosen-container input"
		}
	},
	mounted(){
		if(this.option.dropindex){
			this.showname = this.option.list[this.option.dropindex - 1].showname
			this.name = this.option.list[this.option.dropindex - 1].name
		}
	},
	methods:{
		focusInput(){
			this.canBlur = true;
			this.showlist = this.option.list,
			this.showul = true
		},
		focus(){
			this.$refs.selectlabel.focus()
		},
		blurInput(){
			setTimeout(()=>{
				if (this.canBlur) {
					this.showul = false,
					this.showname = this.showname
				}
			}, 150);
		},
		setData(val){
			this.showname=val.showname
			this.name=val.name
		},
		getData(){
			return this.name
		},
		inputChange(){

		},
		mouseWheel(event){
			if (event.deltaY != 0) {
				event.currentTarget.scrollTop = event.currentTarget.scrollTop + event.deltaY;
				this.$refs.selfScroll.top =  event.currentTarget.scrollTop
				this.$refs.selfScroll.ch =  event.currentTarget.clientHeight
				this.$refs.selfScroll.sh =  event.currentTarget.scrollHeight
			}
		},
		mouseOver(event){
			this.$refs.selfScroll.top =  event.currentTarget.scrollTop
			this.$refs.selfScroll.ch =  event.currentTarget.clientHeight
			this.$refs.selfScroll.sh =  event.currentTarget.scrollHeight
		},
		mouseOut(event){
			this.$refs.selfScroll.top =  event.currentTarget.scrollTop
			this.$refs.selfScroll.ch =  event.currentTarget.clientHeight
			this.$refs.selfScroll.sh =  event.currentTarget.scrollHeight
		},
		clickHandler(item){
			this.showname = item.showname
			this.name = item.name
			this.showul = false
			this.$emit("onTrigger","clickHandler",item)
		}
	},
	components:{
		Scroll
	}
}	
</script>