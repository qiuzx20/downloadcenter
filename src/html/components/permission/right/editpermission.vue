<template>
	<div class="dialog expansion">
		<div class="dialog-hd clearfix">
			<h2 v-if="option.title">{{option.title}}</h2>
			<span class="close" @click="closeHandler">×</span>
		</div>
		<div class="dialog-bd plr-20 choosemanager clearfix">
			<ul class="ztree" id="permissionztree"></ul>
		</div>
		<div class="dialog-ft">
			<span class="btn btn-create mr-10" @click="okHandler">确定</span>
			<span class="btn btn-close" @click="closeHandler">取消</span>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import zTree from 'lib/ztree/jquery.ztree.all.min.js'
import 'lib/ztree/zTreeStyle.css'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import Utils from 'lib/utils/utils'

export default {
	name:"editpermission",
	data(){
		return {
			treelist:"",
			privilegeArr:[],
			objtree:''
		}
	},
	created(){
		this.queryTree()
	},
	props:['id','option'],
	methods:{
		...mapActions(['showModal','closeModal']),
		eventListener(type,params){
			this.$emit("onTrigger",type,params)
		},
		queryTree(){
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
			this.$http.post(window.apiUrl+"/menu/getPrivilegeByRoleId",{roleId:this.option.roleid}).then((res)=>{
				this.closeModal(timeid)
				const itemarr = []
				res.data.data.forEach((item)=>{
					item.checked = (item.isprivilege === 1)
					itemarr.push(item)
				})
				this.treelist = itemarr

				this.buildTree();
			},(error)=>{
				this.closeModal(timeid)
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		buildTree(){
			const that = this
			const setting = {
				isSimpleData : true,              
				data:{
					key:{
						name:"menu_name",
					},
					simpleData: {
					        enable: true,
					        idKey:"menu_id",
					        pIdKey:"parent_id",
					        rootPId:null
				        }
					},
					view:{
						autoCancelSelected:false
					},
					check:{
					    enable:true
					},
				    callback:{
				        onClick (event,treeId,treeNode,clickFlag){

				        	}
				    }
			}
			this.objtree = $.fn.zTree.init($("#permissionztree.ztree"),setting,this.treelist)
		},
		savePrivilege(){
			const menuarr = []
			this.objtree.getCheckedNodes().forEach((item)=>{
				menuarr.push(item.menu_id)
			})
			this.$http.post(window.apiUrl+"/menu/updatePrivilege",{roleId:this.option.roleid,menuIds:menuarr || ''}).then((res)=>{
				this.closeHandler()
				if(!res.data.code){
					const timeidA = (new Date()).getTime()
					const optionA = {
						Dialog:DialogModal,
						timeid:timeidA,
						option:{
							type:"ok",
							title:"提示",
							content:"编辑成功！",
							ok:{
								text:"知道了"
							}
						}
					}
					this.showModal(optionA)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}

			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		closeHandler(){
			this.closeModal(this.id)
		},
		okHandler(params){
			this.savePrivilege()
		}
	},
	components:{
	}
}
</script>