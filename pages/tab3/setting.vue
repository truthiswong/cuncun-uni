<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="设置" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="list_padding30 list_custom_margin20" style="background-color: #FFFFFF;">
				<uni-list class="list_custom">
					<uni-list-item title="头像">
						<view slot="right">
							<image @click="chooseHeadImage" style="width: 120upx;height: 120upx;border-radius: 50%;margin-left: 300upx;"
							 :src="headImage"></image>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="list_padding30 list_custom_margin20" style="background-color: #FFFFFF;">
				<uni-list class="list_custom list_custom_margin20">
					<uni-list-item title="昵称" @click="onNick" :rightText="nickname"></uni-list-item>
					<navigator url="/pages/tab3/changePhone">
						<uni-list-item title="手机号" rightText="021-34283744"></uni-list-item>
					</navigator>
					<navigator url="/pages/tab3/realName">
						<uni-list-item title="实名认证" rightText="未实名"></uni-list-item>
					</navigator>
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
		<uni-popup ref="nick">
			<view class="nickname">
				<input type="text" placeholder="请输入昵称" v-model="nicknameSet" placeholder-style="font-size:14px;font-weight:400;color:rgba(204,204,204,1);margin-left:20upx" />
				<view class="flex_between">
					<button class="button_cancel" @click="buttonCancel">取消</button>
					<button class="button_confirm" @click="buttonConfirm">确定</button>
				</view>
			</view>
		</uni-popup>
		<button @click="onExit" class="logout">退出账号</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				headImage: require('../../static/tab3/my_image.png'),
				nickname: 'Ding Han',
				nicknameSet: ''
			};
		},
		onLoad() {
			let user = uni.getStorageSync('user')
			if (user.headImage) {
				this.headImage = user.headImage
			}
			if (user.nickname) {
				this.nickname = user.nickname
			}
			// this.getUserInfo()
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			chooseHeadImage() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.headImage = tempFilePaths[0]
						console.log(tempFilePaths)
						uni.uploadFile({
							url: 'http://cuncun.app.iisu.cn/server/data/user/upload/portrait', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							header: {
								// 'Content-Type': 'application/x-www-form-urlencoded',
								'X-TENANT-ID': 'cuncun:cc@2020',
								'Authorization': uni.getStorageSync('token')
							},
							name: 'portrait',
							formData: {},
							success: (res) => {
								let data = res.data
								let img = JSON.parse(data)
								this.headImage = img.data
								try {
									const user = uni.getStorageSync('user');
									if (user) {
										user.headImage = this.headImage
										uni.setStorage({
											key: 'user',
											data: user
										});
									}
								} catch (e) {
								}
							}
						});
					}
				});
			},
			onNick() {
				this.$refs.nick.open()
			},
			buttonCancel() {
				this.$refs.nick.close()
			},
			buttonConfirm() {
				if (!this.nicknameSet) {
					uni.showToast({
						icon: 'none',
						title: '昵称不能为空'
					});
				} else {
					uni.request({
						url: 'http://cuncun.app.iisu.cn/server/data/user/set/nickname',
						data: {
							name: this.nicknameSet,
						},
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'X-TENANT-ID': 'cuncun:cc@2020',
							'Authorization': uni.getStorageSync('token')
						},
						success: (res) => {
							let data = res.data
							console.log(data)
							if (data.success) {
								uni.showToast({
									icon: 'none',
									title: '昵称修改成功'
								});
								this.nickname = this.nicknameSet
								try {
									const user = uni.getStorageSync('user');
									if (user) {
										user.nickname = this.nickname
										uni.setStorage({
											key: 'user',
											data: user
										});
									}
								} catch (e) {
								}
								this.$refs.nick.close()
							} else {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
						}
					});
				}
			},
			getUserInfo() {
				uni.request({
					url: 'http://cuncun.app.iisu.cn/server/data/user/current',
					method: 'GET',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-TENANT-ID': 'cuncun:cc@2020',
						'Authorization': uni.getStorageSync('token')
					},
					success: (res) => {
						let data = res.data
						console.log(data)
						if (data.success) {
							console.log(data.data)
						} else {
							uni.showToast({
								icon: 'none',
								title: data.message
							});
						}
					}
				});
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

<style scoped lang="scss">
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

	.nickname {
		width: 710upx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 2upx 10upx 0 rgba(0, 0, 0, 0.03);
		border-radius: 3upx;
		padding: 20upx;

		input {
			width: 670upx;
			height: 68upx;
			background: rgba(246, 246, 246, 1);
			border-radius: 3upx;
			border: 1upx solid rgba(242, 242, 242, 1);
			font-size: 28upx;
			padding-left: 20upx;
		}

		button {
			width: 325upx;
			height: 80upx;
			border-radius: 3upx;
			margin: 15px 0 0;
			border: 0 none;
			line-height: 80upx;
			font-size: 28upx;
			font-weight: 600;
			background-color: #FFFFFF;
			letter-spacing: 2upx;
		}

		uni-button:after {
			border: 0 none;
		}

		.button_cancel {
			color: rgba(74, 74, 74, 1);
		}

		.button_confirm {
			background: rgba(59, 193, 187, 1);
			color: rgba(255, 255, 255, 1);
		}
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
