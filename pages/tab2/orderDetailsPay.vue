<template>
	<view>
		<uni-nav-bar color="#FFFFFF" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
		</uni-nav-bar>
		<uni-nav-bar color="#000000" left-icon="back" title="订单详情" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="!headerShow" shadow="true" style="position: absolute; top: 0;">
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top">
				<view class="top_text">
					<h4>您的订单还未付款，请及时付款</h4>
					<p>此订单需要在7月26日00:00为止需要支付，否则订单将自动取消。</p>
				</view>
				<view class="top_button">
					<view class="button_left"></view>
					<view style="margin: 0 30upx;padding: 10upx 0;">
						<uni-list class="list_custom">
							<uni-list-item title="7月27日 09:00～10:00" note="申请时间" :showArrow="false">
								<view slot='right'>
									<text class="top_button_right">取消订单</text>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>返送清单</p>
				<view class="order_list_image">
					<image class="order_list_image_img" v-for="item in 10" :key="item" src="../../static/tab1/book_img2.png" mode=""></image>
				</view>
				<view style="">
					<view class="flex_between order_list_fee">
						<p>第三方快递运输费</p>
						<text>¥ 24</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>打包费用</p>
						<text>¥ 24</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>箱子费用</p>
						<text>¥ 24</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>调整费用</p>
						<text>¥ 24</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>需支付费用</p>
						<text>¥ <text style="font-size:32upx;margin-left: 10upx;">96</text></text>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>返送信息</p>
				<view>
					<view class="flex_between order_list_phone">
						<p>送达时间</p>
						<text>7月27日 09:08</text>
					</view>
					<view class="row order_list_phone" style="align-items: flex-start;">
						<p class="col-4">返送地址</p>
						<view class="col-8" style="text-align: right;">
							<p>上海市 嘉定区 叶城五街坊 裕民1180弄78号102室</p>
							<text>王（女士） 13928863927</text>
						</view>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>订单信息</p>
				<view>
					<view class="flex_between order_list_phone">
						<p>订单号</p>
						<view>
							<text>0249 3849 5232 5432 543</text>
							<text style="margin: 0 30upx;color:rgba(222,222,222,1);">|</text>
							<text style="font-size:28upx;font-weight:400;color:rgba(2,105,208,1);">复制</text>
						</view>
					</view>
					<view class="flex_between order_list_phone">
						<p>支付方式</p>
						<text>微信支付</text>
					</view>
					<view class="flex_between order_list_phone">
						<p>下单时间</p>
						<text>2019-07-25 12:11</text>
					</view>
					<view class="flex_between order_list_phone">
						<p>订单备注</p>
						<text>小心易碎物品！辛苦您啦～</text>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>客服信息</p>
				<view class="flex_between order_list_phone">
					<p>客服电话</p>
					<view>
						<text>021-34283744</text>
						<text style="margin: 0 30upx;color:rgba(222,222,222,1);">|</text>
						<text style="font-size:28upx;font-weight:400;color:rgba(2,105,208,1);">拨打</text>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" @touchmove.stop.prevent @touchend.stop>
			<view class="popup_wrap">
				<view class="popup_title">
					<text>选择支付方式</text>
					<image class="close_btn" @click="closePopup" src="../../static/tab2/close.png" mode=""></image>
				</view>
				<view class="popup_cont">
					<view class="">
						<radio-group @change="onPayChangeStyle">
							<uni-list class="list_custom list_custom_img56" v-for="(item, index) in payStyleList" :key="index">
								<uni-list-item :title="item.name" :thumb="item.imgUrl" :showArrow="false">
									<view slot="right">
										<label>
											<radio :value="item.value" :checked="item.checked" color="rgba(59, 193, 187, 1)" />
										</label>
									</view>
								</uni-list-item>
							</uni-list>
						</radio-group>
					</view>
					<button class="pay_button" @click="onComfirmPay">立即支付</button>
				</view>
			</view>
		</uni-popup>
		<view class="flex_between bottom_pay">
			<text>¥ 820.0</text>
			<button @click="onPayChange" class="button_block" :class="{button_block_active: buttonActive}">确认支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				headerShow: true,
				payStyleList: [{
						id: 0,
						value: 'Alipay',
						name: '支付宝',
						checked: 'false',
						imgUrl: '../../static/tab2/Alipay.png'
					},
					{
						id: 1,
						value: 'WeChatpay',
						name: '微信支付',
						imgUrl: '../../static/tab2/WeChatpay.png'
					}
				],
				buttonActive: false,
			}
		},
		onLoad() {},
		onShow() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		watch: {},
		computed: {

		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onPayChange() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			onPayChangeStyle(evt) {
				console.log(evt.target.value)
				// for (let i = 0; i < this.payStyleList.length; i++) {
				// 	if (this.payStyleList[i].value === evt.target.value) {
				// 		this.current = i;
				// 		break;
				// 	}
				// }
			},
			onComfirmPay() {
				// uni.navigateTo({
				// 	url: "/pages/tab2/orderSuccess"
				// })
				this.$refs.popup.close()
			}
		}

	}
