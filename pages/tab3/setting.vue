<template>
	<div class="layout">
		<hx-navbar :back="true" title="设置" color="rgba(40,40,40,1)" barPlaceholder="hidden" transparent="auto"
		 :background-color="[255, 255, 255]">
			<view slot="left">
				<image @click="onClickBack" src="../../static/images/header-back.png" style="width: 40upx; height: 40upx; margin: 30upx 32upx 0;"></image>
			</view>
		</hx-navbar>
		<!-- 内容 -->
		<view class="content">
			<uni-list>
				<uni-list-item title="头像" note="">
					<!-- <image style="width: 120upx;height: 120upx;border-radius: 50%;margin-left: 300upx;" src="../../static/tab3/my_image.png" mode=""></image> -->
				</uni-list-item>
				<uni-list-item title="昵称" note=""></uni-list-item>
				<uni-list-item title="手机号" note=""></uni-list-item>
				<uni-list-item title="地址管理" note=""></uni-list-item>
				<uni-list-item @click="onLogout" title="注册账号" note=""></uni-list-item>
			</uni-list>
			<!-- <van-cell center class="head_image" is-link title="头像">
				<img src="../../static/tab3/my_image.png" alt />
			</van-cell>
			<van-cell is-link title="昵称" value="dinghan" />
			<van-cell is-link title="手机号" value="13198279824" />
			<van-cell is-link @click="onAddress" title="地址管理" />
			<van-cell is-link @click="onLogout" title="注销账号" /> -->
		</view>
		<button @click="onExit" class="logout" block>退出账号</button>
	</div>
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
							uni.toastSuccess('退出成功')
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
		border-radius: 16upx 16upx 0 0;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
</style>
