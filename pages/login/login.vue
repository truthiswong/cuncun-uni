<template>
	<view>
		<view class="hint">
			<image src="../../static/common/logo+ydb.png" mode=""></image>
			<h3>您好，欢迎使用存存</h3>
		</view>
		<view style="padding: 50upx;">
			<form @submit="login">
				<view class="input_item">
					<text class="input_text">手机号</text>
					<input class="input_input" type="number" v-model="username" maxlength="11" placeholder-style="#CCCCCC" placeholder="请输入您的手机号码" />
				</view>
				<view class="input_item">
					<text class="input_text">验证码</text>
					<view class="row">
						<input class="input_input col-6" type="number" v-model="sms" placeholder-style="#CCCCCC" placeholder="请输入短信验证码" />
						<button :disabled="disabled" @click="getSms" class="sms_button col-6">{{smsText}}</button>
					</view>
				</view>
				<label class="row" style="margin-top: 60upx;">
					<view class="col-1" style="margin-left: -8upx;">
						<checkbox-group @change="agreementChange">
							<checkbox style="transform:scale(0.6);" color="rgba(59, 193, 187, 1)" />
						</checkbox-group>
					</view>
					<view class="row col-11" style="font-size: 26upx;color: #282828; align-items: center; margin-top: 4upx;">
						<text class="col-2">我同意</text>
						<navigator class="col-10" url="/pages/login/agreement">
							<text style="color: #0269D0;">《存存用户服务协议》</text>
						</navigator>
					</view>
				</label>
				<button form-type="submit" class="common_button" :class="{common_button_active: buttonActive}">进去存存</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				username: "", //手机号
				sms: "", //验证码
				smsText: "发送验证码",
				agreement: false,
				buttonActive: false, // 颜色控制
				disabled: false, // 是否可以点击
			}
		},
		onLoad(op) {
		},
		onShow() {},
		onBackPress(e) {
			console.log(e)
			if (e.from == 'backbutton') {
				uni.showModal({
					title: '提示',
					content: '您要退出存存吗?',
					success: (res) => {
						if (res.confirm) {
							plus.runtime.quit();
						}
					}
				})
			}
			return true //表示禁止默认返回
		},
		watch: {
			username() {
				if (this.username && this.sms && this.agreement) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			sms() {
				if (this.username && this.sms && this.agreement) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			agreement() {
				if (this.username && this.sms && this.agreement) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			}
		},
		methods: {
			agreementChange() {
				this.agreement = !this.agreement;
			},
			getSms() {
				if (!this.username || this.username.length != 11) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				} else {
					uni.request({
					    url: 'http://cuncun.app.iisu.cn/server/sso/code/send',
					    data: {
							type: 'mobile',
							account: this.username
						},
						method: 'POST',
					    header: {
							'Content-Type': 'application/x-www-form-urlencoded',
					        'X-TENANT-ID': 'cuncun:cc@2020'
					    },
					    success: (res) => {
					        let data = res.data
							if (data.success) {
								uni.showToast({
									icon: 'none',
									title: data.message
								});
								// #ifdef APP-PLUS
								uni.report('loginSms', {
									'describe': '短信验证码'
								})
								// #endif
								this.disabled = true;
								let num = 30;
								this.smsText = num;
								this.timer = setInterval(() => {
									num--;
									if (num >= 0) {
										this.smsText = num;
									} else {
										clearInterval(this.timer);
										this.smsText = "再次获取";
										this.disabled = false;
									}
								}, 1000);
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
			login() {
				if (!this.username || this.username.length != 11) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				} else if (!this.sms) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
				} else if (!this.agreement) {
					uni.showToast({
						title: '您必须同意用户协议',
						icon: 'none'
					})
				} else {
					uni.request({
					    url: 'http://cuncun.app.iisu.cn/server/sso/auth/login4authcode',
					    data: {
							type: 'mobile',
							account: this.username,
							code: this.sms,
							autoreg: 'y'
						},
						method: 'POST',
					    header: {
							'Content-Type': 'application/x-www-form-urlencoded',
					        'X-TENANT-ID': 'cuncun:cc@2020'
					    },
					    success: (res) => {
							let data = res.data
							if (data.success) {
								let token = `Bearer ${data.data.token}`
								uni.setStorage({
								    key: 'token',
								    data: token,
								    success: ()=> {
										uni.switchTab({
											url: '/pages/tabs/tab1',
											success: () => {
												uni.showToast({
													icon: 'none',
													title: '登录成功'
												});
												// #ifdef APP-PLUS
												uni.report('login', {
													'describe': '登录'
												})
												// #endif
											}
										})
										return
										this.$http('user/current', "GET", '', res => {
											let dataObj = res.data
											if (dataObj.success) {
												if (dataObj.data.realNameConfirm) {
													uni.switchTab({
														url: '/pages/tabs/tab1',
														success: () => {
															uni.showToast({
																icon: 'none',
																title: '登录成功'
															});
															// #ifdef APP-PLUS
															uni.report('login', {
																'describe': '登录'
															})
															// #endif
														}
													})
												} else {
													uni.navigateTo({
														url: '/pages/tab3/realName?loginRealNameConfirm=true'
													})
												}
											} else {
												uni.showToast({
													icon: 'none',
													title: dataObj.message
												})
											}
										})
								    }
								})
							} else{
								uni.showToast({
									icon: 'none',
									title: data.message
								});
							}
					    }
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.hint {
		padding: 108upx 50upx 0;
	}

	.hint>image {
		width: 374upx;
		height: 48upx;
	}

	.hint>h3 {
		font-size: 50upx;
		font-weight: 500;
		color: rgba(40, 40, 40, 1);
		line-height: 70upx;
		margin-top: 70upx;
	}

	.input_item {
		margin-top: 20upx;
		border-bottom: 1upx solid rgba(156, 168, 179, 0.28);
	}

	.input_text {
		font-size: 24upx;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
		line-height: 33upx;
	}

	.input_input {
		font-size: 28upx;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
		line-height: 33upx;
		padding: 20upx 0;
	}

	.sms_button {
		display: block;
		width: 140upx;
		font-size: 28upx;
		font-weight: 400;
		color: rgba(3, 166, 166, 1);
		line-height: 80upx;
		background-color: rgba(0, 0, 0, 0);
		text-align: right;
		padding: 0;
	}

	.sms_button:after {
		border: 0 none;
	}

	button[disabled]:not([type]),
	uni-button[disabled][type=default] {
		color: rgba(0, 0, 0, .3);
		background-color: rgba(0, 0, 0, 0);
	}

	.common_button {
		width: 630upx;
		height: 98upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 50upx;
		font-size: 30upx;
		line-height: 98upx;
		font-weight: 500;
		color: rgba(178, 178, 178, 1);
		margin: 80upx auto 0;
	}

	.common_button:after {
		border: 0 none;
	}

	.common_button_active {
		background: #3bc1bb;
		color: white;
	}
</style>
