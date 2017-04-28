<template>
	<div id="menu" :class="{'close':isclose}">
		<Mysider ref="mysider" :option="getMenu" v-if="getMenu.length > 0" :setting="setting" @sider-status="siderStatus"></Mysider>
		<Right @onTrigger="eventListener"></Right>			
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import Mysider from "widget/sider/sider.vue";
import Right from "./right/right.vue";
import DialogModal from 'pubwidget/dialog/dialog.vue'
import Utils from 'lib/utils/utils'


export default {
	name:'menu',
	data () {
		return {
			isclose:false,
			datalist:'',
			setting:''
		}
	},
	created(){
		this.getTree()
	},
	computed:{
		...mapGetters(['getMenu'])
	},
	methods:{
		eventListener(type,params){
			if(type == "addNodes"){
				this.$refs.mysider.addNodes(params)
			}
		},
		siderStatus (params) {
			this.isclose=params;
		},
		getTree(){
			const that = this
			const setting = {
				isSimpleData : true,              
				data:{
					key:{
						name:"menu_name"
					},
					simpleData: {
				        enable: true,
				        idKey:"menu_id",
				        pIdKey:"parent_id",
				        rootPId:null
				        }
					},
					view : {
				         showLine:false,
				         showIcon:false
				       },
				    callback:{
				        onClick (event,treeId,treeNode,clickFlag){
				        		that.$refs.mysider.goupdata(treeNode)
				        	}
				    }
			}
			this.setting = setting
			/*this.$http.get(window.apiUrl+"/menu/queryMenu").then((res)=>{
				if(!res.data.code){
					this.datalist = res.data.data

				}else{
					Utils.errorModal({statusText:res.data.msg,status:res.data.code},DialogModal,this.$store)
				}
			},
			(error)=>{
				Utils.errorModal(error,DialogModal,this.$store)
			})*/
		}
	},
	components:{Mysider,Right}
}

</script>

