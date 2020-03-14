<template>
	<view class="page">
		<hx-navbar class="header" :back="false" title="我的" color="#ffffff" barPlaceholder="hidden" transparent="auto"
		 :background-color="[59, 193, 187]">
			<view slot="right">
				<navigator url="/pages/tab3/setting">
					<image style="width: 44upx; height: 44upx; margin: 30upx 16upx 0 0;" src="../../static/tab3/setting.png"></image>
				</navigator>
			</view>
		</hx-navbar>
		<!-- <iheader title="我的"></iheader> -->
		<view class="content" @scroll="onScroll">
			<view class="cont_top" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}">
				<view class="head_image">
					<!-- <img src="../../static/tab3/my_image.png" alt /> -->
					<image src="../../static/tab3/my_image.png"></image>
					<view>
						<p style="margin-bottom: 20upx;">Ding Han</p>
						<uni-rate disabled="true" size="14" value="3.5"></uni-rate>
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
		<uni-list class="list_custom">
			<!-- <navigator> -->
				<uni-list-item title="其他" thumb="../../static/tab3/ohter.png"></uni-list-item>
			<!-- </navigator> -->
			<!-- <navigator> -->
				<uni-list-item title="客服电话" thumb="../../static//tab3/server.png" rightText="021-34283744"></uni-list-item>
			<!-- </navigator> -->
		</uni-list>
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
				cont_top_bg: '../../static/tab3/tab3_bg.png',
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
	.header {
		top: 0;
		position: fixed;
		width: 100%;
		background-color: rgba(0,0,0,0);
		z-index: 9999;
		vertical-align: center;
	}

	.cont_top {
		width: 100%;
		height: 470upx;
		position: relative;
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
</style>
