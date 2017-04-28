<template>
	<div id="home" :class="{'close':isclose}">
		<Mysider ref="mysider" v-if="treelist.length > 1" :option="treelist" :setting="setting" @sider-status="siderStatus"></Mysider>
		<component :is="currentView"></component>			
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import Mysider from "widget/sider/sider.vue";
import Myright1 from "./myright1.vue"
import Myright2 from "./myright2.vue"
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'

export default {
	name:'home',
	data () {
		return {
			isclose:false,
			currentView:'',
			datalist:[{menu_id:-1, parent_id:null, menu_name:"PAAS平台下载"}],
			setting:''
		}
	},
	created(){
		this.getTree()
	},
	computed:{
		...mapGetters(['getMenu']),
		treelist:function(){
			return this.datalist.concat(this.getMenu)
		}

	},
	watch:{
		"$route": "listenerRoute"
	},
	methods:{
		siderStatus (params) {
			this.isclose=params;
		},
		getTree(){
			const that = this
			const setting = {
				isSimpleData : true,              
				data:{
					key:{
						name:"menu_name"
					},
					simpleData: {
				        enable: true,
				        idKey:"menu_id",
				        pIdKey:"parent_id",
				        rootPId:null
				        }
					},
					view : {
				         showLine:false,
				         showIcon:false,
				         selectedMulti: false 
				       },
				    callback:{
				        onClick (event,treeId,treeNode,clickFlag){
				        		const zTree = $.fn.zTree.getZTreeObj(treeId);
								zTree.expandNode(treeNode);
								if(!treeNode.isParent){
									that.$refs.mysider.goupdata(treeNode)
								}
				        	}/*,
				        onCollapse: collapseNode,  
	        			onExpand: expandNode, */ 
				    }
			}
			this.setting = setting
			
		},
		listenerRoute(){
			if(this.$route.query.menuId != -1){
				this.currentView = "Myright2"
			}else{
				this.currentView = "Myright1"
			}

		}
	},
	components:{Mysider,Myright1,Myright2}
}

</script>

