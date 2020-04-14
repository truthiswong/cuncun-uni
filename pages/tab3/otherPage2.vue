<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="存存服务协议" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content" v-html="content"></view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
			};
		},
		onLoad() {},
		onShow() {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	};
</script>

<style>
	page {}
</style>

<style scoped lang="scss">
	.content {
		padding: 20upx;
		text-align: justify;
	}
</style>
