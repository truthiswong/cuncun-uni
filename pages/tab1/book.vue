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
			<view class="cont_top" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}">
				<p>里面有书籍 <text>28</text> 本</p>
				<p>您已经超过了 <text>50%</text> 的收纳小伙伴咯～</p>
			</view>
			<view>
				<view class="scroll_content" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}"
				 style="display: inline-block;" v-for="(item,index) in 18" :key='index'>
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
				cont_top_bg: '../../static/tab1/book_bg.png',
				scroll_bg1: '../../static/tab1/bookbox.png',
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
			}
		}

	}
</script>

<style scoped>
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
		width: 100%;
		height: 470upx;
		box-sizing: border-box;
		text-align: center;
		padding-top: 200upx;
	}
	.cont_top p {
		font-size:28upx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:46upx;
		margin: 20upx;
	}
	.cont_top p text {
		font-size:40upx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:46upx;
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
