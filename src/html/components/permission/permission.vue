<template>
	<div id="permission" :class="{'close':isclose}">
		<Mysider ref="mysider" :option="userlist" :setting="setting" v-if="userlist" @siderStatus="siderStatus"></Mysider>
		<Right ref="right" :usernode="usernode"></Right>			
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import Mysider from "widget/sider/sider.vue";
import Right from "./right/right.vue";
import DialogModal from 'pubwidget/dialog/dialog.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import Utils from 'lib/utils/utils'

export default {
	name:'home',
	data () {
		return {
			isclose:false,
			userlist:'',
			setting:'',
			usernode:{}
		}
	},
	created(){
		this.getTree()
	},
	methods:{
		...mapActions(['showModal','closeModal']),
		siderStatus (params) {
			this.isclose=params;
		},
		getTree(){
			const that = this
			const setting = {
				isSimpleData : true,              
				data:{
					key:{
						name:"roleName"
					},
					simpleData: {
				        enable: true,
				        idKey:"roleId",
				        pIdKey:"parentId",
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
			this.$http.get(window.apiUrl+"/role/queryAllRole").then((res)=>{
				this.closeModal(timeid)
				if(!res.data.code){
					this.userlist = res.data.data
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
			},
			(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		setUsernode(val){
			this.usernode = val
		}
	},
	components:{Mysider,Right}
}

</script>

