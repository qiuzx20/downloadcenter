'use strict';

let Global = {
	URL: window.apiUrl,
	seq: -10,
	timeout: 0
};

// 编码
const encodeParam = (param) => {
	let ret = [];
	for (let o in param) {
		ret.push(o + "=" + param[o]);
	}
	return encodeURI(ret.join("&"));
}

// 解码
const decodeParam = (param) => {
	let ret = null;
	if (param && param.length > 1) {
		ret = {};
		param = decodeURI(param);
		let items = param.split('&');
		for (let i = 0; i < items.length; i++) {
			let a = items[i];
			if (a) {
				let km = a.split("=");
				ret[km[0]] = km[1];
			}
		}
	}
	return ret;
}

const getSeq = () => {
	return Global.seq--;
}

const deepClone = (obj) => {
	if (Array.isArray(obj)) {
	    return obj.map(deepClone)
	  } else if (obj && typeof obj === 'object') {
	    const cloned = {}
	    const keys = Object.keys(obj)
	    for (let i = 0, l = keys.length; i < l; i++) {
	      const key = keys[i]
	      cloned[key] = deepClone(obj[key])
	    }
	    return cloned
	  } else {
	    return obj
	  }
	throw new Error("Unable to copy obj! Its type isn't supported.");
}


const ipCheck = (str)=>{
	const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
	return reg.test(str)
}

const isEmail = (str)=>{
	const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return reg.test(str)
}

const isTel = (str)=>{
	const reg =/^1(3|4|5|7|8)\d{9}$/
	return reg.test(str)
}
const isNumber = (str)=>{
	const reg =/^[0-9]+$/
	return reg.test(str)
}

const hwpasswordCheck = (str)=>{
	const filter1 = [
		"~", "`", "!", "?", ",", ".", ":", ";", "-", "_", "'", "(", ")", "{", "}", "[",
		"]", "/", "<", ">", "@", "#", "$", "%", "^", "&", "*", "+", "|", "="
	];
	let result1 = false;
	for (let i = 0; i < str.length; i++) {
		for(let j=0; j < filter1.length && !result1; j++){
			if(str.charAt(i)==filter1[j]){
				result1 = true;
				break;
			}
		}
	}

	const filter2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8","9", "0"];
	let result2 = false;
	for (let i = 0; i < str.length; i++) {
		for(let j=0; j < filter2.length && !result2; j++){
			if(str.charAt(i)==filter2[j]){
				result2 = true;
				break;
			}
		}
	}

	const filter4 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K","L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V","W", "X", "Y", "Z"];
	let result4 = false;
	for (let i = 0; i < str.length; i++) {
		for(let j=0; j < filter4.length && !result4; j++){
			if(str.charAt(i)==filter4[j]){
				result4 = true;
				break;
			}
		}
	}

	const filter3 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k","l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v","w", "x", "y", "z"];
	let result3 = false;
	for (let i = 0; i < str.length; i++) {
		for(let j=0; j < filter3.length && !result3; j++){
			if(str.charAt(i)==filter3[j]){
				result3 = true;
				break;
			}
		}
	}
	return result4 && result3 && result2 && result1;
}

const isChineseChar = (str)=>{
	const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
	return reg.test(str)
}

const errorModal = (error,dialog,store)=>{
	const timeidA = (new Date()).getTime()
	const option = {
	    Dialog: dialog,
	    timeid: timeidA,
	    option: {
	        type: "error",
	        title: "提示",
	        content: error.statusText + " 错误码：" + error.status,
	        ok: {
	            text: "知道了"
	        }
	    }
	}
	store.dispatch("showModal", option)

}

module.exports = {
	encodeParam: encodeParam,
	decodeParam: decodeParam,
	getSeq: getSeq,
	deepClone: deepClone,
	isNumber:isNumber,
	ipCheck:ipCheck,
	isEmail:isEmail,
	hwpasswordCheck:hwpasswordCheck,
	isChineseChar:isChineseChar,
	errorModal:errorModal
}