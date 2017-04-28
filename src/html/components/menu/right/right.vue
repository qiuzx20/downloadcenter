<template>
	<div class="content-right">
		<div class="topcrumb"><h3 class="title fl">{{isadd?"增加菜单":"编辑菜单"}}</h3><span class="fr"><a class="btn btn-green mr-10" v-show="!isadd" @click="addMenu">增加</a> <a class="btn btn-green" v-show="!isadd" @click="delMenu">删除</a></span></div>
		<div class="clearfix">
			<ul class="ulform menu-u-top">
				<Pubtext ref="parentid" :option="option1"></Pubtext>
				<Pubtext ref="menuid" :option="option2"></Pubtext>
				<Pubtext ref="menuname" :option="option3"></Pubtext>
				<Pubtext ref="managerref" :option="option4" @onTrigger="eventListener"></Pubtext>
				<li class="clearfix">
						<div class="name fl"><span class="red-text" v-if="option5 && option4.mustbe">*</span>{{option5 && option5.name}}：</div>
						<div class="substance fl">
							<label class="fl mr-10"><input type="radio" v-model="leaf" value="2">是</label>
							<label class="fl"><input type="radio" v-model="leaf" value="0">否</label>
						</div>
						<div class="mark-tip clearboth">（备注:叶子节点对应FTP下载服务器的目录。）</div>


				</li>
				<Pubtextarea ref="remark" :option="option6" @onTrigger="eventListener"></Pubtextarea>
			</ul>
			<ul class="ulform menu-u-top" v-show="leaf > 0">
				<Pubtext ref="ftpurl" :option="option7"></Pubtext>
				<Pubtext ref="ftpport" :option="option8"></Pubtext>
				<Pubtext ref="ftppath" :option="option9"></Pubtext>
				<Pubtext ref="ftpuser" :option="option10"></Pubtext>
				<Pubtext ref="ftppwd" :option="option11"></Pubtext>
			</ul>
		</div>
		<div><button class="btn btn-lg btn-blue mr-10" @click="saveMenu">保 存</button><button class="btn btn-lg btn-blue" v-show="isadd" @click="cancel">取 消</button></div>
	</div>
</template>
<script>
import Pubtext from 'widget/form/pubtext.vue'
import Pubtextarea from 'widget/form/pubtextarea.vue'
import Inputtext from 'pubwidget/form/input/input.vue'
import ChooseManager from './choosemanager.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'
import {mapGetters,mapActions} from 'vuex'


import Utils from 'lib/utils/utils'


