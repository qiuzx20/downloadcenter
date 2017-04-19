<template>
	<div :id="option.id" class="selectdiv pos-relative" :class="[status?'open':'',option.class]" :style="option.style">
		<label class="control-label" v-if="option.type != 'single' && option.type">{{option.name}}:</label>
		<span class="pos-relative block" @click="toggleSelect">
			<input type="text" class="pack" :value="name" :placeholder="option.placeholder" readOnly/>
			<em class="arrow pos-absolute"></em>
		</span>
		<div class="r-grouplist">
			<ul>		
				<li v-for='item in datalist'>
				<div val="item.val"  @click="chooseHandler(item)">{{item.name}}</div>
				
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name:'select',
	data(){
		return {
			status:false,
			name:'',
			val:''
		}
	},
	props:['option','datalist'],
	methods:{
		eventListener(type,params){
			this.$emit(type,params)
		},
		toggleSelect(){
			this.status = !this.status
		},
		chooseHandler(event){
			this.status = false
			this.name = event.name
			this.val = event.val
			this.eventListener("onTrigger",event);

		}
	}
}
</script>