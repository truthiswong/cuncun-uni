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
				<p>返送清单</p>
				<view class="order_list_image">
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
					<view class="flex_between order_list_fee" style="margin-top: 10upx;">
						<p>支付总费用</p>
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
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				headerShow: true,
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
