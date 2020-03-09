<template>
	<div class="layout">
		<hx-navbar :back="true" title="设置" color="rgba(40,40,40,1)" :fixed="true" barPlaceholder="hidden" transparent="auto"
		 :background-color="[255, 255, 255]">
			<view slot="left">
				<image @click="onClickBack" src="../../static/images/header-back.png" style="width: 40upx; height: 40upx; margin: 30upx 32upx 0;"></image>
			</view>
		</hx-navbar>
		<!-- 内容 -->
		<div class="content">
			<!-- <van-cell
        center
        class="head_image"
        is-link
        title="头像"
      > -->
			<!-- <img src="../../assets/img/tab3/my_image.png" alt /> -->
			<!-- </van-cell>
      <van-cell
        is-link
        title="昵称"
        value="dinghan"
      />
      <van-cell
        is-link
        title="手机号"
        value="13198279824"
      />
      <van-cell is-link @click="onAddress" title="地址管理" />
      <van-cell is-link @click="onLogout" title="注销账号" /> -->
		</div>
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
				this.$dialog
					.confirm({
						title: "提示",
						message: "注销账号后，该账号里所有数据将被清空。"
					})
					.then(() => {
						// on confirm

					})
					.catch(() => {
						// on cancel
					});
			},
			onExit() {
				let that = this
				uni.showModal({
					title: '温馨提示',
					content: '您确定要退出登录吗？',
					success(res) {
						if (res.confirm) {
							util.request(config.api.logout) // 只需调用，不需要处理返回结果
							util.clearUser()
							util.toastSuccess('退出成功')
							that.initUser()
							util.setSignedAt(0)
							let sysInfo = util.getSysInfo()
							sysInfo.bookshelfChanged = true
							util.setSysInfo(sysInfo)
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
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
</style>
