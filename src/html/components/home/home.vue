<template>
	<div id="home" :class="{'close':isclose}">
		<Mysider ref="mysider" v-if="datalist" :option="datalist" :setting="setting" @sider-status="siderStatus"></Mysider>
		<component :is="currentView"></component>			
	</div>
</template>
<script>
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
			datalist:'',
			setting:''
		}
	},
	created(){
		this.getTree()
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
			this.$http.get(window.apiUrl+"/menu/queryMenu").then((res)=>{
				if(!res.data.code){
					res.data && res.data.data.unshift({"menu_id":-1, "parent_id":null, "menu_name":"PAAS平台下载"})
					this.datalist = res.data.data
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
			},
			(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
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

