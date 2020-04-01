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
		<uni-nav-bar color="#282828" title="我的订单" class="header" status-bar="true" fixed="true" v-if="!headerShow" shadow="true">
			<view slot="right">
				<view class="header_icon" @click="onClickRight">
					<image src="../../static/tab1/add_green.png"></image>
				</view>
			</view>
		</uni-nav-bar>
		<view class="content">
			<view v-show="false" class="no_data">
				<image src="../../static/tab1/no_data.png"></image>
				<p>欢迎使用存存，赶紧来存点东西吧～</p>
				<button class="common_button" @click="onClickRight">去存点东西</button>
			</view>
			<view class="">
				<view style="background-color: #FFFFFF;">
					<uni-segmented-control style="color:rgba(178,178,178,1)" class="segmented_custom" :current="current" :values="items"
					 @clickItem="onClickItem" styleType="text" activeColor="#03A6A6"></uni-segmented-control>
				</view>
				<view class="segmented_content">
					<view v-show="current === 0">
						<view v-for="(item,index) in 4" :key="index">
							<view class="segmented_list">
								<navigator url="/pages/tab2/orderDetailsPay">
									<uni-list class="list_custom list_custom_align_start">
										<uni-list-item title="存单" :note="'上门地址：学校寝室'" :showArrow="false">
											<view slot='right' class="list_right_orange">
												<text>待付款</text>
											</view>
										</uni-list-item>
									</uni-list>
									<view class="row segmented_list_content">
										<view class="col-6 row">
											<view class="col-8 list_content_left">
												<text>21寸电视</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>2人沙发</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>60L旅行箱</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 2</text>
											</view>
										</view>
										<view class="col-6 row">
											<view class="col-8 list_content_left">
												<text>21寸电视</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>2人沙发</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>60L旅行箱</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 2</text>
											</view>
										</view>
									</view>
								</navigator>
								<view class="segmented_list_button">
									<button class="button_cancel">取消订单</button>
									<button class="button_confirm">立即付款</button>
								</view>
							</view>
							<view class="segmented_list">
								<navigator url="/pages/tab2/orderDetailsCancel">
									<uni-list class="list_custom list_custom_align_start">
										<uni-list-item title="存单" :note="'上门地址：学校寝室'" :showArrow="false">
											<view slot='right' class="list_right_red">
												<text>已取消</text>
											</view>
										</uni-list-item>
									</uni-list>
									<view class="row segmented_list_content">
										<view class="col-6 row">
											<view class="col-8 list_content_left">
												<text>21寸电视</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>2人沙发</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>60L旅行箱</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 2</text>
											</view>
										</view>
										<view class="col-6 row">
											<view class="col-8 list_content_left">
												<text>21寸电视</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>2人沙发</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 1</text>
											</view>
											<view class="col-8 list_content_left">
												<text>60L旅行箱</text>
											</view>
											<view class="col-4 list_content_right">
												<text>× 2</text>
											</view>
										</view>
									</view>
								</navigator>
							</view>
							<view class="segmented_list">
								<navigator url="/pages/tab2/orderDetailsSuccess">
									<uni-list class="list_custom list_custom_align_start">
										<uni-list-item title="取单" :note="'送到：父母家'" :showArrow="false">
											<view slot='right' class="list_right_black">
												<text>待分配骑手</text>
											</view>
										</uni-list-item>
									</uni-list>
									<view class="flex_between">
										<view style="height: 100upx;">
											<image v-for="item in 3" :key="item" style="width: 100upx;height: 100upx;background-color: #F2F2F2;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab1/book_img2.png" mode=""></image>
										</view>
										<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
											<text>…   等六件物品</text>
										</view>
									</view>
								</navigator>
							</view>
							<view class="segmented_list">
								<navigator url="/pages/tab2/orderDetailsStorageSuccess">
									<uni-list class="list_custom list_custom_align_start">
										<uni-list-item title="仓储订单" :showArrow="false">
											<view slot='right' class="list_right_gray">
												<text>已支付</text>
											</view>
										</uni-list-item>
									</uni-list>
									<view class="row" style="margin-bottom: 20upx;">
										<view class="col-6 row">
											<view style="height: 100upx;">
												<image style="width: 120upx;height: 120upx;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab2/storge_box.png" mode=""></image>
											</view>
											<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
												<text>A箱 ×3</text>
											</view>
										</view>
										<view class="col-6 row">
											<view style="height: 100upx;">
												<image style="width: 120upx;height: 120upx;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab2/storge_box.png" mode=""></image>
											</view>
											<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
												<text>B箱 ×3</text>
											</view>
										</view>
									</view>
									<view style="width: 100%;text-align: right;">
										<view style="font-size:24upx;color:rgba(74,74,74,1);line-height:46upx;">
											仓储费用：<text style="font-size: 30upx;margin-right: 30upx;">¥400</text>    费用周期：2月1日-2月29日
										</view>
									</view>
								</navigator>
							</view>
						</view>
					</view>
					<view v-show="current === 1">
						<view class="segmented_list" v-for="item in 8" :key="item">
							<uni-list class="list_custom list_custom_align_start">
								<uni-list-item title="存单" :note="'上门地址：学校寝室'" :showArrow="false">
									<view slot='right' class="list_right_orange">
										<text>待付款</text>
									</view>
								</uni-list-item>
							</uni-list>
							<view class="row segmented_list_content">
								<view class="col-6 row">
									<view class="col-8 list_content_left">
										<text>21寸电视</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>2人沙发</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>60L旅行箱</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 2</text>
									</view>
								</view>
								<view class="col-6 row">
									<view class="col-8 list_content_left">
										<text>21寸电视</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>2人沙发</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>60L旅行箱</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 2</text>
									</view>
								</view>
							</view>
							<view class="segmented_list_button">
								<button class="button_cancel">取消订单</button>
								<button class="button_confirm">立即付款</button>
							</view>
						</view>
					</view>
					<view v-show="current === 2">
						<view class="segmented_list" v-for="item in 8" :key="item">
							<uni-list class="list_custom list_custom_align_start">
								<uni-list-item title="存单" :note="'上门地址：学校寝室'" :showArrow="false">
									<view slot='right' class="list_right_gray">
										<text>已完成</text>
									</view>
								</uni-list-item>
							</uni-list>
							<view class="row segmented_list_content">
								<view class="col-6 row">
									<view class="col-8 list_content_left">
										<text>21寸电视</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>2人沙发</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>60L旅行箱</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 2</text>
									</view>
								</view>
								<view class="col-6 row">
									<view class="col-8 list_content_left">
										<text>21寸电视</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>2人沙发</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 1</text>
									</view>
									<view class="col-8 list_content_left">
										<text>60L旅行箱</text>
									</view>
									<view class="col-4 list_content_right">
										<text>× 2</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-show="current === 3">
						<view class="segmented_list" v-for="item in 8" :key='item'>
							<uni-list class="list_custom list_custom_align_start">
								<uni-list-item title="取单" :note="'送到：父母家'" :showArrow="false">
									<view slot='right' class="list_right_black">
										<text>待分配骑手</text>
									</view>
								</uni-list-item>
							</uni-list>
							<view class="flex_between">
								<view style="height: 100upx;">
									<image v-for="item in 3" :key="item" style="width: 100upx;height: 100upx;background-color: #F2F2F2;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab1/book_img2.png" mode=""></image>
								</view>
								<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
									<text>…   等六件物品</text>
								</view>
							</view>
						</view>
					</view>
					<view v-show="current === 4">
						<view class="segmented_list" v-for="item in 8" :key='item'>
							<uni-list class="list_custom list_custom_align_start">
								<uni-list-item title="仓储订单" :showArrow="false">
									<view slot='right' class="list_right_gray">
										<text>已支付</text>
									</view>
								</uni-list-item>
							</uni-list>
							<view class="row" style="margin-bottom: 20upx;">
								<view class="col-6 row">
									<view style="height: 100upx;">
										<image style="width: 120upx;height: 120upx;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab2/storge_box.png" mode=""></image>
									</view>
									<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
										<text>A箱 ×3</text>
									</view>
								</view>
								<view class="col-6 row">
									<view style="height: 100upx;">
										<image style="width: 120upx;height: 120upx;box-sizing: border-box;padding: 8upx;margin-right: 20upx;" src="../../static/tab2/storge_box.png" mode=""></image>
									</view>
									<view style="font-size:28upx;color:rgba(74,74,74,1);line-height:46upx;">
										<text>B箱 ×3</text>
									</view>
								</view>
							</view>
							<view style="width: 100%;text-align: right;">
								<view style="font-size:24upx;color:rgba(74,74,74,1);line-height:46upx;">
									仓储费用：<text style="font-size: 30upx;margin-right: 30upx;">¥400</text>    费用周期：2月1日-2月29日
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="text-align: center;font-size:24upx;font-weight:400;color:rgba(178,178,178,1);margin: 40upx 0 20upx;line-height:33upx;">
					这是我的底线，没有更多的咯～
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../config.js'
	import util from '../../utils/util.js'
	import api from '../../utils/api.js'

	export default {
		data() {
			return {
				headerShow: true,
				items: ['全部订单', '未支付', '存单', '取单', '仓储订单'],
				current: 0,
				pageIndex: 3
			}
		},
		components: {},
		onLoad: () => {
			
		},
		onShow: function() {
			console.log(this.pageIndex)
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
		onReachBottom: function() {},
		methods: {
			onClickRight() {
				uni.navigateTo({
					url: "/pages/tab2/addOrder"
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
		}
	}
</script>
<style>
	page {
		background-color: #F2F2F2;
	}
</style>
<style lang="scss" scoped>
	.content {
		padding-bottom: 20upx;
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

	.segmented_content {
		padding: 0 20upx;

		.segmented_list {
			background-color: #FFFFFF;
			padding: 0 20upx 20upx;
			margin-top: 20upx;
			.list_right_red {
				font-size: 28upx;
				font-weight: 500;
				color: #E74243;
				line-height: 28upx;
			}
			.list_right_orange {
				font-size: 28upx;
				font-weight: 500;
				color: rgba(245, 166, 35, 1);
				line-height: 28upx;
			}
			.list_right_black {
				font-size:28upx;
				font-weight:500;
				color:rgba(40,40,40,1);
				line-height:46upx;
			}
			.list_right_gray {
				font-size:28upx;
				font-weight:500;
				color:rgba(178,178,178,1);
				line-height:46upx;
			}

			.segmented_list_content {
				height: 240upx;
				padding: 0 20upx;
				background: rgba(249, 249, 249, 1);

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

			.segmented_list_button {
				text-align: right;
				margin-top: 20upx;
				height: 76upx;

				button {
					display: inline-block;
					width: 191upx;
					height: 76upx;
					border-radius: 10upx;
					font-size: 28upx;
					font-weight: 400;
					line-height: 76upx;
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
