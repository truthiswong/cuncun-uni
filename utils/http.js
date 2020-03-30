import Vue from 'vue'
import config from './config'; // 导入私有配置


function urlRequest(url, param, way, callBack) {
	let token = "";
	config.header['token'] = uni.getStorageSync('token')
	let timestamp = Date.parse(new Date());

	// //第一次无token配置请求头为空,在这边更新下header里面的token
	// config.header['token'] = uni.getStorageSync('token')
	// #ifdef MP-WEIXIN
	param.privateFlag = 'private1'
	// #endif
	// console.log(param)
	uni.request({
		url: config.url + url, //仅为示例，并非真实接口地址。
		data: param,
		header: {
			'token': config.header.token,
			'X-TENANT-ID': 'cuncun:cc@2020',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: way,
		success: (res) => {
			// callBack res
			callBack(res)
		}
	});
}

// export default {
// 	urlRequest: function(url, param, way) {
// 		return urlRequest(url, param, way);
// 	}
// }

Vue.prototype.$http = urlRequest
