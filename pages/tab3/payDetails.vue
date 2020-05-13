<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="消费明细" status-bar="true" fixed="true"></uni-nav-bar>
		<uni-nav-bar fixed="true">
			<view slot='left' style="width: 100upx;padding-left: 18upx;">
				时间
			</view>
			<view slot='default' style="width: 360upx;text-align: center;">
				金额
			</view>
			<view slot='right' style="width: 100upx;padding-right: 18upx;">
				<view style="text-align: right;">
					消费项
				</view>
			</view>
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view v-for="(item,index) in list" :key="index" class="flex_between pay_list" style="width: 100%;">
				<view style="width: 30%;">
					<text>{{item.time}}</text>
				</view>
				<view style="width: 40%;text-align: center;padding-left: 2.5%;">
					<text v-if="item.amount">¥ {{item.amount}}</text>
				</view>
				<view style="width: 40%;text-align: right;">
					<text>{{item.type.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list: []
			};
		},
		onLoad() {},
		onShow() {
			this.getDetails()
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getDetails() {
				this.$http('user/payment/page', "GET", '', res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						for (let item of data.data.data) {
							item.time = this.$moment(item.payTime).format('YYYY-MM-DD')
						}
						this.list = data.data.data
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			}
		}
	};
</script>

<style>
	page {}
</style>

<style scoped lang="scss">
	.layout {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.pay_list {
		box-sizing: border-box;
		padding: 0 30upx;
		width: 100%;
		height: 94upx;
		line-height: 94upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(40, 40, 40, 1);
		border-bottom: 1upx solid rgba(236, 237, 238, .38);
	}
</style>
