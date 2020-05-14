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
			<view style="width: 20%;">
				<uni-combox :candidates="candidates" placeholder="选择" v-model="candidatesDefault"></uni-combox>
			</view>
			<view style="width: 80%;">
				<uni-search-bar :radius="100" @confirm="onSearch"></uni-search-bar>
			</view>
		</view>
		<view class="content" @click="isAddShow=false">
			<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
				<view class="list_margin50" v-if="allData.length>0" style="background-color: #FFFFFF;">
					<view class="box_groceries_content flex_between" v-for="(item,index) in allData" :key="index">
						<label>
							<view class="box_groceries_left">
								<view v-if="item.type.code == 'bookcase'">
									<view class="scroll_content" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}"
									 style="display: inline-block;">
										<image :src="item.coverPic"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</view>
								</view>
								<view v-if="item.type.code == 'armoire'">
									<image src="../../static/tab1/box_null.png"></image>
									<view class="checkbox_item">
										<checkbox v-if="isCheckedShow" :value="item.id" :checked="item.checked" color="white" /><text></text>
									</view>
								</view>
								<view v-if="item.type.code == 'shoebox'">
									<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
									<image :src="item.coverPic"></image>
									<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 127upx;" src="../../static/tab1/shoes_box1.png"></image>
									<view class="checkbox_item" v-if="isCheckedShow">
										<checkbox :value="item.id" :checked="item.checked" color="white" />
									</view>
								</view>
								<view v-if="item.type.code == 'storeroom'">
									<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
									<image :src="item.coverPic"></image>
									<view class="checkbox_item" v-if="isCheckedShow">
										<checkbox :value="item.id" :checked="item.checked" color="white" />
									</view>
								</view>
								<view v-if="item.type.code == 'sundries'">
									<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
									<image :src="item.coverPic"></image>
									<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 127upx;" src="../../static/tab1/shoes_box1.png"></image>
									<view class="checkbox_item" v-if="isCheckedShow">
										<checkbox :value="item.id" :checked="item.checked" color="white" />
									</view>
								</view>
							</view>
						</label>
						<view class="box_groceries_right" style="color: rgba(40,40,40,1);">
							<view>
								<text>{{item.code}}</text>
							</view>
							<text class="box_groceries_text">内含：{{item.remark}}</text>
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
				failData: [], //未过安检的箱子
				bookData: [], //书架
				clotheData: [], //衣柜
				shoeData: [], //鞋柜
				storageData: [], //储藏室
				groceriesData: [], //杂货架
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
									// if (item.type.code == 'bookcase') {
									// 	this.bookData.push(item) //书架
									// } else if (item.type.code == 'armoire') {
									// 	this.clotheData.push(item) //衣柜
									// } else if (item.type.code == 'shoebox') {
									// 	this.shoeData.push(item) //鞋柜
									// } else if (item.type.code == 'storeroom') {
									// 	this.storageData.push(item) //储藏室
									// } else if (item.type.code == 'sundries') {
									// 	this.groceriesData.push(item) //杂货架
									// }
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
									// if (item.type.code == 'bookcase') {
									// 	this.bookData.push(item) //书架
									// } else if (item.type.code == 'armoire') {
									// 	this.clotheData.push(item) //衣柜
									// } else if (item.type.code == 'shoebox') {
									// 	this.shoeData.push(item) //鞋柜
									// } else if (item.type.code == 'storeroom') {
									// 	this.storageData.push(item) //储藏室
									// } else if (item.type.code == 'sundries') {
									// 	this.groceriesData.push(item) //杂货架
									// }
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
					// for (let item of this.bookData) {
					// 	item.checked = true
					// }
					// for (let item of this.clotheData) {
					// 	item.checked = true
					// }
					// for (let item of this.shoeData) {
					// 	item.checked = true
					// }
					// for (let item of this.storageData) {
					// 	item.checked = true
					// }
					// for (let item of this.groceriesData) {
					// 	item.checked = true
					// }
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
				console.log(this.allData)
				return
				this.isAddShow = false
				let chooseData = {}
				let chooseIndex = 0
				for (let item of this.list) {
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
								url: '/pages/tab1/orderBackPay'
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
</script>

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
		padding: 120upx 0 0;
	}

	.box_wrong_content {
		position: relative;
		width: 100%;
		height: 234upx;
		background-color: #FFFFFF;
	}

	.box_wrong_left {
		position: relative;

		image {
			width: 308upx;
			height: 210upx;
			margin-top: 60upx;
		}

		text {
			position: absolute;
			right: 80upx;
			bottom: 70upx;
			font-size: 50upx;
			font-weight: 700;
			color: #90785e;
		}
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

		image {
			width: 308upx;
			height: 230upx;
			margin-top: 60upx;
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
			top: 50upx;
			right: 10upx;
			z-index: 25;
		}
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

		.checkbox_item {
			position: absolute;
			top: 0;
			right: 10upx;
			z-index: 25;
		}
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

	.bottom_button {
		position: fixed;
		right: 0;
		bottom: 0upx;
		z-index: 30;
	}
</style>
