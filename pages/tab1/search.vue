<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="搜索" status-bar="true" fixed="true">
			<view slot="right">
				<view class="header_icon">
					<button @click="onClickRight(chooseButton)" plain="true" class="choose_button">{{chooseButton}}</button>
				</view>
			</view>
		</uni-nav-bar>
		<view class='search_box' @click="isAddShow=false">
			<uni-search-bar :radius="100" @confirm="onSearch"></uni-search-bar>
		</view>
		<view class="content" @click="isAddShow=false">
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
							<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
								<view class="scroll_content" :style="{background: 'url('+ scroll_bg1 +') no-repeat center center / cover'}" style="display: inline-block;"
								 v-for="(item,index) in bookData.goods" :key='index'>
									<label>
										<image :src="item.coverPic"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</label>
								</view>
							</checkbox-group>
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
							<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
								<view class="scroll_content scroll_content2" :style="{background: 'url('+ scroll_bg2 +') no-repeat center top / 100% 200upx'}"
								 v-for="(item,index) in clotheData.goods" :key='index' style="display: inline-block;">
									<label>
										<image :src="item.coverPic"></image>
										<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 112upx;" src="../../static/tab1/clothes_box1.png"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</label>
								</view>
							</checkbox-group>
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
							<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
								<view class="scroll_content scroll_content2" v-for="(item,index) in shoeData.goods" :key='index' style="display: inline-block;">
									<label>
										<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
										<image :src="item.coverPic"></image>
										<image style="position: absolute;z-index: 5;left: 0;bottom: 0; width: 100%;height: 127upx;" src="../../static/tab1/shoes_box1.png"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</label>
								</view>
							</checkbox-group>
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
							<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
								<view class="scroll_content scroll_content4" v-for="(item,index) in storageData.goods" :key='index' style="display: inline-block;width: 220upx;height: 200upx;font-size: 0;">
									<label>
										<image style="position: absolute;z-index: 0;left: 0;top: 0; width: 100%;height: 158upx;" src="../../static/tab1/shoes_box2.png"></image>
										<image :src="item.coverPic"></image>
										<view class="checkbox_item" v-if="isCheckedShow">
											<checkbox :value="item.id" :checked="item.checked" color="white" />
										</view>
									</label>
								</view>
							</checkbox-group>
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
			<image @click="onAgainAdd" src="../../static/tab1/again_add.png" mode=""></image>
			<image @click="onConfirm" src="../../static/tab1/order_back.png" mode=""></image>
			<view class="bottom_alert" v-if="isAddShow">
				<scroll-view scroll-y="true">
					<navigator url="/pages/tab1/book" v-if="bookCount>0">
						<view class="alert_list">
							<text>我的书架 ({{bookCount}})</text>
						</view>
					</navigator>
					<navigator url="/pages/tab1/clothes" v-if="clotheCount>0">
						<view class="alert_list">
							<text>我的衣柜 ({{clotheCount}})</text>
						</view>
					</navigator>
					<navigator url="/pages/tab1/shoes" v-if="shoeCount>0">
						<view class="alert_list">
							<text>我的鞋柜 ({{shoeCount}})</text>
						</view>
					</navigator>
					<navigator url="/pages/tab1/storage" v-if="storageCount>0">
						<view class="alert_list">
							<text>我的储藏室 ({{storageCount}})</text>
						</view>
					</navigator>
					<navigator url="/pages/tab1/groceries" v-if="groceriesCount>0">
						<view class="alert_list" style="border-bottom: 0;">
							<text>我的杂物架 ({{groceriesCount}})</text>
						</view>
					</navigator>
				</scroll-view>
			</view>
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
				isAddShow: false,
			}
		},
		onLoad(options) {

		},
		onShow() {
			this.getGoodsList()
			this.getAddCount()
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
					this.chooseButton = '取消'
				} else if (index == '取消') {
					this.isCheckedShow = false
					this.chooseButton = '选择'
				}
			},
			onCheckboxChange(e) {
				// for (let item of this.list) {
				// 	if (e.detail.value.includes(item.id)) {
				// 		item.checked = true
				// 	} else {
				// 		item.checked = false
				// 	}
				// }
			},
			onAgainAdd() {
				this.isAddShow = !this.isAddShow
			},
			onConfirm() {
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
			// 获取再追加列表数据
			getAddCount() {
				this.$http('user/store/count', "GET", '', res => {
					let data = res.data
					if (data.success) {
						this.bookCount = data.data.bookcase //书架
						this.clotheCount = data.data.armoire //衣柜
						this.shoeCount = data.data.shoebox //鞋柜
						this.storageCount = data.data.storeroom //储藏室
						this.groceriesCount = data.data.sundries //杂货架
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
		bottom: 0upx;
		width: 100%;
		z-index: 30;
		text-align: center;
	
		image {
			width: 324upx;
			height: 127upx;
		}
	
		.bottom_alert {
			position: absolute;
			left: 73upx;
			bottom: 160upx;
			width: 270upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2upx 14upx 0px rgba(0, 0, 0, 0.1);
			// box-shadow: 0px 30upx 110upx 0px rgba(0, 0, 0, 0.3);
	
			.alert_list {
				font-size: 28upx;
				font-weight: 400;
				color: rgba(40, 40, 40, 1);
				border-bottom: 1upx solid rgba(242, 242, 242, .58);
				line-height: 100upx;
				text-align: left;
				padding-left: 30upx;
			}
		}
	
		.bottom_alert::after {
			content: "";
			position: absolute;
			bottom: -20upx;
			left: 30upx;
			border-top: 20upx solid white;
			border-left: 20upx solid transparent;
			border-right: 20upx solid transparent;
		}
	}
</style>
