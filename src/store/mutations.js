import * as type from './mutation-types'

const mutations = {
	[type.INCREMENT] (state) {
	    state.count++
	},
	[type.SHOWMODAL] (state,option) {
	 	state.modallist.push(option)
	 },
	[type.CLOSEMODAL] (state,id) {
	 	let len=state.modallist.length-1;
	 	for(;len > -1;len--){
	 		if(state.modallist[len].timeid==id){
	 			state.modallist.splice(len,1)
	 		}
	 	}
	 	
	 },
	[type.CHOOSEMANAGER] (state,params) {
		state.stagdata = params
	 },
	[type.ADDTOROLE](state,params){
	 	state.stagdata = params
	},
	[type.SETUSER](state,params){
		state.user = params
	},
	[type.CLEARUSER](state,params){
		state.user = {}
	},
	[type.QUERYLEVEL](state,params){
		state.levellist = params
	},
	[type.QUERYMENU](state,params){
		state.treelist = params
	}
}

export default mutations