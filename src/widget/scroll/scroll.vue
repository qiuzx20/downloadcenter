<template>
	<div class="f-scroll" :style="position">
					<div class="f-sider" :style="siderPosition"></div>
				</div>
</template>
<script>
import './scroll.less'

export default {
	name:"scroll",
	data(){
		return {
			top: 0,
			ch: 100,
			sh: 100,
			display:'block'
		}
	},
	computed:{
		position(){
			return {
				top: this.top,
				bottom: this.top * -1,
				display: this.display
			}
		},
		siderPosition(){
			return {
				height: this.ch / this.sh * 100 + "%",
				top: this.top / this.sh * 100 + "%"
			}
		},
		display(){
			if(this.ch == this.sh){
				return 'none'
			}
			return 'block'
			 
		}
	}
}

</script>