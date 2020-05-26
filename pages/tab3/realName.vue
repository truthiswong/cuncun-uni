<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="实名认证" status-bar="true" fixed="true" :shadow="false"></uni-nav-bar>
		<!-- 内容 -->
		<view style="padding: 0 60upx">
			<view class="top_img">
				<image src="../../static/common/finish.png" mode=""></image>
			</view>
			<view>
				<p style="font-size: 28upx;line-height: 48upx;">为了正常使用本服务，请完成实名认证。</p>
				<p style="font-size: 28upx;line-height: 48upx;">存存使用高安全性的支付宝实名认证服务，不会产生任何费用，请放心使用。</p>
			</view>
			<uni-list class="list_custom list_custom_item list_custom_margin20">
				<uni-list-item title="姓名：" :showArrow="false">
					<view slot="right" class="input">
						<input type="text" v-model="username" :disabled="realNameConfirm" placeholder="请输入姓名" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="身份证：" :showArrow="false">
					<view slot="right" class="input">
						<input type="idcard" v-model="idCard" :disabled="realNameConfirm" maxlength="18" placeholder="请输入身份证号"
						 placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<button @click="onConfirm" :disabled="realNameConfirm" class="address_button">{{realNameConfirm?'已认证':'前往认证'}}</button>
		<text @click="onReturn" v-if="!realNameConfirm" class="address_button address_button_active">暂不认证，先看看</text>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				username: '',
				idCard: '',
				buttonActive: false, // 颜色控制
				realNameConfirm: false, //是否实名
				urlschemes: null
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
		onLoad(option) {
		},
		onShow() {
			let user = uni.getStorageSync('user')
			console.log(user)
			console.log(user.realNameConfirm)
			if (user.realNameConfirm) {
				this.realNameConfirm = true
			} else {
				this.realNameConfirm = false
			}
			if (user.name) {
				this.username = user.name
			}
			if (user.idNo) {
				this.idCard = user.idNo
			}
			// #ifdef APP-PLUS
			this.$nextTick(() => {
				setTimeout(() => {
					this.urlschemes = plus.runtime.arguments
					console.log(this.urlschemes)
					// hbuilder://realname  cuncun://realname
					if (this.urlschemes == 'cuncun://realname') {
						// 处理args参数，如直达到某新页面等 
						console.log(this.urlschemes)
						this.urlschemes = null
						plus.runtime.arguments = null
						this.getRealNameReturn()
					}
				}, 50)
			})
			// #endif
		},
		onBackPress(e) {
			console.log(e)
			if (e.from == 'backbutton') {
				let loginRealName = uni.getStorageSync('loginRealName')
				if (loginRealName) {
					uni.switchTab({
						url: '/pages/tabs/tab1'
					})
				} else {
					uni.navigateBack()
				}
			}
		},
		methods: {
			onClickBack() {
				let loginRealName = uni.getStorageSync('loginRealName')
				if (loginRealName) {
					uni.switchTab({
						url: '/pages/tabs/tab1'
					})
				} else {
					uni.navigateBack()
				}
			},
			onConfirm() {
				if (this.realNameConfirm) {
					return
				}
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
						certNo: this.idCard,
						returnUrl: 'cuncun://realname' // hbuilder://realname cuncun://realname
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
				}
			},
			onReturn() {
				if (uni.getStorageSync('loginRealName')) {
					console.log(1111)
					uni.switchTab({
						url: '/pages/tabs/tab1'
					})
				} else {
					console.log(22222)
					// uni.navigateBack({
					// 	delta: 1
					// })
					uni.navigateBack()
				}
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
						uni.navigateTo({
							url: '/pages/tab3/realNameSuccess'
						})
					} else {
						uni.navigateTo({
							url: '/pages/tab3/realNameFail'
						})
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
