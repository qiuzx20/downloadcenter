import Vue from 'vue' 
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex' 

import store from './store/index'

import App from 'root/app.vue'
import Home from 'components/home/home.vue'
import Menu from 'components/menu/menu.vue'
import Permission from 'components/permission/permission.vue'
import Authorization from 'components/authorization/authorization.vue'
import Login from 'frame/login.vue'
import NotFound from 'frame/404.vue'
import 'cssfiles/base.css'
import 'cssfiles/common.less'



Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

const routes = [{
	path:'/',
	component:Home,
	meta:{
		requireAuth:true
	}
},{
	path:'/home',
	component:Home,
	meta:{
		requireAuth:true
	}
},{
	path:'/menu',
	component:Menu,
	meta:{
		requireAuth:true
	}
},
{
	path:'/permission',
	component:Permission,
	meta:{
		requireAuth:true
	}
},{
	path:'/authorization',
	component:Authorization,
	meta:{
		requireAuth:true
	}
},{
	path:'/login',
	component:Login
},{
	path:'*',
	component:NotFound
}]

const router = new VueRouter({
	routes
});

function isEmptyObject(obj) {
 	for (var key in obj) {
 		return false;
 	}
 	return true;
}
router.beforeEach((to,from,next)=>{
	if(to.meta.requireAuth){
		if(!isEmptyObject(store.store.state.user)){
			next()
		}else{
			next({
				path:'/login',
				query: {token: to.query.token,redirect: to.path}
			})

		}
	}else{
		next()
	}
})
const app = new Vue({
	router,
	components:{App},
	store: store.store
}).$mount("#app")

