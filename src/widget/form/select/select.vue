<template>
			<div :class="[chooseclasses,{error:type}]" >
				<input ref="selectlabel" type="text" :placeholder="option && option.placeholder ?option.placeholder:'请选择'"  @focus="focusInput" @blur="blurInput" v-model="showname" @change="inputChange" lazy/>

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
			canBlur:true,
			type:''
		}
	},
	props:['option'],
	computed:{
		chooseclasses:function(){
			if(this.showul){
				return "chosen-container input showul"
			}
			return "chosen-container input"
		}
	},
	created(){
		//this.showlist=[{id:33,name:"系统管理员"},{id:44,name:"普通角色"}]
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
			this.showlist =this.option.list,
			this.showul=true
		},
		focus(){
			this.$refs.selectlabel.focus()
		},
		blurInput(){
			setTimeout(()=>{
				if (this.canBlur) {
						this.showul=false,
						this.showname=this.showname
				}
			}, 100);
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
			this.showul = false;
		}
	},
	components:{
		Scroll
	}
}	
</script>