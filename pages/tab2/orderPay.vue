<template>
	<view>
		<uni-nav-bar color="#000000" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="headerShow" backgroundColor="rgba(0,0,0,0)">
		</uni-nav-bar>
		<uni-nav-bar color="#000000" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="!headerShow" shadow="true">
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top">
				<image src="../../static/tab2/people.png"></image>
			</view>
			<view class="top_text">
				<text>我们经验丰富的收纳咨询师和训练有素的打包小哥正在准备，会按照跟您<text class="top_text_border">约定的时间到达</text>，请注意您的<text class="top_text_border">手机保持通知畅通</text>～</text>
			</view>
			<view style="margin-top: 60upx;">
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
					<uni-list-item title="上门时间">
						<view slot="right">
							<!-- <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view style="font-size:28upx; color:rgba(3,166,166,1);">{{date}}</view>
							</picker> -->

							<view @click="onDateChange" style="font-size:28upx; color:rgba(3,166,166,1);">{{date}}</view>
						</view>
					</uni-list-item>
					<uni-list-item title="备注">
						<view slot="right">
							<input class="input_remark" v-model="userRemark" type="text" placeholder="对我们的服务人员有什么特别的吩咐吗" style="font-size:28upx;padding-left: 20upx;color: #282828;"
							 placeholder-style="font-size:14px; font-weight:400; color:rgba(178,178,178,1); line-height:40upx;" />
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="pay_info">
				<view class="flex_between pay_fee">
					<text>支付定金</text>
					<text>¥ {{pay_fee}}</text>
				</view>
				<view class="flex_between pay_info_list">
					<text>运输费</text>
					<text>¥ 0</text>
				</view>
				<view class="flex_between pay_info_list">
					<text>打包费</text>
					<text>¥ 0</text>
				</view>
				<view class="flex_between pay_info_list">
					<text>箱子费</text>
					<text>¥ 0</text>
				</view>
				<view style="font-size:26upx;font-weight:400;color:rgba(40,40,40,1);text-align: justify;line-height:42upx;margin: 60upx 0 20upx;">
					定金是根据您所需的箱子来暂定收费，实际费用以当天收到的物品为准进行多退少补，请放心。
					<br />存存承诺服务不出现任何隐形费用，服务人员也绝对不会出现追加费用现象，如有发现，欢迎告知。
				</view>
			</view>
		</view>
		<uni-popup ref="popupDate" type="bottom" @touchmove.stop.prevent @touchend.stop>
			<view class="popup_wrap">
				<view class="popup_title">
					<text>上门取件时间</text>
					<image class="close_btn" @click="closePopupDate" src="../../static/tab2/close.png" mode=""></image>
				</view>
				<view>
					<picker-view style="height: 480upx;" :indicator-style="indicatorStyle" :value="dateValue" @change="changeDate">
						<picker-view-column>
							<view class="date_item" v-for="(item,index) in dates" :key="index">{{item.value}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="date_item" v-for="(item,index) in hours" :key="index">{{item.value}}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</uni-popup>
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
			<text>¥ {{pay_fee}}</text>
			<button @click="onPayChange" class="button_block" :class="{button_block_active: buttonActive}">确认支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				indicatorStyle: `height: 90upx;`,
				headerShow: true,
				address: {},
				dates: [{
					id: 0,
					value: '07-27（周六）',
					checked: 'false'
				}],
				hours: [{
					id: 0,
					value: '09:00～10:00',
					valueStart: '09',
					valueEnd: '10'
				}],
				dateDate: '',
				dateValue: [0, 0],
				dateValue1: 0,
				dateValue2: 0,
				hourValue1: '09',
				hourValue2: '10',
				userRemark: '', //备注
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
				buttonActive: false,
				time: '12:01',
				date: '请选择送达时间',
				pay_fee: 0, // 支付费用
				boxNum: 0, // 箱子数量
			}
		},
		onLoad(op) {
			this.boxNum = op.boxNum
		},
		onShow(e) {
			this.getDateList()
			this.getHoursList()
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
				if (this.address.id && this.dateDate) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			dateDate() {
				if (this.address.id && this.dateDate) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			}
		},
		computed: {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onChooseAddress() {
				uni.navigateTo({
					url: '../tab3/address?chooseAddress=true'
				})
			},
			onDateChange() {
				this.$refs.popupDate.open()
				this.dateValue = [this.dateValue1, this.dateValue2]
				this.date = this.dates[this.dateValue1].value + " " + this.hours[this.dateValue2].value
				this.dateDate = this.dates[this.dateValue1].date
				this.hourValue1 = this.hours[this.dateValue2].valueStart
				this.hourValue2 = this.hours[this.dateValue2].valueEnd
			},
			closePopupDate() {
				this.$refs.popupDate.close()
			},
			changeDate(e) {
				const val = e.detail.value
				this.dateValue1 = val[0]
				this.dateValue2 = val[1]
				this.dateDate = this.dates[this.dateValue1].date
				this.hourValue1 = this.hours[val[1]].valueStart
				this.hourValue2 = this.hours[val[1]].valueEnd
				this.date = this.dates[val[0]].value + " " + this.hours[val[1]].value
				this.getFee()
			},
			getFee() {
				if (!this.address.id) {
					uni.showToast({
						icon: 'none',
						title: '请先选择地址'
					});
				} else {
					let data = {
						addressId: this.address.id,
						h1: this.hourValue1,
						h2: this.hourValue2,
						boxNum: this.boxNum,
					}
					this.$http('user/deposit/param/freight', "POST", data, res => {
						let data = res.data
						if (data.success) {
							console.log(data)
							this.pay_fee = data.data
						} else {
							uni.showToast({
								icon: 'none',
								title: data.message
							});
						}
					})
				}
			},
			debounce(fn, time) {
				let Mytime = null;
				return () => {
					clearTimeout(Mytime); // 清除定时器
					Mytime = setTimeout(() => {
						fn.apply(this, arguments)
					}, time)
				}
			},
			onPayChange() {
				if (!this.address.id) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
				} else if (!this.dateDate) {
					uni.showToast({
						title: '上门时间',
						icon: 'none'
					})
				} else {
					this.$refs.popup.open()
				}
			},
			closePopup() {
				this.$refs.popup.close()
			},
			getDateList() {
				this.$http('user/deposit/param/bookdate', "GET", '', res => {
					let data = res.data
					if (data.success) {
						for (let item of data.data) {
							item.value = `${Object.keys(item)[0]} (${Object.values(item)[0]})`
							item.date = Object.keys(item)[0]
						}
						this.dates = data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			getHoursList() {
				this.$http('user/deposit/param/booktime', "GET", '', res => {
					let data = res.data
					if (data.success) {
						for (let item of data.data) {
							item.value = `${item[0]}:00 ~ ${item[1]}:00`
							item.valueStart = item[0]
							item.valueEnd = item[1]
						}
						this.hours = data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			onPayChangeStyle(evt) {
				console.log(evt.target.value)
				this.payStyle = evt.target.value
			},
			onComfirmPay() {
				let data = {
					addressId: this.address.id,
					bookFetchDate: this.dateDate,
					bookFetchTime1: this.hourValue1,
					bookFetchTime2: this.hourValue2,
					prepaid: this.pay_fee,
					userRemark: this.userRemark
				}
				this.$http('user/deposit/order/create', "POST", data, res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						let dataObj = {
							orderId: data.data.id
						}
						let payFail = false
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
											payFail = true
											this.$http('user/deposit/order/prepay/fail', "POST", dataObj, res2 => {
												if (res2.data.success) {
													console.log(res2.data)
													console.log("fail")
													uni.navigateTo({
														url: `/pages/tab2/orderDetails?id=${dataObj.orderId}&gotoPage=tab21`
													})
												} else {
													uni.showToast({
														icon: 'none',
														title: res2.data.message
													});
												}
											})
										},
										complete: (e) => {
											console.log('走到了最后')
											if (payFail == false) {
												if (e.errMsg == 'requestPayment:fail') {
													console.log('走到了最后请求')
													this.$http('user/deposit/order/prepay/fail', "POST", dataObj, res2 => {
														if (res2.data.success) {
															console.log(res2.data)
															uni.navigateTo({
																url: `/pages/tab2/orderDetails?id=${dataObj.orderId}&gotoPage=tab21`
															})
														} else {
															uni.showToast({
																icon: 'none',
																title: res2.data.message
															});
														}
													})
												}
											}
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 60upx 130upx;
	}

	.cont_top {
		text-align: center;

		image {
			width: 394upx;
			height: 260upx;
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

	.pay_fee {
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
		width: 100%;
		height: 90upx;
		line-height: 90upx;
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
