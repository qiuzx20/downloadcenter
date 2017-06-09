import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
		count:0,
		user:{},
		menulist:[{id:1,menuid:"isHome",name:"首页",url:"\/home"},{id:2,menuid:"isMenu",name:"菜单管理",url:"\/menu"},{id:3,menuid:"isRole",name:"权限管理",url:"\/permission"},{id:4,menuid:"isAuthorize",name:"文件授权",url:"\/authorization"}],
		modalIndex:0,
		modallist:[],
		treelist:[],
		stagdata:{},
		levellist:[]
	};


const store = new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
export default {store}