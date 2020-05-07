<template>
	<view class="page_bg">
		<uni-nav-bar color="#282828" title="我的订单" class="header" status-bar="true" fixed="true" v-if="headerShow"
		 backgroundColor="#FFFFFF">
			<view slot="right">
				<view class="header_icon" @click="onClickRight">
					<image src="../../static/tab1/add_green.png"></image>
				</view>
			</view>
		</uni-nav-bar>
		<uni-nav-bar color="#282828" title="我的订单" class="header" status-bar="true" fixed="true" v-if="!headerShow">
			<view slot="right">
				<view class="header_icon" @click="onClickRight">
					<image src="../../static/tab1/add_green.png"></image>
				</view>
			</view>
		</uni-nav-bar>
		<view class="content">
			<view v-if="0" class="no_data">
				<image src="../../static/tab1/no_data.png"></image>
				<p>欢迎使用存存，赶紧来存点东西吧～</p>
				<button class="common_button" @click="onClickRight">去存点东西</button>
			</view>
			<view>
				<view class="cont_nav" style="background-color: #FFFFFF;">
					<uni-segmented-control style="color:rgba(178,178,178,1)" class="segmented_custom" :current="current" :values="items"
					 @clickItem="onClickItem" styleType="text" activeColor="#03A6A6"></uni-segmented-control>
				</view>
				<scroll-view scroll-y="true">
					<view class="segmented_content">
						<view v-if="current === 0">
							<view v-for="(item,index) in 1" :key="index">
								<view class="segmented_list">
									<navigator :url="'/pages/tab2/orderDetails?id='+item.id">
										<uni-list class="list_custom list_custom_align_start">
											<uni-list-item title="存单" :note="item.address" :showArrow="false">
												<view slot='right' class="list_right_text">
													<text class="list_right_orange">待付款</text>
												</view>
											</uni-list-item>
										</uni-list>
										<view class="row segmented_list_content">
											<view class="col-6 row" v-for="goods in item.goods" :key="goods.id">
												<view class="col-8 list_content_left">
													<text>{{goods.name}}</text>
												</view>
												<view class="col-4 list_content_right">
													<text>× {{goods.amount}}</text>
												</view>
											</view>
										</view>
									</navigator>
									<view class="segmented_list_button">
										<button class="button_cancel" @click="onCancelOrder(item.id)">取消订单</button>
										<button class="button_confirm" @click="onConfirmOrder(item.id)">立即付款</button>
									</view>
								</view>
								<view class="segmented_list">
									<navigator :url="'/pages/tab2/orderDetails?id='+item.id">
										<uni-list class="list_custom list_custom_align_start">
											<uni-list-item title="取单" :note="'送到: '+item.address" :showArrow="false">
												<view slot='right' class="list_right_text">
													<text class="list_right_orange">待付款</text>
												</view>
											</uni-list-item>
										</uni-list>
										<view class="flex_between">
											<view style="height: 100upx;">
												<image v-for="item in 3" :key="item" style="width: 100upx;height: 100upx;background-color: #F2F2F2;box-sizing: border-box;padding: 8upx;margin-right: 20upx;"
												 src="../../static/tab1/book_img2.png" mode=""></image>
											</view>
											<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
												<text>… 等六件物品</text>
											</view>
										</view>
									</navigator>
									<view class="segmented_list_button">
										<button class="button_cancel" @click="onCancelOrder(item.id)">取消订单</button>
										<button class="button_confirm" @click="onConfirmOrder(item.id)">立即付款</button>
									</view>
								</view>
								<view class="segmented_list">
									<navigator :url="'/pages/tab2/orderDetails?id='+item.id">
										<uni-list class="list_custom list_custom_align_start">
											<uni-list-item title="仓储订单" :note="item.address" :showArrow="false">
												<view slot='right' class="list_right_text">
													<text class="list_right_orange">待付款</text>
												</view>
											</uni-list-item>
										</uni-list>
										<view class="row" style="margin-bottom: 20upx;">
											<view class="col-6 row">
												<view style="height: 100upx;">
													<image style="width: 120upx;height: 120upx;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab2/storge_box.png"
													 mode=""></image>
												</view>
												<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
													<text>A箱 ×3</text>
												</view>
											</view>
											<view class="col-6 row">
												<view style="height: 100upx;">
													<image style="width: 120upx;height: 120upx;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab2/storge_box.png"
													 mode=""></image>
												</view>
												<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
													<text>B箱 ×3</text>
												</view>
											</view>
										</view>
										<view style="width: 100%;text-align: right;">
											<view style="font-size:24upx;color:rgba(74,74,74,1);line-height:46upx;">
												仓储费用：<text style="font-size: 30upx;margin-right: 30upx;">¥400</text> 费用周期：2月1日-2月29日
											</view>
										</view>
									</navigator>
									<view class="segmented_list_button">
										<button class="button_cancel" @click="onCancelOrder(item.id)">取消订单</button>
										<button class="button_confirm" @click="onConfirmOrder(item.id)">立即付款</button>
									</view>
								</view>
							</view>
						</view>
						<view v-if="current === 1">
							<view v-for="(item,index) in orderList1" :key="index">
								<view class="segmented_list">
									<view @click="onOrder1Detail(item)">
										<uni-list class="list_custom list_custom_align_start">
											<uni-list-item title="存单" :note="'上门地址：'+item.address" :showArrow="false">
												<view slot='right' class="list_right_text">
													<text class="list_right_orange" v-if="item.status.code == 'waitpay'">待付款</text>
													<text class="list_right_blue" v-if="item.status.code == 'init'">待接单</text>
													<text class="list_right_blue" v-if="item.status.code == 'fetch'">待取货</text>
													<text class="list_right_blue" v-if="item.status.code == 'delivery'">回库中</text>
													<text class="list_right_blue" v-if="item.status.code == 'inputwork'">入库作业中</text>
													<text class="list_right_gray" v-if="item.status.code == 'finish'">已完成</text>
													<text class="list_right_gray" v-if="item.status.code == 'cancel'">已取消</text>
												</view>
											</uni-list-item>
										</uni-list>
										<view class="row segmented_list_content">
											<view class="col-6 row" v-for="goods in item.goods" :key="goods.id">
												<view class="col-8 list_content_left">
													<text>{{goods.name}}</text>
												</view>
												<view class="col-4 list_content_right">
													<text>× {{goods.amount}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="segmented_list_button" v-if="item.prepaidStatus.code == 'wait' || item.status.code == 'waitpay'">
										<button class="button_cancel" v-if="item.status.code == 'waitpay'" @click="onCancelOrder1(item.id)">取消订单</button>
										<button class="button_confirm" v-if="item.status.code != 'cancel' && item.status.code != 'refuse' && item.status.code != 'finish'" @click="onConfirmOrder1(item.id)">立即付款</button>
									</view>
								</view>
							</view>
						</view>
						<view v-if="current === 2">
							<view v-for="(item,index) in orderList2" :key="index">
								<view class="segmented_list">
									<view @click="onOrder2Detail(item)">
										<uni-list class="list_custom list_custom_align_start">
											<uni-list-item title="取单" :note="'送到: '+item.address" :showArrow="false">
												<view slot='right' class="list_right_text">
													<text class="list_right_orange" v-if="item.status.code == 'waitpay'">待付款</text>
													<text class="list_right_blue" v-if="item.status.code == 'init'">待处理</text>
													<text class="list_right_blue" v-if="item.status.code == 'waitsend'">待发货</text>
													<text class="list_right_blue" v-if="item.status.code == 'waitsign'">待签收</text>
													<text class="list_right_gray" v-if="item.status.code == 'finish'">已完成</text>
													<text class="list_right_gray" v-if="item.status.code == 'cancel'">已取消</text>
												</view>
											</uni-list-item>
										</uni-list>
										<view class="flex_between">
											<view style="height: 100upx;">
												<image v-for="goods in 3" :key="goods" style="width: 100upx;height: 100upx;background-color: #F2F2F2;box-sizing: border-box;padding: 8upx;margin-right: 20upx;"
												 src="../../static/tab1/book_img2.png" mode=""></image>
											</view>
											<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
												<text>… 等六件物品</text>
											</view>
										</view>
									</view>
									<view class="segmented_list_button" v-if="item.status.code == 'waitpay'">
										<button class="button_cancel" v-if="item.status.code == 'waitpay'" @click="onCancelOrder2(item.id)">取消订单</button>
										<button class="button_confirm" v-if="item.status.code != 'cancel' && item.status.code != 'refuse' && item.status.code != 'finish'" @click="onConfirmOrder2(item.id)">立即付款</button>
									</view>
								</view>
							</view>
						</view>
						<view v-if="current === 3">
							<view v-for="(item,index) in orderList1" :key="index">
								<view class="segmented_list">
									<view @click="onOrder3Detail(item)">
										<uni-list class="list_custom list_custom_align_start">
											<uni-list-item title="仓储订单" :showArrow="false">
												<view slot='right' class="list_right_text">
													<text class="list_right_orange" v-if="item.status.code == 'waitpay'">待付款</text>
													<text class="list_right_blue" v-if="item.status.code == 'init'">待接单</text>
													<text class="list_right_blue" v-if="item.status.code == 'fetch'">待取货</text>
													<text class="list_right_blue" v-if="item.status.code == 'delivery'">回库中</text>
													<text class="list_right_blue" v-if="item.status.code == 'inputwork'">入库作业中</text>
													<text class="list_right_gray" v-if="item.status.code == 'finish'">已完成</text>
													<text class="list_right_gray" v-if="item.status.code == 'cancel'">已取消</text>
												</view>
											</uni-list-item>
										</uni-list>
										<view class="row" style="margin-bottom: 20upx;">
											<view class="col-6 row" v-for="box in 5" :key="box">
												<view style="height: 100upx;">
													<image style="width: 120upx;height: 120upx;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab2/storge_box.png"
													 mode=""></image>
												</view>
												<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
													<text>A箱 ×3</text>
												</view>
											</view>
										</view>
										<view style="width: 100%;text-align: right;">
											<view style="font-size:24upx;color:rgba(74,74,74,1);line-height:46upx;">
												仓储费用：<text style="font-size: 30upx;margin-right: 30upx;">¥400</text> 费用周期：2月1日-2月29日
											</view>
										</view>
									</view>
									<view class="segmented_list_button" v-if="item.prepaidStatus.code == 'wait' || item.status.code == 'waitpay'">
										<button class="button_cancel" v-if="item.status.code == 'waitpay'" @click="onCancelOrder3(item.id)">取消订单</button>
										<button class="button_confirm" v-if="item.status.code != 'cancel' && item.status.code != 'refuse' && item.status.code != 'finish'" @click="onConfirmOrder3(item.id)">立即付款</button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="text-align: center;font-size:24upx;font-weight:400;color:rgba(178,178,178,1);margin: 40upx 0 20upx;line-height:33upx;">
						这是我的底线，没有更多的咯～
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headerShow: true,
				items: ['未支付', '存单', '取单', '仓储订单'],
				current: 0,
				orderList0: [], //未支付单列表
				orderList1: [], //存单列表
				orderList2: [], //取单列表
				orderList3: [], //仓储订单列表
				pageIndex: 3
			}
		},
		components: {},
		onLoad(op) {
			if (op.gotoPage) {
				this.gotoPage = op.gotoPage
			}
		},
		onShow() {
			console.log(this.current)
			console.log(this.gotoPage)
			if (this.gotoPage == 'tab20') {
				this.current = 0
			} else if (this.gotoPage == 'tab21') {
				this.current = 1
			} else if (this.gotoPage == 'tab22') {
				this.current = 2
			} else if (this.gotoPage == 'tab23') {
				this.current = 3
			}
			if (this.current == 0) {

			} else if (this.current == 1) {
				this.getOrderList1()
			} else if (this.current == 2) {
				this.getOrderList2()
			} else if (this.current == 3) {
				this.getOrderList3()
			}
		},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		onPullDownRefresh() {
			console.log(this.pageIndex++)
		},
		methods: {
			onClickRight() {
				uni.navigateTo({
					url: "/pages/tab2/addOrder"
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					if (this.current == 0) {

					} else if (this.current == 1) {
						this.getOrderList1()
					} else if (this.current == 2) {
						this.getOrderList2()
					} else if (this.current == 3) {
						this.getOrderList3()
					}
				}
			},
			// 获取存单列表
			getOrderList1() {
				this.$http('user/deposit/order/page', "GET", '', res => {
					let data = res.data
					if (data.success) {
						console.log(data.data)
						this.orderList1 = data.data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			// 获取取单列表
			getOrderList2() {
				this.$http('user/withdraw/order/page', "GET", '', res => {
					let data = res.data
					if (data.success) {
						console.log(data.data)
						this.orderList2 = data.data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			// 获取仓储订单
			getOrderList3() {
				this.$http('user/withdraw/order/page', "GET", '', res => {
					let data = res.data
					if (data.success) {
						console.log(data.data)
						this.orderList3 = data.data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			// 去存单详情
			onOrder1Detail(item) {
				uni.navigateTo({
					url: '/pages/tab2/orderDetails?id=' + item.id
				})
			},
			// 去取单详情
			onOrder2Detail(item) {
				uni.navigateTo({
					url: '/pages/tab1/orderBackDetails?id=' + item.id
				})
			},
			// 去仓储订单详情
			onOrder3Detail(item) {
				uni.navigateTo({
					url: '/pages/tab2/orderStorageDetails?id=' + item.id
				})
				return
				if (item.status.code == 'init') {
					uni.navigateTo({
						url: '/pages/tab2/orderStorageDetails?id=' + item.id
					})
				} else if (item.status.code == 'finish') {
					uni.navigateTo({
						url: '/pages/tab2/orderStorageDetails?id=' + item.id
					})
				} else if (item.status.code == 'cancel') {
					uni.navigateTo({
						url: '/pages/tab2/orderStorageDetails?id=' + item.id
					})
				}
			},
			// 存单取消
			onCancelOrder1(id) {
				let data = {
					id: id
				}
				this.$http('user/deposit/order/cancel', "POST", data, res => {
					let data = res.data
					if (data.success) {
						uni.showToast({
							icon: 'none',
							title: '取消成功'
						});
						this.getOrderList1()
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			// 存单支付
			onConfirmOrder1(id) {
				uni.navigateTo({
					url: '/pages/tab2/orderDetails?id=' + id
				})
			},
			// 取单取消
			onCancelOrder2(id) {
				let data = {
					id: id
				}
				this.$http('user/deposit/order/cancel', "POST", data, res => {
					let data = res.data
					if (data.success) {
						uni.showToast({
							icon: 'none',
							title: '取消成功'
						});
						this.getOrderList1()
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			// 取单支付
			onConfirmOrder2(id) {
				uni.navigateTo({
					url: '/pages/tab1/orderBackDetails?id=' + id
				})
			},
			// 仓储取消
			onCancelOrder3(id) {
				let data = {
					id: id
				}
				this.$http('user/deposit/order/cancel', "POST", data, res => {
					let data = res.data
					if (data.success) {
						uni.showToast({
							icon: 'none',
							title: '取消成功'
						});
						this.getOrderList1()
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			// 仓储支付
			onConfirmOrder3(id) {
				uni.navigateTo({
					url: '/pages/tab2/orderStorageDetails?id=' + id
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F2F2F2;
	}

	uni-page-body {
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.page_bg {
		height: 100%;
	}

	.content {
		box-sizing: border-box;
		height: 100%;
		padding-bottom: 20upx;
		// padding: 88upx 0 20upx;
		position: relative;
	}

	.header_icon {
		width: 200upx;
		height: 88upx;

		image {
			width: 44upx;
			height: 44upx;
			vertical-align: middle;
		}
	}

	.cont_nav {
		width: 100%;
		position: fixed;
		z-index: 3;
	}

	.segmented_content {
		padding: 88upx 20upx 0;
		// padding: 0 20upx;

		.segmented_list {
			background-color: #FFFFFF;
			padding: 0 20upx 20upx;
			margin-top: 20upx;

			.list_right_text {
				font-size: 28upx;
				font-weight: 500;
				line-height: 28upx;
			}

			.list_right_red {
				color: #E74243;
			}

			.list_right_orange {
				color: rgba(245, 166, 35, 1);
			}

			.list_right_black {
				font-size: 28upx;
				font-weight: 500;
				color: rgba(40, 40, 40, 1);
				line-height: 46upx;
			}

			.list_right_gray {
				font-size: 28upx;
				font-weight: 500;
				color: rgba(178, 178, 178, 1);
				line-height: 46upx;
			}

			.list_right_blue {
				font-size: 28upx;
				font-weight: 500;
				color: #0269D0;
				line-height: 46upx;
			}

			.segmented_list_content {
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

			.segmented_list_button {
				text-align: right;

				button {
					display: inline-block;
					width: 191upx;
					height: 76upx;
					border-radius: 10upx;
					font-size: 28upx;
					font-weight: 400;
					line-height: 76upx;
					margin-top: 20upx;
				}

				.button_cancel {
					color: rgba(40, 40, 40, 1);
					background-color: #FFFFFF;
				}

				.button_confirm {
					margin-left: 30upx;
					color: #FFFFFF;
					background: rgba(59, 193, 187, 1);
				}
			}

		}
	}

	.no_data {
		text-align: center;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		padding: 272upx 0 116upx;

		image {
			width: 338upx;
			height: 326upx;
		}

		p {
			font-size: 28upx;
			font-weight: 400;
			color: rgba(178, 178, 178, 1);
			line-height: 50upx;
			margin: 70upx auto 0;
		}

		.common_button {
			width: 398upx;
			height: 90upx;
			line-height: 90upx;
			background: rgba(59, 193, 187, 1);
			border-radius: 45upx;
			font-size: 30upx;
			font-weight: 500;
			color: white;
			margin: 120upx auto 0;
		}
	}
</style>
