<template>
	<div class="dialog expansion">
		<div class="dialog-hd clearfix">
			<h2 v-if="option.title">{{option.title}}</h2>
			<span class="close" @click="closeHandler">×</span>
		</div>
		<div class="dialog-bd plr-20 choosemanager clearfix">
			<div class="mb-10" style="overflow:hidden"><div class="chooseleft tablearea">
				<div class="mb-10 clearfix">
					<inputcompt ref="username" :option="option1"></inputcompt>
					<span class="btn btn-green fl" @click="query">查 询</span></div>
				<table :class="{uerror:usererror}">
					<thead><tr><th width="15%"><label><input type="checkbox" v-model="checkedA" @click="checkedAll" />全选</label></th><th width="55%">用户名</th><th width="30%">名称</th></tr></thead>
					<tbody>
						<tr v-for='item in datalist' :id="item.user_id">
							<td width="15%"><label><input :id="item.user_id+'auth'" type="checkbox" v-model="checkednames" :value="item" lazy/></label></td>
							<td width="55%"><label :for="item.user_id+'auth'">{{item.user_id}}</label></td>
							<td width="30%"><label :for="item.user_id+'auth'">{{item.user_name}}</label></td>
						</tr>
					</tbody>
				</table>
				<div v-show="usererror" class="tfooterr">请选择用户</div>
			<Pagetool v-show="pageinfo.total > pageinfo.pageSize" :option='pageinfo' @onTrigger="pageTo"></Pagetool>
			</div>
			<div class="chooseright tablearea">
				<div class="mb-10 clearfix">
					已选用户：</div>
				<table>
					<thead><tr><th width="50%">用户名</th><th width="50%">名称</th></tr></thead>
					<tbody>
						<tr v-for="item in checkednames">
							
							<td width="50%">{{item.user_id}}</td>
							<td width="50%">{{item.user_name}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
			<div class="chooseauth clearboth ">
				<ul class="ulform clearfix">
					<Selecter ref="level" :option="levellist"></Selecter>
					<li class="clearfix">
							<div class="name fl">是否加水印：</div>
							<div class="substance fl">
								<label><input type="radio" v-model="iswater" value="1" />是</label>
								<label><input type="radio" v-model="iswater" value="0"/>否</label>
							</div>

					</li>
					<li class="clearfix">
							<div class="name fl">是否压缩加密：</div>
							<div class="substance fl">
								<label><input type="radio" v-model="isscrect" value="1" />是</label>
								<label><input type="radio" v-model="isscrect" value="0"/>否</label>
							</div>

					</li>
				</ul>
			</div>
			<div class="chooseauthfile clearboth mt-10" :class="fileerror">
				<label v-for="item in option.params" class="mr-20"><input type="checkbox" v-model="files" :value="item"/>{{item.file_name}}</label>
				<div class="tip">请选择文件</div>
			</div>
		</div>
		<div class="dialog-ft">
			<span class="btn btn-create mr-10" @click="okHandler">确定</span>
			<span class="btn btn-close" @click="closeHandler">取消</span>
		</div>
	</div>
</template>
<script>
import Inputcompt from 'widget/form/input/input.vue'
import Selecter from 'widget/form/select.vue'
import Raido from 'pubwidget/form/radio/radio.vue'
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'
import {mapGetters} from 'vuex'

const datalist=[{id:1,name:"test01"},{id:2,name:"test02"},{id:3,name:"test03"}]
const pageinfo = {total: 1,pageSize: 5,pageIndex: 1}

export default {
	name:"authormodal",
	data(){
		return {
			option1:{class:'fl mr-10',style:'200px',placeholder:'请输入用户名/id'},
			datalist:'',
			pageinfo:pageinfo,
			userName:'',
			checkednames:[],
			checkedA:0,
			iswater:0,
			isscrect:0,
			files:[],
			fileerror:'',
			usererror:false

		}
	},
	props:['id','option'],
	mounted(){
		this.files = this.option.params
	},
	created(){
		this.getUserList()
	},
	computed:{
		...mapGetters(['getLevel']),
		levellist(){
			let selectsetter = {
					name:"敏感级别",
					id:"level",
					mustbe:true,
					type:'',
					tabindex:'',
					placeholder:"请选择敏感级别",
					unit:"",
					errorText:'请选择',
					tips:'请选择敏感级别',
					dropindex:0,
					list:[{name:-1,showname:'全部'}]}
			selectsetter.list = selectsetter.list.concat(this.getLevel)
			return selectsetter
		}
	},
	watch:{
		files:function(val,oldval){
			if(!this.files.length){
				this.fileerror = "error"
			}else {
				this.fileerror = ""
			}
		},
		checkednames:function(val,oldval){
			if(!this.checkednames.length){
				this.usererror = true
			}else {
				this.usererror = false
			}
		}
	},
	methods:{
		query(){
			this.userName = this.$refs.username.getData() || ''
			this.pageTo(1)
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.getAuthList()
		},
		getUserList(){
			this.$http.post(window.apiUrl+"/file/userlist",{menuId:this.$route.query.menuId,pageSize:this.pageinfo.pageSize,pageNumber:this.pageinfo.pageIndex,name:this.userName}).then((res)=>{
				this.datalist = res.data.list
				this.pageinfo.total = res.data.total
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		queryLevel(){
			this.$store.dispatch("queryLevel").then((resolve)=>{
				if(resolve != "ok" && resolve.data.code > 0)Utils.errorModal(resolve,DialogModal,this.$store)
			})
		},
		check(){
			if(!this.checkednames.length){
				this.usererror = true
				return
			}
			if(!this.files.length){
				return
			}else{
				let i=0
				const len = this.files.length
				for(; i < len;i++){
					if(!this.checkIsWater(this.files[i])){
						return
					}
				}
			}
			
			if(!this.$refs.level.getData()){
				this.$refs.level.type= "error"
				return
			}else{
				this.$refs.level.type = ""
			}
			return true
		},
		checkIsWater(item){
			if(this.iswater == '0') return true
			if(item.file_size > 30 || item.file_line > 100000){
					const timeidA = (new Date()).getTime()
					const optionA = {
						Dialog:DialogModal,
						timeid:timeidA,
						option:{
							type:"error",
							title:"提示",
							content:item.file_name+(item.file_size > 30?"大小超过30M,":'')+(item.file_line > 100000?"记录条数超过十五条,":'')+"不能加水印！",
							ok:{
								text:"知道了"
							}
						}
					}
					this.$store.dispatch("showModal",optionA)
				return false
			}
			return true
		},
		checkedAll(){
			let alluser = []
			let checkallname = []
			this.datalist.map((item)=>{
				alluser.push(item)
			})
			checkallname = Array.from(new Set(alluser.concat(this.checkednames)))
			this.checkednames = checkallname
		},
		saveAuth(){
			if(!this.check())return
			const filesarr = []
			const usersarr = []
			this.files.forEach((item)=>{
				filesarr.push(item.file_id)
			})
			this.checkednames.forEach((item)=>{
				usersarr.push(item.user_id)
			})
			this.$http.post(window.apiUrl+"/file/fileauthorize",{fileids:filesarr,userids:usersarr,level:this.$refs.level.getData(),isZip:this.isscrect,isWarter:this.iswater}).then((res)=>{
				if(!res.data.code){
					this.closeHandler()
					const that = this
					const timeidA = (new Date()).getTime()
					const optionA = {
						Dialog:DialogModal,
						timeid:timeidA,
						option:{
							type:"ok",
							title:"提示",
							content:"保存成功！",
							ok:{
								text:"知道了",
								callback(){
									if (that.option.ok.callback) {
										that.option.ok.callback()
									}
								}
							}
						}
					}
					this.$store.dispatch("showModal",optionA)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
				

			},(error)=>{
				this.closeHandler()
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		closeHandler(){
			this.$store.dispatch("closeModal",this.id)
		},
		okHandler(params){
			this.saveAuth()
		}
	},
	components:{
		Inputcompt,
		Pagetool,
		Selecter,
		Raido
	}
}
</script>