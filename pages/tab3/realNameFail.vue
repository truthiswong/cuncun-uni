<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="实名认证" status-bar="true" fixed="true" :shadow="false"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="top_img">
				<image src="../../static/common/fail.png" mode=""></image>
				<p style="font-size:32upx;font-weight:500;color:rgba(40,40,40,1);line-height:64upx;margin-top: 60upx;">啊哦，认证失败，再去试试！</p>
				<button @click="onConfirm" class="address_button">前往认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {}
		},
		watch: {},
		onLoad(op) {},
		onShow() {
			// #ifdef APP-PLUS
			uni.report('realNameFail', {
				'describe': '认证失败'
			})
			// #endif
		},
		methods: {
			onClickBack() {
				// uni.navigateBack({
				// 	delta: 1
				// })
				uni.navigateTo({
					url: '/pages/tab3/setting'
				})
			},
			onConfirm() {
				uni.navigateTo({
					url: '/pages/tab3/realName'
				})
			}
		},
	};
</script>

<style scoped lang="scss">
	.content {}

	.top_img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 650upx;
		height: 600upx;
		text-align: center;

		image {
			width: 200upx;
			height: 276upx;
		}

		.address_button {
			width: 650upx;
			height: 98upx;
			border-radius: 6upx;
			font-size: 30upx;
			font-weight: 500;
			line-height: 98upx;
			text-align: center;
			margin-top: 80upx;
			background-color: #3BC1BB;
			color: #FFFFFF;
		}
	}
</style>
