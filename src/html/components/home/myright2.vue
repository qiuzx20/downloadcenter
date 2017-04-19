<template>
	<div class="content-right">
	<ul class="radiobtn"><li :class="{active: currentView === 'Mylist'}" @click="toggleTab('Mylist')">文件列表</li><li :class="{active: currentView === 'Mylog'}" @click="toggleTab('Mylog')">下载历史</li><li :class="{active: currentView === 'Myscrect'}" @click="toggleTab('Myscrect')">密码管理</li></ul>
	<keep-alive>
		<component :is="currentView"></component>
	</keep-alive>
	</div>
</template>
<script>
import Mylist from './right2/fileslist.vue'
import Mylog from './right2/log.vue'
import Myscrect from './right2/screct.vue'
export default {
	name:'myright2',
	data(){
		return {
			currentView:"Mylist"
		}
	},
	methods:{
		toggleTab(component){
			this.currentView = component
		}
	},
	components:{
		Mylist,
		Mylog,
		Myscrect
	}

}
</script>
