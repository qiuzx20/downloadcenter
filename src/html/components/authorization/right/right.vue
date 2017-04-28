<template>
	<div class="content-right">
		<div class="navbar">
			<selectbar ref="level" :option='levellist' style="width:150px"></selectbar>
			<selectbar ref="water" :option='watersetter' style="width:150px"></selectbar>
			<selectbar ref="zip" :option='zipsetter' style="width:150px"></selectbar>
			<selectbar ref="auth" :option='authsetter' style="width:150px"></selectbar>
			
			<inputcompt ref="filename" :option='inputsetter'  @onTrigger="eventListener"></inputcompt>
			<span class="btn btn-green" @click="query">查 询</span>
			<span class="btn btn-green" @click="authorization('all')">统一授权</span>
		</div>
		<div class="tablearea mt-10">
			<table >
			<thead><tr><th width="6%"><label><input type="checkbox" v-model="checkall" @click="checkAll"/>全选</label></th><th width="10%">文件编号</th><th width="10%">文件名</th><th width="10%">更新日期</th><th width="5%">状态</th><th width="7%">大小(M)</th><th width="7%">记录条数</th><th width="7%">敏感级别</th><th width="8%">是否加水印</th><th width="10%">是否压缩加密</th><th width="20%">操作</th></tr></thead>
			<tbody>
				<tr v-for='item in datalist' :id="item.file_id">
					<td width="6%"><input type="checkbox" :id="item.file_id + 'item'" v-model="checknames" :value="item"/></td>
					<td width="10%">{{item.file_id}}</td>
					<td width="10%" :title="item.file_name">{{item.file_name}}</td>
					<td width="10%">{{item.update_time}}</td>
					<td width="5%">{{!item.auth_status?"未授权":"已授权"}}</td>
					<td width="7%">{{item.file_size}}</td>
					<td width="7%">{{item.file_line}}</td>
					<td width="7%">{{item.sentive_level}}</td>
					<td width="8%">{{item.is_warter?"是":"否"}}</td>
					<td width="10%">{{item.is_zip?"是":"否"}}</td>
					<td width="20%"><button class="btn btn-small btn-primary mr-10" @click="authorization(item)">授权</button><button class="btn btn-small btn-primary" :disabled="item.file_status < 2 && item.file_status > 3" @click="(item.file_status == 2 || item.file_status == 3) && getResult(item)">{{itemStatus(item.file_status)}}</button></td>
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
import Pagetool from 'pubwidget/pagetool/pagetool.vue'
import Authormodal from './authormodal.vue'
import Downloadresult from './downloadresult.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import {mapGetters,mapActions} from 'vuex'


const pageinfo = {total: 2,pageSize: 9,pageIndex: 1}
const inputsetter = {id:"filename",name:"输入文件名",type:"",class:"fl mr-10",placeholder:"输入文件名",style:"width:200px"}
const watersetter = {placeholder:"是否加水印",list:[{name:-1,showname:'全部'},{name:1,showname:'加水印'},{name:0,showname:'不加水印'}]}
const zipsetter = {placeholder:"是否压缩加密",list:[{name:-1,showname:'全部'},{name:1,showname:'压缩加密'},{name:0,showname:'不压缩加密'}]}
const authsetter = {placeholder:"是否授权",list:[{name:-1,showname:'全部'},{name:1,showname:'已授权'},{name:0,showname:'未授权'}]}



export default {
	name:"right",
	data(){
		return {
			watersetter:watersetter,
			zipsetter:zipsetter,
			authsetter:authsetter,
			inputsetter:inputsetter,
			datalist:'',
			pageinfo:pageinfo,
			checkall:0,
			checknames:[],
			fileName:'',
			level:-1,
			isWarter:-1,
			isZip:-1,
			isAuth:-1
		}
	},
	computed:{
		...mapGetters(['getLevel']),
		levellist(){
			let selectsetter = {placeholder:"请选择敏感级别",list:[{name:-1,showname:'全部'}]}
			selectsetter.list = selectsetter.list.concat(this.getLevel)
			return selectsetter
		}
	},
	watch:{
		'$route':function(val,oldval){
			if(!val.query.menuId){
				history.go(-1)
				return
			}
			if(val.query.menuId != oldval.query.menuId){
				this.getAuthList()
			}
		}
	},
	methods:{
		...mapActions(['showModal','closeModal']),
		eventListener(params){
		},
		itemStatus(status){
			let result
			switch(status){
				case 0:
					result = '未扫描'
					break;
				case 1:
					result = '正在扫描...'
					break;
				case 2:
					result = '查看扫描结果'
					break;
				case 3:
					result = '扫描不通过'
					break;
				case 4:
					result = '文件失效'
					break;
				default:
					result = ''
			}
			return result

		},
		query(){
			this.level = this.$refs.level.getData() === '' ? this.level : this.$refs.level.getData()
			this.isWarter = this.$refs.water.getData() ==='' ? this.isWarter:this.$refs.water.getData()
			this.isZip = this.$refs.zip.getData() ==='' ? this.isZip : this.$refs.zip.getData()
			this.isAuth = this.$refs.auth.getData() ==='' ? this.isAuth : this.$refs.auth.getData()
			this.fileName = this.$refs.filename.getData() || this.fileName
			this.pageTo(1)
		},
		pageTo(num){
			this.pageinfo.pageIndex = num
			this.getAuthList()
		},
		
		getAuthList(){
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
			this.$http.post(window.apiUrl+"/file/filelist",{
					pageSize:this.pageinfo.pageSize,
					pageNumber:this.pageinfo.pageIndex,
					menuId:this.$route.query.menuId,
					fileName:this.fileName,
					level:this.level,
					isWarter:this.isWarter,
					isZip:this.isZip,
					isAuth:this.isAuth
				}).then((res)=>{
					this.closeModal(timeid)
					this.datalist = res.data.list
					this.pageinfo.total = res.data.total

				},(error)=>{
					this.closeModal(timeid)
					Utils.errorModal(error,DialogModal,this.$store)
				})
		},
		getResult(data){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:Downloadresult,
				timeid:timeid,
				option:{
					title:"数据扫描结果",
					tophead:data.scan_result,
					content:data.sample_data
					}
			}
			this.showModal(option)

		},
		checkAll(){
			let alldata = []
			let checkallname = []
			const temp = this.checknames
			this.datalist.map((item)=>{
				alldata.push(item)
			})
			if(this.checkall){
				checkallname = Array.from(new Set(alldata.concat(temp)))
			}else {
				temp.forEach((v,i,a)=>{
					if(alldata.indexOf(v) == -1){
						checkallname.push(v)
					}
				})

			}
			this.checknames = checkallname
		},
		authorization(params){
			let temp=[]
			const that = this
			if(typeof params =="string" && params == "all") {
				if(!this.checknames.length){
					const timeidA = (new Date()).getTime()
					const optionA = {
						Dialog:DialogModal,
						timeid:timeidA,
						option:{
							type:"error",
							title:"提示",
							content:"请选择文件！",
							ok:{
								text:"知道了"
							}
						}
					}
					this.showModal(optionA)
					return
				}
				temp = this.checknames
			}else{
				temp = [params]
			}
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:Authormodal,
				timeid:timeid,
				option:{
					title:"授权",
					params:temp,
					ok:{
						callback(){
							that.pageTo(1)	
						}
					}
				}
			}
			this.showModal(option)
		}
	},
	components:{
		selectbar,
		inputcompt,
		Pagetool,
		Authormodal,
		Downloadresult,
		DialogModal,
		LoadDialog
	}
}
</script>