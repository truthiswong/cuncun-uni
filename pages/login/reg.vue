<template>
	<view>
		<iheader title="注册"></iheader>
		<view class="base-padding mgt-30">
			<view class="content" ref="tab1Content" @scroll="onScroll">
				<view class="cont_top">
					<image src="../../static/tab1/tab1_top.png" mode=""></image>
					<view class="cont_dialog">
						<image src="../../static/tab1/tab1_bubble.png" mode=""></image>
						<view class="cont_dialog_text">
							<h3>上午好，春奈小姐～</h3>
							<p>我们的执照收纳咨询师和打包小哥正在随时待命中哦!</p>
						</view>
					</view>
				</view>
				<view class="no_data" v-show="false">
					<image src="../../static/tab1/no_data.png" mode=""></image>
					<p>您的存存空空如也，跟我们的收纳达人和打包小哥约起来，赶紧的！！！</p>
					<button class="common_button">约！约！约!</button>
				</view>
				<view>
					<!-- 书架 -->
					<view @longpress="longpress('书架')">
						<hx-navbar :back="false" color="#ffffff" barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
							<view slot="left" class="left_icon">
								<image src='../../static/tab1/book.png'></image>
							</view>
							<view slot="right" class="right_icon" @click="onClickRight(1)">
								<text>查看全部</text>
								<image src="../../static/tab1/right.png"></image>
							</view>
						</hx-navbar>
						<view>
							<scroll-view class="scroll_x" scroll-x="true">
								<view class="scroll_content scroll_contentbg1" v-for="(item,index) in 2" :key='index' style="display: inline-block;">
									<image src="../../static/tab1/book_img1.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg1" v-for="(item,index) in 3" :key='index+3' style="display: inline-block;">
									<image src="../../static/tab1/book_img2.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg1" v-for="(item,index) in 3" :key='index+6' style="display: inline-block;">
									<image src="../../static/tab1/book_img3.png"></image>
								</view>
							</scroll-view>
						</view>
					</view>
					<!-- 衣柜 -->
					<view @longpress="longpress('衣柜')">
						<hx-navbar :back="false" color="#ffffff" barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
							<view slot="left" class="left_icon">
								<image src='../../static/tab1/clothes.png'></image>
							</view>
							<view slot="right" class="right_icon" @click="onClickRight(1)">
								<text>查看全部</text>
								<image src="../../static/tab1/right.png"></image>
							</view>
						</hx-navbar>
						<view>
							<scroll-view class="scroll_x" scroll-x="true">
								<view class="scroll_content scroll_contentbg2" v-for="(item,index) in 2" :key='index' style="display: inline-block;">
									<image src="../../static/tab1/clothes_img1.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg2" v-for="(item,index) in 2" :key='index+3' style="display: inline-block;">
									<image src="../../static/tab1/clothes_img2.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg2" v-for="(item,index) in 2" :key='index+6' style="display: inline-block;">
									<image src="../../static/tab1/clothes_img3.png"></image>
								</view>
							</scroll-view>
						</view>
					</view>
					<!-- 鞋柜 -->
					<view @longpress="longpress('鞋柜')">
						<hx-navbar :back="false" color="#ffffff" barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
							<view slot="left" class="left_icon">
								<image src='../../static/tab1/shoes.png'></image>
							</view>
							<view slot="right" class="right_icon" @click="onClickRight(1)">
								<text>查看全部</text>
								<image src="../../static/tab1/right.png"></image>
							</view>
						</hx-navbar>
						<view>
							<scroll-view class="scroll_x" scroll-x="true">
								<view class="scroll_content scroll_contentbg3" v-for="(item,index) in 2" :key='index' style="display: inline-block;">
									<image src="../../static/tab1/shoes_img1.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg3" v-for="(item,index) in 3" :key='index+3' style="display: inline-block;">
									<image src="../../static/tab1/shoes_img2.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg3" v-for="(item,index) in 3" :key='index+6' style="display: inline-block;">
									<image src="../../static/tab1/shoes_img3.png"></image>
								</view>
							</scroll-view>
						</view>
					</view>
					<!-- 杂物架 -->
					<!-- <view @longpress="longpress('杂物架')">
						<hx-navbar :back="false" color="#ffffff" barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
							<view slot="left" class="left_icon">
								<image src='../../static/tab1/groceries.png'></image>
							</view>
							<view slot="right" class="right_icon" @click="onClickRight(1)">
								<text>查看全部</text>
								<image src="../../static/tab1/right.png"></image>
							</view>
						</hx-navbar>
						<view>
							<scroll-book :books="recommendBooks" :width="bannerWidth"></scroll-book>
						</view>
					</view> -->
					<!-- 杂货架 -->
					<view @longpress="longpress('杂货架')">
						<hx-navbar :back="false" color="#ffffff" barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
							<view slot="left" class="left_icon">
								<image src='../../static/tab1/groceries.png'></image>
							</view>
							<view slot="right" class="right_icon" @click="onClickRight(1)">
								<text>查看全部</text>
								<image src="../../static/tab1/right.png"></image>
							</view>
						</hx-navbar>
						<view>
							<scroll-view class="scroll_x" scroll-x="true">
								<view class="scroll_content scroll_contentbg3" v-for="(item,index) in 2" :key='index' style="display: inline-block;">
									<image src="../../static/tab1/sofa_img1.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg3" v-for="(item,index) in 3" :key='index+3' style="display: inline-block;">
									<image src="../../static/tab1/sofa_img2.png"></image>
								</view>
								<view class="scroll_content scroll_contentbg3" v-for="(item,index) in 3" :key='index+6' style="display: inline-block;">
									<image src="../../static/tab1/sofa_img3.png"></image>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../config.js'
	import util from '../../utils/util.js'
	import api from '../../utils/api.js'

	import iheader from '../../components/header.vue'

	export default {
		components: {
			iheader
		},
		data() {
			return {
				loading: false,
				redirect: encodeURIComponent('/pages/me/me')
			}
		},
		onLoad(op) {
			if (config.debug) console.log('onLoad', op)
			if (op.redirect) this.redirect = op.redirect
		},
		onShow: function() {
			let token = util.getToken()
			if (token) {
				let url = decodeURIComponent(this.redirect)
				if (url.indexOf("?") > -1) {
					uni.redirectTo({
						url: url
					})
				} else {
					uni.switchTab({
						url: url
					})
				}
			}
		},
		methods: {
			submit: function(e) {
				if (config.debug) console.log("submit", e)

				let that = this

				if (that.loading) return

				let data = e.detail.value

				if (!util.isEmail(data.email)) {
					util.toastError('邮箱格式不正确')
					return
				}
				if (data.password != data.re_password) {
					util.toastError('两次输入的密码不一致，请重新输入')
					return
				}

				if (data.username == '' || data.nickname == '' || data.password == '' || data.re_password == '') {
					util.toastError('以上资料项均为必填项，请认真填写')
					return
				}

				that.loading = true

				util.request(config.api.register, data, 'POST').then(function(res) {
					if (config.debug) console.log(config.api.register, res)
					util.setUser(res.data.user)
					uni.showToast({
						title: '注册成功',
					})
					setTimeout(function() {
						let url = decodeURIComponent(that.redirect)
						if (url.indexOf("?") > -1) {
							uni.redirectTo({
								url: url
							})
						} else {
							uni.switchTab({
								url: url
							})
						}
					}, 1500)
				}).catch(function(e) {
					if (config.debug) console.log(config.api.register, e)
					util.toastError(e.data.message || e.errMsg)
				}).finally(function() {
					that.loading = false
				})
			},
			toLogin: function() {
				uni.navigateTo({
					url: '/pages/login/login?redirect=' + this.redirect
				})
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/reg-login.css");
	.cont_top {
		position: relative;
		width: 100%;
		height: 386upx;
		background-color: #00C706;
	}
	.cont_top image {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	.cont_dialog {
		position: relative;
		top: 150upx;
		left: 30upx;
		width: 513upx;
		height: 260upx;
	}
	.cont_dialog image {
		width: 100%;
		height: 100%;
	}
	.cont_dialog_text {
		position: absolute;
		top: 0;
	}
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
	
	.scroll_x {
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		overflow: auto;
	}
	
	.scroll_content {
		width: 285upx;
		height: 285upx;
		text-align: center;
	}
	
	.scroll_contentbg1 {
		background: url("/static/tab1/bookbox.png") no-repeat center center;
		background-size: 100%;
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
		width: 200upx;
		height: 230upx;
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
</style>
