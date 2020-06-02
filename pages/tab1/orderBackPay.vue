<template>
	<view>
		<uni-nav-bar color="#FFFFFF" title="返送专线" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;"></uni-nav-bar>
		<uni-nav-bar color="#000000" title="返送专线" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="!headerShow" style="position: absolute; top: 0;" shadow="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top" @click="isAddShow=false" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}"></view>
			<view class="cont_cont" @click="isAddShow=false" style="border-radius:20upx 20upx 0 0;">
				<view class="cont_title">
					<text>我们立刻去为您打包～请核实返送信息：</text>
				</view>
				<uni-list class="list_custom list_custom_padding40">
					<uni-list-item @click="onChooseAddress">
						<view class="">
							<view class="" v-if="!address.id">
								<text>请添加您的地址</text>
							</view>
							<view class="choose_address" v-else>
								<view class="row address">
									<p class="address_detail">
										<uni-tag class="address_tag" :text="address.tag[0].name" size="small" :inverted="true" type="error"></uni-tag>
										<text>{{address.detailAddress}}</text>
									</p>
								</view>
								<view class="top_name">
									<text>{{address.linkman}}</text>
									<text style="margin-left: 30upx;">{{address.mobile}}</text>
								</view>
							</view>
						</view>
					</uni-list-item>
					<uni-list-item title="备注" :showArrow="false">
						<view slot="right">
							<input class="input_remark" v-model="userRemark" @blur="onOrderBackRemark" type="text" placeholder="对我们的服务人员有什么特别的吩咐吗" style="font-size:28upx;padding-left: 20upx;color: #282828;"
							 placeholder-style="font-size:14px; font-weight:400; color:rgba(178,178,178,1); line-height:40upx;" />
						</view>
					</uni-list-item>
				</uni-list>
				<view class="pay_info">
					<view class="flex_between total_fee">
						<text>支付定金</text>
						<text>¥ {{total_fee}}</text>
					</view>
					<view class="flex_between pay_info_list">
						<text>运输费</text>
						<text>¥ {{total_fee}}</text>
					</view>
					<view class="flex_between pay_info_list">
						<text>打包费</text>
						<text>¥ 0</text>
					</view>
					<view class="flex_between pay_info_list">
						<text>箱子费</text>
						<text>¥ 0</text>
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
		<view class="flex_between bottom_pay">
			<text>¥ {{total_fee}}</text>
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
				address: {
					id: ''
				},
				userRemark: '', //备注
				total_fee: 0,
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
				payStyle: 'Alipay',
				payStyleIndex: 0,
				buttonActive: false,
				cont_top_bg: '../../static/tab1/order_back_bg2.png',
			}
		},
		onLoad() {},
		onShow() {
			this.address = uni.getStorageSync('address')
			if (!this.address.id) {
				this.getAddressList()
			}
			let orderBackRemark = uni.getStorageSync('orderBackRemark')
			if (orderBackRemark) {
				this.userRemark = orderBackRemark
			}
		},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		watch: {
			address() {
				if (this.address) {
					this.buttonActive = true;
					this.getFee()
				} else {
					this.buttonActive = false;
				}
			}
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onChooseAddress() {
				uni.navigateTo({
					url: '/pages/tab3/address?chooseAddress=true'
				})
			},
			onOrderBackRemark() {
				uni.setStorage({
					key: 'orderBackRemark',
					data: this.userRemark
				})
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
			closePopup() {
				this.$refs.popup.close()
			},
			onPayChange() {
				if (!this.address.id) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
				} else {
					this.$refs.popup.open()
				}
			},
			onComfirmPay() {
				let orderObj = {
					addressId: this.address.id,
					userRemark: this.userRemark
				}
				// #ifdef APP-PLUS
				uni.report('orderBackConfirmPay', {
					'describe': '取单确认支付'
				})
				// #endif
				this.$http('user/withdraw/order/create', "POST", orderObj, res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						uni.removeStorage({
							key: 'orderBackRemark'
						})
						let dataObj = {
							orderId: data.data.id
						}
						if (this.payStyle == 'Alipay') {
							this.$http('user/withdraw/order/pay/alipay', "POST", dataObj, res1 => {
								if (res1.data.success) {
									console.log(res1.data.data)
									this.$refs.popup.close()
									// #ifdef APP-PLUS
									uni.requestPayment({
										provider: 'alipay',
										orderInfo: res1.data.data,
										success: (res) => {
											data.data.payStyle = 'Alipay'
											uni.navigateTo({
												url: "/pages/tab1/orderBackSuccess?orderInfo=" + encodeURIComponent(JSON.stringify(data.data)),
												success: () => {
													// #ifdef APP-PLUS
													uni.report('orderBackAlipay', {
														'describe': '取单支付宝支付'
													})
													// #endif
												}
											})
										},
										fail: (err) => {
											this.$http('user/withdraw/order/pay/fail', "POST", dataObj, res2 => {
												uni.navigateTo({
													url: `/pages/tab1/orderBackDetails?id=${dataObj.orderId}&gotoPage=tab22`
												})
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
						} else {
							// 微信支付
							this.$http('user/withdraw/order/pay/wechat', "POST", dataObj, res1 => {
								console.log(res1.data)
								if (res1.data.success) {
									console.log(res1.data.data)
									this.$refs.popup.close()
									let orderInfoObj = {
										"appid": res1.data.data.appid,
										"noncestr": res1.data.data.noncestr,
										"package": res1.data.data.package,
										"partnerid": res1.data.data.partnerid,
										"prepayid": res1.data.data.prepayid,
										"timestamp": res1.data.data.timestamp,
										"sign": res1.data.data.sign
									}
									// let orderInfoStr = JSON.stringify(orderInfoObj)
									// #ifdef APP-PLUS
									uni.requestPayment({
										provider: 'wxpay',
										orderInfo: orderInfoObj,
										success: (respay) => {
											console.log(respay)
											uni.navigateTo({
												url: "/pages/tab1/orderBackSuccess?orderInfo=" + encodeURIComponent(JSON.stringify(data.data)),
												success: () => {
													// #ifdef APP-PLUS
													uni.report('orderBackWxpay', {
														'describe': '取单微信支付'
													})
													// #endif
												}
											})
										},
										fail: (err) => {
											this.$http('user/withdraw/order/pay/fail', "POST", dataObj, res2 => {
												uni.navigateTo({
													url: `/pages/tab1/orderBackDetails?id=${dataObj.orderId}&gotoPage=tab22`
												})
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
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
					}
				})
			},
			getFee() {
				let data = {
					addressId: this.address.id
				}
				this.$http('user/withdraw/param/freight', "POST", data, res => {
					let data = res.data
					if (data.success) {
						this.total_fee = data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			getAddressList() {
				this.$http('user/addr/list', "GET", '', res => {
					let data = res.data
					if (data.success) {
						if (data.data.length > 0) {
							let result = data.data.findIndex(value => {
								return value.dft == true;
							})
							for (let item of data.data) {
								item.detailAddress =
									`${item.area.province} ${item.area.city?item.area.city:''} ${item.area.district?item.area.district:''} ${item.plotName} ${item.address}`
							}
							if (uni.getStorageSync('address')) {
								let address = uni.getStorageSync('address')
								for (let item of data.data) {
									if (address.id == item.id) {
										uni.setStorage({
											key: 'address',
											data: item
										})
									}
								}
							} else {
								if (result == -1) {
									uni.setStorage({
										key: 'address',
										data: data.data[0],
									})
								} else {
									uni.setStorage({
										key: 'address',
										data: data.data[result],
									})
								}
							}
						} else {
							uni.removeStorage({
								key: 'address'
							})
						}
						this.address = uni.getStorageSync('address')
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.header_icon {
		width: 200upx;
		height: 44px;
	}

	.header_icon image {
		width: 44upx;
		height: 44upx;
		vertical-align: middle;
	}

	.content {
		width: 100%;
		height: 100%;

		.cont_top {
			width: 100%;
			height: 618upx;
			box-sizing: border-box;
			text-align: center;
			padding-top: 200upx;
		}

		.cont_cont {
			margin-top: -60upx;
			background: rgba(252, 252, 252, 1);
			border-radius: 20upx 20upx 0 0;
			padding: 0 30upx 160upx;

			.cont_title {
				width: 100%;
				line-height: 125upx;
				border-bottom: 1upx solid rgba(242, 242, 242, .58);

				text {
					font-size: 32upx;
					font-weight: 600;
					color: rgba(40, 40, 40, 1);
					border-bottom: 10upx solid rgba(148, 220, 217, 1);
				}
			}

			.cont_list {
				text {
					font-size: 28upx;
					font-weight: 400;
					color: rgba(74, 74, 74, 1);
					line-height: 46upx;
				}

				.list_middle {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.list_right {
					align-items: center;

					image {
						width: 50upx;
						height: 50upx;
					}

					text {
						font-size: 20upx;
						font-weight: 400;
						color: rgba(178, 178, 178, 1);
						line-height: 24upx;
					}
				}
			}
		}

		.bottom_button {
			position: fixed;
			bottom: 0upx;
			width: 100%;
			z-index: 20;
			text-align: center;

			image {
				width: 324upx;
				height: 127upx;
			}

			.bottom_alert {
				position: absolute;
				left: 73upx;
				bottom: 160upx;
				width: 270upx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 2upx 14upx 0px rgba(0, 0, 0, 0.1);
				// box-shadow: 0px 30upx 110upx 0px rgba(0, 0, 0, 0.3);

				.alert_list {
					font-size: 28upx;
					font-weight: 400;
					color: rgba(40, 40, 40, 1);
					border-bottom: 1upx solid rgba(242, 242, 242, .58);
					line-height: 100upx;
					text-align: left;
					padding-left: 30upx;
				}
			}

			.bottom_alert::after {
				content: "";
				position: absolute;
				bottom: -20upx;
				left: 30upx;
				border-top: 20upx solid white;
				border-left: 20upx solid transparent;
				border-right: 20upx solid transparent;
			}
		}
	}

	.popup_wrap {
		width: 100%;
		height: 660upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0 0;
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

	.choose_address {
		.address {
			.address_detail {
				.address_tag {
					display: inline-block;
					height: 30upx;
					line-height: 30upx;
					font-size: 22upx;
					font-weight: 400;
					color: rgba(189, 103, 108, 1);
					margin-right: 30upx;
					vertical-align: middle;
				}

				text {
					font-size: 32upx;
					font-weight: 500;
					color: rgba(40, 40, 40, 1);
					line-height: 52upx;
					text-align: justify;
					vertical-align: middle;
				}
			}
		}

		.top_name {
			font-size: 26upx;
			font-weight: 400;
			color: rgba(178, 178, 178, 1);
			line-height: 37upx;
			margin-top: 10upx;
		}
	}

	.top_text {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(40, 40, 40, 1);
		line-height: 64upx;
		text-align: justify;

		.top_text_border {
			box-sizing: border-box;
			border-bottom: 11upx solid #94DCD9;
		}
	}

	.input_remark {
		width: 500upx;
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
			background-color: #B2B2B2;
			border-radius: 3px;
			line-height: 80upx;
			font-size: 28upx;
			font-weight: 500;
			color: #FFFFFF;
			margin: 0;
		}

		.button_block_active {
			background: rgba(59, 193, 187, 1);
		}
	}
</style>
