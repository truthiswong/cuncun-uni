<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="搜索" status-bar="true" fixed="true">
			<view slot="right">
				<view class="header_icon">
					<button @click="onClickRight(chooseButton)" plain="true" class="choose_button">{{chooseButton}}</button>
				</view>
			</view>
		</uni-nav-bar>
		<view class='search_box'>
			<uni-search-bar :radius="100" @confirm="onSearch"></uni-search-bar>
		</view>
		<view class="content">
			<!-- 未过安检的箱子 -->
			<view class="list_margin50" v-if="failData.length>0" style="background-color: #FFFFFF;">
				<view class="list_padding30">
					<uni-list class="list_custom list_custom_img3">
						<uni-list-item thumb="../../static/tab1/box_wrong_title.png" :showArrow="false">
							<view slot="right">
								<navigator url="/pages/tab1/failBox">
									<span style="font-size: 14px;font-weight: 400;color: rgba(59, 193, 187, 1);">查看全部 <image style="width: 16upx;height: 16upx;margin-left: 10upx;"
										 src="../../static/tab1/right.png"></image></span>
								</navigator>
							</view>
						</uni-list-item>
					</uni-list>
				</view>
				<view>
					<view class="box_wrong_content flex_between" :style="{background: 'url('+ box_wrong_bg +') no-repeat center center / cover'}">
						<view class="box_wrong_left">
							<image src="../../static/tab1/box_wrong.png"></image>
						</view>
						<view class="box_wrong_right">
							<view class="flex_between">
								<text>未过安检箱子</text>
								<text>× {{failData.length}}</text>
							</view>
							<text class="box_wrong_text">您有箱子未过安检，请速申请返送。如有疑问请联系客服。</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 书架 -->
			<view class="list_margin50" v-if="bookData.dataNumber>0" style="background-color: #FFFFFF;">
				<view>
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img1">
							<uni-list-item thumb="../../static/tab1/books_title.png" :showArrow="false"></uni-list-item>
						</uni-list>
					</view>
					<view>
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}"
							 style="display: inline-block;" v-for="(item,index) in bookData.goods" :key='index'>
								<image :src="item.coverPic"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 衣柜 -->
			<view class="list_margin50" v-if="clotheData.dataNumber>0" style="background-color: #FFFFFF;">
				<view>
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img1">
							<uni-list-item thumb="../../static/tab1/clothes_title.png" :showArrow="false"></uni-list-item>
						</uni-list>
					</view>
					<view>
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content scroll_content2" :style="{background: 'url('+ scroll_bg2 +') no-repeat center top / 100% 200upx'}"
							 v-for="(item,index) in clotheData.goods" :key='index' style="display: inline-block;">
								<image :src="item.coverPic"></image>
								<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 112upx;" src="../../static/tab1/clothes_box1.png"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 鞋柜 -->
			<view class="list_margin50" v-if="shoeData.dataNumber>0" style="background-color: #FFFFFF;">
				<view>
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img1">
							<uni-list-item thumb="../../static/tab1/shoes_title.png" :showArrow="false"></uni-list-item>
						</uni-list>
					</view>
					<view>
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content scroll_content2" v-for="(item,index) in shoeData.goods" :key='index' style="display: inline-block;">
								<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
								<image :src="item.coverPic"></image>
								<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 127upx;" src="../../static/tab1/shoes_box1.png"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 储藏室 -->
			<view class="list_margin50" v-if="storageData.dataNumber>0" style="background-color: #FFFFFF;">
				<view>
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img2">
							<uni-list-item thumb="../../static/tab1/storage_title.png" :showArrow="false"></uni-list-item>
						</uni-list>
					</view>
					<view>
						<scroll-view class="scroll_x" scroll-x="true">
							<view class="scroll_content scroll_content4" v-for="(item,index) in storageData.goods" :key='index' style="display: inline-block;width: 220upx;height: 200upx;font-size: 0;">
								<image :src="item.coverPic"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 杂货架 -->
			<view class="list_margin50" v-if="groceriesData.dataNumber>0" style="background-color: #FFFFFF;">
				<view>
					<view class="list_padding30">
						<uni-list class="list_custom list_custom_img2">
							<uni-list-item thumb="../../static/tab1/groceries_title.png" :showArrow="false"></uni-list-item>
						</uni-list>
					</view>
					<view>
						<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
							<view class="box_groceries_content flex_between" v-for="(item,index) in groceriesData.packs" :key="index">
								<label>
									<view class="box_groceries_left">
										<image src="../../static/tab1/box_null.png"></image>
										<text>{{index + 1}}</text>
										<view class="checkbox_item">
											<checkbox v-if="isCheckedShow" :value="item.id" :checked="item.checked" color="white" /><text></text>
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
						</checkbox-group>
					</view>
				</view>
			</view>
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
				failData: [], //未过安检的箱子
				bookData: [], //书架
				clotheData: [], //衣柜
				shoeData: [], //鞋柜
				storageData: [], //储藏室
				groceriesData: [], //杂货架
				isCheckedShow: false,
				chooseButton: '选择',
			}
		},
		onLoad(options) {

		},
		onShow() {
			this.getGoodsList()
		},
		onReachBottom() {

		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onSearch(e) {
				console.log(e)
				if (!e.value) {
					uni.showToast({
						icon: 'none',
						title: '请输入关键词'
					});
				} else {

				}
			},
			onClickRight(index) {
				if (index == '选择') {
					this.isCheckedShow = true
					this.chooseButton = '全选'
				} else if (index == '全选') {
					for (let item of this.list) {
						item.checked = true
					}
				}
			},
			onCheckboxChange(e) {
				for (let item of this.list) {
					if (e.detail.value.includes(item.id)) {
						item.checked = true
					} else {
						item.checked = false
					}
				}
				console.log(this.list)
			},
			onCancel() {
				this.isCheckedShow = false
				this.chooseButton = '选择'
				for (let item of this.list) {
					item.checked = false
				}
			},
			onConfirm() {
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
			},
			getGoodsList() {
				this.$http('user/store/show', "GET", '', res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						this.bookData = data.data.bookcase //书架
						this.bookData.dataNumber = data.data.bookcase.goods.length
						this.clotheData = data.data.armoire //衣柜
						this.clotheData.dataNumber = data.data.armoire.goods.length
						this.shoeData = data.data.shoebox //鞋柜
						this.shoeData.dataNumber = data.data.shoebox.goods.length
						this.storageData = data.data.storeroom //储藏室
						this.storageData.dataNumber = data.data.storeroom.goods.length
						this.groceriesData = data.data.sundries //杂货架
						this.groceriesData.dataNumber = data.data.sundries.packs.length
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
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
			z-index: 10;
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
		z-index: 20;

		image {
			width: 218upx;
			height: 120upx;
		}
	}
</style>
