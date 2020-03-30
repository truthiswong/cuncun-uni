<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="设置" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="list_padding30 list_custom_margin20" style="background-color: #FFFFFF;">
				<uni-list class="list_custom">
					<uni-list-item title="头像">
						<view slot="right">
							<image style="width: 120upx;height: 120upx;border-radius: 50%;margin-left: 300upx;" src="../../static/tab3/my_image.png"
							 mode=""></image>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="list_padding30 list_custom_margin20" style="background-color: #FFFFFF;">
				<uni-list class="list_custom list_custom_margin20">
					<uni-list-item title="昵称" rightText="Ding Han"></uni-list-item>
					<uni-list-item title="手机号" rightText="021-34283744"></uni-list-item>
					<navigator url="/pages/tab3/address">
						<uni-list-item title="地址管理"></uni-list-item>
					</navigator>
				</uni-list>
			</view>
			<view class="list_padding30 list_custom_margin20" style="background-color: #FFFFFF;">
				<uni-list class="list_custom list_custom_margin20">
					<uni-list-item title="注册账号" @click="onLogout"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<button @click="onExit" class="logout" block>退出账号</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {};
		},
		watch: {},
		computed: {},
		created() {},
		activated() {},
		deactivated() {},
		mounted() {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onAddress() {
				this.$router.push({
					path: "/address"
				});
			},
			onLogout() {
				uni.showModal({
					title: '提示',
					content: '注销账号后，该账号里所有数据将被清空。',
					success(res) {
						if (res.confirm) {
							uni.toastSuccess('退出成功')
						}
					}
				})
			},
			onExit() {
				uni.showModal({
					title: '提示',
					content: '您确定要退出登录吗？',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
							uni.showToast({
								title: '退出成功',
								icon: 'none'
							})
						}
					}
				})
			}
		}
	};
</script>

<style scoped="scoped">
	.layout {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: rgba(249, 249, 249, 1);
	}

	.content {
		position: relative;
		width: 100%;
		box-sizing: border-box;
	}

	.list {
		background-color: #ffffff;
		margin: 20upx 0;
	}

	.head_image img {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.logout {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 130upx;
		background: rgba(231, 66, 67, 1);
		box-shadow: 0 -20upx 10upx 0 rgba(0, 0, 0, 0.05);
		font-size: 32upx;
		line-height: 130upx;
		border-radius: 16upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
</style>
