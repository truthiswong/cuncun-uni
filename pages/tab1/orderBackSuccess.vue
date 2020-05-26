<template>
	<view>
		<view class="content">
			<view class="cont_top">
				<image v-if="orderInfo.payStyle=='Alipay'" src="../../static/tab2/Alipay.png"></image>
				<image v-else src="../../static/tab2/WeChatpay.png"></image>
				<p>支付完成</p>
			</view>
			<view class="top_text">
				<text>我们随时跟进我们的物流情况，根据需要会跟你订单留的号码 <text class="top_text_border">{{orderInfo.mobile}}</text> 联系，<text class="top_text_border">请保持电话畅通</text>。</text>
				<br />
				<text>本次物流由 顺丰快递 配送</text>
			</view>
			<view class="map">
				<image src="../../static/tab1/order_back_car.png"></image>
			</view>
			<view class="pay_info">
				<view class="flex_between">
					<text class="left">支付金额</text>
					<text class="right">¥{{orderInfo.totalFee}}</text>
				</view>
				<view class="flex_between" style="margin-top: 20upx;">
					<text class="left">支付方式</text>
					<text class="right">{{orderInfo.payStyle=='Alipay'?'支付宝':'微信'}}</text>
				</view>
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
				orderInfo: {}
			}
		},
		onLoad(option) {
			this.orderInfo = JSON.parse(decodeURIComponent(option.orderInfo))
			console.log(this.orderInfo)
		},
		onShow() {
			// #ifdef APP-PLUS
			uni.report('orderBackSuccess', {
				'describe': '取单成功'
			})
			// #endif
		},
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
		padding: 100upx 0 140upx;
	}

	.cont_top {
		text-align: center;

		image {
			width: 80upx;
			height: 80upx;
			margin-top: 40upx;
		}

		p {
			font-size: 30upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 42upx;
			margin-top: 30upx;
		}
	}

	.map {
		width: 100%;
		height: 300upx;
		margin-top: 60upx;

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
		padding: 0 60upx;

		.top_text_border {
			box-sizing: border-box;
			border-bottom: 11upx solid #94DCD9;
		}
	}
	
	.pay_info {
		padding: 0 60upx;
		font-size:28upx;
		font-weight:400;
		line-height:40upx;
		.left {
			color:rgba(178,178,178,1);
		}
		.right {
			color:rgba(40,40,40,1);
		}
	}

	.button_block {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 30upx;
		margin: auto;
		width: 650upx;
		box-sizing: border-box;
		height: 90upx;
		background: rgba(59, 193, 187, 1);
		border-radius: 6upx;
		line-height: 98upx;
		font-size: 30upx;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
