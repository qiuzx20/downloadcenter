<template>
	<div class="dialog expansion">
		<div class="dialog-hd clearfix">
			<h2 v-if="option.title">{{option.title}}</h2>
			<span class="close" @click="closeHandler">×</span>
		</div>
		<div class="dialog-bd plr-20 choosemanager clearfix">
			<div class="chooseleft tablearea">
				<div class="mb-10 clearfix">
					<inputcompt ref="usecnname" :option="option1"></inputcompt>
					<span class="btn btn-green fl" @click="query">查 询</span></div>
				<table>
					<thead><tr><th width="15%"><label><input type="checkbox" v-model="checkedA" @click="checkAll" />全选</label></th><th width="55%">用户id</th><th width="30%">用户名</th></tr></thead>
					<tbody>
						<tr v-for='item in datalist' :id="item.username">
							<td width="15%"><label :for="item.username+'item'"><input :id="item.username+'item'" type="checkbox" v-model="checkednames" :value="item" lazy/></label></td>
							<td width="55%"><label :for="item.username+'item'">{{item.username}}</label></td>
							<td width="30%"><label :for="item.username+'item'">{{item.usecnname}}</label></td>
						</tr>
					</tbody>
				</table>
			<Pagetool v-if="pageinfo.total > pageinfo.pageSize" :option='pageinfo' @onTrigger="pageTo"></Pagetool>
			</div>
			<div class="chooseright tablearea">
				<div class="mb-10 clearfix">
					已选用户：</div>
				<table>
					<thead><tr><th width="50%">用户id</th><th width="50%">用户名</th></tr></thead>
					<tbody>
						<tr v-for="item in checkednames">
							
							<td width="50%">{{item.username}}</td>
							<td width="50%">{{item.usecnname}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="dialog-ft">
			<span class="btn btn-create mr-10" @click="okHandler">{{option.ok.text || "确定"}}</span>
			<span class="btn btn-close" @click="closeHandler">取消</span>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import Inputcompt from 'widget/form/input/input.vue'
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import Utils from 'lib/utils/utils'



const pageinfo = {total: 2,pageSize: 5,pageIndex: 1}
export default {
	name:"editpermission",
	data(){
		return {
			datalist:'',
			pageinfo:pageinfo,
			option1:{class:'fl mr-10',style:'200px',placeholder:'请输入用户名/id'},
			checkednames:[],
			checkedA:0,
			checkedB:0,
			usecnname:''
		}
	},
	created(){
		this.pageinfo.total = 0
		this.getuser()
	},
	props:['id','option'],
	methods:{
		...mapActions(['showModal','closeModal']),
		query(){
			this.usecnname = this.$refs.usecnname.getData()
			this.pageTo(1)
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.getuser()
		},
		getuser(){
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
			this.$http.post(window.apiUrl+"/user/queryUserNotByRoleId",{roleId:this.$route.query.roleId,rows:this.pageinfo.pageSize,page:this.pageinfo.pageIndex,name:this.usecnname}).then((res)=>{
				if(!res.data.code){
					this.closeModal(timeid)
					this.datalist = res.data.data.list
					this.pageinfo.total = res.data.data.total
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
				this.showModal(option)
			},(error)=>{
				this.closeModal(timeid)
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		saveUser(){
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
				this.showModal(optionA)

				return
			}
			let userarr = []
			this.checkednames.forEach((item)=>{
				userarr.push(item.username)
			})
			this.$http.post(window.apiUrl+"/user/saveUser",{roleId:this.$route.query.roleId,userIds:userarr}).then((res)=>{
				if(!res.data.code){
					const that = this
					const timeid = (new Date()).getTime()
					const option = {
						Dialog:DialogModal,
						timeid:timeid,
						option:{
							type:"ok",
							title:"提示",
							content:"添加成功！",
							ok:{
								text:"知道了",
								callback(){
									that.closeHandler()
									if (that.option.ok.callback) {
										that.option.ok.callback()
									}
								}
							}
						}
					}
					this.showModal(option)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
				
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		checkAll(){
			let alluser = []
			let checkallname = []
			this.datalist.forEach((item)=>{
				alluser.push(item)
			})

			if(this.checkedA){
				checkallname = Array.from(new Set(alluser.concat(this.checkednames)))
			}else{
				let temp = this.checkednames
				temp.forEach((v,i,a)=>{
					if(alluser.indexOf(v) == -1){
						checkallname.push(v)
					}
				})
			}
			this.checkednames = checkallname
		},
		closeHandler(){
			this.closeModal(this.id)
		},
		okHandler(params){
			this.saveUser()
		}
	},
	components:{
		Inputcompt,
		Pagetool,
		DialogModal
	}
}
</script>