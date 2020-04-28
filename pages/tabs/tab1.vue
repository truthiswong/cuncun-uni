<template>
	<view class="tab1">
		<uni-nav-bar class="header" status-bar="true" fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
			<view slot="left" class="header_icon">
				<image src="../../static/tab1/tab1_logo.png" style="width:306upx; height:68upx; margin: 0px 30upx -24upx;"></image>
			</view>
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" style="" src="../../static/tab1/search_white.png"></image>
					<image @click="onClickRight(2)" src="../../static/tab1/add.png" style="margin-left: 60upx;"></image>
				</view>
			</view>
		</uni-nav-bar>
		<uni-nav-bar class="header" status-bar="true" fixed="true" v-if="!headerShow" style="position: absolute; top: 0;"
		 shadow="true">
			<view slot="left" class="header_icon">
				<image src="../../static/tab1/header_active.png" style="width:374upx; height:48upx; margin: 0px 30upx -14upx;"></image>
			</view>
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" src="../../static/tab1/search_green.png"></image>
					<image @click="onClickRight(2)" src="../../static/tab1/add_green.png" style="margin-left: 60upx;"></image>
				</view>
			</view>
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}">
				<view class="cont_dialog" :style="{background: 'url('+ cont_dialog_bg +') no-repeat center center / cover'}">
					<image style="position: absolute;top: 20upx;left: 20upx; width: 46upx;height: 34upx;" src="../../static/tab1/mark_left.png"></image>
					<view class="cont_dialog_text">
						<h3>上午好，春奈小姐～</h3>
						<p>我们的执照收纳咨询师和打包小哥正在随时待命中哦!</p>
					</view>
					<image style="position: absolute;right: 45upx; width: 46upx;height: 34upx;" src="../../static/tab1/mark_right.png"></image>
				</view>
			</view>
			<view class="no_data" v-if="false">
				<image src="../../static/tab1/no_data.png" mode=""></image>
				<p>您的存存空空如也，跟我们的收纳达人和打包小哥约起来，赶紧的！！！</p>
				<button class="common_button">约！约！约!</button>
			</view>
			<view>
				<!-- 未过安检的箱子 -->
				<view @longpress="longpress" class="list_margin50">
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img3">
							<uni-list-item thumb="../../static/tab1/box_wrong_title.png" :showArrow="false">
								<view slot="right">
									<navigator url="/pages/tab1/failBox">
										<span style="font-size: 14px;font-weight: 400;color: rgba(59, 193, 187, 1);">查看全部 <image style="width: 16upx;height: 16upx;margin-left: 10upx;"
											 src="../../static/tab1/right.png"></image></span>
									</navigator>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
					<view>
						<view class="box_wrong_content flex_between" :style="{background: 'url('+ box_wrong_bg +') no-repeat center center / cover'}">
							<view class="box_wrong_left">
								<image src="../../static/tab1/box_wrong.png"></image>
							</view>
							<view class="box_wrong_right">
								<view class="flex_between">
									<text>未过安检箱子</text>
									<text>× 8</text>
								</view>
								<text class="box_wrong_text">您有箱子未过安检，请速申请返送。如有疑问请联系客服。</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 书架 -->
				<view @longpress="longpress('书架')" class="list_margin50">
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img1">
							<view v-if="long_active" class="list_hide_show">
								<image v-if="false" src="../../static/tab1/show.png"></image>
								<image v-if="true" src="../../static/tab1/hide.png"></image>
							</view>
							<uni-list-item thumb="../../static/tab1/books_title.png" :showArrow="false">
								<view slot="right">
									<navigator url="/pages/tab1/book">
										<span style="font-size: 14px;font-weight: 400;color: rgba(59, 193, 187, 1);">查看全部 <image style="width: 16upx;height: 16upx;margin-left: 10upx;"
											 src="../../static/tab1/right.png"></image></span>
									</navigator>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
					<view v-if="true">
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}"
							 style="display: inline-block;" v-for="(item,index) in 9" :key='index'>
								<image src="../../static/tab1/book_img1.png"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- 衣柜 -->
				<view @longpress="longpress('衣柜')" class="list_margin50">
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img1">
							<view v-if="long_active" class="list_hide_show">
								<image v-if="false" src="../../static/tab1/show.png"></image>
								<image v-if="true" src="../../static/tab1/hide.png"></image>
							</view>
							<uni-list-item thumb="../../static/tab1/clothes_title.png" :showArrow="false">
								<view slot="right">
									<navigator url="/pages/tab1/clothes">
										<span style="font-size: 14px;font-weight: 400;color: rgba(59, 193, 187, 1);">查看全部 <image style="width: 16upx;height: 16upx;margin-left: 10upx;"
											 src="../../static/tab1/right.png"></image></span>
									</navigator>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
					<view v-if="true">
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content scroll_content2" :style="{background: 'url('+ scroll_bg2 +') no-repeat center top / 100% 200upx'}"
							 v-for="(item,index) in 7" :key='index' style="display: inline-block;">
								<image src="../../static/tab1/clothes_img1.png"></image>
								<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 112upx;" src="../../static/tab1/clothes_box1.png"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- 鞋柜 -->
				<view @longpress="longpress('鞋柜')" class="list_margin50">
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img1">
							<view v-show="long_active" class="list_hide_show">
								<image v-show="false" src="../../static/tab1/show.png"></image>
								<image v-show="true" src="../../static/tab1/hide.png"></image>
							</view>
							<uni-list-item thumb="../../static/tab1/shoes_title.png" :showArrow="false">
								<view slot="right">
									<navigator url="/pages/tab1/shoes">
										<span style="font-size: 14px;font-weight: 400;color: rgba(59, 193, 187, 1);">查看全部 <image style="width: 16upx;height: 16upx;margin-left: 10upx;"
											 src="../../static/tab1/right.png"></image></span>
									</navigator>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
					<view v-if="true">
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content scroll_content2" v-for="(item,index) in 7" :key='index' style="display: inline-block;">
								<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
								<image src="../../static/tab1/shoes_img1.png"></image>
								<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 127upx;" src="../../static/tab1/shoes_box1.png"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- 储藏室 -->
				<view @longpress="longpress('储藏室')" class="list_margin50">
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img2">
							<view v-show="long_active" class="list_hide_show">
								<image v-show="false" src="../../static/tab1/show.png"></image>
								<image v-show="true" src="../../static/tab1/hide.png"></image>
							</view>
							<uni-list-item thumb="../../static/tab1/storage_title.png" :showArrow="false">
								<view slot="right">
									<navigator url="/pages/tab1/storage">
										<span style="font-size: 14px;font-weight: 400;color: rgba(59, 193, 187, 1);">查看全部 <image style="width: 16upx;height: 16upx;margin-left: 10upx;"
											 src="../../static/tab1/right.png"></image></span>
									</navigator>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
					<view v-if="true">
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content scroll_content4" v-for="(item,index) in 8" :key='index' style="display: inline-block;width: 220upx;height: 200upx;font-size: 0;">
								<image src="../../static/tab1/sofa_img1.png"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- 杂货架 -->
				<view @longpress="longpress('杂货架')" class="list_margin50">
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img2">
							<view v-show="long_active" class="list_hide_show">
								<image v-show="true" src="../../static/tab1/show.png"></image>
								<image v-show="false" src="../../static/tab1/hide.png"></image>
							</view>
							<uni-list-item thumb="../../static/tab1/groceries_title.png" :showArrow="false">
								<view slot="right">
									<navigator url="/pages/tab1/groceries">
										<span style="font-size: 14px;font-weight: 400;color: rgba(59, 193, 187, 1);">查看全部 <image style="width: 16upx;height: 16upx;margin-left: 10upx;"
											 src="../../static/tab1/right.png"></image></span>
									</navigator>
								</view>
							</uni-list-item>
						</uni-list>
					</view>
					<view v-if="true" class="box_groceries_content flex_between" v-for="(item,index) in 3" :key="index">
						<view class="box_groceries_left">
							<image src="../../static/tab1/box_null.png"></image>
							<text>{{index+1}}</text>
						</view>
						<view class="box_groceries_right" style="color: rgba(40,40,40,1);">
							<view>
								<text>箱子 {{index+1}}</text>
							</view>
							<text class="box_groceries_text">内含：羽毛球、羽毛球拍、篮球、排球、足球、排球手… </text>
						</view>
					</view>
				</view>
				<view class="long_button" v-show="long_active">
					<image @click="longpress_cancel" src="../../static/tab1/long_cancel.png"></image>
					<image @click="longpress_comfirm" src="../../static/tab1/long_comfirm.png"></image>
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
				platform: '',
				cont_top_bg: '../../static/tab1/tab1_top.png',
				cont_dialog_bg: '../../static/tab1/tab1_bubble.png',
				box_wrong_bg: '../../static/tab1/box_wrong_bg.png',
				scroll_bg1: '../../static/tab1/bookbox.png',
				scroll_bg2: '../../static/tab1/clothes_box.png',
				scroll_bg3: '../../static/tab1/shoes_box2.png',
				long_active: false, //长按显示编辑按钮
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
		methods: {
			onScroll(e) {
				console.log(e)
			},
			onClickRight(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/tab1/search'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pages/tab2/addOrder'
					})
				}
			},
			longpress(name) {
				this.long_active = true
				// uni.showModal({
				// 	title: "提示",
				// 	content: `是否移除${name}？`,
				// 	success: (action) => {
				// 		if (action.confirm) {
				// 			if (config.debug) console.log("确定移除")
				// 			uni.showToast({
				// 				title: '移除成功',
				// 			})
				// 		}
				// 	}
				// })
			},
			longpress_comfirm() {
				this.long_active = false
			},
			longpress_cancel() {
				this.long_active = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab1 {
		background-color: #FCFCFC;
	}

	.header_icon {
		width: 200upx;

		image {
			width: 44upx;
			height: 44upx;
			margin: 30upx 10upx 0;
		}
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
		height: 262upx;

		h3 {
			font-size: 36upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 50upx;
			padding: 40upx 40upx 0 30upx;
		}

		p {
			font-size: 28upx;
			font-weight: 400;
			color: rgba(136, 136, 136, 1);
			line-height: 46upx;
			padding: 20upx 40upx 0 30upx;
		}
	}

	.no_data {
		text-align: center;
		padding: 116upx 0;

		image {
			width: 338upx;
			height: 326upx;
		}

		p {
			font-size: 28upx;
			font-weight: 400;
			width: 450upx;
			color: rgba(178, 178, 178, 1);
			line-height: 50upx;
			margin: 70upx auto 0;
		}
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

	.box_wrong_content {
		position: relative;
		width: 100%;
		height: 234upx;
		background-color: #FFFFFF;
	}

	.box_wrong_left {
		position: relative;
	}

	.box_wrong_left image {
		width: 308upx;
		height: 210upx;
		margin-top: 60upx;
	}

	.box_wrong_left text {
		position: absolute;
		right: 80upx;
		bottom: 70upx;
		font-size: 50upx;
		font-weight: 700;
		color: #90785e;
	}

	.box_wrong_right {
		width: 380upx;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 50upx;
		margin: 20upx 50upx 0 0;
	}

	.box_wrong_text {
		font-weight: 400;
		line-height: 46upx;
		margin-top: 10upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
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
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.scroll_x {
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		overflow: auto;
	}

	.scroll_content {
		position: relative;
		width: 285upx;
		height: 285upx;
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
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 3;
		width: 200upx;
		height: 230upx;
	}

	.scroll_content2 image {
		width: 230upx;
		height: 230upx;
	}

	.scroll_content4 {
		width: 200upx;
		height: 200upx;
		box-sizing: border-box;
		padding: 18upx 18upx 0;
		background: rgba(230, 230, 230, 1);
		margin-right: 10upx;

		image {
			width: 184upx;
			height: 184upx;
			
		}
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

	.list_margin50 {
		margin: 50upx 0;
	}

	.list_hide_show {
		position: absolute;
		top: -50upx;
		right: 30upx;
		z-index: 1;
	}

	.list_hide_show image {
		width: 166upx;
		height: 100upx;
	}

	.long_button {
		position: fixed;
		right: 0;
		bottom: 0upx;
		z-index: 20;
	}

	.long_button image {
		width: 218upx;
		height: 120upx;
	}
</style>
