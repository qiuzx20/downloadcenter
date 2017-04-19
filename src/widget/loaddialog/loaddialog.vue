<template>
	<div class="load-cover">
		<div v-if="option.type == 'loading'">
			<span class="load-img"></span>
			<span class="ml-20">{{option.text || defaultTips}}</span>
		</div>
		<div v-else>
			<span className="error-img"></span>
			<p className="load-error-text">
					<span>{option.text || "网络异常，连接失败。"}</span>
					<span v-if="option.retry" class="retry" @click="option.retry">点击重试</span>
			</p>
		</div>
	</div>
</template>
<script>
	
import './loaddialog.less'	

export default {
	name:"loadDialog",
	data(){
		return {
			defaultTips:"数据传输中,请稍候!"
		}
	},
	props:['option']
}
</script>