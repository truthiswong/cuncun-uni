<template>
	<view class="tab1">
		<hx-navbar class="header" :style="{opacity: 1-headerScroll}" :back="false" color="#ffffff"
		 barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
			<view slot="left">
				<image src="../../static/tab1/tab1_logo.png" style="width:306upx; height:68upx; margin: 0px 30upx -24upx;"></image>
			</view>
			<view slot="right" class="header_icon">
				<image @click="onClickRight(1)" src="../../static/tab1/search_white.png"></image>
				<image @click="onClickRight(2)" src="../../static/tab1/add.png" style="margin-left: 60upx;"></image>
			</view>
		</hx-navbar>
		<hx-navbar class="header_active" :style="{opacity: headerScroll}" :back="false" color="#ffffff"
		 barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
			<view slot="left">
				<image src="../../static/tab1/header_active.png" style="width:306upx; height:48upx; margin: 0px 30upx -13upx;"></image>
			</view>
			<view slot="right" class="header_icon">
				<image @click="onClickRight(1)" src="../../static/tab1/search_green.png"></image>
				<image @click="onClickRight(2)" src="../../static/tab1/add_green.png" style="margin-left: 60upx;"></image>
			</view>
		</hx-navbar>
		<!-- 内容 -->
		<view class="content" ref="tab1Content" @scroll="onScroll">
			<view class="cont_top">
				<view class="cont_dialog">
					<h3>上午好，春奈小姐～</h3>
					<p>我们的执照收纳咨询师和打包小哥正在随时待命中哦!</p>
				</view>
			</view>
			<view class="no_data" v-show="false">
				<image src="../../static/tab1/no_data.png" mode=""></image>
				<p>您的存存空空如也，跟我们的收纳达人和打包小哥约起来，赶紧的！！！</p>
				<button class="common_button">约！约！约!</button>
			</view>
			<view>
				<!-- 书架 -->
				<view>
					<hx-navbar :back="false" title="汪汪汪" color="#ffffff"
					 barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
						<view slot="left">
							<image style="width:306upx; height:68upx; margin: 0px 30upx -24upx;" src='../../static/tab1/book.png'></image>
						</view>
						<view slot="right" class="header_icon">
							<text>查看全部</text>
							<image @click="onClickRight(1)" src="../../static/tab1/right.png"></image>
						</view>
					</hx-navbar>
				</view>
				
				<view class='base-padding row base-info font-lv2'>
					<navigator class='col-12'>
						<image src="../../static/tab1/right.png"></image>
					</navigator>
					<navigator class='col-12'>
						<image class="me-icon" src='../../static/tab1/book.png'></image>
						<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
						<image src="../../static/tab1/right.png"></image>
					</navigator>
					<navigator class='col-12'>
						<image class="me-icon" src='../../static/tab1/book.png'></image>
						<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
						<image src="../../static/tab1/right.png"></image>
					</navigator>
					<navigator class='col-12'>
						<image class="me-icon" src='../../static/tab1/book.png'></image>
						<image class='pull-right me-icon' src='../../static/images/right-angle.png'></image>
						<image src="../../static/tab1/right.png"></image>
					</navigator>
				</view>
				<!--  推荐  -->
				<view class='panel base-padding recommend base-margin-bottom'>
					<view class='panel-heading'>
						<view class='panel-title font-lv1 strong'>最新推荐</view>
					</view>
					<view class='panel-body'>
						<scroll-book :books="recommendBooks" :width="bannerWidth"></scroll-book>
					</view>
				</view>
				<view class="list_content_wrap">
					<ul class="list_content">
						<li class="list_content_li list_content_li1" v-for="item in 10" :key="item">
							<image src="../../static/tab1/book_img.jpg"></image>
						</li>
					</ul>
				</view>
			</view>
		</view>

		<!--  各种分类的书籍的展示  -->
		<block v-for="category in categoryBooks" :key="category.id">
			<view v-if="category.books" class='panel base-padding base-margin-bottom'>
				<view class='panel-heading'>
					<view class='panel-title font-lv1 strong'>{{category.title}}
						<navigator :url="'/pages/list/list?tab=new&cid='+category.id" class='pull-right color-link font-lv3'>更多</navigator>
					</view>
				</view>
				<view class='panel-body'>
					<list-book :books="category.books" />
				</view>
			</view>
		</block>
		<view v-if="platform == 'ios'" class="ios-platform">.</view>
	</view>
</template>

