let host = 'http://cuncun.app.iisu.cn/server/sso'
// vue.config.js
const vueConfig = {
	devServer: {
		// development server port 8000
		port: 8088,
		// If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
		proxy: {
			'/': { //这里的key就是axios的baseURL
				// target: 'http://demo-jleco-river.jl-shgroup.com/server/',    //访问域名http://www.qfii.club
				target: host, //访问域名http://www.qfii.club
				changeOrigin: true, //开启跨域
				ws: false,
				pathRewrite: { // 路径重写，
					'^/': '' // 替换target中的请求地址
				}
			}
		}
	}
}

module.exports = vueConfig
