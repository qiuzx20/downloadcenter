<template>
	<div class="content-right">
		<div class="topcrumb"><h3 class="title fl">{{!isadd?"角色信息编辑":"增加角色"}}</h3><span class="fr"><a class="btn btn-green mr-10" v-show="!isadd" @click="editPermission">编辑权限</a><a class="btn btn-green mr-10" v-show="!isadd" @click="addRole">增加角色</a> <a class="btn btn-green" v-show="!isadd" @click="delRole">删除角色</a></span></div>
		<div class="clearfix">
			<ul class="ulform menu-u-top">
				<Pubtext ref="roleid" :option="option1" @onTrigger="eventListener"></Pubtext>
				<Pubtext ref="rolename" :option="option2" @onTrigger="eventListener"></Pubtext>
				<Seletcer ref="roletype" :option="option3" @onTrigger="eventListener"></Seletcer>
				<ol class="clearfix"></ol>
			</ul>
		</div>
		<div class="clearfix"><button class="btn btn-blue mr-10" @click="saveRole">保 存</button></div>
		<div class="topcrumb mt-40" v-if="!isadd"><h3 class="title fl">用户列表</h3><span class="fr">
			<Inputcompt ref="usercname" :option="option4" v-show="datalist"></Inputcompt>
					<span class="btn btn-green fl mr-10" @click="queryUser" v-show="datalist">查 询</span><a class="fl btn btn-green mr-10"  @click="addToRole">添加用户到该角色</a><a class="fl btn btn-green mr-10" @click="delUser" v-show="datalist">删除用户</a> </span></div>
		<div class="tablearea mt-10" v-if="!isadd">
			<table class="clearfix">
			<thead><tr><th width="6%"><label><input type="checkbox" @click="checkAll" v-model="checkall"/>全选</label></th><th width="20%">用户id</th><th width="10%">用户名</th><th width="10%">角色名称</th><th width="10%">手机号码</th><th width="14%">邮箱</th><th width="30%">备注</th></tr></thead>
			<tbody>
				<tr v-for='item in datalist' :id="item.username">
					<td width="6%"><input type="checkbox" :value="item.username" v-model="checkednames" :checked="checkednames.indexOf(item.username) > -1" /></td>
					<td width="20%">{{item.username}}</td>
					<td width="10%">{{item.usecnname}}</td>
					<td width="10%">{{item.dbuser}}</td>
					<td width="10%">{{item.phone}}</td>
					<td width="14%">{{item.mail}}</td>
					<td width="30%">{{item.remark}}</td>
				</tr>
			</tbody>
			</table>
			<Pagetool v-if="pageinfo.total > pageinfo.pageSize" :option='pageinfo' @onTrigger="pageTo"></Pagetool>
		</div>

	</div>
</template>
<script>
import Pubtext from 'widget/form/pubtext.vue'
import Seletcer from 'widget/form/select.vue'
import Inputcompt from 'widget/form/input/input.vue'
import Inputtext from 'pubwidget/form/input/input.vue'
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Editpermission from './editpermission.vue'
import Addtorole from './addtorole.vue'

import Utils from 'lib/utils/utils'

const pageinfo = {total: 5,pageSize: 9,pageIndex: 1}
const option = {
	option1:{
		name:"角色ID",
		id:'roleid',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入角色ID",
		unit:'',
		errorText:'输入有误',
		tips:'请输入角色ID'
	},
	option2:{
		name:"角色名",
		id:'rolename',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入角色名",
		unit:'',
		errorText:'输入有误',
		tips:'请输入角色名'
	},
	option3:{
		name:"角色类型",
		id:'rolecate',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请选择角色类型",
		unit:'',
		errorText:'请选择角色类型',
		tips:'请选择角色类型',
		selectshowname:"role_name",
		selectname:"role_id",
		list:[]
	},
	option4:{
		class:'fl mr-10',
		style:'200px',
		placeholder:'请输入用户名/id'
	}
}




