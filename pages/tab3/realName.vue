<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="实名认证" status-bar="true" fixed="true" :shadow="false"></uni-nav-bar>
		<!-- 内容 -->
		<view style="padding: 0 30upx">
			<view class="top_img">
				<image src="../../static/common/finish.png" mode=""></image>
			</view>
			<uni-list class="list_custom list_custom_item list_custom_margin20">
				<uni-list-item title="姓名：" :showArrow="false">
					<view slot="right" class="input">
						<input type="text" v-model="user" placeholder="请输入您的姓名" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="身份证：" :showArrow="false">
					<view slot="right" class="input">
						<input type="idcard" v-model="idCard" maxlength="18" placeholder="请输入您的身份证号码" placeholder-style="color: #CCCCCC;font-size:14px;" />
					</view>
				</uni-list-item>
				<uni-list-item title="证件照片：" :showArrow="false"></uni-list-item>
				<view class="flex_between id_card">
					<image @click="changeIDCardImage1" src="../../static/common/idcard-z.png" mode=""></image>
					<image @click="changeIDCardImage2" src="../../static/common/idcard-f.png" mode=""></image>
				</view>
			</uni-list>
		</view>
		<button type="default" class="address_button" :class="{address_button_active: buttonActive}">确 认</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				user: '',
				idCard: '',
				buttonActive: false, // 颜色控制
			};
		},
		watch: {
			user() {
				if (this.user && this.idCard && this.userNew && this.smsNew) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			smsOld() {
				if (this.userOld && this.smsOld && this.userNew && this.smsNew) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			userNew() {
				if (this.userOld && this.smsOld && this.userNew && this.smsNew) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			smsNew() {
				if (this.userOld && this.smsOld && this.userNew && this.smsNew) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			}
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeIDCardImage1() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const filePaths = res.tempFilePaths;
						// uni.uploadFile({
						//     url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						//     filePath: filePaths[0],
						//     name: 'file',
						//     formData: {
						//         'user': 'test'
						//     },
						//     success: (uploadFileRes) => {
						//         console.log(uploadFileRes.data);
						//     }
						// });
					}
				});
			},
			changeIDCardImage2() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const filePaths = res.tempFilePaths;
						// uni.uploadFile({
						//     url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						//     filePath: filePaths[0],
						//     name: 'file',
						//     formData: {
						//         'user': 'test'
						//     },
						//     success: (uploadFileRes) => {
						//         console.log(uploadFileRes.data);
						//     }
						// });
					}
				});
			},
		}
	};
</script>

<style scoped lang="scss">
	.top_img {
		margin: 80upx auto;
		text-align: center;
		image{
			width: 200upx;
			height: 276upx;
		}
	}
	.input {
		width: 520upx;
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
		width: 690upx;
		height: 98upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 6upx;
		font-size: 30upx;
		font-weight: 500;
		color: rgba(178, 178, 178, 1);
		line-height: 98upx;
		text-align: center;
		margin-top: 80upx;
	}

	.address_button_active {
		background-color: #3BC1BB;
		color: #FFFFFF;
	}
</style>
