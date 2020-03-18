<template>
	<view>
		<uni-nav-bar color="#282828" title="我的订单" class="header" status-bar="true" fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight" src="../../static/tab1/add_green.png"></image>
				</view>
			</view>
		</uni-nav-bar>
		<uni-nav-bar color="#282828" title="我的订单" class="header" status-bar="true" fixed="true" v-if="!headerShow" style="position: absolute; top: 0;"
		 shadow="true">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight" src="../../static/tab1/add_green.png"></image>
				</view>
			</view>
		</uni-nav-bar>
		<view class="content" ref="tab1Content" @scroll="onScroll">
			<view class="no_data">
				<image src="../../static/tab1/no_data.png"></image>
				<p>欢迎使用存存，赶紧来存点东西吧～</p>
				<button class="common_button" @click="onClickRight">去存点东西</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../config.js'
	import util from '../../utils/util.js'
	import api from '../../utils/api.js'

	import loading from '../../components/loading.vue'
	import search from '../../components/search.vue'
	import iheader from '../../components/header.vue'

	export default {
		data() {
			return {
				headerShow: true,
			}
		},
		components: {
			search,
			loading,
			iheader,
		},
		onShow: function() {
			
		},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		onReachBottom: function() {
		},
		methods: {
			onClickRight() {
				uni.navigateTo({
					url: "/pages/tab2/addOrder"
				})
			}
		}
	}
</script>

<style>
	.header_icon {
		width: 200upx;
		height: 44px;
	}
	
	.header_icon image {
		width: 44upx;
		height: 44upx;
		vertical-align: middle;
	}
	.cont_top {
		width: 100%;
		height: 386upx;
		background: url("../../static/tab1/tab1_top.png") no-repeat center center;
		background-size: 100%;
	}

	.cont_dialog {
		position: relative;
		top: 150upx;
		left: 30upx;
		width: 513upx;
		height: 26upx;
		background: url("../../static/tab1/tab1_bubble.png") no-repeat center center;
		background-size: 100%;
	}

	.cont_dialog>h3 {
		font-size: 36upx;
		font-weight: 600;
		color: rgba(40, 40, 40, 1);
		line-height: 50upx;
		padding: 20upx 40upx 0 30upx;
	}

	.cont_dialog>p {
		font-size: 28upx;
		font-weight: 400;
		color: rgba(136, 136, 136, 1);
		line-height: 46upx;
		padding: 20upx 40upx 0 30upx;
	}

	.no_data {
		text-align: center;
		padding: 272upx 0 116upx;
	}

	.no_data>image {
		width: 338upx;
		height: 326upx;
	}

	.no_data>p {
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

	.box {
		padding: 15upx;
	}

	.tips {
		width: 100%;
		box-sizing: border-box;
		padding: 120upx 15upx 0;
		text-align: center;
		color: #888;
		line-height: 200%;
	}

	.tips .action {
		margin-top: 60upx;
	}

	.book {
		width: 206upx;
		max-width: 100%;
		display: block;
		margin: 30upx auto;
	}

	.book image {
		width: 206upx;
		height: 271.6upx;
		margin-bottom: 15upx;
	}

	.longpress-tips {
		border: 1upx dashed #FF6600;
		border-radius: 3upx;
		box-sizing: border-box;
		padding: 20upx 20upx 20upx 15upx;
		border-radius: 5upx;
	}

	.longpress-tips .close-longpress-tips {
		float: right;
	}

	@media (min-width: 768px) {
		.ellipsis-2row {
			line-height: 1.8;
		}

		.col-4 {
			flex: 0 0 25%;
			max-width: 25%;
		}

		.book {
			width: 154.5upx;
			max-width: 100%;
			display: block;
			margin: 30upx auto;
		}

		.book image {
			width: 154.5upx;
			height: 203.7upx;
			margin-bottom: 8upx;
		}
	}
</style>
