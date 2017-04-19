<template>
	<div class="dialog">
		<div class="dialog-hd clearfix">
					<h2 v-if="option.title">{{option.title}}</h2>
					<span class="close" @click="closeHandler()">×</span>
		</div>
		<div class="dialog-bd plr-20">
				<ul class="ulform" v-if="!app_applyStatus">
					<Seletcer ref="applycate" :option="option1" @onTrigger="eventListener"></Seletcer>
					<Pubtext ref="time" :option="option2" @onTrigger="eventListener"></Pubtext>
					<Pubtext ref="reason" :option="option3" @onTrigger="eventListener"></Pubtext>
					<Seletcer ref="approver" v-if="option4.list && !option4.list.length":option="option4" @onTrigger="eventListener"></Seletcer>
				</ul>
				<ul class="ulform" v-else>
					<Pubtext ref="passcode" :option="option5" @onTrigger="eventListener"></Pubtext>
					<li class="clearfix"><div class="name fl">审批状态：</div> <div class="substance fl">{{logContent}}</div></li>
					<li><button class="btn btn-small btn-primary ml-10" @click="queryJKStatusByID">查看审批状态</button><button class="btn btn-small btn-primary">重新获取口令</button></li>
				</ul>
		</div>
		<div class="dialog-ft">
			<span class="btn btn-create mr-10" @click="okHandler">确定</span>
			<span class="btn btn-close" @click="closeHandler()">取消</span>
		</div>
	</div>
</template>
<script>
import Seletcer from 'widget/form/select.vue'
import Pubtext from 'widget/form/pubtext.vue'
import Pubtextarea from 'widget/form/pubtextarea.vue'
import LoadDialog from 'pubwidget/loaddialog/loaddialog.vue'
import DialogModal from 'pubwidget/dialog/dialog.vue'


const option1 = {
		name:"申请方式",
		id:'applycate',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请选择申请方式",
		unit:'',
		errorText:'请选择申请方式',
		tips:'请选择申请方式',
		list:[{name:1,showname:"申请时长"},{name:2,showname:"申请1次"}]
	}
const option2 = {
		name:"申请时长",
		id:'time',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入1~6的整数（单位为小时）",
		unit:'',
		errorText:'输入有误',
		tips:'请输入1~6的整数（单位为小时）'
	}
const option3 = {
		name:"申请原因",
		id:'reason',
		mustbe:false,
		type:"",
		tabindex:"",
		placeholder:"请输入备注",
		unit:'',
		errorText:'输入有误',
		tips:'请输入备注'
	}
const option4 = {
		name:"审批人",
		id:'approver',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请选择审批人",
		unit:'',
		errorText:'请选择',
		tips:'请选择审批人',
		list:[]
	}
const option5 = {
		name:"金库口令",
		id:'approver',
		mustbe:true,
		type:"",
		tabindex:"",
		placeholder:"请输入金库口令",
		unit:'',
		errorText:'输入有误',
		tips:'请输入金库口令'
	}
