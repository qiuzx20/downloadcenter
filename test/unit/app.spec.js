/*
* @file app.vue 测试用例
*/

import Vue from 'vue'
import Vuex from 'vuex'
import {mapGetters} from 'vuex'
import App from '../../src/app.vue'
import Sider from 'widget/sider/sider.vue'
import index from '../../src/index'
//import index from '../../src/index'
/*const this={},this.$route = {path:"home",query:{menuId:'sysmar'}}*/


describe('test karma',()=>{
	it("karma是否正常运行",()=>{
		expect("abcd").toEqual("abcd");
	})
})

describe('test app.vue',()=>{
	/*beforeEach(()=> {
		    jasmine.Ajax.install();
		  });
	afterEach(function () {
	    jasmine.Ajax.uninstall();
	    
	  });*/


	it("组件加载后，是否正常布局",()=>{
		beforeEach(()=>{

		})
		//console.log(App);
		//let vm = new Vue(App).$mount()
		//console.log(vm);
		//expect(true).toBe(true);
	})
})



describe('test sider.vue',()=>{
	it("sider.vue是否正常运行",()=>{

		//console.log(Sider.);
		//expect(typeof Sider.data).toBe('function')
		//const vm = new Vue(Sider).$mount()

		//expect("abcd").toEqual("abcd");
	})
})