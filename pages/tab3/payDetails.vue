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
			<view v-if="finished" style="text-align: center;font-size:24upx;font-weight:400;color:rgba(178,178,178,1);margin: 20upx 0;line-height:33upx;">
				这是我的底线，没有更多的咯～
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list: [],
				pageNumber: 0,
				totalPages: 1,
				finished: false
			};
		},
		onLoad() {},
		onShow() {
			this.getDetails()
		},
		onReachBottom() {
			this.getDetails()
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getDetails() {
				if (this.totalPages > this.pageNumber) {
					this.$http('user/payment/page?pageSize=20&pageNumber=' + this.pageNumber, "GET", '', res => {
						let data = res.data
						if (data.success) {
							for (let item of data.data.data) {
								item.time = this.$moment(item.payTime).format('YYYY-MM-DD')
								item.amount = item.amount.toFixed(2)
							}
							this.pageNumber++
							this.list = this.list.concat(data.data.data)
							this.totalPages = data.data.totalPages
							if (this.totalPages == this.pageNumber) {
								this.finished = true
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: data.message
							});
						}
					})
				} else {
					this.finished = true
				}
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
