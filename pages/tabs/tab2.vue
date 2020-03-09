<template>
	<view>
		<hx-navbar :back="false" title="我的订单" color="rgba(40,40,40,1)" :fixed="true" barPlaceholder="hidden" transparent="auto" :background-color="[255, 255, 255]">
			<view slot="right">
				<image @click="onClickRight" src="../../static/tab1/add_green.png" style="width: 44upx; height: 44upx; margin: 30upx 32upx 0;"></image>
			</view>
		</hx-navbar>
		<view class="content" ref="tab1Content" @scroll="onScroll">
			<view class="no_data">
				<image src="../../static/tab1/no_data.png"></image>
				<p>欢迎使用存存，赶紧来存点东西吧～</p>
				<button class="common_button" block>去存点东西</button>
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
				page: 1,
				size: 24,
				books: [],
				showTips: false,
				wd: '',
				token: '',
				showLongpressTips: false, // 是否显示长按可移除书架收藏书籍的提示
			}
		},
		components: {
			search,
			loading,
			iheader,
		},
		onShow: function() {
			this.showLongpressTips = uni.getStorageSync("showLongpressTips") != "false"

			let sysInfo = util.getSysInfo()

			if (config.debug) console.log("onShow", "bookshelfChanged", sysInfo.bookshelfChanged)
			this.loadBooks(sysInfo.bookshelfChanged)
			sysInfo.bookshelfChanged = false
			util.setSysInfo(sysInfo)
		},
		onReachBottom: function() {
			this.loadBooks()
		},
		methods: {
			onClickRight() {
				console.log("订单add")
			},
			longpress: function(e) {
				if (config.debug) console.log("longpress", e)
				let that = this
				let bookName = e.currentTarget.dataset.book
				let bookId = e.currentTarget.dataset.id
				let books = that.books
				uni.showModal({
					title: "温馨提示",
					content: `您是否要将书籍《${bookName}》从书架中移除？`,
					success: (action) => {
						if (action.confirm) {
							if (config.debug) console.log("确定移除")
							util.request(config.api.bookStar, {
								identify: bookId
							}).then(function(res) {
								if (config.debug) console.log(config.api.bookStar, res)
								uni.showToast({
									title: res.data.data && res.data.data.is_cancel ? '移除收藏成功' : '收藏书籍成功',
								})
								// 去除被移除了的书籍
								that.books = books.filter(function(book) {
									return book.book_id != bookId
								})
							}).catch(function(e) {
								util.toastError(e.data.message || e.errMsg)
							})
						}
					}
				})
			},
			closeLongpressTips: function() {
				this.showLongpressTips = false
				uni.setStorageSync("showLongpressTips", "false")
			},
			loadBooks: function(isClearAll) {

				let that = this
				let token = util.getToken() || ''

				if (config.debug) console.log("token", token)

				if (token == '') {
					that.showTips = true
					that.books = []
					that.token = token
					that.page = 1
					return
				}

				if (that.page == 0 && !isClearAll) return;

				let page = isClearAll ? 1 : that.page
				let size = that.size
				let books = that.books
				let showTips = false

				util.request(config.api.bookshelf, {
					page: page,
					size: size,
				}).then((res) => {
					if (config.debug) console.log(config.api.bookshelf, res)
					if (res.data && res.data.books) {
						res.data.books.length >= size ? page++ : page = 0
						books = isClearAll ? res.data.books : that.books.concat(res.data.books)
					} else {
						if (page == 1) {
							books = []
							showTips = true
						}
						page = 0
					}

				}).catch(function(e) {
					if (config.debug) console.log("error", e)
					util.toastError(e.data.message || e.errMsg)
				}).finally(function() {
					that.books = books
					that.showTips = books.length == 0
					that.page = page
					that.token = token
					if (isClearAll) uni.pageScrollTo({
						scrollTop: 0,
					})
				})
			},
			login: function(e) {
				uni.navigateTo({
					url: '/pages/login/login?redirect=' + encodeURIComponent('/pages/bookshelf/bookshelf')
				})
			},
		}
	}
</script>

<style>
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
