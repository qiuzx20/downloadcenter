import Vue from 'vue'

const actions = {
	//打开弹窗
	showModal({commit},option){
		return new Promise(function(resolve){
			option && commit("SHOWMODAL",option)
			resolve("ok")
		})
	},
	//关闭弹窗
	closeModal({commit},id){
		return new Promise(function(resolve){
			id && commit("CLOSEMODAL",id)
			resolve("ok")
		})
	},
	//选择管理员
	chooseManager({commit},params){
		return new Promise(function(resolve){
				commit("CHOOSEMANAGER",params)
				resolve("ok")
			
		})
	},
	//保存登录信息
	saveUser({commit},params){
		return new Promise(function(resolve){
				commit("SAVEUSER",params)
				resolve("ok")
			
		})
	},
	//获取敏感级别
	queryLevel({commit},params){
		return new Promise(function(resolve){
			Vue.http.get(window.apiUrl+"/file/levellist").then((res)=>{
				let levelarr = []
				res.data.forEach((item)=>{
					levelarr.push({name:item.level,showname:item.levelName})
				})
				commit("QUERYLEVEL",levelarr)
				resolve("ok")
			},(error)=>{
				resolve(error)
			})


		})

	},
	//获取敏感侧边菜单
	queryMenu({commit},params){
		return new Promise(function(resolve){
			Vue.http.post(window.apiUrl+"/menu/queryMenu",{type:params}).then((res)=>{
				//commit("QUERYMENU",res.data.data)
				resolve(res.data)
			},(error)=>{
				resolve(error)
			})


		})

	},
	//清除登录信息
	clearUser({commit},params){
		return new Promise(function(resolve){
				commit("CLEARUSER",params)
				resolve("ok")
			
		})
	}
}

export default actions