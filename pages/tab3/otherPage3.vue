<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="存存服务协议" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view style="text-align: center;margin-top: 50upx;">
				<image style="width: 100upx;height: 100upx;border-radius: 10upx;" src="../../static/common/logo.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				versions: 'v 1.1.0'
			};
		},
		onLoad() {},
		onShow() {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			appUpdate() {
				uni.showModal({
					title: '提示',
					content: '已有新版本，是否前往更新？',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
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
