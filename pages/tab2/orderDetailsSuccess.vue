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
					<h4>订单已完成，感谢您的支持</h4>
				</view>
				<view class="top_button">
					<view class="button_left"></view>
					<view style="margin: 0 30upx;padding: 10upx 0;">
						<uni-list class="list_custom">
							<uni-list-item title="感谢您对存存的信任，期待再次光临" note="you deserve better" :showArrow="false">
								<view slot='right'>
									<image class="top_button_right" src="../../static/tab2/more_info.png" mode=""></image>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>存单物品</p>
				<view class="row segmented_list_content">
					<view v-for="(goodsItem,index) in order.goods" :key="index" class="col-6 row">
						<view class="col-8 list_content_left">
							<text>{{goodsItem.name}}</text>
						</view>
						<view class="col-4 list_content_right">
							<text>× {{goodsItem.amount}}</text>
						</view>
					</view>
				</view>
				<view style="">
					<view class="flex_between order_list_fee">
						<p>第三方快递运输费</p>
						<text>¥ 0</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>打包费用</p>
						<text>¥ 0</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>箱子费用</p>
						<text>¥ 0</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>调整费用</p>
						<text>¥ 0</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>需支付费用</p>
						<text>¥ <text style="font-size:32upx;margin-left: 10upx;">{{order.prepaid}}</text></text>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>存单信息</p>
				<view>
					<view class="flex_between order_list_phone">
						<p>上门时间</p>
						<text>{{order.detailTime}}</text>
					</view>
					<view class="row order_list_phone" style="align-items: flex-start;">
						<p class="col-4">上门地址</p>
						<view class="col-8" style="text-align: right;">
							<p style="color:rgba(40,40,40,1);">{{order.detailAddress}}</p>
							<text>{{order.linkman}} {{order.mobile}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>存单信息</p>
				<view>
					<view class="flex_between order_list_phone" @click="onCopy(order.orderNo)">
						<p>订单号</p>
						<view>
							<text>{{order.orderNo}}</text>
							<text style="margin: 0 30upx;color:rgba(222,222,222,1);">|</text>
							<text style="font-size:28upx;font-weight:400;color:rgba(2,105,208,1);">复制</text>
						</view>
					</view>
					<view class="flex_between order_list_phone">
						<p>支付方式</p>
						<text>支付宝支付</text>
					</view>
					<view class="flex_between order_list_phone">
						<p>下单时间</p>
						<text>{{order.bookFetchDate}}</text>
					</view>
					<view class="flex_between order_list_phone">
						<p>订单备注</p>
						<text>{{order.userRemark}}</text>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>客服信息</p>
				<view class="flex_between order_list_phone" @click="onCall">
					<p>客服电话</p>
					<view>
						<text>021-34283744</text>
						<text style="margin: 0 30upx;color:rgba(222,222,222,1);">|</text>
						<text style="font-size:28upx;font-weight:400;color:rgba(2,105,208,1);">拨打</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				headerShow: true,
				order: '',
				orderId: '',
			}
		},
		onLoad(op) {
			console.log(op)
			if (op.id) {
				this.orderId = op.id
			}
		},
		onShow() {
			if (this.orderId) {
				this.getOrderDetail()
			}
		},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		watch: {},
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
				this.payStyle = evt.target.value
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
				let data = {
					addressId: this.order.id,
					bookFetchDate: this.order.bookFetchDate,
					bookFetchTime1: this.order.bookFetchTime[0],
					bookFetchTime2: this.order.bookFetchTime[1],
					prepaid: this.order.prepaid,
					userRemark: this.order.userRemark
				}
				console.log(this.payStyle)
				return
				this.$http('user/deposit/order/create', "POST", data, res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						let dataObj = {
							orderId: data.data.id
						}
						if (this.payStyle == 'Alipay') {
							this.$http('user/deposit/order/prepay/alipay', "POST", dataObj, res1 => {
								if (res1.data.success) {
									console.log(res1.data.data)
									// #ifdef APP-PLUS
									uni.requestPayment({
										provider: 'alipay',
										orderInfo: res1.data.data,
										success: (res) => {
											this.$refs.popup.close()
											uni.navigateTo({
												url: "/pages/tab2/orderSuccess"
											})
										},
										fail: (err) => {
											this.$refs.popup.close()
											this.$http('user/deposit/order/prepay/fail', "POST", dataObj, res2 => {
												if (res2.data.success) {
													console.log(res2.data)
													uni.switchTab({
														url: '/pages/tabs/tab2'
													})
												} else {
													uni.showToast({
														icon: 'none',
														title: res2.data.message
													});
												}
											})
										}
									});
									// #endif
								} else {
									uni.showToast({
										icon: 'none',
										title: res1.data.message
									});
								}
							})
						} else {
							this.$refs.popup.close()
							uni.navigateTo({
								url: "/pages/tab2/orderSuccess"
							})
							// #ifdef APP-PLUS
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: 'orderInfo', //微信、支付宝订单数据
								success: (res) => {
									console.log(res);
								},
								fail: (err) => {
									console.log(err);
								}
							});
							// #endif
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			getOrderDetail() {
				this.$http('user/deposit/order/detail/'+this.orderId, "GET", '', res => {
					let data = res.data
					if (data.success) {
						data.data.detailAddress = data.data.area.province + ' ' + data.data.area.city + ' ' + data.data.area.district + ' ' + data.data.address
						data.data.detailTime = `${data.data.bookFetchDate} ${data.data.bookFetchTime[0]}:00~${data.data.bookFetchTime[1]}:00`
						this.order = data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			// 订单取消
			onCancelOrder(id) {
				this.$http('user/deposit/order/cancel?id=' + id, "POST", '', res => {
					let data = res.data
					if (data.success) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			onCopy(id) {
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: id,
					success: () => {
						console.log(id);
					}
				})
				// #endif
			},
			onCall() {
				uni.showModal({
					title: '提示',
					content: '是否要拨打客服电话021-34283744',
					success(res) {
						if (res.confirm) {
							// #ifdef APP-PLUS
							uni.makePhoneCall({
								phoneNumber: '021-34283744'
							});
							// #endif
						}
					}
				})
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
	}

	.cont_top {
		box-sizing: border-box;
		width: 100%;
		height: 436upx;
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
				width: 36upx;
				height: 36upx;
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

			.segmented_list_content {
				height: 240upx;
				padding: 0 20upx;
			
				.list_content_left {
					font-size: 28upx;
					font-weight: 500;
					color: rgba(40, 40, 40, 1);
					line-height: 70upx;
				}
			
				.list_content_right {
					font-size: 26upx;
					font-weight: 400;
					color: rgba(155, 155, 155, 1);
					line-height: 70upx;
				}
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
				font-weight: 400;
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
