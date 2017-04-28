import Vue from 'vue'

const actions = {
	increment({commit}){
		commit("INCREMENT")
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
	queryMenu({commit},params){
		return new Promise(function(resolve){
			Vue.http.get(window.apiUrl+"/menu/queryMenu").then((res)=>{
				commit("QUERYMENU",res.data.data)
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