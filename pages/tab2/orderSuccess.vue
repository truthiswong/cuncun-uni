<template>
	<view>
		<view class="content">
			<view class="cont_top">
				<image src="../../static/tab2/ok.png"></image>
				<p>一切都搞定！！！！！</p>
			</view>
			<view class="top_text">
				<text>我们会在预定的时间和地点拜访; 你只要翘着脚等着就行了~</text>
			</view>
			<view class="map">
				<view class="map_top">
					<view class="flex_between">
						<text>7月27日 09:00～10:00</text>
						<text class="text_button">待受理</text>
					</view>
					<p>上海市嘉定区叶城五街坊裕民1180弄78号1…</p>
				</view>
				<image src="../../static/tab2/map.png"></image>
			</view>
			<view class="top_text">
				<text>我们随时跟进我们的物流情况，根据需要会跟你订单留的号码<text class="top_text_border">17493279824</text>联系，<text class="top_text_border">请保持电话畅通</text>。</text>
			</view>
		</view>
		<button @click="onPayChange" class="button_block">完成</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
			}
		},
		onLoad() {},
		onShow() {},
		watch: {},
		methods: {
			onPayChange() {
				uni.switchTab({
					url: '/pages/tabs/tab2'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 180upx 60upx 130upx;
	}

	.cont_top {
		text-align: center;

		image {
			width: 104upx;
			height: 100upx;
			margin-top: 40upx;
		}

		p {
			font-size: 30upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 42upx;
			margin-top: 49upx;
		}
	}
	.map {
		position: relative;
		width: 100%;
		height: 300upx;
		margin-top: 60upx;
		.map_top {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;
			background-color: #FFFFFF;
			width: 560upx;
			margin: 20upx auto 0;
			border-radius: 20upx;
			.text_button {
				width:98upx;
				height:48upx;
				background:rgba(59,193,187,1);
				border-radius:4upx;
				font-size:26upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:48upx;
			}
			
		}
		image {
			width: 100%;
			height: 100%;
		}
	}

	.top_text {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(40, 40, 40, 1);
		line-height: 64upx;
		text-align: justify;
		margin-top: 60upx;

		.top_text_border {
			box-sizing: border-box;
			border-bottom: 11upx solid #94DCD9;
		}
	}

	.button_block {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 650upx;
		box-sizing: border-box;
		height: 98upx;
		background: rgba(59, 193, 187, 1);
		border-radius: 6upx;
		line-height: 98upx;
		font-size: 30upx;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
