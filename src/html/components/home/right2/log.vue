<template>
	<div class="">
		<div class="navbar">
			<inputcompt ref="username" :option='usersetter'></inputcompt>
			<inputcompt ref="filename" :option='filessetter'></inputcompt>
			<span class="btn btn-green" @click="query">查 询</span>
		</div>
		<div class="tablearea mt-10">
			<table >
			<thead><tr><th width="25%">文件编号</th><th width="20%">文件名</th><th width="10%">下载时间</th><th width="8%">大小（K）</th><th width="10%">下载用户</th><th width="8%">敏感级别</th><th width="9%">是否加水印</th><th width="10%">是否压缩加密</th></tr></thead>
			<tbody>
				<tr v-for='item in datalist' :id="item.file_id">
					<td width="25%">{{item.file_id}}</td>
					<td width="20%" :title="item.file_name">{{item.file_name}}</td>
					<td width="10%">{{item.download_time}}</td>
					<td width="8%">{{formatNumberRgx(item.file_size)}}</td>
					<td width="10%">{{item.usecnname}}</td>
					<td width="8%">{{item.sentive_level}}</td>
					<td width="9%">{{item.is_warter?"是":"否"}}</td>
					<td width="10%">{{item.is_zip?"是":"否"}}</td>
					
				</tr>
			</tbody>
			</table>
		</div>
		<Pagetool ref="pagetool" v-if="pageinfo.total > pageinfo.pageSize" :option='pageinfo' @onTrigger="pageTo"></Pagetool>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import inputcompt from 'widget/form/input/input.vue'
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import Utils from 'lib/utils/utils'
import DialogModal from 'pubwidget/dialog/dialog.vue'

const usersetter = {id:"filename",name:"输入下载用户",type:"",class:"fl mr-10",placeholder:"输入下载用户",style:"width:200px"}
const filessetter = {id:"filename",name:"输入文件名",type:"",class:"fl mr-10",placeholder:"输入文件名",style:"width:200px"}



export default {
	name:"log",
	data(){
		return {
			usersetter:usersetter,
			filessetter:filessetter,
			datalist:'',
			pageinfo:{total: 0,pageSize: 9,pageIndex: 1},
			fileName:'',
			userName:''
		}
	},
	created(){
		this.getLogList()
	},
	watch:{
		'$route':function(val,oldval){
			if(!val.query.menuId){
				history.go(-1)
				return
			}
			if(val.query.menuId != oldval.query.menuId){
				this.getLogList()
			}
		}
	},
	methods:{
		...mapActions(['showModal','closeModal']),
		query(){
			this.userName = this.$refs.username.getData()
			this.fileName = this.$refs.filename.getData()
			this.pageTo(1)
		},
		formatNumberRgx(num){
			return Utils.formatNumberRgx(num)
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.getLogList()
		},
		getLogList(){
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
			this.$http.post(window.apiUrl+"/file/downloglist",{pageSize:this.pageinfo.pageSize,pageNumber:this.pageinfo.pageIndex,menuId:this.$route.query.menuId,fileName:this.fileName,usecnname:this.userName}).then((res)=>{
				this.closeModal(timeid)
				this.datalist = res.data.list
				this.pageinfo.total = res.data.total

			},(error)=>{
				this.closeModal(timeid)
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