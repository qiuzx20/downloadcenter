<template>
<div class="content-right">
	<iframe :src="'http://221.179.44.125/cmgz-me/ftl/guangzhou/ftl/wjxz/downManage?token='+token" frameborder="0" class="paas" :style="{height:contentheight+'px'}"></iframe></div>
</template>
<script>
export default {
	name:'myright1',
	data(){
		return {
			contentheight:400,
			token:sessionStorage.getItem("token"),
			params:''
		}
	},
	mounted(){
		this.contentheight = $(window).height()-80
	}
}
</script>
