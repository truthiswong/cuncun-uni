<template>
	<view>
		<uni-nav-bar color="#FFFFFF" title="返送专线" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;"></uni-nav-bar>
		<uni-nav-bar color="#000000" title="返送专线" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="!headerShow" style="position: absolute; top: 0;" shadow="true"></uni-nav-bar>
		</hx-navbar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top" @click="isAddShow=false" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}"></view>
			<view class="cont_cont" @click="isAddShow=false" style="border-radius:20upx 20upx 0 0;">
				<view class="cont_title">
					<text>请核实本次返送清单：</text>
				</view>
				<view class="cont_list" v-for="(item,index) in list" :key='index'>
					<view class="row flex_between" style="margin-top: 40upx;">
						<view class="col-2"><text>（ {{index+1}} ）</text></view>
						<view class="col-2">
							<image style="width: 120upx;height: 120upx;" :src="item.src"></image>
						</view>
						<view class="col-5 list_middle">
							<text>书籍名字1书籍名字书籍名字书籍名字</text>
						</view>
						<view class="col-2 flex_between list_right">
							<image src="../../static/tab1/minus.png"></image>
							<text>这次不<br />用送回</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom_button">
				<image @click="onAgainAdd" src="../../static/tab1/again_add.png" mode=""></image>
				<image @click="onConfirm" src="../../static/tab1/order_back.png" mode=""></image>
				<view class="bottom_alert" v-if="isAddShow">
					<scroll-view scroll-y="true">
						<navigator url="/pages/tab1/book">
							<view class="alert_list">
								<text>我的书架 (10)</text>
							</view>
						</navigator>
						<navigator url="/pages/tab1/clothes">
							<view class="alert_list">
								<text>我的衣柜 (10)</text>
							</view>
						</navigator>
						<navigator url="/pages/tab1/shoes">
							<view class="alert_list">
								<text>我的鞋柜 (10)</text>
							</view>
						</navigator>
						<navigator url="/pages/tab1/storage">
							<view class="alert_list">
								<text>我的储藏室 (10)</text>
							</view>
						</navigator>
						<navigator url="/pages/tab1/groceries">
							<view class="alert_list" style="border-bottom: 0;">
								<text>我的杂物架 (10)</text>
							</view>
						</navigator>
					</scroll-view>
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
				list: [{
						id: '0000',
						src: '../../static/tab1/book_img1.png',
						checked: false,
					},
					{
						id: '111',
						src: '../../static/tab1/book_img1.png',
						checked: false,
					},
					{
						id: '2222',
						src: '../../static/tab1/book_img1.png',
						checked: false,
					},
					{
						id: '3333',
						src: '../../static/tab1/book_img1.png',
						checked: false,
					},
					{
						id: '444',
						src: '../../static/tab1/book_img1.png',
						checked: false,
					},
					{
						id: '555',
						src: '../../static/tab1/book_img1.png',
						checked: false,
					},
				],
				isAddShow: false,
				chooseButton: '选择',
				cont_top_bg: '../../static/tab1/order_back_bg1.png',
				scroll_bg1: '../../static/tab1/bookbox.png',
			}
		},
		onLoad() {

		},
		onShow() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onClickRight(index) {
				if (index == 1) {
					uni.navigateTo({
						url: "/pages/tab1/search"
					})
				} else if (index == '选择') {
					this.isCheckedShow = true
					this.chooseButton = '全选'
				} else if (index == '全选') {
					for (let item of this.list) {
						item.checked = true
					}
				}
			},
			onCheckboxChange(e) {
				for (let item of this.list) {
					if (e.detail.value.includes(item.id)) {
						item.checked = true
					} else {
						item.checked = false
					}
				}
				console.log(this.list)
			},
			onAgainAdd() {
				this.isAddShow = !this.isAddShow
			},
			onConfirm() {
				this.isAddShow = false
				uni.navigateTo({
					url: '/pages/tab1/orderBackPay'
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

	.choose_button {
		display: inline-block;
		width: 96upx;
		height: 60upx;
		border-radius: 5px;
		border: 1px solid rgba(255, 255, 255, 1);
		font-size: 28upx;
		line-height: 58upx;
		color: rgba(255, 255, 255, 1);
		padding: 0;
		text-align: center;
		vertical-align: middle;
		margin-left: 50upx;
		box-sizing: border-box;
	}

	.choose_button_scroll {
		border: 1px solid rgba(0, 0, 0, 1);
		color: #000000;
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

	.no_data {
		text-align: center;
		padding: 116upx 0;
	}

	.no_data>image {
		width: 338upx;
		height: 326upx;
	}

	.no_data>p {
		font-size: 28upx;
		font-weight: 400;
		width: 450upx;
		color: rgba(178, 178, 178, 1);
		line-height: 50upx;
		margin: 70upx auto 0;
	}

	.left_icon image {
		width: 184upx;
		height: 36upx;
		margin: 0px 30upx -8upx;
	}

	.right_icon {
		/* width: 184upx; */
		margin-right: 18upx;
	}

	.right_icon text {
		font-size: 28upx;
		font-weight: 400;
		color: rgba(59, 193, 187, 1);
		line-height: 40upx;
		margin-right: 8upx;
	}

	.right_icon image {
		width: 16upx;
		height: 16upx;
	}

	.scroll_content {
		width: 33.33333333%;
		height: 260upx;
		text-align: center;
		margin-top: 16upx;
		position: relative;

		.checkbox_item {
			position: absolute;
			top: 0;
			right: 0;
		}
	}

	.scroll_contentbg1 {
		background: url("/static/tab1/bookbox.png") no-repeat center center / cover;

	}

	.scroll_contentbg2 {
		background: url("/static/tab1/clothes_box.png") no-repeat center center;
		background-size: 100%;
	}

	.scroll_contentbg3 {
		background: url("/static/tab1/shoes_box.png") no-repeat center center;
		background-size: 100%;
	}

	.scroll_content image {
		width: 188upx;
		height: 216upx;
	}

	.scroll_contentbg2 image {
		width: 220upx;
		height: 200upx;
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
		margin: 80upx auto 0;
	}
</style>
