<template>
	<view>
		<uni-nav-bar color="#FFFFFF" title="我的杂货架" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" style="" src="../../static/tab1/search_white.png"></image>
					<button @click="onClickRight(2)" plain="true" class="choose_button">选择</button>
				</view>
			</view>
		</uni-nav-bar>
		<uni-nav-bar color="#000000" title="我的杂货架" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true" v-if="!headerShow" style="position: absolute; top: 0;"
		 shadow="true">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" src="../../static/tab1/search_green.png"></image>
					<button @click="onClickRight(2)" plain="true" class="choose_button choose_button_scroll">选择</button>
				</view>
			</view>
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}">
				<p>您一共放了 <text>32</text> 件物品</p>
				<p>需要的时候随时拿，要的就是这种感觉～</p>
			</view>
			<view class="box_groceries_content flex_between" v-for="item in 9" :key="item">
				<view class="box_groceries_left">
					<image src="../../static/tab1/box_null.png"></image>
					<text>{{item + 1}}</text>
				</view>
				<view class="box_groceries_right" style="color: rgba(40,40,40,1);">
					<view>
						<text>箱子{{item + 1}}</text>
					</view>
					<text class="box_groceries_text" style="color: #4A4A4A;">内含：羽毛球、羽毛球拍、篮球、排球、足球、排球手… </text>
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
				cont_top_bg: '../../static/tab1/storage_top_bg.png',
				scroll_bg1: '../../static/tab1/bookbox.png',
				scroll_bg2: '../../static/tab1/clothes_box.png',
				scroll_bg3: '../../static/tab1/shoes_box.png',
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
				} else if (index == 2) {
					console.log(2);
				}
			},
		}

	}
</script>

<style scoped>
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
	}

	.cont_top {
		width: 100%;
		height: 470upx;
		box-sizing: border-box;
		text-align: center;
		padding-top: 200upx;
		margin-bottom: 30upx;
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

	.box_groceries_content {
		position: relative;
		width: 100%;
		height: 234upx;
		background-color: #FFFFFF;
	}
	
	.box_groceries_left {
		position: relative;
	}
	
	.box_groceries_left image {
		width: 308upx;
		height: 230upx;
		margin-top: 60upx;
	}
	
	.box_groceries_left text {
		position: absolute;
		right: 80upx;
		bottom: 80upx;
		font-size: 50upx;
		font-weight: 700;
		color: #90785e;
	}
	
	.box_groceries_right {
		width: 380upx;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(40, 40, 40, 1);
		line-height: 50upx;
		margin: 20upx 50upx 0 0;
	}
	
	.box_groceries_text {
		font-weight: 400;
		line-height: 46upx;
		margin-top: 10upx;
		color: #4A4A4A;
	}
</style>