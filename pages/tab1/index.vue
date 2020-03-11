<template>
	<view class="root">
		<iheader :showIcon="false" :showSearch="showHeaderSearch"></iheader>
		<view class="base-padding mgb-30">
			<search target="/pages/search/search" />
		</view>
		<view v-if="loadwww" class="content">
			<view class="cont_top" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}">
				<view class="cont_dialog" :style="{background: 'url('+ cont_dialog_bg +') no-repeat center center / cover'}">
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
					<view>
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}"
							 style="display: inline-block;" v-for="(item,index) in 9" :key='index'>
								<image src="../../static/tab1/book_img1.png"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 2000upx;">
			
		</view>
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
				showHeaderSearch: false,
				loadwww: false
			}
		},
		onLoad() {
		},
		onShow() {
			
		},
		onReady() {
			console.log(this.loadwww)
			console.log(666)
			this.loadwww = true
		},
		onPageScroll(options) {
			if (config.debug) console.log("onPageScroll", options)
			if (options.scrollTop > 110) {
				if (this.showHeaderSearch == false) this.showHeaderSearch = true
			} else {
				if (this.showHeaderSearch == true) this.showHeaderSearch = false
			}
		},
		methods: {
			
		}

	}
</script>

<style>
	.ios-platform {
		color: transparent;
		height: 1upx;
		overflow: hidden;
	}
</style>
