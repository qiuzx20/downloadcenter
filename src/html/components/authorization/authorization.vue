<template>
	<div id="authorization" :class="{'close':isclose}">
		<Mysider ref="mysider" :option="getMenu" v-if="getMenu.length > 0" :setting="setting" @sider-status="siderStatus"></Mysider>
		<Right></Right>			
	</div>
</template>
<script>
import Mysider from "widget/sider/sider.vue"
import Right from "./right/right.vue"
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import {mapGetters} from 'vuex'


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
	computed:{
		...mapGetters(['getMenu'])
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
		}
	},
	components:{Mysider,Right,LoadDialog}
}

</script>

