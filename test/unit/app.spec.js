/*
* @file app.vue 测试用例
*/

import Vue from 'vue'
import app from '../../src/app.vue'


describe('test karma',()=>{
	it("karma是否正常运行",()=>{
		expect("abcd").toEqual("abcd");
	})
})
