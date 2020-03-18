<template>
	<view>
		<uni-nav-bar color="#000000" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="headerShow" backgroundColor="rgba(0,0,0,0)">
		</uni-nav-bar>
		<uni-nav-bar color="#000000" left-icon="back" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="!headerShow" shadow="true">
		</uni-nav-bar>
		</hx-navbar>
		<!-- 内容 -->
		<view class="content">
			<view class="top_text">
				<text>我们将为你的物品提供高标准的日式管理，维护，让你无顾之忧的同时，又一手轻松掌握。请简单告知我们你要存的东西，以便我们准备打包材料。</text>
			</view>
			<view class="add_content">
				<view class="flex_between" v-for="(item,index) in inputList" :key="index" style="margin-top: 40upx;">
					<input class="add_input" type="text" v-model="item.value" placeholder="如：文档，书本…" style="font-size:28upx;padding-left: 20upx;color: #282828;" placeholder-style="font-size:14px; font-weight:400; color:rgba(178,178,178,1); line-height:40upx;" />
					<uni-number-box :min="0" :max="9999" v-model="item.number" @change="changeInputNumber($event,index)" />
				</view>
				<view class="flex_between" style="margin-top: 60upx;">
					<text class="button button_left" @click="onAddList">+ 添加</text>
					<text class="button button_right">储存注意事项 ></text>
				</view>
			</view>
			<view style="margin-top: 40upx;">
				<uni-collapse class="collapse_custom">
					<uni-collapse-item title="请选择储存纸箱：" style="font-size:32upx; font-weight:600;color:rgba(40,40,40,1);line-height:45px;">
						<view class="flex_between" v-for="(item,index) in boxList" :key="index" style="margin-top: 40upx;">
							<view class="collapse_left">
								<h4>{{item.name}}</h4>
								<p>重量上限(kg)：{{item.weight}}</p>
								<p>储存费用/天(¥)：{{item.fee}}</p>
								<text @click="onBoxDetail(item.id)">纸箱详情介绍 ></text>
							</view>
							<uni-number-box :min="0" :max="9999" :value="item.number" @change="changeBoxNumber($event,index)" />
						</view>
					</uni-collapse-item>
				</uni-collapse>
				<uni-list class="list_custom">
					<uni-list-item style="padding: 30upx 0;" title="预计存储费用：" note="根据您所选的箱子预计每月存储费用" :showArrow="false">
						<view slot='right' class="total_fee">
							<p>¥<text>70</text></p>
						</view>
					</uni-list-item>
				</uni-list>
				<view class="row total_tip">
					<image src="../../static/tab2/people.png" mode=""></image>
					<view class="total_tip_right" :style="{background: 'url('+ total_tip_right_bg +') no-repeat center center / cover'}">
						<text>这些东西可以为您剩下8平米左右的空间，您可以用来好好享受您的时间啦～（具体内容管理端定了直接改）</text>
					</view>
				</view>
			</view>
			<label class="row" style="margin-top: 30upx;">
				<view class="col-1" style="margin-left: -8upx;">
					<checkbox-group @change="agreement(1)">
						<checkbox style="transform:scale(0.6);" color="rgba(59, 193, 187, 1)" />
					</checkbox-group>
				</view>
				<view class="row col-11" style="font-size: 26upx;color: #282828; align-items: center; margin-top: 4upx;">
					<text>我同意存存来打理，清理我的物品，如有问题，我负责</text>
				</view>
			</label>
			<label class="row" style="margin-top: 30upx;">
				<view class="col-1" style="margin-left: -8upx;">
					<checkbox-group @change="agreement(2)">
						<checkbox style="transform:scale(0.6);" color="rgba(59, 193, 187, 1)" />
					</checkbox-group>
				</view>
				<view class="row col-11" style="font-size: 26upx;color: #282828;align-items: center; margin-top: 4upx;">
					<text class="col-2">我同意</text>
					<navigator class="col-10" url="/pages/login/agreement">
						<text style="color: #0269D0;">《用户服务协议》</text>
					</navigator>
				</view>
			</label>
		</view>
		<button @click="onNext" class="button_block" :class="{button_block_active: buttonActive}">下一步</button>
	</view>
</template>

