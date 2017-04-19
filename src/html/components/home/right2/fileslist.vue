<template>
	<div class="">
		<div class="navbar">
			<selectbar ref="level" :option='selectsetter' style="width:180px"></selectbar>
			<selectbar ref="water" :option='watersetter' style="width:180px"></selectbar>
			<selectbar ref="zip" :option='zipsetter' style="width:180px"></selectbar>
			
			<inputcompt ref="filename" :option='inputsetter'  @onTrigger="eventListener"></inputcompt>
			<span class="btn btn-green" @click="query">查 询</span>
		</div>
		<div class="tablearea mt-10">
			<table >
			<thead><tr><th width="20%">文件编号</th><th width="12%">文件名</th><th width="12%">更新日期</th><th width="10%">大小（M）</th><th width="8%">记录条数</th><th width="8%">敏感级别</th><th width="8%">是否加水印</th><th width="10%">是否压缩加密</th><th width="12%">操作</th></tr></thead>
			<tbody>
				<tr v-for='item in datalist' :id="item.file_id">
					<td width="20%">{{item.file_id}}</td>
					<td width="12%">{{item.file_name}}</td>
					<td width="12%">{{item.update_time}}</td>
					<td width="10%">{{item.file_size}}</td>
					<td width="8%">{{item.file_line}}</td>
					<td width="8%">{{item.sentive_level}}</td>
					<td width="8%">{{item.is_warter?"是":"否"}}</td>
					<td width="10%">{{item.is_zip?"是":"否"}}</td>
					<td width="12%"><button class="btn btn-small btn-primary" @click="downloadfileHandler(item)" :disabled="item.file_status == 3">{{fileStatus(item.file_status)}}</button></td>
				</tr>
			</tbody>
			</table>
		</div>
		<Pagetool v-if="pageinfo.total > pageinfo.pageSize" :option='pageinfo' @onTrigger="pageTo"></Pagetool>
	</div>
</template>
<script>
import selectbar from 'pubwidget/form/select/select.vue'
import inputcompt from 'widget/form/input/input.vue'
import Downloadapply from './widget/downloadapply.vue'
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import Utils from 'lib/utils/utils'

const pageinfo = {total: 2,pageSize: 9,pageIndex: 1}
const inputsetter = {id:"filename",name:"输入文件名",type:"",class:"fl mr-10",placeholder:"输入文件名",style:"width:200px"}
const selectsetter = {placeholder:"请选择敏感级别",list:[{name:-1,showname:'全部'},{name:1,showname:'一级'},{name:2,showname:'二级'},{name:3,showname:'三级'}]}
const watersetter = {placeholder:"是否加水印",list:[{name:-1,showname:'全部'},{name:1,showname:'加水印'},{name:0,showname:'不加水印'}]}
const zipsetter = {placeholder:"是否压缩加密",list:[{name:-1,showname:'全部'},{name:1,showname:'压缩加密'},{name:0,showname:'不压缩加密'}]}


export default {
	name:"fileslist",
	data(){
		return {
			selectsetter:selectsetter,
			watersetter:watersetter,
			zipsetter:zipsetter,
			inputsetter:inputsetter,
			datalist:'',
			pageinfo:pageinfo,
			fileName:'',
			level:-1,
			isWarter:-1,
			isZip:-1
		}
	},
	created(){
		this.getFilesList()
	},
	watch:{
		'$route':function(val,oldval){
			if(val.query.menuId != oldval.query.menuId){
				this.getFilesList()
			}
		}
	},
	methods:{
		eventListener(params){
		},
		fileStatus(status){
			let result
			switch(status){
				case 0:
				result = '准备下载'
				break
				case 1:
				result = '准备成功'
				break
				case 2:
				result = '准备失败'
				break
				case 3:
				result = '准备中...'
				break
				default:
				result = ''
			}
			return result
		},
		query(){
			this.level = this.$refs.level.getData() === '' ? this.level : this.$refs.level.getData()
			this.isWarter = this.$refs.water.getData() ==='' ? this.isWarter:this.$refs.water.getData()
			this.isZip = this.$refs.zip.getData() ==='' ? this.isZip : this.$refs.zip.getData()
			this.fileName = this.$refs.filename.getData() || this.fileName
			this.pageTo(1)
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.getFilesList()
		},
		getFilesList(){
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
			this.$http.post(window.apiUrl+"/file/fileuserlist",
				{
					pageSize:this.pageinfo.pageSize,
					pageNumber:this.pageinfo.pageIndex,
					menuId:this.$route.query.menuId,
					fileName:this.fileName,
					level:this.level,
					isWarter:this.isWarter,
					isZip:this.isZip
				}).then((res)=>{
								this.datalist = res.data.list
								this.$store.dispatch("closeModal",timeid)
								this.pageinfo.total = res.data.total
							},(error)=>{
								this.$store.dispatch("closeModal",timeid)
								Utils.errorModal(error,DialogModal,this.$store)

							})

		},
		createFile(fileid){
			event.target.innerHTML="准备中..."
			event.target.disabled=true
			this.$http.post(window.apiUrl+"/file/createfile",{fileId:fileid}).then((res)=>{
				if(!res.data.code){
					const timeidA = (new Date()).getTime()
					const optionA = {
						Dialog:DialogModal,
						timeid:timeidA,
						option:{
							type:"ok",
							title:"提示",
							content:"准备成功！",
							ok:{
								text:"知道了"
							}
						}
					}
					this.$store.dispatch("showModal",optionA)
				event.target.innerHTML="立即下载"
				event.target.disabled=false
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
					if(res.data.code == 2){
						event.target.innerHTML="准备失败"
						event.target.disabled=false
					}
				}

			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
				/*event.target.innerHTML="准备失败"
				event.target.disabled=false*/
			})
		},
		downloadFile(fileid){
			window.open(window.apiUrl+"/file/download?fileId="+fileid)
		},
		loadApply(item){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:Downloadapply,
				timeid:timeid,
				option:{
					title:'金库模式下载申请',
					sentivelevel:item.sentive_level,
					fileId:item.file_id
				}
			}
			this.$store.disaptch("showModal",option)
		},
		downloadfileHandler(item){
			if(item.sentive_level < 3){
				if(item.file_status == 1){
					this.downloadFile(item.file_id)
				}else{
					this.createFile(item.file_id)
				}
			}else{
				this.loadApply(item)
			}
			/*console.log(event);
			event.target.innerHTML="下载准备中..."
			event.target.disabled=true
			console.log(id);*/
		}
	},
	components:{
		selectbar,
		inputcompt,
		Pagetool,
		LoadDialog,
		DialogModal
	}
}
</script>