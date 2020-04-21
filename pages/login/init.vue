<template>
	<view></view>
</template>
<script>
	export default {
		onLoad() {
			
		},
		onReady() {
			// 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
			try {
				const value = uni.getStorageSync('launchFlag')
				const token = uni.getStorageSync('token')
				// setTimeout(()=>{
				// 	plus.navigator.closeSplashscreen()
				// }, 1000)
				if (value) {
					if (token) {
						this.$nextTick(()=>{
							uni.switchTab({
								url: '/pages/tabs/tab1'
							})
						})
					} else {
						uni.redirectTo({
							url: '/pages/login/login'
						});
					}
				} else {
					uni.setStorage({
						key: 'launchFlag',
						data: true
					});
					uni.redirectTo({
						url: '/pages/login/guide'
					});
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	}
</script>