</script>
<style>
	page {
		background: rgba(242, 242, 242, 1);
	}
</style>
<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 0 130upx;
	}

	.cont_top {
		box-sizing: border-box;
		width: 100%;
		height: 536upx;
		background: linear-gradient(45deg, rgba(6, 185, 185, 1) 0%, rgba(59, 193, 187, 1) 100%);
		padding-top: 206upx;
		margin-bottom: 40upx;

		.top_text {
			font-size: 32upx;
			font-weight: 500;
			color: rgba(40, 40, 40, 1);
			line-height: 64upx;
			text-align: justify;
			padding: 0 50upx;

			h4 {
				font-size: 46upx;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				line-height: 56upx;
			}

			p {
				font-size: 30upx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 52upx;
				margin-top: 10upx;
			}
		}

		.top_button {
			position: relative;
			width: 710upx;
			height: 148upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 3upx;
			margin: 30upx auto 0;

			.button_left {
				position: absolute;
				top: 44upx;
				left: -10upx;
				z-index: 1;
				width: 26upx;
				height: 10upx;
				background: rgba(245, 166, 35, 1);
				border-radius: 5upx;
			}

			.top_button_right {
				display: block;
				width: 172upx;
				height: 60upx;
				border-radius: 5upx;
				text-align: center;
				border: 1upx solid rgba(221, 221, 221, 1);
				font-size: 28upx;
				line-height: 60upx;
				font-weight: 400;
				color: rgba(40, 40, 40, 1);
			}
		}
	}

	.order_list {
		margin: 20upx auto;
		width: 710upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 3upx;
		padding: 30upx;
		box-sizing: border-box;

		p {
			font-size: 32upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 45upx;
			margin-top: 10upx;
		}

		.order_list_image {
			font-size: 0;
			padding: 38upx 0 8upx;
			border-bottom: 2upx solid rgba(242, 242, 242, 0.58);
			margin-bottom: 40upx;

			image {
				width: 140upx;
				height: 140upx;
				margin: 0 30upx 30upx 0;
			}

			image:nth-child(4n) {
				margin-right: 0;
			}
		}

		.order_list_fee {
			p {
				font-size: 24upx;
				font-weight: 400;
				color: rgba(178, 178, 178, 1);
				line-height: 33upx;
			}

			text {
				font-size: 20upx;
				font-weight: 600;
				color: rgba(40, 40, 40, 1);
				line-height: 28upx;
			}
		}

		.order_list_phone {
			margin-top: 40upx;
			padding: 40upx 0 10upx;
			border-top: 2upx solid rgba(242, 242, 242, 0.6);

			p {
				font-size: 28upx;
				font-weight: 400;
				color: rgba(178, 178, 178, 1);
			}

			text {
				font-size: 26upx;
				font-weight: 400;
				color: rgba(40, 40, 40, 1);
			}
		}
	}


	.input_remark {
		width: 420upx;
		height: 60upx;
		font-size: 28px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(178, 178, 178, 1);
		line-height: 60upx;
		background: rgba(249, 249, 249, 0);
		border: 0 none;
		text-align: right;

		.item {
			width: 30%;
			height: 300px;
		}
	}

	.pay_info {
		margin: 40upx 0;

		.pay_info_list {
			font-size: 24upx;
			font-weight: 400;
			color: rgba(178, 178, 178, 1);
			line-height: 33upx;
			margin-top: 6upx;
		}
	}

	.total_fee {
		text {
			font-size: 28upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 40upx;
		}
	}

	.popup_wrap {
		width: 100%;
		height: 660upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0 0;
		overflow-y: scroll;
	}

	.popup_cont {
		box-sizing: border-box;
		padding: 30upx;

		.pay_button {
			width: 100%;
			height: 100upx;
			margin-top: 160upx;
			background: rgba(59, 193, 187, 1);
			border-radius: 3upx;
			font-size: 32upx;
			color: rgba(255, 255, 255, 1);
			line-height: 100upx;
		}
	}

	.date_item {
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 26upx;
		font-weight: 400;
		color: rgba(40, 40, 40, 1);
	}

	.bottom_pay {
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		height: 110upx;
		background: rgba(74, 74, 74, 1);
		box-shadow: 0 -2upx 10upx 0 rgba(0, 0, 0, 0.05);
		padding: 0 30upx;

		text {
			font-size: 36upx;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
		}

		.button_block {
			width: 212upx;
			height: 80upx;
			background: rgba(59, 193, 187, 1);
			border-radius: 3px;
			line-height: 80upx;
			font-size: 28upx;
			font-weight: 500;
			color: #FFFFFF;
			margin: 0;
		}
	}
</style>
