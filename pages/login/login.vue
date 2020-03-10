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
					<view class="col-1" style="align-items: center;">
						<checkbox style="transform:scale(0.6);" :checked="agreement" color="rgba(59, 193, 187, 1)"></checkbox>
					</view>
					<view class="row col-11" style="font-size: 26upx;color: #282828; align-items: center; margin-top: 8upx;">
						<text class="col-2">我同意</text>
						<navigator class="col-10" url="/pages/login/reg">
							<text style="color: #0269D0;">《存存用户服务协议》</text>
						</navigator>
					</view>
				</label>
				<button form-type="submit" class="common_button">进去存存</button>
			</form>
		</view>
		
	</view>
</template>

<script>
	import config from '../../config.js'
	import util from '../../utils/util.js'
	import api from '../../utils/api.js'
	export default {
		components: {},
		data() {
			return {
				inputValue: '',
				loading: false,
				username: "", //手机号
				sms: "", //验证码
				smsText: "发送验证码",
				agreement: false,
				buttonActive: false, // 颜色控制
				disabled: false, // 是否可以点击
				redirect: encodeURIComponent('/pages/tabs/tab1'),
			}
		},
		onLoad: function(op) {
			if (config.debug) console.log("onLoad", op)
			if (op.redirect) this.redirect = op.redirect
		},
		onShow: function() {
			let token = util.getToken()
			if (token) {
				let url = decodeURIComponent(this.redirect)
				if (url.indexOf("?") > -1) {
					uni.redirectTo({
						url: url
					})
				} else {
					uni.switchTab({
						url: url
					})
				}
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			toReg: function() {
				uni.navigateTo({
					url: '/pages/reg/reg?redirect=' + this.redirect
				})
			},
			getSms() {
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
				// if (!this.username) {
				// 	this.$notify({
				// 		message: "请输入手机号",
				// 		color: "#FFFFFF",
				// 		background: "#E74243"
				// 	});
				// } else {
				// 	this.$notify({
				// 		type: "success",
				// 		message: "验证码已发送"
				// 	});

				// }
			},
			login() {
				// uni.navigateTo({
				// 	url: '/pages/tabs/tab1'
				// })
				
				uni.switchTab({
					url: '/pages/tabs/tab1'
				})
			},
			findPassword: function(e) {
				uni.showModal({
					title: '温馨提示',
					content: '目前BookChat暂不支持找回密码的功能，如果忘记了密码，请打开书栈网(https://www.bookstack.cn)将密码找回',
				})
			},
			formSubmit: function(e) {
				let that = this

				if (config.debug) console.log("formSubmit", e);
				if (that.loading) return;

				if (e.detail.value.password == '' || e.detail.value.username == '') {
					util.toastError('账号和密码均不能为空')
					return
				}

				that.loading = true

				util.request(config.api.login, e.detail.value, 'POST').then((res) => {
					if (config.debug) console.log(config.api.login, res);
					let user = res.data.user
					if (user == undefined || user.uid <= 0 || user.token == '') {
						util.toastError('登录失败：未知错误')
						that.loading = false
						return
					}
					util.setUser(user)
					util.toastSuccess('登录成功')
					setTimeout(function() {
						let url = decodeURIComponent(that.redirect)
						if (url.indexOf("?") > -1) {
							uni.redirectTo({
								url: url
							})
						} else {
							uni.switchTab({
								url: url
							})
						}
					}, 1500)
				}).catch((e) => {
					if (config.debug) console.log(e);
					that.loading = false
					util.toastError(e.data.message || e.errMsg)
				})
			},
		}
	}
</script>

<style scoped>
	.hint {
		padding: 50upx;
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
		border-bottom: 2upx solid rgba(156, 168, 179, 1);
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
