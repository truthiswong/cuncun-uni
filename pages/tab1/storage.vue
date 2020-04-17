<template>
	<view>
		<uni-nav-bar color="#FFFFFF" title="我的储藏室" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" style="" src="../../static/tab1/search_white.png"></image>
					<button @click="onClickRight(2)" plain="true" class="choose_button">选择</button>
				</view>
			</view>
		</uni-nav-bar>
		<uni-nav-bar color="#000000" title="我的储藏室" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true" v-if="!headerShow" style="position: absolute; top: 0;"
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
			<view style="padding: 0 30upx;">
				<view class="scroll_content4" v-for="(item,index) in 15" :key='index' style="display: inline-block;">
					<image src="../../static/tab1/sofa_img1.png"></image>
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

	.scroll_content4 {
		position: relative;
		width: 32%;
		height: 200upx;
		text-align: center;
		margin: 16upx 5upx 50upx;
		box-sizing: border-box;
		padding: 20upx 18upx 0;
		background: rgba(230, 230, 230, 1);
			
		image {
			width: 180upx;
			height: 180upx;
		}
	}
</style>