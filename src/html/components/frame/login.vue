<template>
	<div></div>	
</template>
<script>
import LoadDialog from "pubwidget/loaddialog/loaddialog.vue"
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'

export default {
	name:"login",
	created(){
		this.login()
	},
	watch:{
		'$route':function(val,oldval){
			if(val.query.token)this.login()
		}
	},
	methods:{
		login(){

			if(!this.$route.query.token && !sessionStorage.getItem("token")){ 
				const timeidA = (new Date()).getTime()
				const optionA = {
					Dialog:DialogModal,
					timeid:timeidA,
					option:{
						type:"error",
						title:"提示",
						content:"登录失败，请重新登陆！",
						ok:{
							text:"知道了"
						}
					}
				}
					this.$store.dispatch("showModal",optionA)
				return false
			}
			const timeid = (new Date()).getTime()
			const option = {
				Dialog:LoadDialog,
				timeid:timeid,
				option:{
					type:"loading",
					text:"正在登录中..."
				}
			}
			this.$store.dispatch("showModal",option)

			const _token = this.$route.query.token || sessionStorage.getItem("token")
			this.$http.post(window.apiUrl + "/login/ssologin",{token:_token}).then((res)=>{
					if(!res.data.code){
						this.$store.dispatch("setUser",res.data.data)
						sessionStorage.setItem("haslogin",true)
						sessionStorage.setItem("token",_token)
						this.$router.push({path:this.$route.query.redirect})
						this.queryLevel()
					}else{
						Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
					}
				},
				(error)=>{
					sessionStorage.setItem("haslogin",false)
					Utils.errorModal(error,DialogModal,this.$store)
			})
			this.$store.dispatch("closeModal",timeid)
		},
		queryLevel(){
			this.$store.dispatch("queryLevel").then((resolve)=>{
				if(resolve != "ok" && resolve.data.code > 0)Utils.errorModal(resolve,DialogModal,this.$store)
			})
		}
	},
	components:{
		LoadDialog
	}
}	
</script>
