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
			status:false,
			id:this.$route.query.id ||''
		}
	},
	created(){
		this.$store.dispatch('getSider');
	},
	watch:{
		getsider:function(val,oldval){
			if(val.length)this.buildTree(val);
		}
	},
	computed:mapGetters([
	    'getsider'
	  ]),
	methods:{
		eventListener (type,params) {
			this.$emit(type,params);
		},
		resize () {
			if(!this.status){
				this.status = true;
			}else{
				this.status = false;
			}
			this.eventListener('sider-status',this.status);
		},
		goupdata (params){
			this.$router.push({ path: 'home', query: { id: params.id }})
			
		},
		buildTree (nodes){
			const setting = {
				isSimpleData : true,              //数据是否采用简单 Array 格式，默认false
				data:{
					key:{
						name:"name"
					},
					simpleData: {
		            enable: true,
		            idKey:"id",
		            pIdKey:"pId",
		            rootPId:0 || null
		          }
				},
				view : {
		          	showLine:false,
		          	showIcon:false
		        },
		        callback:{
		        	onClick (event,treeId,treeNode,clickFlag){
		        		this.goupdata(treeNode);
		        		this.$store.dispatch('increment');
		        		console.log(this.$store.state.count);
		        		//console.log(that.$route.query.id);
		        	}
		        }

			};
			$.fn.zTree.init($(".ztree"),setting,nodes);
		}
	}
}

</script>
