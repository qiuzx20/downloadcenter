import Vue from 'vue'

const actions = {
	increment({commit}){
		commit("INCREMENT")
	},
	getSider({commit}){
		/*const data = [
				{"id":1, "pId":0, "name":"PAAS平台下载"},
				{"id":2, "pId":0, "name":"自助分析"},
				{"id":12, "pId":2, "name":"共享"},
				{"id":121, "pId":12, "name":"业务1"},
				{"id":122, "pId":12, "name":"业务2"},
				{"id":123, "pId":12, "name":"业务3"},
				{"id":31, "pId":3, "name":"广州"},
				{"id":32, "pId":3, "name":"深圳"},
				{"id":33, "pId":3, "name":"中山"},
				{"id":3, "pId":0, "name":"地市"}
			]
		commit("GETSIDER",data)*/
	},
	showModal({commit},option){
		return new Promise(function(resolve){
			option && commit("SHOWMODAL",option)
			resolve("ok")
		})
	},
	closeModal({commit},id){
		return new Promise(function(resolve){
			id && commit("CLOSEMODAL",id)
			resolve("ok")
		})
	},
	chooseManager({commit},params){
		return new Promise(function(resolve){
				commit("CHOOSEMANAGER",params)
				resolve("ok")
			
		})
	},
	setUser({commit},params){
		return new Promise(function(resolve){
				commit("SETUSER",params)
				resolve("ok")
			
		})
	},
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
	clearUser({commit},params){
		return new Promise(function(resolve){
				commit("CLEARUSER",params)
				resolve("ok")
			
		})
	},
	addToRole({commit},params){
		return new Promise(function(resolve){
			setTimeout(()=>{
				commit("ADDTOROLE",params)
				resolve("ok")
			},3000)
		})
	}
}

export default actions