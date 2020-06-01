<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="地址管理" status-bar="true" fixed="true">
			<view slot="right" @click="onClickRight" class="header_icon">
				<text>添加新地址</text>
			</view>
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="address_list" v-for="item in addressList" :key="item.id">
				<radio-group>
					<view @click="onChooseAddress(item)">
						<view class="row list_top">
							<text class="top_name">{{item.linkman}}</text>
							<text class="top_phone">{{item.mobile}}</text>

						</view>
						<view class="address_des">
							<uni-tag class="address_tag_def" v-if="item.dft" text="默认" size="small" :inverted="false" type="error"></uni-tag>
							<uni-tag class="address_tag address_tag_def" :text="item.tag[0].name" size="small" :inverted="false" type="default"></uni-tag>
							<text class="address">{{item.detailAddress}}</text>
						</view>
					</view>
					<view class="row flex_between list_bottom">
						<view>
							<!-- <label>
								<radio :value="item.id" :checked="item.dft" disabled style="transform:scale(0.8);" color="rgba(59, 193, 187, 1)" />
								<text>默认地址</text>
							</label> -->
						</view>
						<view class="row">
							<view @click="onDetele(item.id)" class="row image1">
								<image src="../../static/tab3/delete.png" mode=""></image>
								<text class="custom_text">删除</text>
							</view>
							<view @click="onEdit(item)" class="row image2">
								<image src="../../static/tab3/editor.png" mode=""></image>
								<text class="custom_text">编辑</text>
							</view>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				checked: true,
				addressList: [],
				chooseAddress: false, // 是否选择地址
			};
		},
		onLoad(op) {
			this.chooseAddress = op.chooseAddress
		},
		onShow() {
			this.getAddressList()
		},
		watch: {
			// address() {
			// 	let address = uni.getStorageSync('address')
				
			// 	if (address.id == ) {
			// 		uni.setStorage({
			// 			key: 'address',
			// 			data: data.data[0],
			// 		})
			// 	} else {
			// 		uni.setStorage({
			// 			key: 'address',
			// 			data: data.data[result],
			// 		})
			// 	}
			// }
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onClickRight() {
				uni.navigateTo({
					url: '/pages/tab3/addAddress'
				})
			},
			onDefaultAddress() {
				this.checked = !this.checked
			},
			onChooseAddress(item) {
				console.log(item)
				if (this.chooseAddress) {
					// let pages = getCurrentPages(); //获取所有页面栈实例列表
					// let nowPage = pages[pages.length - 1]; //当前页页面实例
					// let prevPage = pages[pages.length - 2]; //上一页页面实例
					// prevPage.$vm.address = item; //修改上一页data里面的couponNumber参数值为value
					uni.setStorage({
						key: 'address',
						data: item,
						success: () => {
							uni.navigateBack();
						}
					})
				}
			},
			onDetele(id) {
				uni.showModal({
					title: '提示',
					content: '确认删除地址吗?',
					success: (res) => {
						if (res.confirm) {
							let data = {
								id: id
							}
							this.$http('user/addr/del', "POST", data, res => {
								let data = res.data
								if (data.success) {
									uni.showToast({
										icon: 'none',
										title: '删除成功'
									});
									uni.removeStorage({
										key: 'address',
										success: () => {
											this.getAddressList()
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
					}
				})
			},
			onEdit(item) {
				uni.navigateTo({
					url: '/pages/tab3/addAddress?address=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			getAddressList() {
				this.$http('user/addr/list', "GET", '', res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						if (data.data.length > 0) {
							let result = data.data.findIndex(value => {
								return value.dft == true;
							})
							for (let item of data.data) {
								item.detailAddress =
									`${item.area.province} ${item.area.city?item.area.city:''} ${item.area.district?item.area.district:''} ${item.plotName} ${item.address}`
							}
							if (uni.getStorageSync('address')) {
								let address = uni.getStorageSync('address')
								for (let item of data.data) {
									if (address.id == item.id) {
										uni.setStorage({
											key: 'address',
											data: item
										})
									}
								}
							} else {
								if (result == -1) {
									uni.setStorage({
										key: 'address',
										data: data.data[0],
									})
								} else {
									uni.setStorage({
										key: 'address',
										data: data.data[result],
									})
								}
							}
						} else {
							uni.removeStorage({
								key: 'address'
							})
						}
						this.addressList = data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}
</style>

<style scoped lang="scss">
	.header_icon {
		width: 200upx;
		height: 44px;
	}

	.header_icon text {
		font-size: 30upx;
		font-weight: 600;
		color: rgba(3, 166, 166, 1);
		line-height: 40upx;
		vertical-align: middle;
	}

	.header_right {
		font-size: 0.28rem;
		color: rgba(3, 166, 166, 1);
	}

	.address_list {
		margin-top: 0.2rem;
		background-color: #FFFFFF;
		padding: 30upx;

		.list_top {
			font-size: 28upx;
			font-weight: 500;
			color: rgba(40, 40, 40, 1);
			line-height: 60upx;

			.top_name {
				display: block;
				// width: 240upx;
				margin-right: 20upx;
			}

			.top_phone {
				margin-right: 40upx;
			}

			.address_tag {
				height: 30upx;
				line-height: 30upx;
				font-size: 22upx;
				font-weight: 400;
				color: rgba(189, 103, 108, 1);
			}
		}

		.address_des {
			.address_tag_def {
				display: inline-block;
				width: 50upx;
				height: 32upx;
				text-align: center;
				line-height: 32upx;
				font-size: 22upx;
				font-weight: 400;
				color: rgba(189, 103, 108, 1);
				margin-right: 20upx;
			}

			.address {
				font-size: 26upx;
				font-weight: 400;
				color: rgba(104, 104, 104, 1);
				line-height: 37upx;
			}
		}

		.list_bottom {
			border-top: 2upx solid #F2F2F2;
			padding-top: 20upx;
			margin-top: 20upx;

			.check_box {
				.uni-checkbox-input {
					background-color: #03A6A6;
					color: #FFFFFF;
					border-radius: 50%;
				}

			}

			text {
				font-size: 28upx;
				font-weight: 400;
				color: rgba(68, 68, 68, 1);
			}

			.image1 {
				image {
					width: 18upx;
					height: 26upx;
				}
			}

			.image2 {
				margin-left: 40upx;

				image {
					width: 26upx;
					height: 26upx;
				}
			}

			.custom_text {
				background-color: rgba(0, 0, 0, 0);
				border: 0 none;
				font-size: 28upx;
				font-weight: 400;
				color: rgba(68, 68, 68, 1);
				vertical-align: top;
				margin-left: 10upx;
			}
		}
	}

	.change_address {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}
</style>
