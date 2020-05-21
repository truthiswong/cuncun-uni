<template>
	<view>
		<uni-nav-bar color="#FFFFFF" title="未过安检的箱子" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="headerShow" backgroundColor="rgba(0,0,0,0)" style="position: absolute; top: 0;">
			<view slot="right">
				<view class="header_icon">
					<image @click="onClickRight(1)" style="" src="../../static/tab1/search_white.png"></image>
					<button @click="onClickRight(chooseButton)" plain="true" class="choose_button">{{chooseButton}}</button>
				</view>
			</view>
		</uni-nav-bar>
		<uni-nav-bar color="#000000" title="未过安检的箱子" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true"
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
				<p>你一共有{{list.length}}个箱子，里面包含存存不能受理的物品，请及时取回。</p>
			</view>
			<view>
				<view class="no_data" v-if="list.length<=0">
					<image src="../../static/tab1/no_data.png" mode=""></image>
				</view>
				<checkbox-group class="checkbox_custom" @change="onCheckboxChange">
					<view class="box_groceries_content flex_between" v-for="(item,index) in list" :key="index">
						<label>
							<view class="box_groceries_left">
								<image src="../../static/tab1/box_wrong.png"></image>
								<view class="checkbox_item">
									<checkbox v-if="isCheckedShow" :value="item.id" :checked="item.checked" color="white" /><text></text>
								</view>
							</view>
						</label>
						<view class="box_groceries_right" style="color: rgba(40,40,40,1);">
							<view>
								<text>{{item.code}}</text>
							</view>
							<text class="box_groceries_text">{{item.remark}}</text>
						</view>
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
				list: [],
				isCheckedShow: false,
				chooseButton: '选择',
			}
		},
		onLoad() {

		},
		onShow() {
			this.getFailList()
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
			// 获取未过安检的列表
			getFailList() {
				this.$http('user/pack/list?auditStatus=fail', "GET", '', res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						for (let item of data.data) {
							item.checked = false
						}
						this.list = data.data //未过安检
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

		image {
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
		padding: 200upx 60upx 0;
		margin-bottom: 30upx;

		p {
			font-size: 28upx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 46upx;
			margin: 20upx;
			text-align: left;

			text {
				font-size: 40upx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 46upx;
			}
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

	.no_data {
		text-align: center;
		padding: 116upx 0;

		image {
			width: 338upx;
			height: 326upx;
		}

		p {
			font-size: 28upx;
			font-weight: 400;
			width: 450upx;
			color: rgba(178, 178, 178, 1);
			line-height: 50upx;
			margin: 70upx auto 0;
		}
	}

	.box_groceries_content {
		position: relative;
		width: 100%;
		height: 234upx;
		background-color: #FFFFFF;

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
	}
</style>
