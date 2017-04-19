<template>
	<div class="head">
	<a class="logo fl"></a><span class="name fl">下载中心</span>
	<ul class="fr menu" v-show="haslogin"><li v-for='item in menulist' v-if="userPermission(item)"><router-link :to="item.url">{{item.name}}</router-link></li><li id="user"><a>{{getUserInfo.userCnName}}</a><ul class="subnav"><li @click="loginout">退出</li></ul></li>
	</ul>
	</div>
</template>
<script>
import {mapGetters} from "vuex"
	export default {
		name:'head',
		data (){
			return {
				menulist: this.$store.state.menulist
			}
		},
		computed:{
			...mapGetters(['getUserInfo']),
			haslogin:function(){
				return this.getUserInfo && this.getUserInfo.hasOwnProperty("userCnName")
			}
		},
		methods:{
			userPermission(item){
				return this.haslogin && ((item.menuid == 'isAuthorize' && !this.getUserInfo.isAuthorize) || (item.menuid == 'isMenu' && !this.getUserInfo.isMenu)) ? false:true
			},
			loginout (){
				this.$store.dispatch("clearUser").then((res)=>{
					if(res == "ok"){
						sessionStorage.removeItem("token")
						this.haslogin = false
						sessionStorage.setItem("haslogin",false)
					}
				})
				console.log("退出");
			}
		}
	}

</script>

