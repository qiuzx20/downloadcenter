<template>
	<div id="authorization" :class="{'close':isclose}">
		<Mysider ref="mysider" :option="datalist" v-if="datalist.length > 0" :setting="setting" @sider-status="siderStatus"></Mysider>
		<Right></Right>			
	</div>
</template>
<script>
import Mysider from "widget/sider/sider.vue"
import Right from "./right/right.vue"
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'


export default {
	name:'authorization',
	data () {
		return {
			isclose:false,
			currentView:"Myright1",
			datalist:'',
			setting:''
		}
	},
	created(){
		this.getTree()
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
				         showIcon:false
				       },
				    callback:{
				        onClick (event,treeId,treeNode,clickFlag){
				        		const zTree = $.fn.zTree.getZTreeObj(treeId);
								zTree.expandNode(treeNode);
								if(!treeNode.isParent){
									that.$refs.mysider.goupdata(treeNode)
								}
				        	}
				    }
			}
			this.setting = setting
			this.$http.get(window.apiUrl+"/menu/queryMenu").then((res)=>{
				if(res.data.code !==0)Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				this.datalist = res.data.data

			},
			(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		}
	},
	components:{Mysider,Right,LoadDialog}
}

</script>