<script>
	import scrollBook from '../../components/scrollBook.vue'
	import search from '../../components/search.vue'
	import listBook from '../../components/listBook.vue'
	import iheader from '../../components/header.vue'

	import api from '../../utils/api.js'
	import util from '../../utils/util.js'
	import config from '../../config.js'
	export default {
		components: {
			scrollBook,
			search,
			listBook,
			iheader,
		},
		data() {
			return {
				headerScroll: 0,

				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerWidth: '100%',
				bannerHeight: 'auto',
				showSearch: false, // 内容完全加载完成之后再显示搜索框
				showHeaderSearch: false,
				banners: [],
				categoryBooks: [],
				recommendBooks: [],
				times: 100, // 当iOS未允许访问网络的时候，每3秒请求一次数据
				platform: '',
			}
		},
		onLoad() {
			this.loadData()
		},
		onShow() {
			if (this.categoryBooks.length == 0) {
				this.loadData()
			}
		},
		onPageScroll(options) {
			if (config.debug) console.log("onPageScroll", options)
			// if (options.scrollTop > 110) {
			// 	if (this.showHeaderSearch == false) this.showHeaderSearch = true
			// } else {
			// 	if (this.showHeaderSearch == true) this.showHeaderSearch = false
			// }
			if (options.scrollTop > 80) {
				this.headerScroll = 1;
			} else {
				this.headerScroll = options.scrollTop / 80;
			}
		},
		methods: {
			onClickRight(index) {
				if (index == 1) {
					console.log(1);
				} else if (index == 2) {
					console.log(2);
				}
			},
			loadData() {
				// #ifdef MP
				util.loading('玩命加载中...')
				// #endif

				let that = this
				let cids = []
				let categories = []
				api.getCategories().then(function(res) {
					if (res.length > 0) {
						categories = res.filter(function(category) {
							let b = category.pid == 0 && category.cnt > 0
							if (b) cids.push(category.id)
							return b
						})
					}
					if (config.debug) console.log(res, categories, cids)
				}).catch(function(e) {
					console.log("api.getCategories()", e)
				}).finally(function() {
					let banners = []
					let recommendBooks = []
					let bookLists = []
					Promise.all([util.request(config.api.banners), util.request(config.api.bookLists, {
						page: 1,
						size: 12,
						sort: 'latest-recommend'
					}), util.request(config.api.bookListsByCids, {
						page: 1,
						size: 5,
						sort: 'new',
						cids: cids.join(',')
					})]).then(function([resBanners, resRecommendBooks, resBookLists]) {
						if (config.debug) console.log(cids, resBanners, resRecommendBooks, resBookLists)
						if (resBanners.data && resBanners.data.banners) {
							banners = resBanners.data.banners

							// 计算横幅合适的宽高
							// 转成 upx，因为两边边距设置为 30upx
							let size = resBanners.data.size || 2.619
							let info = util.getSysInfo()
							let width = info.windowWidth * info.pixelRatio - 60
							let height = width / size
							that.platform = info.platform || ''
							that.platform = that.platform.toLowerCase()
							that.bannerWidth = width / info.pixelRatio + "px"
							that.bannerHeight = height / info.pixelRatio + "px"
						}
						if (resRecommendBooks.data && resRecommendBooks.data.books) recommendBooks = resRecommendBooks.data.books
						if (resBookLists.data && resBookLists.data.books) {
							categories = categories.map(function(category) {
								let book = resBookLists.data.books[category.id]
								if (book != undefined && book.length > 0) {
									category.books = book
								} else {
									category.books = []
								}
								return category
							})
						}
					}).catch(function(e) {
						console.log(e)
						// util.toastError(e.data.message || e.ErrMsg)
					}).finally(function() {
						that.banners = banners
						that.categoryBooks = categories
						that.recommendBooks = recommendBooks
						that.showSearch = true
						uni.hideLoading()
						// if (that.times > 0 && (!categories || categories.length == 0)) {
						// 	if (config.debug) console.log("reload")
						// 	let iload = setTimeout(function() {
						// 		clearTimeout(iload)
						// 		that.times = that.times - 1
						// 		that.loadData()
						// 	}, 3000)
						// } else {
						// 	that.times = 0
						// }
					})
				})
			},
			bannerClick(e) {
				if (config.debug) console.log("banner click", e)
				let url = e.target.dataset.url
				if (!url) return

				// #ifdef MP
				uni.navigateTo({
					url
				})
				// #endif

				// APP or H5
				// #ifndef MP
				if (String(url).indexOf("http://") > -1 || String(url).indexOf("https://") > -1) {
					plus.runtime.openURL(url) // 调用外部浏览器打开
					// plus.runtime.openWeb(url) // app 内打开
				} else {
					uni.navigateTo({
						url
					})
				}
				// #endif
			}
		}

	}
</script>

<style>
	.tab1 {
		width: 100%;
		height: 100%;
	}

	.header {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 5;
		background-color: rgba(0, 0, 0, 0);
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
		position: relative;
		width: 100%;
		height: 100%;
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
		height: 260upx;
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
		background: url("../../static/tab1/bookbox.png") no-repeat center center;
		background-size: 100%;
	}

	.list_content_li2 {
		background: url("../../static/tab1/clothes_box.png") no-repeat center center;
		background-size: 100%;
	}

	.list_content_li3 {
		background: url("../../static/tab1/shoes_box.png") no-repeat center center;
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
