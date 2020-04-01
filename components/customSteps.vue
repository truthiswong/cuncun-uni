<template>
	<view>
		<view class="row_flex_start" v-for="(item,index) in options" :key="index">
			<view class="col-2 step_left">
				<h5>{{item.mmdd}}</h5>
				<text>{{item.hhmm}}</text>
			</view>
			<view class="col-10 row_flex_start step_right">
				<view class="col-1 step_middle">
					<view class="middle_line"></view>
					<uni-icons class="middle_active" v-if="active === index" :color="'#3DC2BC'" type="checkbox-filled" size="15"></uni-icons>
					<view class="middle_unactive" v-else></view>
				</view>
				<view class="col-11">
					<view class="right_title">
						<text>{{item.title}}</text>
					</view>
					<view class="right_describe">
						<text>{{item.desc}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			active: {
				type: Number,
				default: 0
			},
			options: {
				type: Array,
				default () {
					return []
				}
			} // 数据
		}
	}
</script>

<style scoped lang="scss">
	.step_left {
		text-align: right;
		font-size: 0;
		padding-top: 30upx;
		h5 {
			font-size: 26upx;
			font-weight: 400;
			color: rgba(74, 74, 74, 1);
			line-height: 37upx;
		}

		text {
			font-size: 22upx;
			line-height: 30upx;
			font-weight: 400;
			color: rgba(178, 178, 178, 1);
			margin-top: 4upx;
		}
	}

	.step_middle {
		position: relative;
		top: 0;
		min-height: 100upx;
		text-align: center;

		.middle_line {
			position: absolute;
			top: 0upx;
			left: 0;
			right: 0;
			bottom: -30upx;
			width: 2upx;
			height: 500%;
			background: rgb(240, 240, 240);
			margin: auto;
			z-index: 1;
		}

		.middle_active {
			position: absolute;
			top: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 2;
		}
		.middle_unactive {
			position: absolute;
			top: 16upx;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 2;
			width: 10upx;
			height: 10upx;
			border-radius: 50%;
			background:rgba(178,178,178,1);
		}
	}

	.step_right {
		padding-top: 30upx;
		.right_title {
			font-size: 28upx;
			font-weight: 500;
			color: rgba(59, 60, 62, 1);
			line-height: 40upx;
		}

		.right_describe {
			font-size: 26upx;
			font-weight: 400;
			color: rgba(155, 155, 155, 1);
			line-height: 37upx;
		}
	}
</style>
