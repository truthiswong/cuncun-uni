<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="存存服务协议" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view style="text-align: center;margin-top: 50upx;">
				<image style="width: 140upx;height: 140upx;border-radius: 10upx;" src="../../static/common/logo.png" mode=""></image>
				<p style="font-size: 36upx;font-weight: 600;margin-top: 30upx;">存存 CUNCUN</p>
				<text style="font-size: 28upx;font-weight: 500;margin-top: 20upx;">Version {{versions}}</text>
			</view>
			<view style="padding: 30upx;">
				<uni-list class="list_custom list_custom_margin20">
					<!-- <uni-list-item title="功能介绍"></uni-list-item> -->
					<uni-list-item @click="appUpdate" title="版本更新"></uni-list-item>
					<!-- <uni-list-item @click="openMarket()" title="使用应用商店打开指定App"></uni-list-item>
					<uni-list-item @click="openMarket('com.tencent.android.qqdownloader')" title="强制使用应用宝打开指定App"></uni-list-item>
					<uni-list-item @click="openTaobao('taobao://s.taobao.com/search?q=uni-app')" title="打开淘宝搜索"></uni-list-item> -->
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import config from 'config.js'
	export default {
		components: {},
		data() {
			return {
				versions: '1.1.0'
			};
		},
		onLoad(op) {
			this.versions = op.versions
		},
		onShow() {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			openMarket(marketPackageName) {
				var appurl;
				if (plus.os.name == "Android") {
					appurl = "market://details?id=io.dcloud.hellouniapp"; //可能部分应用商店没有收录
				} else {
					// appurl = "itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253";
					appurl = "https://testflight.apple.com/join/YTk1s8uF";
				}
				if (typeof(marketPackageName) == "undefined") {
					plus.runtime.openURL(appurl, function(res) {
						console.log(res);
					});
				} else { //强制指定某个Android应用市场的包名，通过这个包名启动指定app
					if (plus.os.name == "Android") {
						plus.runtime.openURL(appurl, function(res) {
							plus.nativeUI.alert("本机没有安装应用宝");
						}, marketPackageName);
					} else {
						plus.nativeUI.alert("仅Android手机才支持应用宝");
					}
				}
			},
			openTaobao(url) {
				plus.runtime.openURL(url, function(res) {
					uni.showModal({
						content: "本机未检测到淘宝客户端，是否打开浏览器访问淘宝？",
						success: function(res) {
							if (res.confirm) {
								plus.runtime.openURL("https://s.taobao.com/search?q=uni-app")
							}
						}
					})
				});
			},
			appUpdate() {
				let info = uni.getSystemInfoSync()
				info.versionCode = 0
				// #ifdef APP-PLUS
				// 查询版本信息
				plus.runtime.getProperty(plus.runtime.appid, (wgtInfo) => {
					console.log(wgtInfo)
					info.versionCode = wgtInfo.versionCode
					info.version = wgtInfo.version
					this.versions = wgtInfo.version
					// 如果是Android平台，则检测是否有新版本
					if (String(info.platform).toLowerCase() == "android") {
						let data = {
							os: String(info.platform).toLowerCase(), // 操作系统（苹果：ios / 安卓：android）
							ver: 'beta' // 版本类别（正式：release / 演示：demo / 测试：beta）
						}
						this.$http('open/appver/latest', "GET", data, res => {
							let data = res.data
							if (data.success) {
								if (info.versionCode < data.build) {
									uni.showModal({
										title: "提示",
										content: "发现新版本APP，您是否要升级体验？",
										success: (action) => {
											if (action.confirm) {
												plus.runtime.openURL(data.url)
											} else if (res.cancel) {}
										}
									})
								} else {
									uni.showModal({
										title: "提示",
										content: "已是最新版本",
										success: (action) => {

										}
									})
								}
							} else {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
						})
					} else {
						var appurl = "https://testflight.apple.com/join/YTk1s8uF"
						plus.runtime.openURL(appurl, function(res) {
							console.log(res);
						});
						return
						let data = {
							os: String(info.platform).toLowerCase(), // 操作系统（苹果：ios / 安卓：android）
							ver: 'release' // 版本类别（正式：release / 演示：demo / 测试：beta）
						}
						this.$http('open/appver/latest', "GET", data, res => {
							let data = res.data
							if (data.success) {
								console.log(data)
								if (info.versionCode < data.build) {
									uni.showModal({
										title: "提示",
										content: "发现新版本APP，您是否要升级体验？",
										success: (action) => {
											if (action.confirm) {
												plus.runtime.openURL(data.url)
											} else if (res.cancel) {}
										}
									})
								} else {
									uni.showModal({
										title: "提示",
										content: "已是最新版本",
										success: (action) => {
						
										}
									})
								}
							} else {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
						})
					}
				});
				// #endif
			}
		}
	};
</script>

<style>
	page {
		/* background-color: rgba(249, 249, 249, 1); */
	}
</style>

<style scoped lang="scss">
	.content {
		position: relative;
		width: 100%;
		box-sizing: border-box;
	}
</style>
