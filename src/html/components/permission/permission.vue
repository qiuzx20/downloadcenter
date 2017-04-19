<template>
	<div id="permission" :class="{'close':isclose}">
		<Mysider ref="mysider" :option="userlist" :setting="setting" v-if="userlist" @sider-status="siderStatus"></Mysider>
		<Right :usernode="usernode"></Right>			
	</div>
</template>
<script>
import Mysider from "widget/sider/sider.vue";
import Right from "./right/right.vue";
import DialogModal from 'pubwidget/dialog/dialog.vue'
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
				        	}
				    }
			}
			this.setting = setting
			this.$http.get(window.apiUrl+"/role/queryAllRole").then((res)=>{
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
			console.log(val);
			this.usernode = val
		}
	},
	components:{Mysider,Right}
}

</script>

