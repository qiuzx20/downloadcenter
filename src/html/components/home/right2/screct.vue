<template>
	<div class="">
		<div class="navbar">
			<inputcompt ref="username" :option='usersetter'></inputcompt>
			<inputcompt ref="filename" :option='filessetter'></inputcompt>
			<span class="btn btn-green" @click="query">查 询</span>
		</div>
		<div class="tablearea mt-10">
			<table >
			<thead><tr><th width="30%">文件编号</th><th width="20%">文件名</th><th width="10%">所属用户</th><th width="20%">加密密码</th><th width="20%">操作</th></tr></thead>
			<tbody>
				<tr v-for='item in datalist' :id="item.file_id">
					<td width="30%">{{item.file_id}}</td>
					<td width="20%" :title="item.file_name">{{item.file_name}}</td>
					
					<td width="10%">{{item.usecnname}}</td>
					<td width="20%">{{item.file_password}}</td>
					<td width="20%"><button class="btn btn-small btn-primary" @click="sendscrect(item)">发送密码</button></td>

					
				</tr>
			</tbody>
			</table>
		</div>
		<Pagetool  v-if="pageinfo.total > pageinfo.pageSize" :option='pageinfo' @onTrigger="pageTo"></Pagetool>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import inputcompt from 'widget/form/input/input.vue'
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'


const pageinfo = {total: 2,pageSize: 10,pageIndex: 1}
const usersetter = {id:"filename",name:"输入所属用户",type:"",class:"fl mr-10",placeholder:"输入所属用户",style:"width:200px"}
const filessetter = {id:"filename",name:"输入文件名",type:"",class:"fl mr-10",placeholder:"输入文件名",style:"width:200px"}





export default {
	name:"screct",
	data(){
		return {
			usersetter:usersetter,
			filessetter:filessetter,
			datalist:'',
			pageinfo:pageinfo,
			userName:'',
			fileName:''
		}
	},
	created(){
		this.getScrectList()
	},
	watch:{
		'$route':function(val,oldval){
			if(!val.query.menuId){
				history.go(-1)
				return
			}
			if(val.query.menuId != oldval.query.menuId){
				this.getScrectList()
			}
		}
	},
	methods:{
		...mapActions(['showModal','closeModal']),
		eventListener(params){
			console.log(params);
		},
		query(){
			this.userName = this.$refs.username.getData()
			this.fileName = this.$refs.filename.getData()
			this.pageTo(1)
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.getScrectList()
		},
		getScrectList(){
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
			this.$http.post(window.apiUrl+"/file/filepwdlist",{pageSize:this.pageinfo.pageSize,pageNumber:this.pageinfo.pageIndex,menuId:this.$route.query.menuId,fileName:this.fileName,usecnname:this.userName}).then((res)=>{
				this.closeModal(timeid)
				this.datalist = res.data.list
				this.pageinfo.total = res.data.total
				},(error)=>{
					this.closeModal(timeid)
					Utils.errorModal(error,DialogModal,this.$store)
				})
		},
		sendscrect(item){
			this.$http.post(window.apiUrl+"/file/sendpwd",{fileId:item.file_id || '',userId:item.user_id || ''}).then((res)=>{
				if(!res.data.code){
					const timeid = (new Date()).getTime()
					const option = {
						Dialog:DialogModal,
						timeid:timeid,
						option:{
							type:"ok",
							title:"提示",
							content:"发送成功！",
							ok:{
								text:"知道了"
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
		}
	},
	components:{
		inputcompt,
		Pagetool
	}
}
</script>