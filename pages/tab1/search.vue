<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="搜索" status-bar="true" fixed="true"></uni-nav-bar>
		<view class='search base-padding mgb-30'>
			<search @search="search" :placeholder="'请输入关键词'" :focus="focus" @clear="clear" :wd="wd" />
		</view>

		<!-- <view v-if="showTab" class="mgb-30">
			<tab @tabClick="tabClick" :tabs="tabs" :tabGridLen="6" :activeTab="tabValue" />
		</view> -->

		<loading :loading="loading" :tips="tips" />
	</view>
</template>

<script>
	import loading from '../../components/loading.vue'
	import search from '../../components/search.vue'
	import tab from '../../components/tab.vue'

	import api from '../../utils/api.js'
	import util from '../../utils/util.js'
	import config from '../../config.js'

	export default {
		components: {
			loading,
			search,
			tab,
		},
		data() {
			return {
				tips: '',
				lists: [],
				wd: '',
				title: '搜索',
				page: 1,
				size: 10,
				tabValue: "book",
				showTab: false,
				focus: false,
				loading: false,
				tabs: [{
						title: "书籍",
						value: "book"
					},
					{
						title: "文档",
						value: "doc"
					}
				]
			}
		},
		onLoad(options) {
			if (config.debug) console.log("search", options)
			let wd = options.wd || ''
			if (wd == '') {
				this.focus = true
				return
			}
			this.wd = wd
			this.showTab = true
			this.execSearch()
		},
		onReachBottom() {
			this.execSearch()
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			tabClick: function(e) {
				if (config.debug) console.log("tabClick:", e)
				if (e.value == this.tabValue) {
					return
				}
				this.tabValue = e.value
				this.page = 1
				this.lists = []
				this.showTab = true
				this.execSearch()
			},
			search: function(e) {
				if (config.debug) console.log(e)
				this.wd = e.wd
				this.page = 1
				this.lists = []
				this.showTab = true
				this.execSearch()
			},
			clear: function() {
				this.wd = ''
				uni.setNavigationBarTitle({
					title: '搜索'
				})
				this.showTab = false
				this.lists = []
				this.loading = false
				this.tips = ''
				this.focus = true
				this.tabValue = 'book'
			},
			execSearch: function() {
				let that = this
				let api = config.api.searchDoc

				that.showTab = true

				that.title = that.wd + " · 搜索"
				// uni.setNavigationBarTitle({
				// 	title: this.wd+" · 搜索"
				// })

				if (that.pedding) return

				if (that.page == 0) {
					that.loading = false
					that.tips = '没有找到更多资源...'
					that.pedding = false
					return
				}

				that.loading = true
				that.pending = true

				if (that.tabValue != "doc") {
					api = config.api.searchBook
				}

				util.request(api, {
					wd: that.wd,
					page: that.page,
					size: that.size,
				}).then((res) => {
					if (config.debug) console.log(config.api.searchBook, res)
					let page = that.page + 1
					let result = []
					if (res.data && res.data.result) {
						result = res.data.result
						if (res.data.result.length < that.size) {
							page = 0
						}
					} else {
						page = 0
					}
					if (that.tabValue == 'doc') {
						result = result.map(function(item) {
							item.created_at = util.relativeTime(item.created_at)
							item.vcnt = util.fixView(item.vcnt)
							return item
						})
					}
					that.page = page
					that.lists = that.lists.concat(result)
					that.loading = page > 0
					that.tips = "没有找到更多资源..."
				}).catch((e) => {
					if (config.debug) console.log(e)
					that.loading = false
					that.tips = e.data.message || e.errMsg
					that.page = 0
				}).finally(function() {
					that.pending = false
				})
			},
		}
	}
</script>

<style scoped>
	.doc-info {
		font-size: 24upx;
		margin: 20upx 0;
	}

	.doc-info image {
		height: 20upx;
		width: 20upx;
		margin-right: 6upx;
	}

	.doc-info .item {
		display: inline-block;
		margin-right: 16upx;
	}

	.doc-intro {
		font-size: 28upx;
		line-height: 170%;
	}

	.doc-list .row {
		border-bottom: 1px solid #efefef;
		margin-bottom: 30upx;
		padding-bottom: 30upx;
	}

	@media (min-width: 768px) {
		.doc-info image {
			max-height: 18px;
			max-width: 18px;
			margin-right: 6px;
			position: relative;
			top: 3px;
		}
	}
</style>
