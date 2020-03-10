<template>
	<view class="page">
		<hx-navbar :fixed="true" :back="false" title="我的" color="#ffffff" barPlaceholder="hidden" transparent="auto"
		 :background-color="[255, 255, 255,0]">
			<view slot="right">
				<navigator url="/pages/tab3/setting">
					<image style="width: 44upx; height: 44upx; margin: 30upx 16upx 0 0;" src="../../static/tab3/setting.png"></image>
				</navigator>
			</view>
		</hx-navbar>
		<view class="content" @scroll="onScroll">
			<view class="cont_top">
				<image src="/static/tab1/tab1_top.png" mode=""></image>
				<view class="head_image">
					<!-- <img src="../../static/tab3/my_image.png" alt /> -->
					<image src="../../static/tab3/my_image.png"></image>
					<view>
						<p>Ding Han</p>
						<uni-rate style="margin-top: 16upx;" disabled="true" size="14" value="3.5"></uni-rate>
					</view>
				</view>
				<view class="head_word">
					<p>
						您的合理的收纳和使用能力已秒杀
						<text>80%</text>的用户
					</p>
					<image src="../../static/tab3/zan.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- <view class='base-padding row base-info font-lv2'>
			<navigator url='/pages/search/search' class='col-12'>
				<image class="me-icon" src='../../static/images/search.png'></image>
				<text>书籍搜索</text>
				<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
			</navigator>
			<navigator v-if="user.uid == 0" url='/pages/rank/rank' class='col-12'>
				<image class="me-icon" src='../../static/images/rank.png'></image>
				<text>热门榜单</text>
				<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
			</navigator>
		</view> -->
		<view class='base-padding row base-info font-lv2'>
			<navigator class='col-12'>
				<image class="me-icon" src='../../static/tab3/ohter.png'></image>
				其他
				<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
			</navigator>
			<navigator class='col-12'>
				<image class="me-icon" src='../../static//tab3/server.png'></image>
				客服电话
				<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
			</navigator>
			<!-- <navigator :url='user.uid>0?"/pages/ucenter/ucenter?tab=follow":"/pages/login/login"' class='col-12'>
				<image class="me-icon" src='../../static/images/follow.png'></image>
				我的关注
				<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
			</navigator>
			<navigator :url='user.uid>0?"/pages/ucenter/ucenter?tab=fans":"/pages/login/login"' class='col-12'>
				<image class="me-icon" src='../../static/images/fans.png'></image>
				我的粉丝
				<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
			</navigator> -->
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue' //评分
	import config from '../../config.js'
	import util from '../../utils/util.js'

	import iheader from '../../components/header.vue'

	export default {
		components: {
			uniRate,
			iheader
		},
		data() {
			return {
				isSignedToday: false,
				info: {},
				user: {},
				moreInfo: {},
				moreInfoCacheTime: 0,
				now: new Date().getFullYear(),
				redirect: encodeURIComponent('/pages/me/me')
			}
		},
		onLoad(op) {
			if (config.debug) console.log("onLoad", op)
		},
		onShow() {},
		methods: {}
	}
</script>

<style scoped>
	page,
	.page {
		background-color: #f6f6f6;
		position: relative;
	}

	.cont_top {
		width: 100%;
		height: 386upx;
		position: relative;
	}

	.cont_top>image {
		position: absolute;
		top: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
	}

	.head_image {
		position: absolute;
		top: 88upx;
		z-index: 2;
		padding-top: 96upx;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		flex-wrap: wrap;
	}

	.head_image>image {
		width: 128upx;
		height: 128upx;
		border-radius: 50%;
		border: 6upx solid white;
		margin: 0 30upx;
	}

	.head_image>view p {
		font-size: 56upx;
		font-weight: 600;
		color: rgba(255, 255, 255, 1);
		line-height: 78upx;
	}

	.head_word {
		position: absolute;
		bottom: 0;
		z-index: 3;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		margin-left: 30upx;
	}

	.head_word p {
		font-size: 28upx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 54upx;
	}

	.head_word p text {
		font-size: 50upx;
	}

	.head_word image {
		width: 84upx;
		height: 130upx;
	}

	.row {
		background-color: #fff;
		margin-bottom: 10upx;
		padding: 30upx;
	}

	.row:last-of-type {
		margin-bottom: 0upx;
	}

	.user {
		text-align: center;
		display: block;
		width: 100%;
	}

	.month-reading {
		border-left: 1px solid #f1f1f1;
		border-right: 1px solid #f1f1f1;
	}

	.user .text-muted {
		text-align: center;
	}

	.col-title {
		margin-bottom: 1px;
		color: #666;
	}

	.col-title navigator {
		display: inline-block;
	}

	.username {
		margin: 15upx auto;
	}

	.user image {
		width: 180upx;
		height: 180upx;
		border-radius: 90upx;
		border: 1px solid #ddd;
		margin: 0 auto;
		display: block;
	}

	.base-info image {
		margin-right: 30upx !important;
	}

	.base-info image.pull-right {
		margin-right: 0 !important;
		top: 0;
	}

	.base-info {
		padding-top: 0upx;
		padding-bottom: 0upx;
	}

	.base-info .col-12 {
		border-bottom: 1px solid #f6f6f6;
		padding-bottom: 30upx;
		padding-top: 30upx;
		color: #666;
	}

	.base-info .col-12:last-of-type {
		margin-bottom: 0;
		border-bottom: 0;
	}

	.user-intro {
		width: 100%;
		text-align: center;
	}

	.user-func {
		line-height: 40upx;
		border: 1px solid #000000;
	}

	.user-func .func-item {
		line-height: 300%;
		border-bottom: 1upx dashed #f1f1f1;
		padding: 0;
		margin: 0;
	}

	.user-func .color-red {
		margin-right: 8upx;
	}

	.reading-time text {
		margin: auto 8upx;
		color: red;
	}

	.reading-time .col-4 {
		box-sizing: border-box;
	}

	.reading-time .col-4:nth-child(1),
	.reading-time .col-4:nth-child(2),
	.reading-time .col-4:nth-child(3) {
		border-bottom: 1px solid #f6f6f6;
		padding-bottom: 16upx;
	}

	.reading-time .col-4:nth-child(4),
	.reading-time .col-4:nth-child(5),
	.reading-time .col-4:nth-child(6) {
		padding-top: 16upx;
	}

	.reading-time .col-4:nth-child(2),
	.reading-time .col-4:nth-child(5) {
		border-left: 1px solid #f6f6f6;
		border-right: 1px solid #f6f6f6;
	}

	image.me-icon {
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
		margin-right: 6upx;
		position: relative;
		top: -4upx;
	}

	.signed image {
		width: 25upx;
		height: 25upx;
	}

	.signed.text-muted {
		color: #CCCCCC;
	}

	.col-title .text-right .line {
		color: #EFEFEF;
		margin: 0 10px;
	}

	.col-title .text-right>view {
		display: inline-block;
	}

	@media (min-width: 768px) {

		.base-info image,
		image.me-icon {
			max-width: 20px;
			max-height: 20px;
			top: -2upx;
		}

		.base-info .col-12 {
			padding-top: 25px;
			padding-bottom: 25px;
		}
	}
</style>
