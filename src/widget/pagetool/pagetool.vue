<template>
	<div class="pagetool">
		<span class="first-page icon"  @click='jumpToFirst'></span>
		<span v-for="(item,index) in pagelist" v-show="showPage(index)" :class="index+1==pageIndex?'active page-no':'page-no'" @click="jumpTo(index+1)">{{index+1}}</span>
		<span class="last-page icon" @click='jumpToLast'></span>
		<span class="jump">跳转到第
		<input type="text" v-model='pageIndex' class="page-index" @onKeyPress='inputKeyPress' lazy/>&nbsp;/&nbsp;
		<span>{{pages}}</span>页</span>
		<span class="button" @click="okButton">确定</span>
	</div>
</template>
<script>
import './pagetool.less'
export default {
	name:"pagetool",
	data(){
		return {
			pagelist: [],
			total: 0,//总数
			pageIndex: 1,//当前页
			pages: 0,//总页数
			showNum:1//可显示的pagebtn前后个数，例如：当前是10页，显示10页前N页和后N页
		}
	},
	props:['option'],
	watch:{
		'option':{
			handler:function(val,oldval){
				this.pageIndex = val.pageIndex
			},
			deep:true
		}
	},
	mounted(){
		//最小为330px 最少显示3个BTN
		const itemwidth = this.$el.childNodes[0].offsetWidth //单个BTN的宽度
		const num = Math.floor(((this.$el.clientWidth - 350)/itemwidth)/2)
		this.showNum = (num > 0) ? num : 1
		this.calcParam(this.option)
	},
	methods:{
		eventListener(type,num){
			this.$emit(type,num)
		},
		showPage(index){
			const pageIndex = Number(this.pageIndex)
			return ((pageIndex + this.showNum) > index) && ((pageIndex - this.showNum - 2) < index)
		},
		okButton(){
			if(this.pageIndex >this.pages ){
				this.pageIndex = this.pages
			}
			this.jumpTo(this.pageIndex);
		},
		setIndex(num){
			this.pageIndex = num
		},
		jumpTo(num){
			this.pageIndex = num
			this.eventListener("onTrigger",num)
		},
		inputKeyPress(event){
			if (event.which == 13) {
				let index = this.pageIndex;
				const pages = this.pages;
				if(index > pages){
					index = pages;
				}
				this.jumpTo(index);
			} else if (event.which < 48 || event.which > 57) {
				return false;
			}
		},
		jumpToFirst(){
			this.jumpTo(1);
		},
		jumpToLast(){
			this.jumpTo(this.pages);
		},
		calcParam (option) {
			let total = option.total;
			let pages = 0;
			let pageIndex = ~~(option.pageIndex);
			if (pageIndex < 1) {
				pageIndex = 1;
			}
			const yushu = total % option.pageSize;
			if (yushu == 0) {
				pages = total / option.pageSize;
			} else {
				pages = (total - yushu) / option.pageSize + 1;
			}
			if (pageIndex > pages) {
				pageIndex = pages;
			}
			// 1. 当前页码往前计算
			let prvnos = [];
			let temp = pageIndex;
			while (true) {
				temp--;
				if (temp > 0) {
					prvnos.unshift(temp);
				} else {
					break;
				}
				/*if (prvnos.length == 8) {
					break;
				}*/
			}

			// 2. 往后计算页码
			const tailnos = [];
			temp = pageIndex;
			while (true) {
				temp++;
				if (temp <= pages) {
					tailnos.push(temp);
				} else {
					break;
				}
				/*if (tailnos.length == 8) {
					break;
				}*/
			}

			/*while (prvnos.length + tailnos.length > 8) {
				if (prvnos.length > 4) {
					prvnos.shift();
					continue;
				}

				if (tailnos.length > 4) {
					tailnos.pop();
					continue;
				}
			}*/
			prvnos.push(pageIndex);
			this.pagelist=prvnos.concat(tailnos)
			this.total=total
			this.pages=pages
			this.pageIndex=pageIndex
			
		}
	}
}

</script>