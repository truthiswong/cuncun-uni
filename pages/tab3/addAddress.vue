<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" :title="addressId?'编辑地址':'添加新地址'" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view style="margin-top: 20upx;padding: 0 30upx;background-color: #FFFFFF;">
			<uni-list class="list_custom list_custom_item list_custom_margin20">
				<uni-list-item title="收货人：" :showArrow="false">
					<view slot="right">
						<input class="input" type="text" v-model="name" placeholder="请输入收货人姓名" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="联系电话：" :showArrow="false">
					<view slot="right">
						<input class="input" type="number" v-model="phone" maxlength="11" placeholder="请输入联系电话" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="所在地区：" @click="gotoAddress">
					<view slot="right" class="change_address">
						<text style="font-size: 28upx;" v-if="!tipsAddress.name">{{addressText}}</text>
						<text style="font-size: 28upx;" v-else :class="{change_address_active:tipsAddress}">{{tipsAddress.name}}</text>
						<!-- <pick-regions :default-regions="defaultRegions" @getRegions="handleGetRegions">
							<text style="font-size: 14px;" :class="{change_address_active:addressText != '请选择所在地区'}">{{addressText}}</text>
						</pick-regions> -->
					</view>
				</uni-list-item>
				<uni-list-item title="详细地址：" :showArrow="false">
					<view slot="right">
						<input class="input" type="text" v-model="detailAddress" placeholder="请输入街道、楼牌号等" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="邮政编码：" :showArrow="false">
					<view slot="right">
						<input class="input" type="number" v-model="postcode" maxlength="6" placeholder="请输入邮政编码" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="标签：" :showArrow="false">
					<view slot="right" class="button_tag">
						<text :class="{button_tag_active:item.clicked}" @click="onChangeTags(item.id)" v-for="item in tagsList" :key="item.id">{{item.name}}</text>
					</view>
				</uni-list-item>
				<uni-list-item title="设置为默认地址" :showArrow="false">
					<view slot="right">
						<switch style="transform:scale(0.9);" @change="onisDefault" :checked="isDefault" color="#3BC1BB" />
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<button @click="onConfirm" class="address_button" :class="{address_button_active: buttonActive}">确定</button>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				addressId: '', //传过来的地址ID
				name: '',
				phone: '',
				addressText: '请选择所在地区',
				tipsAddress: {},
				defaultRegions: ['北京市', '市辖区', '东城区'],
				postcode: '',
				detailAddress: '',
				tagsList: [{
					id: 0,
					name: '家',
					value: 'home',
					clicked: false
				}, {
					id: 1,
					name: '公司',
					value: 'compay',
					clicked: false
				}, {
					id: 2,
					name: '学校',
					value: 'school',
					clicked: false
				}, {
					id: 3,
					name: '酒店',
					value: 'hotel',
					clicked: false
				}],
				addressTag: '',
				isDefault: false,
				buttonActive: false,
				
				// provinceList: [],
				// hours: [],
				// dateValue: [3,3],
			};
		},
		onLoad(option) {
			console.log(option)
			if (option.address) {
				let address = JSON.parse(decodeURIComponent(option.address))
				console.log(address)
				this.addressId = address.id
				this.name = address.linkman
				this.phone = address.mobile
				this.addressText = address.area.province+'-'+address.area.city+'-'+address.area.district
				this.tipsAddress.adcode = address.area.value
				this.tipsAddress.name = address.plotName
				this.tipsAddress.location = address.coordinate
				this.defaultRegions = [address.area.province, address.area.city, address.area.district]
				this.detailAddress = address.address
				this.postcode = address.zipcode
				for (let item of this.tagsList) {
					if (address.tag[0].code == item.value) {
						this.addressTag = item.value
						item.clicked = true
					}
				}
				this.isDefault = address.dft
			}
		},
		watch: {
			name() {
				if (this.name && this.phone && this.tipsAddress.location && this.detailAddress && this.postcode && this.addressTag) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			phone() {
				if (this.name && this.phone && this.tipsAddress.location && this.detailAddress && this.postcode && this.addressTag) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			addressText() {
				if (this.name && this.phone && this.tipsAddress.location && this.detailAddress && this.postcode && this.addressTag) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			detailAddress() {
				if (this.name && this.phone && this.tipsAddress.location && this.detailAddress && this.postcode && this.addressTag) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			postcode() {
				if (this.name && this.phone && this.tipsAddress.location && this.detailAddress && this.postcode && this.addressTag) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			addressTag() {
				if (this.name && this.phone && this.tipsAddress.location && this.detailAddress && this.postcode && this.addressTag) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
		},
		computed: {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			gotoAddress() {
				uni.navigateTo({
					url: '/pages/tab3/addAddressConform'
				})
			},
			onisDefault() {
				this.isDefault = !this.isDefault
			},
			onChangeTags(id) {
				for (let item of this.tagsList) {
					if (item.id == id) {
						item.clicked = true
						this.addressTag = item.value
					} else {
						item.clicked = false
					}
				}
			},
			onConfirm() {
				if (!this.name) {
					uni.showToast({
						icon: 'none',
						title: '请输入收货人姓名'
					});
				} else if (!this.phone) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
				} else if (!this.tipsAddress.location) {
					uni.showToast({
						icon: 'none',
						title: '请选择所在地区'
					});
				} else if (!this.detailAddress) {
					uni.showToast({
						icon: 'none',
						title: '请输入详细地址'
					});
				} else if (!this.postcode) {
					uni.showToast({
						icon: 'none',
						title: '请输入邮政编码'
					});
				} else if (!this.addressTag) {
					uni.showToast({
						icon: 'none',
						title: '请选择标签类型'
					});
				} else {
					// "longitude": 121.477355, //经度
					// "latitude": 31.234643 //纬度
					let data = {
						id: this.addressId,
						linkman: this.name,
						mobile: this.phone,
						areaId: this.tipsAddress.adcode,
						plotName: this.tipsAddress.name,
						address: this.detailAddress,
						zipcode: this.postcode,
						tag: this.addressTag,
						dft: this.isDefault,
						lng: this.tipsAddress.location[0],
						lat: this.tipsAddress.location[1]
					}
					this.$http('user/addr/save', "POST", data, res => {
						let data = res.data
						console.log(data)
						if (data.success) {
							uni.showToast({
								icon: 'none',
								title: '地址添加成功'
							});
							uni.navigateBack({
								delta: 1
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
	};
</script>

<style>
	page {
		background-color: #F9F9F9;
	}
</style>

<style scoped lang="scss">
	.popup_wrap {
		width: 100%;
		height: 660upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx 20upx 0 0;
		.pick_view {
			width: 100%;
			height: 570upx;
		}
		.date_item {
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			font-size:26upx;
			font-weight:400;
			color:rgba(40,40,40,1);
		}
	}
	
	.header_icon {
		width: 200upx;
		height: 44px;
	}

	.input {
		width: 430upx;
		font-weight: 400;
		font-size: 28upx;
		line-height: 40upx;
		color: #333333;
	}

	.change_address {
		width: 390upx;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 40upx;
		font-size: 28upx;
		.change_address_active {
			font-weight: 400;
			font-size: 28upx;
			line-height: 40upx;
			color: #333333;
		}
	}

	.textarea {
		width: 429upx;
		font-weight: 400;
		font-size: 28upx;
		line-height: 40upx;
		overflow: hidden;
	}

	.button_tag {
		text {
			display: inline-block;
			width: 100upx;
			height: 60upx;
			border-radius: 5upx;
			border: 1px solid rgba(218, 218, 218, 1);
			font-size: 28upx;
			font-weight: 400;
			color: rgba(74, 74, 74, 1);
			line-height: 60upx;
			margin-left: 20upx;
			text-align: center;
		}

		.button_tag_active {
			background: rgba(254, 242, 243, 1);
			border: 1px solid rgba(189, 103, 108, 1);
			color: rgba(189, 103, 108, 1);
		}
	}

	.input::-webkit-input-placeholder {
		font-size: 28upx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.input:-moz-placeholder {
		font-size: 28upx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.input:-ms-input-placeholder {
		font-size: 28upx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.change_address {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}

	.address_button {
		width: 690upx;
		height: 98upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 6upx;
		font-size: 30upx;
		font-weight: 500;
		color: rgba(178, 178, 178, 1);
		line-height: 98upx;
		text-align: center;
		margin-top: 80upx;
	}

	.address_button_active {
		background-color: #3BC1BB;
		color: #FFFFFF;
	}
</style>
