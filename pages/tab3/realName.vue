<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="实名认证" status-bar="true" fixed="true" :shadow="false"></uni-nav-bar>
		<!-- 内容 -->
		<view style="padding: 0 60upx">
			<view class="top_img">
				<image src="../../static/common/finish.png" mode=""></image>
			</view>
			<uni-list class="list_custom list_custom_item list_custom_margin20">
				<uni-list-item title="姓名：" :showArrow="false">
					<view slot="right" class="input">
						<input type="text" v-model="username" placeholder="请输入姓名" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="身份证：" :showArrow="false">
					<view slot="right" class="input">
						<input type="idcard" v-model="idCard" maxlength="18" placeholder="请输入身份证号" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<!-- <uni-list-item title="签证机关：" :showArrow="false">
					<view slot="right" class="input">
						<input type="idcard" v-model="idOrgan" disabled placeholder="上传身份照片认证" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="有效日期：" :showArrow="false">
					<view slot="right" class="input">
						<input type="idcard" v-model="idDate" disabled placeholder="上传身份照片认证" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="证件照片：" :showArrow="false"></uni-list-item>
				<view class="flex_between id_card">
					<image @click="changeIDCardImage1" :src="idCardSrc1" mode=""></image>
					<image @click="changeIDCardImage2" :src="idCardSrc2" mode=""></image>
				</view> -->
			</uni-list>
		</view>
		<button @click="onConfirm" class="address_button">前往认证</button>
		<text @click="onReturn" class="address_button address_button_active">暂不认证，先看看</text>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				username: '',
				idCard: '',
				idCardSrc1: '../../static/common/idcard-z.png',
				idCardSrc2: '../../static/common/idcard-f.png',
				idOrgan: '',
				idDate: '',
				buttonActive: false, // 颜色控制
				realNameConfirm: false, //是否实名
			};
		},
		watch: {
			username() {
				if (this.username && this.idCard) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			idCard() {
				if (this.username && this.idCard) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			}
		},
		onLoad(op) {
			// this.getIdinfo()
		},
		onShow() {
			let user = uni.getStorageSync('user')
			if (user.realNameConfirm) {
				this.realNameConfirm = user.realNameConfirm
			}
			// #ifdef APP-PLUS
			setTimeout(function() {
				var args = plus.runtime.arguments;
				if (args) {
					// 处理args参数，如直达到某新页面等 
					console.log(args)
				}
			}, 10);
			// #endif
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeIDCardImage1() {
				if (this.realNameConfirm) {
					return
				}
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						let imageSize = chooseImageRes.tempFiles[0].size
						let quality = 100000000 / imageSize > 100 ? 100 : 100000000 / imageSize
						quality = Math.floor(quality)
						console.log(imageSize)
						console.log(quality)
						const tempFilePaths = chooseImageRes.tempFilePaths
						uni.compressImage({
							src: tempFilePaths[0],
							quality: quality,
							success: res => {
								console.log(res.tempFilePath)
								uni.uploadFile({
									url: 'http://cuncun.app.iisu.cn/server/data/user/upload/idcarda',
									filePath: res.tempFilePath,
									header: {
										// 'Content-Type': 'application/x-www-form-urlencoded',
										'X-TENANT-ID': 'cuncun:cc@2020',
										'Authorization': uni.getStorageSync('token')
									},
									name: 'a',
									formData: {},
									success: (res) => {
										let data = res.data
										let img = JSON.parse(data)
										console.log(img)
										this.idCardSrc1 = img.data.idCardA
										this.username = img.data.name
										this.idCard = img.data.idNo
										try {
											const user = uni.getStorageSync('user');
											if (user) {
												user.username = this.username
												user.idCard = this.idCard
												user.idCardSrc1 = this.idCardSrc1
												uni.setStorage({
													key: 'user',
													data: user
												});
											}
										} catch (e) {}
									}
								})
							}
						})
					}
				});
			},
			changeIDCardImage2() {
				if (this.realNameConfirm) {
					return
				}
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						let imageSize = chooseImageRes.tempFiles[0].size
						let quality = 100000000 / imageSize > 100 ? 100 : 100000000 / imageSize
						quality = Math.floor(quality)
						console.log(imageSize)
						console.log(quality)
						const tempFilePaths = chooseImageRes.tempFilePaths
						uni.compressImage({
							src: tempFilePaths[0],
							quality: quality,
							success: res => {
								console.log(res.tempFilePath)
								uni.uploadFile({
									url: 'http://cuncun.app.iisu.cn/server/data/user/upload/idcardb',
									filePath: res.tempFilePath,
									header: {
										// 'Content-Type': 'application/x-www-form-urlencoded',
										'X-TENANT-ID': 'cuncun:cc@2020',
										'Authorization': uni.getStorageSync('token')
									},
									name: 'b',
									formData: {},
									success: (res) => {
										let data = res.data
										let img = JSON.parse(data)
										console.log(img)
										this.idCardSrc2 = img.data.idCardB
										this.idOrgan = img.data.idIssueOrgan
										this.idDate = `${img.data.idIssueDate}-${img.data.idExpiryDate}`
										try {
											const user = uni.getStorageSync('user');
											if (user) {
												user.idCardSrc2 = this.idCardSrc2
												user.idOrgan = this.idOrgan
												user.idDate = this.idDate
												uni.setStorage({
													key: 'user',
													data: user
												});
											}
										} catch (e) {}
									}
								})
							}
						})
					}
				});
			},
			onConfirm() {
				if (!this.username) {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名'
					});
				} else if (!this.idCard) {
					uni.showToast({
						icon: 'none',
						title: '请输入身份证号'
					});
				} else {
					let data = {
						certName: this.username,
						certNo: this.idCard
					}
					this.$http('user/alipay/user/certify/init', "POST", data, res => {
						let data = res.data
						console.log(data)
						if (data.success) {
							// #ifdef APP-PLUS
							// let openAlipayStr = 'alipays : //platformapi/startapp?appId=tech.cuncun.cuncun&url=' + encodeURIComponent(data.data)
							// let openAlipayStr = 'alipays : //platformapi/startapp?appId=2021001154688136&url=' + encodeURIComponent(data.data)
							//url的获取参考本文档“2.生成认证服务请求地址” 
							// const certifyUrl = alipays: //platformapi/startapp?appId=20000067&url=encodeURIComponent(url);
							plus.runtime.openURL(data.data, function(res) {
								console.log(res);
							});
							// #endif
						} else {
							uni.showToast({
								icon: 'none',
								title: data.message
							});
						}
					})
					// uni.navigateBack({
					// 	delta: 1
					// })
				}
			},
			onReturn() {
				uni.navigateBack({
					delta: 1
				})
				// #ifdef APP-PLUS
				uni.report('realNameReturn', {
					'describe': '暂不认证'
				})
				// #endif
			},
			getRealNameReturn() {
				this.$http('user/alipay/user/certify/query', "GET", '', res => {
					let data = res.data
					console.log(data)
					if (data.success) {
						this.realNameConfirm = true
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
			getIdinfo() {
				this.$http('user/idinfo', "GET", '', res => {
					let data = res.data
					if (data.success) {
						this.username = data.data.name
						this.idCard = data.data.idNo
						// this.idCardSrc1 = data.data.idNo
						// this.idCardSrc2 = data.data.idNo
						this.idOrgan = data.data.idIssueOrgan
						this.idDate = data.data.idIssueDate + '-' + data.data.idExpiryDate
					} else {
						uni.showToast({
							icon: 'none',
							title: data.message
						});
					}
				})
			},
		},
	};
</script>

<style scoped lang="scss">
	.top_img {
		margin: 40upx auto 0;
		text-align: center;

		image {
			width: 200upx;
			height: 276upx;
		}
	}

	.input {
		width: 500upx;
		font-weight: 400;
		font-size: 28upx;
		line-height: 40upx;
	}

	.id_card {
		image {
			width: 330upx;
			height: 210upx;
		}
	}

	.address_button {
		width: 650upx;
		height: 98upx;
		background: rgba(59, 193, 187, 1);
		border-radius: 6upx;
		font-size: 30upx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 98upx;
		text-align: center;
		margin-top: 80upx;
	}

	.address_button_active {
		display: block;
		text-align: center;
		background: rgba(59, 193, 187, 0);
		color: rgba(6, 185, 185, 1);
		border: none;
		margin: 20upx auto 0;
	}
</style>
