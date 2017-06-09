<template>
	<div id="authorization" :class="{'close':isclose}">
		<Mysider ref="mysider" :option="menulist" v-if="menulist.length > 0" :setting="setting" @siderStatus="siderStatus"></Mysider>
		<Right></Right>			
	</div>
</template>
<script>
import Mysider from "widget/sider/sider.vue"
import Right from "./right/right.vue"
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import {mapActions} from 'vuex'


export default {
	name:'authorization',
	data () {
		return {
			isclose:false,
			currentView:"Myright1",
			datalist:'',
			setting:'',
			menulist:[]
		}
	},
	created(){
		this.getTree()
		this.getMenu()
	},
	/*computed:{
		...mapGetters(['getMenu'])
	},*/
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
			this.queryMenu(3).then((resolve)=>{
				this.closeModal(timeid)
				if(resolve.code != undefined){
					if(!resolve.code){
						this.menulist = resolve.data
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

