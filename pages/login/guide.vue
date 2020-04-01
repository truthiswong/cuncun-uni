<template>
	<view class="guide">
		<swiper class="swiper" :circular="true" indicator-active-color='#3BC1BB' :indicator-dots="true" @change="changeTab">
			<swiper-item class="item" v-for="(item, index) in guidelList" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
				<view class="guide_title">
					<text>{{item.title}}</text>
					<p :class="{'center': index == 0}">{{item.desc}}</p>
				</view>
				<view class="guide_button" @click="onTry" v-if="index == guidelList.length-1">
					<image src="../../static/common/try.png" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headerShow: true,
				guidelList: [{
					id: 0,
					url: '../../static/common/guide1.png',
					title: '瞬间两室变三',
					desc: '随时随地，物品在跟着你走'
				}, {
					id: 1,
					url: '../../static/common/guide2.png',
					title: '像下载一样，一键取回！',
					desc: '我们不仅仅是你的保管员，我们为你的物品提供最高隐私，以及高额保险保障。'
				}, {
					id: 2,
					url: '../../static/common/guide3.png',
					title: '办公室用存存',
					desc: '存储（合同），归类（样品），送回（各个团队），轻松搞定'
				}],
			}
		},
		onLoad() {},
		onShow() {},
		watch: {},
		computed: {},
		methods: {
			changeTab(e) {
				console.log(e.target.current)
			},
			onTry() {
				uni.redirectTo({
				  url: '/pages/login/login'
				});
			}
		}
	}
</script>
<style>
	page {
		width: 100%;
		height: 100%;
	}
</style>
<style scoped lang="scss">
	.guide {
		width: 100%;
		height: 100%;
	}

	.swiper {
		width: 100%;
		height: 100%;

		.item {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 1070upx;
			}

			.guide_title {
				padding: 0 60upx;

				text {
					display: block;
					font-size: 36upx;
					font-weight: 500;
					color: rgba(40, 40, 40, 1);
					line-height: 50upx;
					margin: 100upx auto 0;
					text-align: center;
				}

				p {
					font-size: 26upx;
					font-weight: 400;
					color: rgba(74, 74, 74, 1);
					line-height: 50upx;
					margin-top: 30upx;
					text-align: left;
				}
				.center {
					text-align: center;
				}
			}

			.guide_button {
				text-align: center;

				image {
					width: 260upx;
					height: 120upx;
				}
			}
		}
	}
</style>
