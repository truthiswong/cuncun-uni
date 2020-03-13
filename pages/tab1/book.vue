<template>
	<view>
		<hx-navbar title="我的书架" :fixed="true" barPlaceholder="hidden" transparent="auto" :color="['#ffffff','#ffffff']"
		 :background-color="[59, 193, 187]">
		<view slot="right">
			<navigator url="/pages/tab1/search">
				<image src="../../static/tab1/search_white.png" style="width: 44upx; height: 44upx; margin: 30upx 32upx 0;"></image>
			</navigator>
		</view>
		</hx-navbar>
		<!-- 内容 -->
		<view class="content">
			<view class="top">
				<image src="../../static/tab1/book_bg.png" mode="" style="width: 100%;"></image>
			</view>
			<view>
				<view class="scroll_content" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}"
				 style="display: inline-block;" v-for="(item,index) in 19" :key='index'>
					<image src="../../static/tab1/book_img1.png"></image>
				</view>
			</view>
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
			return {
				headerScroll: false,
				platform: '',
				cont_top_bg: '../../static/tab1/tab1_top.png',
				cont_dialog_bg: '../../static/tab1/tab1_bubble.png',
				scroll_bg1: '../../static/tab1/bookbox.png',
				scroll_bg2: '../../static/tab1/clothes_box.png',
				scroll_bg3: '../../static/tab1/shoes_box.png',
			}
		},
		onLoad() {

		},
		onShow() {},
		onPageScroll(options) {
			if (config.debug) console.log("onPageScroll", options)
		},
		// onPageScroll(options) {
		// 	if (config.debug) console.log("onPageScroll", options)
		// 	// if (options.scrollTop > 110) {
		// 	// 	if (this.showHeaderSearch == false) this.showHeaderSearch = true
		// 	// } else {
		// 	// 	if (this.showHeaderSearch == true) this.showHeaderSearch = false
		// 	// }
		// 	if (options.scrollTop > 60) {
		// 		// this.headerScroll = 1;
		// 		this.headerScroll = true;
		// 	} else {
		// 		this.headerScroll = false;
		// 		// this.headerScroll = options.scrollTop / 88;
		// 	}
		// },
		methods: {
			onScroll(e) {
				console.log(e)
			},
			onClickRight(index) {
				if (index == 1) {
					console.log(1);
				} else if (index == 2) {
					console.log(2);
				}
			},
			longpress(name) {
				uni.showModal({
					title: "提示",
					content: `是否移除${name}？`,
					success: (action) => {
						if (action.confirm) {
							if (config.debug) console.log("确定移除")
							uni.showToast({
								title: '移除成功',
							})
						}
					}
				})
			}
		}

	}
</script>

<style>
	.tab1 {
		overflow: hidden;
	}

	.header {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 5;
		background-color: rgba(0, 0, 0, 0);
		vertical-align: center;
	}

	.header_active {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 5;
		background-color: white;
	}

	.header_icon image {
		width: 44upx;
		height: 44upx;
		margin: 30upx 10upx 0;
	}

	.content {
		width: 100%;
		height: 100%;
	}

	.cont_top {
		position: relative;
		width: 100%;
		height: 474upx;
	}

	.cont_dialog {
		position: relative;
		top: 212upx;
		left: 30upx;
		width: 513upx;
		height: 260upx;
	}

	.cont_dialog_text {}

	.cont_dialog_text>h3 {
		font-size: 36upx;
		font-weight: 600;
		color: rgba(40, 40, 40, 1);
		line-height: 50upx;
		padding: 20upx 40upx 0 30upx;
	}

	.cont_dialog_text>p {
		font-size: 28upx;
		font-weight: 400;
		color: rgba(136, 136, 136, 1);
		line-height: 46upx;
		padding: 20upx 40upx 0 30upx;
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

	.list {}

	.list_left img {
		width: 184upx;
		height: 36upx;
	}

	.list_right span {
		font-size: 28upx;
		color: rgba(59, 193, 187, 1);
		line-height: 40upx;
	}

	.list_right img {
		width: 16upx;
		height: 16upx;
	}

	.list_content_wrap {
		width: 100%;
		margin: 20upx 0;
		overflow: auto;
	}

	.list_content {
		display: -moz-box;
		display: -webkit-box;
	}

	.list_content_li {
		width: 285upx;
		height: 285upx;
		text-align: center;
	}

	.list_content_li1 {
		background: url("/static/tab1/bookbox.png") no-repeat center center;
		background-size: 100%;
	}

	.list_content_li2 {
		background: url("/static/tab1/clothes_box.png") no-repeat center center;
		background-size: 100%;
	}

	.list_content_li3 {
		background: url("/static/tab1/shoes_box.png") no-repeat center center;
		background-size: 100%;
	}

	.list_content_li img {
		width: 200upx;
		height: 230upx;
	}

	.groceries {
		width: 300upx;
		height: 230upx;
	}

	.groceries img {
		width: 100%;
		height: 100%;
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

	.ios-platform {
		color: transparent;
		height: 1upx;
		overflow: hidden;
	}
</style>
