<template>
	<view>
		<uni-nav-bar color="#FFFFFF" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
		</uni-nav-bar>
		<uni-nav-bar color="#000000" left-icon="back" title="仓储详情" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="!headerShow" shadow="true" style="position: absolute; top: 0;">
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content" :class="{'content_active': order.detailStatus == 'waitpay' || order.detailStatus == 'overdue7'}">
			<view class="cont_top">
				<view class="top_text">
					<view>
						<h4>{{order.detailStatusTitle}}</h4>
						<p>{{order.detailStatusSubTitle}}</p>
					</view>
				</view>
				<view class="top_button">
					<view class="button_left"></view>
					<view style="margin: 0 30upx;padding: 10upx 0;">
						<uni-list class="list_custom">
							<uni-list-item :showArrow="false">
								<view>
									<view class="top_button_left" v-if="order.detailStatus == 'finish'">
										<p>感谢您对存存的信任，期待再次光临</p>
										<text>you deserve better</text>
									</view>
									<view class="top_button_left" v-else>
										<p>{{order.beginDate}}~{{order.endDate}}</p>
										<text>费用周期</text>
									</view>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>费用清单</p>
				<view class="order_list_image">
					<view style="margin-bottom: 20upx;border-top: 2upx solid rgba(242, 242, 242, 0.6);">
						<view class="flex_between row" style="margin-top: 10upx;" v-if="order.boxECnum>0">
							<view class="storge_box col-3">
								<image src="../../static/tab2/storge_box.png" mode=""></image>
							</view>
							<view class="col-9">
								<!-- EC 经济照片 SD 标准拍照-->
								<view class="flex_between storge_box" v-if="item.typeBoxAB == 'B'" v-for="(item,index) in orderBox" :key="index">
									<text>{{item.typeName}} X {{item.number}}</text>
									<text>¥ {{item.price}}</text>
								</view>
							</view>
						</view>
						<view class="flex_between" v-if="order.boxSDnum>0">
							<view class="storge_box col-3">
								<image src="../../static/tab2/storge_box.png" mode=""></image>
							</view>
							<view class="col-9">
								<view class="flex_between storge_box" v-if="item.typeBoxAB == 'A'" v-for="(item,index) in orderBox" :key="index">
									<text>{{item.typeName}} X {{item.number}}</text>
									<text>¥ {{item.price}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="flex_between order_list_fee">
						<p>EC箱总费用</p>
						<text>¥ {{order.boxECprice}}</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>SD箱总费用</p>
						<text>¥ {{order.boxSDprice}}</text>
					</view>
					<view class="flex_between order_list_fee">
						<p>调整费用 <text style="color: #3BC1BB;margin-left: 20upx;" v-if="order.adjustFeeReason" @click="onChangeFeeAlert(order.adjustFeeReason)">查看</text></p>
						<text>¥ {{order.settleFee?adjustFee:0.00}}</text>
					</view>
					<view class="flex_between order_list_fee" style="margin-top: 10upx;">
						<p>支付总费用</p>
						<text>¥ <text style="font-size:32upx;margin-left: 10upx;">{{order.settleFee?order.settleFee:order.fee}}</text></text>
					</view>
				</view>
			</view>
			<view class="order_list">
				<p>订单信息</p>
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
						<view>
							<text v-if="order.payChannel">{{order.payChannel}}支付</text>
						</view>
					</view>
					<view class="flex_between order_list_phone">
						<p>创建时间</p>
						<text>{{order.orderTime}}</text>
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
		<uni-popup ref="popupPay" type="bottom" @touchmove.stop.prevent @touchend.stop>
			<view class="popup_wrap">
				<view class="popup_title">
					<text>选择支付方式</text>
					<image class="close_btn" @click="closePayPopup" src="../../static/tab2/close.png" mode=""></image>
				</view>
				<view class="popup_cont">
					<view class="">
						<radio-group @change="onPayChangeStyle">
							<uni-list class="list_custom list_custom_img56" v-for="(item, index) in payStyleList" :key="index">
								<label>
									<uni-list-item :title="item.name" :thumb="item.imgUrl" :showArrow="false">
										<view slot="right">
											<radio :value="item.value" :checked="payStyleIndex == index" color="rgba(59, 193, 187, 1)" />
										</view>
									</uni-list-item>
								</label>
							</uni-list>
						</radio-group>
					</view>
					<button class="pay_button" @click="onComfirmPay">立即支付</button>
				</view>
			</view>
		</uni-popup>
		<view class="flex_between bottom_pay" v-if="order.detailStatus == 'waitpay' || order.detailStatus == 'overdue7'">
			<text>¥ {{order.settleFee?order.settleFee:order.fee}}</text>
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
				order: '',
				orderId: '',
				gotoPage: '',
				orderBox: [],
				payStyleList: [{
						id: 0,
						value: 'Alipay',
						name: '支付宝',
						checked: true,
						imgUrl: '../../static/tab2/Alipay.png'
					},
					{
						id: 1,
						value: 'WeChatpay',
						name: '微信支付',
						checked: false,
						imgUrl: '../../static/tab2/WeChatpay.png'
					}
				],
				payStyle: 'Alipay',
				payStyleIndex: 0,
				buttonActive: false,
			}
		},
		onLoad(op) {
			console.log(op)
			if (op.id) {
				this.orderId = op.id
			}
			if (op.gotoPage) {
				this.gotoPage = op.gotoPage
			}
		},
		onShow() {
			if (this.orderId) {
				this.getOrderDetail()
			}
		},
		computed: {
			optionsReverse() {
				let that = this
				return that.options.reverse()
			},
			adjustFee() {
				// 调整费用
				return (this.order.settleFee - this.order.fee).toFixed(2)
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
				uni.navigateBack()
			},
			onPayChange() {
				this.$refs.popupPay.open()
			},
			closePayPopup() {
				this.$refs.popupPay.close()
			},
			onPayChangeStyle(evt) {
				console.log(evt.target.value)
				this.payStyle = evt.target.value
				if (this.payStyle == 'Alipay') {
					this.payStyleIndex = 0
				} else {
					this.payStyleIndex = 1
				}
			},
			onComfirmPay() {
				let dataObj = {
					orderId: this.orderId
				}
				if (this.payStyle == 'Alipay') {
					this.$http('user/store/order/pay/alipay', "POST", dataObj, res => {
						console.log(res.data)
						if (res.data.success) {
							this.$refs.popupPay.close()
							// #ifdef APP-PLUS
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data.data,
								success: (respay) => {
									this.getOrderDetail()
								},
								fail: (err) => {
									this.$http('user/store/order/pay/fail', "POST", dataObj, res2 => {
										this.getOrderDetail()
									})
								}
							});
							// #endif
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					})
				} else {
					// 微信支付
					this.$http('user/store/order/pay/wechat', "POST", dataObj, res1 => {
						console.log(res1.data)
						if (res1.data.success) {
							console.log(res1.data.data)
							this.$refs.popupPay.close()
							let orderInfoObj = {
								"appid": res1.data.data.appid,
								"noncestr": res1.data.data.noncestr,
								"package": res1.data.data.package,
								"partnerid": res1.data.data.partnerid,
								"prepayid": res1.data.data.prepayid,
								"timestamp": res1.data.data.timestamp,
								"sign": res1.data.data.sign
							}
							// let orderInfo = JSON.stringify(orderInfoObj)
							// #ifdef APP-PLUS
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: orderInfoObj,
								success: (res) => {
									console.log(res)
									this.getOrderDetail()
								},
								fail: (err) => {
									this.$http('user/store/order/pay/fail', "POST", dataObj, res2 => {
										this.getOrderDetail()
									})
								},
								complete: (e) => {}
							});
							// #endif
						} else {
							uni.showToast({
								icon: 'none',
								title: res1.data.message
							});
						}
					})
				}
			},
			getOrderDetail() {
				this.$http('user/store/order/detail/' + this.orderId, "GET", '', res => {
					let data = res.data
					if (data.success) {
						data.data.detailTime = `${data.data.bookFetchDate} ~ ${data.data.bookFetchDate}`
						data.data.detailStatus = data.data.status.code
						data.data.detailStatusTitle = data.data.status.title
						data.data.detailStatusSubTitle = data.data.status.subTitle
						if (data.data.payChannel) {
							data.data.payChannel = data.data.payChannel.name //预付费支付方式
						}
						data.data.boxECprice = data.data.boxECprice.toFixed(2)
						data.data.boxSDprice = data.data.boxSDprice.toFixed(2)
						data.data.settleFee = data.data.settleFee.toFixed(2)
						data.data.fee = data.data.fee.toFixed(2)
						data.data.orderTime = this.$moment(data.data.sendUserTime).format('YYYY-MM-DD HH:mm:ss')
						this.order = data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
				this.$http('/user/store/order/packs?orderId=' + this.orderId, "GET", '', res => {
					let data = res.data
					if (data.success) {
						for (let item of data.data) {
							item.typeName = item.box.name
							item.typeBoxAB = item.box.type.code
							item.price = item.price.toFixed(2)
						}
						this.orderBox = data.data
						console.log(this.orderBox)
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
						// uni.navigateBack({
						// 	delta: 1
						// })
						this.getOrderDetail()
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			onDetails() {
				this.$refs.popupSteps.open()
			},
			onClosePopup() {
				this.$refs.popupSteps.close()
			},
			onChangeFeeAlert(index) {
				if (index) {
					uni.showModal({
						title: '提示',
						content: index,
						showCancel: false
					})
				}
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

	.content_active {
		padding: 0 0 130upx;
	}

	.cont_top {
		box-sizing: border-box;
		width: 100%;
		background: linear-gradient(rgba(6, 185, 185, 1) 0%, rgba(6, 185, 185, 1) 65%, rgba(59, 193, 187, 0) 100%);
		padding-top: 206upx;
		margin-bottom: 40upx;

		.top_text {
			font-size: 32upx;
			font-weight: 500;
			color: rgba(40, 40, 40, 1);
			line-height: 64upx;
			// text-align: justify;
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
			margin: 40upx auto 0;
			box-shadow: 0 2upx 4upx 2upx #f1f1f1;

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

			.top_button_left {
				p {
					font-size: 32upx;
					font-weight: 600;
					color: rgba(40, 40, 40, 1);
					line-height: 45upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				text {
					font-size: 24upx;
					font-weight: 400;
					color: rgba(178, 178, 178, 1);
					line-height: 33upx;
					margin-top: 10upx;
				}
			}

			.top_button_right {
				text {
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

				image {
					width: 36upx;
					height: 36upx;
				}
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

			.storge_box {
				image {
					width: 120upx;
					height: 120upx;
					box-sizing: border-box;
					padding: 8upx;
					margin-right: 20upx;
				}

				text {
					font-size: 24upx;
					color: rgba(40, 40, 40, 1);
					line-height: 40upx;
					font-weight: 400;
				}
			}
		}

		.segmented_list_content {
			border-bottom: 2upx solid rgba(242, 242, 242, 0.58);
			margin: 40upx 0;
			padding: 0 20upx;
			background: rgba(249, 249, 249, 1);

			.list_content_left {
				font-size: 28upx;
				font-weight: 500;
				color: rgba(40, 40, 40, 1);
				line-height: 70upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.list_content_right {
				font-size: 26upx;
				font-weight: 400;
				color: rgba(155, 155, 155, 1);
				line-height: 70upx;
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

	.popup_steps_wrap {
		position: relative;
		width: 707upx;
		height: 1000upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;

		.scroll_content {
			height: 910upx;
		}
	}

	.popup_wrap {
		width: 100%;
		height: 660upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0 0;
		overflow-y: scroll;

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
