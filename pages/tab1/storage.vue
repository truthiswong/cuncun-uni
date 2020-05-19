<template>
	<view>
		<uni-nav-bar color="#FFFFFF" title="我的储藏室" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" style="" src="../../static/tab1/search_white.png"></image>
					<button @click="onClickRight(chooseButton)" plain="true" class="choose_button">{{chooseButton}}</button>
				</view>
			</view>
		</uni-nav-bar>
		<uni-nav-bar color="#000000" title="我的储藏室" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="!headerShow" style="position: absolute; top: 0;" shadow="true">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" src="../../static/tab1/search_green.png"></image>
					<button @click="onClickRight(chooseButton)" plain="true" class="choose_button choose_button_scroll">{{chooseButton}}</button>
				</view>
			</view>
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="cont_top" :style="{background: 'url('+ cont_top_bg +') no-repeat center center / cover'}">
				<p>您一共放了 <text>{{list.length}}</text> 件物品</p>
				<p>需要的时候随时拿，要的就是这种感觉～</p>
			</view>
			<view style="padding: 0 30upx;">
				<view class="no_data" v-if="list.length<=0">
					<image src="../../static/tab1/no_data.png" mode=""></image>
					<navigator url="/pages/tab2/addOrder">
						<button class="common_button">去存点鞋子</button>
					</navigator>
				</view>
				<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
					<view class="scroll_content4" v-for="(item,index) in list" :key='index' style="display: inline-block;">
						<label>
							<image :src="item.coverPic"></image>
							<view class="checkbox_item" v-if="isCheckedShow">
								<checkbox :value="item.id" :checked="item.checked" color="white" />
							</view>
						</label>
					</view>
				</checkbox-group>
			</view>
			<view class="bottom_button" v-if="isCheckedShow">
				<image @click="onCancel" style="width: 218upx;height: 124upx;" src="../../static/tab1/long_cancel.png" mode=""></image>
				<image @click="onConfirm" style="width: 268upx;height: 124upx;" src="../../static/tab1/come_back.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				headerShow: true,
				cont_top_bg: '../../static/tab1/storage_top_bg.png',
				scroll_bg1: '../../static/tab1/bookbox.png',
				scroll_bg2: '../../static/tab1/clothes_box.png',
				scroll_bg3: '../../static/tab1/shoes_box.png',
				list: [],
				isCheckedShow: false,
				chooseButton: '选择',
			}
		},
		onLoad() {

		},
		onShow() {
			this.getGoodsList()
		},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onClickRight(index) {
				if (index == 1) {
					uni.navigateTo({
						url: "/pages/tab1/search"
					})
				} else if (index == '选择') {
					if (this.list.length <= 0) {
						return
					}
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
								url: '/pages/tab1/orderBack',
								success: () => {
									// #ifdef APP-PLUS
									uni.report('orderBackCome', {
										'describe': '把这些送回来'
									})
									// #endif
								}
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
			// 获取物品列表
			getGoodsList() {
				this.$http('user/goods/list?top=10&type=storeroom', "GET", '', res => {
					let data = res.data
					if (data.success) {
						for (let item of data.data) {
							item.checked = false
						}
						this.list = data.data //书架
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
		height: 44px;
	}

	.header_icon image {
		width: 44upx;
		height: 44upx;
		vertical-align: middle;
	}

	.choose_button {
		display: inline-block;
		width: 96upx;
		height: 60upx;
		border-radius: 5px;
		border: 1px solid rgba(255, 255, 255, 1);
		font-size: 28upx;
		line-height: 58upx;
		color: rgba(255, 255, 255, 1);
		padding: 0;
		text-align: center;
		vertical-align: middle;
		margin-left: 50upx;
		box-sizing: border-box;
	}

	.choose_button_scroll {
		border: 1px solid rgba(0, 0, 0, 1);
		color: #000000;
	}

	.content {
		width: 100%;
		height: 100%;
	}

	.cont_top {
		width: 100%;
		height: 470upx;
		box-sizing: border-box;
		text-align: center;
		padding-top: 200upx;
		margin-bottom: 30upx;
	}

	.cont_top p {
		font-size: 28upx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 46upx;
		margin: 20upx;
	}

	.cont_top p text {
		font-size: 40upx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 46upx;
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

	.scroll_content4 {
		position: relative;
		width: 32%;
		height: 200upx;
		text-align: center;
		margin: 16upx 5upx 50upx;
		box-sizing: border-box;
		padding: 20upx 18upx 0;
		background: rgba(230, 230, 230, 1);

		image {
			width: 180upx;
			height: 180upx;
		}

		.checkbox_item {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 10;
		}
	}
</style>
