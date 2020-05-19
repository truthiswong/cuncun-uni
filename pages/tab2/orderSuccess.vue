<template>
	<view>
		<view class="content">
			<view class="cont_top">
				<image src="../../static/tab2/ok.png"></image>
				<p>一切都搞定！！！！！</p>
				<text>您只要翘着脚等着就行～</text>
			</view>
			<view class="top_text">
				<text>您的订单我们已经收到，我们将会受理您的订单并给予您确认。正常情况下，我们会在预定的时间、地点拜访。</text>
			</view>
			<view class="map">
				<view class="map_top">
					<view class="flex_between">
						<text>{{orderInfo.detailTime}}</text>
						<text class="text_button">待受理</text>
					</view>
					<p>{{orderInfo.detailAddress}}</p>
				</view>
				<image src="../../static/tab2/map.png"></image>
			</view>
			<view class="top_text">
				<text>我们随时跟进我们的物流情况，根据需要会跟你订单留的号码<text class="top_text_border">{{orderInfo.mobile}}</text>联系，<text class="top_text_border">请保持电话畅通</text>。</text>
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
			this.orderInfo.detailTime =
				`${this.orderInfo.bookFetchDate} ${this.orderInfo.bookFetchTime[0]}:00~${this.orderInfo.bookFetchTime[1]}:00`
			this.orderInfo.detailAddress = this.orderInfo.area.province + ' ' + this.orderInfo.area.city + ' ' + this.orderInfo.area
				.district + ' ' + this.orderInfo.address
		},
		onShow() {
			// #ifdef APP-PLUS
			uni.report('addOrderSuccess', {
				'describe': '存单成功'
			})
			// #endif
		},
		watch: {},
		methods: {
			onPayChange() {
				uni.switchTab({
					url: '/pages/tabs/tab2?gotoPage=tab21'
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
		padding: 100upx 60upx 140upx;
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

		text {
			font-size: 30upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 56upx;
		}
	}

	.map {
		position: relative;
		width: 100%;
		height: 400upx;
		margin-top: 60upx;
		border-radius: 20upx;
		overflow: hidden;
		box-shadow: 0 2upx 8upx 0 grey;

		.map_top {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;
			background-color: #FFFFFF;
			width: 590upx;
			height: 133upx;
			margin: 20upx auto 0;
			border-radius: 20upx;
			padding: 20upx;
			box-sizing: border-box;
			box-shadow: 0 2upx 8upx 0 grey;

			text {
				font-size: 28upx;
				font-weight: 600;
				color: rgba(40, 40, 40, 1);
				line-height: 40upx;
			}

			.text_button {
				width: 98upx;
				height: 48upx;
				background: rgba(59, 193, 187, 1);
				border-radius: 4upx;
				font-size: 26upx;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 48upx;
				text-align: center;

			}

			p {
				font-size: 26upx;
				font-weight: 400;
				color: rgba(74, 74, 74, 1);
				line-height: 37upx;
				margin-top: 12upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	.top_text {
		font-size: 32upx;
		font-weight: 600;
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
