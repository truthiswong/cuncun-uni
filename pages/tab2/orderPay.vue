<template>
	<view>
		<uni-nav-bar color="#000000" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
		</uni-nav-bar>
		<uni-nav-bar color="#000000" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="!headerShow" shadow="true" style="position: absolute; top: 0;">
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top">
				<image src="../../static/tab2/save_top.png"></image>
			</view>
			<view class="top_text">
				<text>我们经验丰富的收纳咨询师和训练有素的打包小哥正在准备，会按照跟您<text class="top_text_border">约定的时间到达</text>，请注意您的<text class="top_text_border">手机保持通知畅通</text>～</text>
			</view>
			<view style="margin-top: 60upx;">
				<uni-list class="list_custom list_custom_padding40">
					<uni-list-item title="请添加您的地址"></uni-list-item>
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
							<input class="input_remark" type="text" placeholder="给快递员叔叔有什么特别的吩咐吗" style="font-size:28upx;padding-left: 20upx;color: #282828;"
							 placeholder-style="font-size:14px; font-weight:400; color:rgba(178,178,178,1); line-height:40upx;" />
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="pay_info">
				<view class="flex_between total_fee">
					<text>支付定金</text>
					<text>¥ 70</text>
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
				<view class="flex_between pay_info_list">
					<text>调整费</text>
					<text>¥ 0</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popupDate" type="bottom" @touchmove.stop.prevent @touchend.stop>
			<view class="popup_wrap">
				<view class="popup_title">
					<text>选择送达时间</text>
					<image class="close_btn" @click="closePopupDate" src="../../static/tab2/close.png" mode=""></image>
				</view>
				<view>
					<picker-view style="height: 570upx;" :value="dateValue" @change="changeDate">
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
			<text>¥ 820.0</text>
			<button @click="onPayChange" class="button_block" :class="{button_block_active: buttonActive}">确认支付</button>
		</view>
	</view>
</template>

<script>
	import api from '../../utils/api.js'
	import util from '../../utils/util.js'
	import config from '../../config.js'
	export default {
		components: {},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				headerShow: true,
				dates: [{
						id: 0,
						value: '07-27（周六）',
						checked: 'false',
					},
					{
						id: 1,
						value: '07-28（周日）',
						checked: 'false',
					},
					{
						id: 2,
						value: '07-29（周一）',
						checked: 'false',
					},
					{
						id: 3,
						value: '07-30（约满）',
						checked: 'false',
					},
					{
						id: 4,
						value: '07-31（周三）',
						checked: 'false',
					},
					{
						id: 5,
						value: '08-01（周四）',
						checked: 'false',
					},
					{
						id: 6,
						value: '08-02（周五）',
						checked: 'false',
					},
					{
						id: 7,
						value: '08-03（周六）',
						checked: 'false',
					},
					{
						id: 8,
						value: '08-04（周日）',
						checked: 'false',
					},
					{
						id: 9,
						value: '08-05（周一）',
						checked: 'false',
					},
					{
						id: 10,
						value: '08-06（周二）',
						checked: 'false',
					}
				],
				hours: [{
						id: 0,
						value: '09:00～10:00',
						checked: 'false',
					},
					{
						id: 1,
						value: '10:00～11:00',
						checked: 'false',
					},
					{
						id: 2,
						value: '11:00～12:00',
						checked: 'false',
					},
					{
						id: 3,
						value: '12:00～13:00',
						checked: 'false',
					},
					{
						id: 4,
						value: '13:00～14:00',
						checked: 'false',
					},
					{
						id: 5,
						value: '14:00～15:00',
						checked: 'false',
					},
					{
						id: 6,
						value: '15:00～16:00',
						checked: 'false',
					},
					{
						id: 7,
						value: '16:00～17:00',
						checked: 'false',
					},
					{
						id: 8,
						value: '17:00～18:00',
						checked: 'false',
					},
					{
						id: 9,
						value: '18:00～19:00',
						checked: 'false',
					},
					{
						id: 10,
						value: '19:00～20:00',
						checked: 'false',
					}
				],
				dateValue: [3,3],
				dateValue1: 0,
				dateValue2: 0,
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
				time: '12:01',
				date: '请选择送达时间',
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
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			bindTimeChange(e) {
				this.time = e.target.value
			},
			bindDateChange(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			onDateChange() {
				this.$refs.popupDate.open()
			},
			closePopupDate() {
				this.$refs.popupDate.close()
				this.date = this.dates[this.dateValue1].value + " " + this.hours[this.dateValue2].value
			},
			changeDate(e) {
				const val = e.detail.value
				console.log(val[0])
				console.log(val[1])
				this.dateValue1 = val[0]
				this.dateValue2 = val[1]
				this.date = this.dates[val[0]].value + " " + this.hours[val[1]].value
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
				uni.navigateTo({
					url: "/pages/tab2/orderSuccess"
				})
				this.$refs.popup.close()
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
		font-size:26upx;
		font-weight:400;
		color:rgba(40,40,40,1);
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
