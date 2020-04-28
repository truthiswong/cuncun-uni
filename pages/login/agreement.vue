<template>
	<view>
		<uni-nav-bar color="#000000" left-icon="back" title="用户协议" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="headerShow" backgroundColor="#ffffff">
		</uni-nav-bar>
		<uni-nav-bar color="#000000" left-icon="back" title="用户协议" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="!headerShow" shadow="true">
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<!-- <web-view src="http://cuncun.app.iisu.cn/h5/agreement.html"></web-view> -->
		</view>
	</view>
</template>

<script>
	var wv;
	export default {
		components: {},
		data() {
			return {
				headerShow: true,
			}
		},
		onLoad() {
			let sysInfo = uni.getSystemInfoSync()
			console.log(sysInfo)
			if (sysInfo.model && sysInfo.model.indexOf('iPhone') !== -1) {
				this.titleBarHeight = 44
			} else {
				this.titleBarHeight = 48
			}
			
			// #ifdef APP-PLUS
			wv = plus.webview.create("", "custom-webview", {
				plusrequire: "none",
				'uni-app': 'none',
				top: uni.getSystemInfoSync().statusBarHeight + 44
			})
			wv.loadURL("http://cuncun.app.iisu.cn/h5/agreement.html")
			var currentWebview = this.$scope.$getAppWebview();
			currentWebview.append(wv);
			setTimeout(function() {
				console.log(wv.getStyle())
			}, 1000);
			// #endif
		},
		onShow() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		watch: {},
		computed: {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		}

	}
</script>
<style>
	page {
		/* background: rgba(242, 242, 242, 1); */
	}
</style>
<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
	}
</style>