export default {
	name:"downloadapply",
	data(){
		return {
			option1:option1,
			option2:option2,
			option3:option3,
			option4:option4,
			app_requestID:'',
			app_applyStatus:'',
			g_requestID:'',
			logContent:'',
			stas:{unApprove:"审批人还未审批",approved:"审批人已经审批通过",refused:"审批人拒绝该申请",valid:"金库认证已经通过",invalid:"由于已到申请时长或是申请使用次数，所以申请已经失效过"},
			failReason:{error_pwd:"4A主帐号用户名或密码错误",error_no_request:"申请Id不存在",error_timeout:"认证超时",error_approver:"审批人不正确",failReason:"请求失败"}
		}
	},
	created(){
		this.loadStatus()
	},
	props:['option','id'],
	methods:{
		loadStatus(){
			this.$http.post(window.apiUrl+"/jkpReq/queryAppOperJKStatus",{
				resNum:'DATASECMH',
				level:this.option.sentivelevel
			}).then((res)=>{
				const approverArr = []
				res.data.approverArr.length > 0 && res.data.approverArr.forEach((item)=>{
					approverArr.push({name:item[0],showname:item[1]+"(电话:"+item[2]+")"})
				})
				this.option4.list = approverArr

				this.app_requestID = res.data.requestID
				this.g_requestID = res.data.requestID
				this.app_applyStatus = res.data.applyStatus

				if(this.app_applyStatus){
					if(this.app_applyStatus == "valid")this.downloadFile()
					logContent="金库申请请求，请求Id："+this.app_requestID+"，审批状态："+stas[this.app_applyStatus]
				}
				


			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		checkForm(){
			if(!this.app_applyStatus){
				if(!this.$refs.applycate.getData()){
					this.$refs.applycate.type = "error"
					this.$refs.applycate.focus()
					return
				}
				if(!this.$refs.time.getData()){
					this.$refs.time.type = "error"
					this.$refs.time.focus()
					return
				}
				if(!this.$refs.reason.getData()){
					this.$refs.reason.type = "error"
					this.$refs.reason.focus()
					return
				}
				if(!this.$refs.approver.getData()){
					this.$refs.approver.type = "error"
					this.$refs.approver.focus()
					return
				}
			}else{
				if(!this.$refs.passcode.getData()){
					this.$refs.passcode.type = "error"
					this.$refs.passcode.focus()
					return
				}
			}
			
			return true
		},
		createAppRequest(){
			this.$http.post(window.apiUrl+"/jkpReq/createAppRequest",{
				resNum:'DATASECMH',
				level:this.option.sentivelevel,
				authMode:"remoteAuth",
				appType:this.$refs.applycate.getData(),
				duration:(this.$refs.applycate.getData() == 1 && this.$refs.time.getData() )|| '',
				userTimes:(this.$refs.applycate.getData() == 2 && this.$refs.time.getData()) || '',
				applyReason:this.$refs.reason.getData(),
				selectedApprover:this.$refs.approver.getData()
			}).then((res)=>{
				this.app_applyStatus = res.data.applyStatus
				this.g_requestID = res.data.requestID
				this.logContent="金库申请请求，请求Id："+res.data.requestID+"，审批状态："+stas[res.data.applyStatus];
				
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		remoteAuth(){
			this.$http.post(window.apiUrl+"/jkpReq/remoteAuth",{
				requestID:this.g_requestID,
				passCode:this.$refs.passcode.getData()
			}).then((res)=>{
				if(res.data.authResult){
					const that = this
					const timeidA = (new Date()).getTime()
					const optionA = {
							Dialog:DialogModal,
							timeid:timeidA,
							option:{
								type:"ok",
								title:"提示",
								content:"提交成功!",
								ok:{
									text:"知道了",
									callback(){
										that.downloadFile()
									}
								}
							}
						}
					this.$store.dispatch("showModal",optionA)
				}else{
					Utils.errorModal({statusText:this.failReason[res.data.failReason],status:res.data.failReason},DialogModal,this.$store)
				}
				this.closeHandler()
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		downloadFile(){
			window.open(window.apiUrl+"/wjxzPlatform/download?fileUserId="+this.option.fileId)
		},
		queryJKStatusByID(){
			this.$http.post(window.apiUrl+"/jkpReq/queryJKStatusByID",{
				requestID:this.g_requestID,
			}).then((res)=>{
				if(stas[res.data.applyStatus]){
					this.logContent="金库申请请求，请求Id："+res.data.requestID+"，审批状态："+stas[res.data.applyStatus];
				}else{
					Utils.errorModal({statusText:this.failReason[res.data.failReason],status:res.data.failReason},DialogModal,this.$store)
				}
				
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		reSendJKPass(){
			this.$http.post(window.apiUrl+"/jkpReq/reSendJKPass",{
				requestID:this.g_requestID,
			}).then((res)=>{
				if(res.data.resendResult="sms_success"){
					const timeidA = (new Date()).getTime()
					const optionA = {
							Dialog:DialogModal,
							timeid:timeidA,
							option:{
								type:"ok",
								title:"提示",
								content:"金库口令重发:发送成功!",
								ok:{
									text:"知道了"
								}
							}
						}
					this.$store.dispatch("showModal",optionA)

				}else{
					const timeidA = (new Date()).getTime()
					const optionA = {
							Dialog:DialogModal,
							timeid:timeidA,
							option:{
								type:"error",
								title:"提示",
								content:"金库口令重发:发送失败!",
								ok:{
									text:"知道了"
								}
							}
						}
					this.$store.dispatch("showModal",optionA)
				}
				this.logContent="金库口令重发请求，请求Id："+res.data.requestID
			},(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})
		},
		okHandler(){
			if(!this.checkForm())return
			if(!this.app_applyStatus){
				this.createAppRequest()
			}else{
				this.remoteAuth()
			}

			
		},
		closeHandler(){
			this.$store.dispatch("closeModal",this.id)
		}
	}

}	

</script>