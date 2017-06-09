<template>
	<div id="home" :class="{'close':isclose}">
		<Mysider ref="mysider" v-if="treelist.length > 1" :option="treelist" :setting="setting" @siderStatus="siderStatus"></Mysider>
		<component :is="currentView"></component>			
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import Mysider from "widget/sider/sider.vue";
import Myright1 from "./myright1.vue"
import Myright2 from "./myright2.vue"
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'

export default {
	name:'home',
	data () {
		return {
			isclose:false,
			currentView:'',
			datalist:[{menu_id:-1, parent_id:null, menu_name:"PAAS平台下载"}],
			setting:'',
			menuList:[],
			treelist:[]
		}
	},
	created(){
		this.getTree()
		this.getMenu()
	},
	/*computed:{
		//...mapGetters(['getMenu']),
		treelist:function(){
			return this.datalist.concat(this.getMenu)
		}

	},*/
	watch:{
		"$route": "listenerRoute"
	},
	methods:{
		...mapActions(['showModal','closeModal','queryMenu']),
		siderStatus (params) {
			this.isclose=params;
		},
		getMenu(){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:LoadDialog,
				timeid:timeid,
				option:{
					type:"loading",
					text:"正在加载数据..."
				}
			}
			this.showModal(option)
			this.queryMenu(1).then((resolve)=>{
				this.closeModal(timeid)
				if(resolve.code != undefined){
					if(!resolve.code){
						this.menuList = resolve.data
						this.treelist = this.datalist.concat(this.menuList)
					}else{
						Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
					}
				}else{
					Utils.errorModal(resolve,DialogModal,this.$store)
				}
			})
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
		//监控是嵌入paas的下载页面还是下载中心的页面
		listenerRoute(){
			if(this.$route.query.menuId != -1){
				//paas
				this.currentView = "Myright2" 
			}else{
				//下载中心
				this.currentView = "Myright1" 
			}

		}
	},
	components:{Mysider,Myright1,Myright2}
}

</script>

