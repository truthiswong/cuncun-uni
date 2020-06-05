<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="消费明细" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- <uni-nav-bar fixed="true">
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
		</uni-nav-bar> -->
		<!-- 内容 -->
		<view class="content">
			<uni-list class="list_custom list_custom_align_start">
				<uni-list-item v-for="(item,index) in list" :key="index" :showArrow="false">
					<view slot="default" class="list_left">
						<view class="list_left_icon">
							<text class="list_left_text" :class="{'list_left_text_active': item.refund}">{{item.refund?'退':'支'}}</text>
						</view>
						<view class="list_left_title">
							<text>{{item.subject}}</text>
							<!-- <text>{{item.type.name}}</text> -->
							<p>{{item.refundReason}}</p>
							<p>{{item.time}}</p>
						</view>
					</view>
					<view slot="right">
						<text class="list_right" :class="{'list_right_active': item.refund}" v-if="item.amount">¥ {{item.refund?'+':'-'}}{{item.amount}}</text>
					</view>
				</uni-list-item>
			</uni-list>
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
				finished: false,
			};
		},
		onLoad() {},
		onShow() {
			this.getDetails()
		},
		onPullDownRefresh() {
			this.pageNumber = 0
			this.totalPages = 1
			this.finished = false
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
						// #ifdef APP-PLUS
						uni.stopPullDownRefresh()
						// #endif
						let data = res.data
						if (data.success) {
							if (this.pageNumber == 0) {
								this.list = []
							}
							for (let item of data.data.data) {
								item.time = this.$moment(item.payTime).format('YYYY-MM-DD HH:mm:ss')
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

	.content {
		padding: 0 30upx;

		.list_left {
			display: flex;

			.list_left_icon {
				width: 60upx;
				height: 60upx;
				line-height: 60upx;
				background-color: #EEEEEE;
				border-radius: 50%;
				text-align: center;
				.list_left_text {
					display: block;
					width: 60upx;
					height: 60upx;
					line-height: 60upx;
					font-size: 28upx;
					color: #333333;
				}
				.list_left_text_active {
					color: #03A6A6;
				}
			}

			.list_left_title {
				box-sizing: border-box;
				padding: 0 20upx;
				text {
					font-size: 28upx;
				}

				p {
					font-size: 24upx;
					margin-top: 12upx;
					color: rgba(136, 136, 136, 1);
				}
			}
		}

		.list_right {
			color: #333333;
			font-size: 36upx;
			font-weight: 500;
		}
		.list_right_active {
			color: #DF5000;
		}
	}
</style>
