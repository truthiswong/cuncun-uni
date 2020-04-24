import Vue from 'vue'

const host = 'http://cuncun.app.iisu.cn/server/data/'
// const hostLogin = 'http://cuncun.app.iisu.cn/server/data/'

function urlRequest(url, method, param, callBack) {
	// let timestamp = Date.parse(new Date());
	uni.request({
		url: host + url, //仅为示例，并非真实接口地址。
		data: param,
		header: {
			'Authorization': uni.getStorageSync('token'),
			'X-TENANT-ID': 'cuncun:cc@2020',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: method,
		dataType: "json",
		success: (res) => {
			if (res.statusCode == 401) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			} else if (res.statusCode == 502) {
				uni.showToast({
					icon: 'none',
					title: '服务器开小差了,请稍后再试'
				});
			} else {
				callBack(res)
			}
		}
	});
}
Vue.prototype.$http = urlRequest
