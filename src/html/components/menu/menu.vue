<template>
	<div id="menu" :class="{'close':isclose}">
		<Mysider ref="mysider" :option="menulist" v-if="menulist.length > 0" :setting="setting" @siderStatus="siderStatus"></Mysider>
		<Right ref="right" @onTrigger="eventListener"></Right>			
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import Mysider from "widget/sider/sider.vue";
import Right from "./right/right.vue";
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'


export default {
	name:'menu',
	data () {
		return {
			isclose:false,
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
		...mapGetters(['getUserInfo']),
	},*/
	methods:{
		...mapActions(['showModal','closeModal','queryMenu']),
		eventListener(type,params){
			if(type == "addNodes"){
				this.$refs.mysider.addNodes(params)
			}
		},
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
			this.queryMenu(2).then((resolve)=>{
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
				        		that.$refs.mysider.goupdata(treeNode)
				        		if(treeNode.children){
				        			that.$refs.right.childrenNum = treeNode.children.length
				        		}else{
				        			that.$refs.right.childrenNum = 0
				        		}
				        	}
				    }
			}
			this.setting = setting
			/*this.$http.get(window.apiUrl+"/menu/queryMenu").then((res)=>{
				if(!res.data.code){
					this.datalist = res.data.data

				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
			},
			(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})*/
		}
	},
	components:{Mysider,Right}
}

</script>

