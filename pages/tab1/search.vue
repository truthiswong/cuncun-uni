<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="搜索" status-bar="true" fixed="true"></uni-nav-bar>
		<view class=''>
			<uni-search-bar :radius="100" @confirm="onSearch"></uni-search-bar>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				
			}
		},
		onLoad(options) {
			
		},
		onReachBottom() {
			
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onSearch(e) {
				console.log(e)
				if (!e.value) {
					uni.showToast({
						icon: 'none',
						title: '请输入关键词'
					});
				} else {
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.search {
		
	}
</style>
