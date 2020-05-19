<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="搜索" status-bar="true" fixed="true">
			<view slot="right">
				<view class="header_icon">
					<button @click="onClickRight(chooseButton)" plain="true" class="choose_button">{{chooseButton}}</button>
				</view>
			</view>
		</uni-nav-bar>
		<view class='search_box flex_between' @click="isAddShow=false">
			<view style="width: 16%;">
				<uni-combox :candidates="candidates" placeholder="选择" v-model="candidatesDefault"></uni-combox>
			</view>
			<view style="width: 84%;">
				<uni-search-bar :radius="100" @confirm="onSearch"></uni-search-bar>
			</view>
		</view>
		<view class="content" @click="isAddShow=false">
			<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
				<view class="list_margin50" v-if="allData.length>0" style="background-color: #FFFFFF;">
					<view class="search_list flex_between" v-for="(item,index) in allData" :key="index">
						<label>
							<view class="search_list_left">
								<view v-if="item.itemType == 'bookcase'">
									<view class="list_left_view" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}">
										<image :src="item.coverPic"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</view>
								</view>
								<view v-if="item.itemType == 'armoire'">
									<view class="list_left_view" :style="{'background': 'url('+ scroll_bg2 +') no-repeat center center / cover','background-size': '100%'}">
										<image style="width: 200upx;" :src="item.coverPic"></image>
										<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 80upx;" src="../../static/tab1/clothes_box1.png"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" /><text></text>
										</view>
									</view>
								</view>
								<view v-if="item.itemType == 'shoebox'">
									<view class="list_left_view">
										<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
										<image style="width: 206upx;" :src="item.coverPic"></image>
										<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 127upx;" src="../../static/tab1/shoes_box1.png"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</view>
								</view>
								<view v-if="item.itemType == 'storeroom'">
									<view class="list_left_view">
										<image :src="item.coverPic"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</view>
								</view>
								<view v-if="item.itemType == 'sundries'">
									<view class="list_left_view">
										<image style="width: 260upx;height: 220upx;" src="../../static/tab1/box_null.png"></image>
										<view class="checkbox_item">
											<checkbox v-if="isCheckedShow" :value="item.id" :checked="item.checked" color="white" /><text></text>
										</view>
									</view>
								</view>
							</view>
						</label>
						<view class="search_list_right" style="color: rgba(40,40,40,1);">
							<view>
								<text>{{item.code}}</text>
							</view>
							<text class="search_list_text">内含：{{item.name}}</text>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="bottom_button" v-if="isCheckedShow">
			<image @click="onCancel" style="width: 218upx;height: 124upx;" src="../../static/tab1/long_cancel.png" mode=""></image>
			<image @click="onConfirm" style="width: 268upx;height: 124upx;" src="../../static/tab1/come_back.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				box_wrong_bg: '../../static/tab1/box_wrong_bg.png',
				scroll_bg1: '../../static/tab1/bookbox.png',
				scroll_bg2: '../../static/tab1/clothes_box.png',
				scroll_bg3: '../../static/tab1/shoes_box2.png',
				allData: [], // 所有搜索结果
				candidates: ['物品', '箱子'],
				candidatesDefault: '物品',
				isCheckedShow: false,
				chooseButton: '选择',
				isAddShow: false,
			}
		},
		onLoad(options) {

		},
		onShow() {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onSearch(e) {
				console.log(this.candidatesDefault)
				if (!this.candidatesDefault) {
					uni.showToast({
						icon: 'none',
						title: '请选择搜索类型'
					});
					return
				}
				if (!e.value) {
					uni.showToast({
						icon: 'none',
						title: '请输入关键词'
					});
				} else {
					if (this.candidatesDefault == '物品') {
						this.$http('user/goods/page?keywords=' + e.value, "GET", '', res => {
							let data = res.data
							if (data.success) {
								for (let item of data.data.data) {
									item.checked = false
									item.itemType = item.type.code
								}
								this.allData = data.data.data
								console.log(this.allData)
							} else {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
						})
					} else if (this.candidatesDefault == '箱子') {
						this.$http('user/pack/page?keywords=' + e.value, "GET", '', res => {
							let data = res.data
							if (data.success) {
								for (let item of data.data.data) {
									item.checked = false
									item.itemType = 'sundries'
									item.name = item.remark
								}
								this.allData = data.data.data
								console.log(this.allData)
							} else {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
						})
					}
				}
			},
			onClickRight(index) {
				if (index == '选择') {
					this.isCheckedShow = true
					this.chooseButton = '全选'
				} else if (index == '全选') {
					for (let item of this.allData) {
						item.checked = true
					}
				}
			},
			onCheckboxChange(e) {
				for (let item of this.allData) {
					if (e.detail.value.includes(item.id)) {
						item.checked = true
					} else {
						item.checked = false
					}
				}
			},
			onCancel() {
				this.isCheckedShow = false
				this.chooseButton = '选择'
				for (let item of this.allData) {
					item.checked = false
				}
			},
			onAgainAdd() {
				this.isAddShow = !this.isAddShow
			},
			onConfirm() {
				let chooseData = {}
				let chooseIndex = 0
				if (this.candidatesDefault == '物品') {
					for (let item of this.allData) {
						if (item.checked) {
							chooseData['goodsId[' + chooseIndex + ']'] = item.id
							chooseIndex++
						}
					}
					if (!chooseIndex) {
						uni.showToast({
							title: '请选择要送回的物品',
							icon: 'none'
						})
					} else {
						this.$http('user/withdraw/goods/choose', "POST", chooseData, res => {
							let data = res.data
							if (data.success) {
								uni.navigateTo({
									url: '/pages/tab1/orderBack'
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
						})
					}
				} else if (this.candidatesDefault == '箱子') {
					
					for (let item of this.allData) {
						if (item.checked) {
							chooseData['packId[' + chooseIndex + ']'] = item.id
							chooseIndex++
						}
					}
					if (!chooseIndex) {
						uni.showToast({
							title: '请选择要送回的物品',
							icon: 'none'
						})
					} else {
						this.$http('user/withdraw/pack/choose', "POST", chooseData, res => {
							let data = res.data
							if (data.success) {
								uni.navigateTo({
									url: '/pages/tab1/orderBack'
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
						})
					}
				}
			}
		}
	}
</script>

<style>
	.uni-combox__input {
		font-size: 14px;
	}
</style>

<style scoped lang="scss">
	.header_icon {
		width: 200upx;
		height: 88upx;
		text-align: right;
	}

	.choose_button {
		display: inline-block;
		width: 96upx;
		height: 60upx;
		border-radius: 5px;
		border: 1upx solid rgba(255, 255, 255, 1);
		font-size: 28upx;
		line-height: 58upx;
		color: #000000;
		padding: 0;
		font-weight: 300;
		text-align: center;
		vertical-align: middle;
		box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 1);
		color: #000000;
	}

	.choose_button_scroll {
		border: 1px solid rgba(0, 0, 0, 1);
		color: #000000;
	}

	.search_box {
		box-sizing: border-box;
		padding: 20upx 30upx;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 50;
		background-color: #FFFFFF;

		.uni-searchbar {
			padding: 0;
		}
	}

	.content {
		padding: 120upx 30upx 0;
	}

	.search_list {
		position: relative;
		width: 100%;
		height: 240upx;
		background-color: #FFFFFF;
		margin-bottom: 40upx;
		
		.search_list_left {
			position: relative;
			width: 260upx;
			height: 230upx;
			
			.list_left_view {
				width: 260upx;
				height: 260upx;
				text-align: center;
				position: relative;
				
				image {
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					z-index: 3;
					width: 180upx;
					height: 200upx;
				}
			}
		
			text {
				position: absolute;
				right: 80upx;
				bottom: 80upx;
				font-size: 50upx;
				font-weight: 700;
				color: #90785e;
			}
		
			.checkbox_item {
				position: absolute;
				top: 0;
				right: 10upx;
				z-index: 25;
			}
		}
		
		.search_list_right {
			width: 340upx;
			font-size: 28upx;
			font-weight: 500;
			color: rgba(40, 40, 40, 1);
			line-height: 50upx;
			margin: 20upx 50upx 0 0;
			.search_list_text {
				font-weight: 400;
				line-height: 46upx;
				margin-top: 10upx;
				color: #4A4A4A;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
	}

	.bottom_button {
		position: fixed;
		right: 0;
		bottom: 0upx;
		z-index: 30;
	}
</style>
