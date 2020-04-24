<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="确认地址" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view style="margin-top: 20upx;padding: 0 30upx;background-color: #FFFFFF;">
			<view class="">
				<uni-search-bar :radius="100" @confirm="onSearch"></uni-search-bar>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				localtion: {
					longitude: 0,
					latitude: 0
				}
			};
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			uni.getLocation({
			    type: 'wgs84',
			    success: (res)=> {
					this.localtion.longitude = res.longitude
					this.localtion.latitude = res.latitude
					console.log(this.localtion)
			    }
			});
			// #endif
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
						title: '请输入地址'
					});
				} else {
					let data = {
						point: {
							latitude: res.longitude,
							longitude: res.latitude
						},
						key: e.value,
						radius: 10000,
						index: 1
					}
					plus.maps.Search()
					uni.poiSearchNearBy(data, (res) => {
						console.log(res)
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
			font-size: 26upx;
			font-weight: 400;
			color: rgba(40, 40, 40, 1);
		}
	}

	.header_icon {
		width: 200upx;
		height: 44px;
	}

	.input {
		width: 429upx;
		font-weight: 400;
		font-size: 28upx;
		line-height: 40upx;
		color: #333333;
	}

	.change_address {
		width: 388upx;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 40upx;

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