export default {
	name:"right",
	data(){
		return {
			option1:option.option1,
			option2:option.option2,
			option3:option.option3,
			option4:option.option4,
			pageinfo:pageinfo,
			datalist:[],
			checkednames:[],
			checkall:0,
			roleid:'',
			isadd:false,
			usernode:''
		}
	},
	watch:{
		"$route": "listenerRoute"
	},
	methods:{
		eventListener(type,params,obj){
		},
		listenerRoute(val,oldval){
			if(val.query.roleId != oldval.query.roleId){
				this.doQueryUser()
			}
			
		},
		saveRole(){
			if(!this.$refs.roleid.getData()){
				this.$refs.roleid.focus()
				return
			}
			if(Utils.isChineseChar(this.$refs.roleid.getData())){
				this.$refs.roleid.type = "error"
				this.$refs.roleid.errorText = "角色ID不能包含中文"
				this.$refs.roleid.focus()
				return
			}
			if(!this.$refs.rolename.getData()){
				this.$refs.rolename.focus()
				return
			}
			if(typeof this.$refs.roletype.getData() != "number"){
				this.$refs.roletype.focus()
				return
			}
			this.doSave()

			
		},
		addRole(){
			this.isadd = true
			this.$refs.roleid.setData('')
			this.$refs.rolename.setData('')
			this.$refs.roletype.setData('')
			this.$refs.roleid.focus()
			this.datalist = []
			this.checkednames = []
		},
		doSave(){
			let actionurl=window.apiUrl+"/role/updateRole"
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:LoadDialog,
				timeid:timeid,
				option:{
					type:"loading",
					text:"正在保存，请稍等..."
				}
			}
			this.$store.dispatch("showModal",option)
			if(this.isadd){
				actionurl=window.apiUrl+"/role/addRole"
			}
			this.$http.post(actionurl,{roleId:this.$refs.roleid.getData(),roleName:this.$refs.rolename.getData(),roleType:this.$refs.roletype.getData(),parentId:this.isadd?this.usernode.roleId:''}).then((res)=>{
				this.$store.dispatch("closeModal",timeid)
				if(!res.data.code){
					const that = this
					const timeidD = (new Date()).getTime()
					const optionD = {
						Dialog:DialogModal,
						timeid:timeidD,
						option:{
							type:"ok",
							title:"提示",
							content:"保存成功！",
							ok:{
								text:"知道了",
								callback(){
									that.cancel()
								}
							}
						}
					}
					this.$store.dispatch("showModal",optionD)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
			},(error)=>{
				this.$store.dispatch("closeModal",timeid)
				Utils.errorModal(error,DialogModal,this.$store)
			})
			this.isadd = false
		},
		delRole(){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:LoadDialog,
				timeid:timeid,
				option:{
					type:"loading",
					text:"正在删除，请稍等..."
				}
			}
			this.$store.dispatch("showModal",option)
			this.$http.post(window.apiUrl+"/role/deleteRole",{roleId:this.$route.query.roleId}).then((res)=>{
				this.$store.dispatch("closeModal",timeid)
				if(!res.data.code){
					const that = this
					const timeidD = (new Date()).getTime()
					const optionD = {
						Dialog:DialogModal,
						timeid:timeidD,
						option:{
							type:"ok",
							title:"提示",
							content:"删除成功！",
							ok:{
								text:"知道了",
								callback(){
									that.cancel()
								}
							}
						}
					}
					this.$store.dispatch("showModal",optionD)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
				
			},(error)=>{
				this.$store.dispatch("closeModal",timeid)
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		defaultInfo(){
			this.$refs.roleid.setData(this.usernode.roleId)
			this.$refs.rolename.setData(this.usernode.roleName)
			this.$refs.roletype.setData({"name":this.usernode.roleType,"showname":this.usernode.roleTypeName})
		},
		chooseManager(){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:ChooseManager,
				timeid: timeid,
				option:{
					type:'',
					title:'选择管理员'
				}
			}
			this.$store.dispatch("showModal",option)
		},
		updateManager(val){
			this.manager = val.name
			this.$refs.managerref.$refs.pubtext.setData(val.name)
			this.$refs.managerref.type=''
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.userList()
		},
		doQueryUser(){
			this.$http.post(window.apiUrl+"/role/getRoleByRoleId",{roleId:this.$route.query.roleId}).then((res)=>{
				this.usernode = res.data.data
				this.defaultInfo()
				this.userList()
				this.roleid = this.$route.query.roleId
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})

			this.$http.get(window.apiUrl+"/role/asynRoleType").then((res)=>{
				let newlist=[]
				res.data.data.forEach((item)=>{
					newlist.push({"name":item.roleType,"showname":item.roleTypeName})
				})
				this.option3.list = newlist
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})

			this.isadd = false
		},
		userList(){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:LoadDialog,
				timeid:timeid,
				option:{
					type:"loading",
					text:"正在加载数据..."
				}
			}
			this.$store.dispatch("showModal",option)
			this.$http.post(window.apiUrl+"/user/queryUserByRoleId",{roleId:this.$route.query.roleId,rows:this.pageinfo.pageSize,page:this.pageinfo.pageIndex,name:this.$refs.usercname.getData() || ''}).then((res)=>{
				this.$store.dispatch("closeModal",timeid)
				this.datalist = res.data.data && res.data.data.list
				this.pageinfo.total = res.data.total

			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		checkAll(){
			let checkallname = []
			let allname = [] //当前页数据
			let temp = []
			this.datalist.forEach(function(item){
					allname.push(item.username)
			})
			if(this.checkall){
				checkallname = Array.from(new Set(allname.concat(this.checkednames)))
			}else{
				let temp = this.checkednames
				temp.forEach((v,i,a)=>{
					if(allname.indexOf(v) == -1){
						checkallname.push(v)
					}
				})
			}
			this.checkednames = checkallname
		},
		queryUser(){
			this.pageTo(1)
		},
		cancel(){
			this.$router.go(0)
		},
		delUser(){
			if(!this.checkednames.length){
				const timeidA = (new Date()).getTime()
				const optionA = {
					Dialog:DialogModal,
					timeid:timeidA,
					option:{
						type:"error",
						title:"提示",
						content:"未选用户！",
						ok:{
							text:"知道了"
						}
					}
				}
				this.$store.dispatch("showModal",optionA)
				return
			}
			this.$http.post(window.apiUrl+"/user/deleteUser",{roleId:this.$route.query.roleId,userIds:this.checkednames}).then((res)=>{
				if(!res.data.code){
					const that = this
					const timeidB = (new Date()).getTime()
					const optionB = {
						Dialog:DialogModal,
						timeid:timeidB,
						option:{
							type:"error",
							title:"提示",
							content:"删除成功！",
							ok:{
								text:"知道了",
								callback(){
									that.userList()
								}
							}
						}
					}
					this.$store.dispatch("showModal",optionB)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		editPermission(){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:Editpermission,
				timeid:timeid,
				option:{
					roleid:this.roleid,
					title:"编辑权限"
				}
			}
			this.$store.dispatch("showModal",option)
		},
		addToRole(){
			const that = this
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:Addtorole,
				timeid:timeid,
				option:{
					title:"添加用户到该角色",
					ok:{
						callback(){
							that.pageTo(1)
						}
					}
				}
			}
			this.$store.dispatch("showModal",option)
		}/*,
		unique(arr){
			let i = 0
			const len = arr.length
			let obj={}
			let result=[]
			for(;i<len;i++){
				if(!obj[arr[i]]){
					result.push(arr[i])
					obj[arr[i]] = 1
				}
			}
			return result
		}*/

	},
	components:{
		Pubtext,
		Inputtext,
		Seletcer,
		Pagetool,
		Editpermission,
		Addtorole,
		DialogModal,
		Inputcompt
	}
}
</script>