<script>
	import api from '../../utils/api.js'
	import util from '../../utils/util.js'
	import config from '../../config.js'
	export default {
		components: {},
		data() {
			return {
				headerShow: true,
				inputList: [{
					id: 0,
					value: "",
					number: 1
				}],
				inputListNumber: 0,
				boxList: [{
						id: 0,
						name: "小型纸箱A（拍照）",
						weight: 120,
						fee: 18,
						number: 0
					},
					{
						id: 1,
						name: "小型纸箱B（拍照）",
						weight: 120,
						fee: 18,
						number: 0
					},
					{
						id: 2,
						name: "小型纸箱C（拍照）",
						weight: 120,
						fee: 18,
						number: 0
					},
					{
						id: 3,
						name: "小型纸箱D",
						weight: 120,
						fee: 18,
						number: 0
					}
				],
				total_tip_right_bg: '../../static/tab2/dialog_green.png',
				agree1: false,
				agree2: false,
				buttonActive: false,
			}
		},
		onLoad() {},
		onShow() {},
		onPageScroll(options) {
			if (options.scrollTop > 60) {
				this.headerShow = false;
			} else {
				this.headerShow = true;
			}
		},
		watch: {
			agree1() {
				if (this.agree1 && this.agree2) {
					this.buttonActive = true;
				} else {
					this.buttonActive = false;
				}
			},
			agree2() {
				if (this.agree1 && this.agree2) {
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
			onAddList() {
				this.inputListNumber++
				this.inputList.push({
					id: this.inputListNumber,
					value: '',
					number: 1
				})
			},
			changeInputNumber(value, index) {
				console.log(value, index)
				if (value <= 0) {
					uni.showModal({
						title: '提示',
						content: '是否删除该物品？',
						success: (res) => {
							if (res.confirm) {
								this.inputList.splice(index, 1)
							} else if (res.cancel) {
								// this.$set(this.inputList[index],'number', 1);
							}
						}
					})
				} else {
					this.inputList[index].number = value;
				}
			},
			changeBoxNumber(value, index) {
				this.boxList[index].number = value;
			},
			// 箱子详情
			onBoxDetail(index) {
				console.log(index)
			},
			agreement(index) {
				if (index == 1) {
					this.agree1 = !this.agree1
				} else if (index == 2) {
					this.agree2 = !this.agree2
				}
			},
			onNext() {
				console.log(this.agree1)
				console.log(this.agree2)
				console.log(this.inputList)
			}
		}

	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 30upx 120upx;
	}

	.top_text {
		font-size: 32upx;
		font-weight: 500;
		color: rgba(40, 40, 40, 1);
		line-height: 64upx;
		text-align: justify;
	}

	.add_input {
		width: 300upx;
		height: 70upx;
		background: rgba(249, 249, 249, 1);
		border: 1px solid rgba(242, 242, 242, 1);
	}

	.collapse_left {
		h4 {
			font-size: 32upx;
			font-weight: 600;
			color: rgba(40, 40, 40, 1);
			line-height: 45upx;
			margin-bottom: 10upx;
		}

		p {
			font-size: 26upx;
			font-weight: 400;
			color: rgba(74, 74, 74, 1);
			line-height: 37upx;
		}

		text {
			font-size: 26upx;
			font-weight: 400;
			color: rgba(155, 155, 155, 1);
			line-height: 37upx;
			text-decoration: underline solid rgba(155, 155, 155, 1);
		}
	}
	.total_fee {
		p {
			font-size:24upx;
			font-weight:600;
			color:rgba(40,40,40,1);
		}
		text {
			font-size:36upx;
			font-weight:600;
			color:rgba(40,40,40,1);
			margin-left: 8upx;
		}
	}
	.total_tip {
		position: relative;
		image {
			width: 191upx;
			height: 184upx;
		}
		.total_tip_right {
			position: absolute;
			right: 0;
			width: 530upx;
			height: 188upx;
			box-sizing: border-box;
			padding: 12upx 24upx 24upx 54upx;
			text {
				font-size:26upx;
				font-weight:500;
				color:rgba(84,140,140,1);
				line-height:37upx;
			}
		}
	}

	.button {
		font-size: 28upx;
		margin: 0;
		font-weight: 400;
		border: 0 none;
		padding: 0;
	}

	.button_left {
		color: rgba(3, 166, 166, 1);
		line-height: 40upx;
	}

	.button_right {
		font-size: 26upx;
		color: rgba(155, 155, 155, 1);
		line-height: 37upx;
		text-decoration: underline solid rgba(155, 155, 155, 1);
	}

	.button_block {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		box-shadow: 0 -2upx 10upx 0 rgba(0, 0, 0, 0.05);
		font-size: 32upx;
		font-weight: 500;
		background-color: #B2B2B2;
		color: #FFFFFF;
	}

	.button_block_active {
		background: #3BC1BB;
	}
</style>
