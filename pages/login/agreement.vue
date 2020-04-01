<template>
	<view>
		<uni-nav-bar color="#000000" left-icon="back" title="用户协议" @clickLeft="onClickBack" class="header" status-bar="true" fixed="true"
		 v-if="headerShow" backgroundColor="#ffffff">
		</uni-nav-bar>
		<uni-nav-bar color="#000000" left-icon="back" title="用户协议" @clickLeft="onClickBack" class="header" status-bar="true"
		 fixed="true" v-if="!headerShow" shadow="true">
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			32130821301983091
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				headerShow: true,
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
		watch: {},
		computed: {
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		}

	}
</script>
<style>
	page {
		/* background: rgba(242, 242, 242, 1); */
	}
</style>
<style scoped lang="scss">
	.content {
		padding: 20upx;
	}
</style>
