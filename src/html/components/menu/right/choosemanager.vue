<template>
	<div class="dialog expansion">
		<div class="dialog-hd clearfix">
			<h2 v-if="option.title">{{option.title}}</h2>
			<span class="close" @click="closeHandler">×</span>
		</div>
		<div class="dialog-bd plr-20 choosemanager clearfix">
			<div class="chooseleft tablearea">
				<div class="mb-10 clearfix">
					<inputcompt ref="username" :option="{class:'fl mr-10',style:'200px'}"></inputcompt>
					<span class="btn btn-green fl" @click="query">查 询</span></div>
				<table>
					<thead><tr><th width="15%">选择</th><th width="55%">用户名</th><th width="30%">名称</th></tr></thead>
					<tbody>
						<tr v-for='item in datalist' :id="item.user_id">
							<td width="15%"><label :for="item.user_id+'item'"><input :id="item.user_id+'item'" type="radio" v-model="selected" :value="item" lazy/></label></td>
							<td width="55%"><label :for="item.user_id+'item'">{{item.user_id}}</label></td>
							<td width="30%"><label :for="item.user_id+'item'">{{item.user_name}}</label></td>
						</tr>
					</tbody>
				</table>
			<Pagetool v-if="pageinfo.total > pageinfo.pageSize" :option='pageinfo' @onTrigger="pageTo"></Pagetool>
			</div>
			<!-- <div class="choosemiddle">
				<button class="btn btn-blue" @click="getuser">></button>
				<button class="btn btn-blue" @click="removeuser"><</button>
			</div> -->
			<div class="chooseright tablearea">
				<div class="mb-10 clearfix">
					已选用户：</div>
				<table>
					<thead><tr><th width="60%">用户名</th><th width="40%">名称</th></tr></thead>
					<tbody>
						<tr>
							<td width="60%">{{selected.user_id}}</td>
							<td width="40%">{{selected.user_name}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="dialog-ft">
			<span class="btn btn-create mr-10" @click="okHandler">确定</span>
			<span class="btn btn-close" @click="closeHandler">取消</span>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import Inputcompt from 'widget/form/input/input.vue'
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'

const pageinfo = {total: 1,pageSize: 5,pageIndex: 1}
export default {
	name:"choosemanager",
	data(){
		return {
			datalist:'',
			pageinfo:pageinfo,
			selected:{},
			userName:''
		}
	},
	props:['id','option'],
	created(){
		this.getUserList()
	},
	methods:{
		...mapActions(['showModal','closeModal','chooseManager']),
		eventListener(type,params){
			this.$emit("onTrigger",type,params)
		},
		query(){
			this.userName = this.$refs.username.getData()
			this.pageTo(1)
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.getUserList()
		},
		getUserList(){
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
			this.$http.post(window.apiUrl+"/file/userlist",{menuId:this.$route.query.menuId,userName:this.userName,pageSize:this.pageinfo.pageSize,pageNumber:this.pageinfo.pageIndex}).then((res)=>{
				this.closeModal(timeid)
				this.datalist = res.data.list
				this.pageinfo.total = res.data.total
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		closeHandler(){
			this.closeModal(this.id)
		},
		okHandler(params){
			this.chooseManager(this.selected).then((resolve)=>{
				if(resolve == "ok"){
					this.closeHandler()
				}
			})	
		}
	},
	components:{
		Inputcompt,
		Pagetool
	}
}
</script>