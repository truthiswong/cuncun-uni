<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="确认地址" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="address_search">
				<uni-search-bar :radius="100" @input="onInput"></uni-search-bar>
			</view>
			<view class="address_content">
				<scroll-view scroll-y="true">
					<view>
						<view class="address_list" @click="onChooseAddress(item)" v-for="(item,index) in tipsList" :key="index">
							<h4>{{item.name}}</h4>
							<p>{{item.district}} {{item.address}}</p>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import amap from '../../js_sdk/js-amap/amap-wx.js';
	export default {
		components: {},
		data() {
			return {
				amapPlugin: null,
				key: '0d068c7ca336957fbbb8d534d547ccc7',
				localtion: {
					longitude: 0,
					latitude: 0
				},
				tipsList: [],
			};
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					console.log(res)
					this.localtion.longitude = res.longitude
					this.localtion.latitude = res.latitude
					console.log(this.localtion)
					const latitude = res.latitude;
					const longitude = res.longitude;
				}
			});
			// #endif
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onInput(e) {
				this.amapPlugin.getInputtips({
					keywords: e.value,
					location: '',
					success: (data)=> {
						if (data && data.tips) {
							this.tipsList = data.tips
						}
					}
				})
				// if (!e.value) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入地址'
				// 	});
				// } else {
					
				// }
			},
			onChooseAddress(item) {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.tipsAddress = item; //修改上一页data里面的couponNumber参数值为value
				uni.navigateBack();
			},
			onSearch(e) {
				console.log(e)
				if (!e.value) {
					uni.showToast({
						icon: 'none',
						title: '请输入地址'
					});
				} else {
					this.amapPlugin.getInputtips({
						keywords: e.value,
						location: '',
						success: function(data) {
							console.log(data)
							if (data && data.tips) {

							}

						}
					})
				}
			}
		}
	};
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	.content {
		padding: 0 30upx;
	}
	.address_search {
		box-sizing: border-box;
		padding-top: 20upx;
		position: fixed;
		left: 30upx;
		right: 30upx;
		z-index: 3;
		background-color: #FFFFFF;
	}
	.uni-searchbar {
		padding: 0;
	}
	.address_content {
		padding-top: 90upx;
	}
	.address_list {
		border-bottom: 1upx solid #f3f4f5;
		margin: 20upx 0;

		h4 {
			font-size: 28upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 40upx;
			text-align: justify;
		}

		p {
			display: inline-block;
			font-size: 26upx;
			font-weight: 400;
			color: rgba(104, 104, 104, 1);
			line-height: 38upx;
			margin: 0 0 10upx;
			text-align: justify;
		}
	}

	// .address_list:nth-last-child(1) {
	// 	border-bottom: 0;
	// }
</style>
