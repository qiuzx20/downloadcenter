<template>
	<div class="sider">
	<ul class="ztree" id="siderztree"></ul>
	
	<p class="fold" @click="resize"><em></em></p>
	</div>
</template>
<script>
import zTree from 'lib/ztree/jquery.ztree.all.min.js'
import 'lib/ztree/zTreeStyle.css'
import {getSider} from 'store/actions'
import {mapGetters, mapActions} from 'vuex'


export default {
	name:'sider',
	data(){
		return {
			status:false, //false:展开，true:关闭
			menu_id:this.$route.query.menu_id ||'', //当前菜单ID
			roleId:this.$route.query.roleId ||'', //当前角色ID
			treelist:[], //侧边菜单数据
			treeObj:'' //ztree对象
		}
	},
	mounted(){
		this.treelist = this.option
		this.buildTree(this.treelist);
	},
	props:['option','setting'],
	watch:{
		treelist:function(val,oldval){
			if(!val.length && val != oldval)this.buildTree(val);
		}
	},
	methods:{
		eventListener (type,params) {
			this.$emit(type,params);
		},
		resize(){
			if(!this.status){
				this.status = true;
			}else{
				this.status = false;
			}
			this.eventListener('siderStatus',this.status);
		},
		addNodes(params){
			const parentZNode = this.treeObj.getNodeByParam("menu_id",params.parent_id, null); //获取父节点 
			this.treeObj.addNodes(parentZNode,params)
		},
		goupdata(params){
			if(params.menu_id)this.$router.push({query: {menuId: params.menu_id}})
			if(params.roleId)this.$router.push({query: {roleId: params.roleId}})
		},
		buildTree (nodes){
			this.treeObj = $.fn.zTree.init($(".ztree"),this.setting,nodes);
			let nodesd = this.treeObj.getNodes();
			if (nodesd.length>0) {
				$("#siderztree a:first").click();

			}
		}
	}
}

</script>