const option = {
	option1:{
		name:"父菜单编号",
		id:'parentmenuid',
		mustbe:false,
		type:"",
		tabindex:"",
		placeholder:"请输入父菜单编号",
		unit:'',
		errorText:'输入有误',
		tips:'请输入父菜单编号'
	},
	option2:{
		name:"菜单编号",
		id:'menuid',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入菜单编号",
		unit:'',
		errorText:'输入有误',
		tips:'请输入菜单编号'
	},
	option3:{
		name:"菜单名",
		id:'menuname',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入菜单名",
		unit:'',
		errorText:'输入有误',
		tips:'请输入菜单名'
	},
	option4:{
		name:"管理员",
		id:'manager',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请选择管理员",
		unit:'',
		value:'',
		errorText:'输入有误',
		tips:'请选择管理员'
	},
	option5:{
		name:"叶子节点",
		mustbe:true,
		id:'leaf',
		type:"",
		tabindex:"",
		placeholder:"请选择叶子节点",
		unit:'',
		errorText:'请选择',
		tips:'请选择叶子节点',
		allradiosetter:[{name:"是",type:"",class:"fl mr-10",value:true},{name:"否",type:"",class:"fl",value:false}]
	},
	option6:{
		name:"备注",
		id:'mark',
		mustbe:false,
		type:"",
		tabindex:"",
		placeholder:"请输入备注",
		unit:'',
		errorText:'输入有误',
		tips:'请输入备注'
	},
	option7:{
		name:"IP地址",
		id:'ip',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入IP地址",
		unit:'',
		errorText:'输入正确格式',
		tips:'请输入IP地址'
	},
	option8:{
		name:"端口号",
		id:'port',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入端口号",
		unit:'',
		errorText:'输入有误',
		tips:'请输入端口号'
	},
	option9:{
		name:"目录",
		id:'directory',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入目录",
		unit:'',
		errorText:'输入有误',
		tips:'请输入目录'
	},
	option10:{
		name:"用户名",
		id:'username',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入用户名",
		unit:'',
		errorText:'输入有误',
		tips:'请输入用户名'
	},
	option11:{
		name:"密码",
		id:'passwd',
		mustbe:true,
		type:'',
		inputtype:'password',
		tabindex:"",
		placeholder:"请输入密码",
		unit:'',
		errorText:'输入有误',
		tips:'请输入密码'
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
			option5:option.option5,
			option6:option.option6,
			option7:option.option7,
			option8:option.option8,
			option9:option.option9,
			option10:option.option10,
			option11:option.option11,
			isadd:false,
			parentmenuid:'',
			menuid:'',
			menuname:'',
			manager:'',
			leaf:0,
			mark:'',
			ip:'',
			port:'',
			directory:'',
			username:'',
			passwd:'',
			managerwatch:this.$store.state,
			menuinfo:''
		}
	},
	watch:{
		'managerwatch.stagdata':{
			handler:function(val,oldval){
				this.updateManager(val)
			},
			deep:true
		},
		'$route':function(val,oldval){
			if(!val.query.menuId){
				history.go(-1)
				return
			}
			if(val.query.menuId != oldval.query.menuId){
				this.getMenuInfo()
			}
		}
	},
	methods:{
		...mapActions(['queryMenu','showModal','closeModal']),
		eventListener(type,params,obj){
			switch(obj){
				case "manager":
					if(type == "clickHandler" ){
						this.chooseManager();
					}
					this.manager = params
					break;
				default:
			}
		},
		getMenuInfo(){
			this.isadd = false
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
			this.$http.post(window.apiUrl+"/menu/getMenuByMenuId",{menuId:this.$route.query.menuId}).then((res)=>{
				this.closeModal(timeid)
				if(!res.data.code){
					this.menuinfo = res.data.data
					this.setMenuVal(this.menuinfo)
					this.defaultVal(this.menuinfo)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
				

			},(error)=>{
				this.closeModal(timeid)
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		addMenu(){
			this.isadd = true
			this.$refs.parentid.setData(this.$route.query.menuId)
			this.$refs.menuid.setData()
			this.$refs.menuname.setData()
			this.$refs.managerref.setData()
			this.leaf = 0
			this.$refs.remark.setData()
			this.$refs.ftpurl.setData()
			this.$refs.ftpport.setData()
			this.$refs.ftppath.setData()
			this.$refs.ftpuser.setData()
			this.$refs.ftppwd.setData()

			this.saveMenu()

		},
		setMenuVal(params){
			this.parentmenuid = params.parentId
			this.menuid = params.menuId
			this.menuname = params.menuName
			this.manager = params.manager
			this.leaf = params.menuType
			this.mark = params.menuDesc
			this.ip = params.ftpUrl
			this.port = params.ftpPort
			this.directory = params.ftpPath
			this.username = params.ftpUser
			this.passwd = params.ftpPwd
		},
		defaultVal(params){
			this.$refs.parentid.setData(params.parentId)
			params.parentId && (this.$refs.parentid.type = '')

			this.$refs.menuid.setData(params.menuId)
			params.menuId && (this.$refs.menuid.type = '')

			this.$refs.menuname.setData(params.menuName)
			params.menuName && (this.$refs.menuname.type = '')

			this.$refs.managerref.setData(params.manager)
			params.manager && (this.$refs.managerref.type = '')

			this.leaf = params.menuType || 0
			this.$refs.remark.setData(params.menuDesc)

			this.$refs.ftpurl.setData(params.ftpUrl)
			params.ftpUrl && (this.$refs.ftpurl.type = '')

			this.$refs.ftpport.setData(params.ftpPort)
			params.ftpPort && (this.$refs.ftpport.type = '')

			this.$refs.ftppath.setData(params.ftpPath)
			params.ftpPath && (this.$refs.ftppath.type = '')

			this.$refs.ftpuser.setData(params.ftpUser)
			params.ftpUser && (this.$refs.ftpuser.type = '')

			this.$refs.ftppwd.setData(params.ftpPwd)
			params.ftpPwd && (this.$refs.ftppwd.type = '')
		},
		checkForm(){
			if(!this.$refs.menuid.getData()){
				this.$refs.menuid.type = "error"
				this.$refs.menuid.focus()
				return
			}
			if(Utils.isChineseChar(this.$refs.menuid.getData())){
				this.$refs.menuid.type = "error"
				this.$refs.menuid.errorText = "菜单编号不能包含中文"
				this.$refs.menuid.focus()
				return
			}
			if(!this.$refs.menuname.getData()){
				this.$refs.menuname.type = "error"
				this.$refs.menuname.focus()
				return
			}
			if(!this.$refs.managerref.getData()){
				this.$refs.managerref.type = "error"
				this.$refs.managerref.focus()
				return
			}
			
			if(this.leaf > 0){
				if(!this.$refs.ftpurl.getData()){
					this.$refs.ftpurl.type = "error"
					this.$refs.ftpurl.focus()
					return
				}
				if(!Utils.ipCheck(this.$refs.ftpurl.getData())){
					this.$refs.ftpurl.type = "error"
					this.$refs.ftpurl.errorText = "请输入正确的IP格式"
					this.$refs.ftpurl.focus()
					return
				}
				if(!this.$refs.ftpport.getData()){
					this.$refs.ftpport.type = "error"
					this.$refs.ftpport.focus()
					return
				}
				if(!Utils.isNumber(this.$refs.ftpport.getData())){
					this.$refs.ftpport.type = "error"
					this.$refs.ftpport.errorText = "请输入数字"
					this.$refs.ftpport.focus()
					return
				}
				if(!this.$refs.ftppath.getData()){
					this.$refs.ftppath.type = "error"
					this.$refs.ftppath.focus()
					return
				}
				if(!this.$refs.ftpuser.getData()){
					this.$refs.ftpuser.type = "error"
					this.$refs.ftpuser.focus()
					return
				}
				if(!this.$refs.ftppwd.getData()){
					this.$refs.ftppwd.type = "error"
					this.$refs.ftppwd.focus()
					return
				}
				if(Utils.isChineseChar(this.$refs.ftppwd.getData())){
					this.$refs.ftppwd.type = "error"
					this.$refs.ftppwd.errorText = "密码不能包含中文"
					this.$refs.ftppwd.focus()
					return
				}
			}
			return true
		},
		saveMenu(){
			if(!this.checkForm())return
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:LoadDialog,
				timeid:timeid,
				option:{
					type:"loading",
					text:"正在提交数据..."
				}
			}
			this.showModal(option)
			let saveurl = "/menu/updateMenu"
			if(this.isadd){
				saveurl = "/menu/addMenu"
			}
			this.$http.post(window.apiUrl+saveurl,{
				menuId:this.$refs.menuid.getData(),
				menuName:this.$refs.menuname.getData(),
				parentId:this.$refs.parentid.getData(),
				manager:this.$refs.managerref.getData(),
				menuType:this.leaf,
				ftpUrl:!this.leaf ? '' : this.$refs.ftpurl.getData(),
				ftpPort:!this.leaf ? '' : this.$refs.ftpport.getData(),
				ftpPath:!this.leaf ? '' : this.$refs.ftppath.getData(),
				ftpUser:!this.leaf ? '' : this.$refs.ftpuser.getData(),
				ftpPwd:!this.leaf ? '' : this.$refs.ftppwd.getData(),
				menuDesc:this.$refs.remark.getData() || ''
			}).then((res)=>{
				this.closeModal(timeid)
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
								if(that.isadd){
									that.addTreeNodes()
									that.defaultVal(that.menuinfo)
									that.isadd = false
									that.queryMenu()
								}
							}
						}
					}
				}
				this.showModal(optionA)
			},(error)=>{
				this.closeModal(timeid)
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		delMenu(){
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:LoadDialog,
				timeid:timeid,
				option:{
					type:"loading",
					text:"正在删除..."
				}
			}
			this.showModal(option)
			this.$http.post(window.apiUrl+"/menu/deleteMenu",{menuId:this.$route.query.menuId}).then((res)=>{
				this.closeModal(timeid)
				if(!res.data.code){
					const that = this
					const timeidA = (new Date()).getTime()
					const optionA = {
						Dialog:DialogModal,
						timeid:timeidA,
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
					this.showModal(optionA)
				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
				
			},(error)=>{
				this.closeModal(timeid)
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		cancel(){
			this.$router.go(0)
		},
		addTreeNodes(){
			this.$emit("onTrigger","addNodes",{parent_id:this.$refs.parentid.getData(),menu_id:this.$refs.menuid.getData(),menu_name:this.$refs.menuname.getData()})
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
			this.showModal(option)
		},
		updateManager(val){
			this.manager = val.user_id
			this.$refs.managerref.$refs.pubtext.setData(val.user_id)
			this.$refs.managerref.type=''
		}

	},
	components:{
		Pubtext,
		Pubtextarea,
		Inputtext,
		ChooseManager
	}
}
</script>