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
							console.log(data)
							if (config.debug) console.log("当前版本", info.versionCode, "最新版本", data.build)
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
