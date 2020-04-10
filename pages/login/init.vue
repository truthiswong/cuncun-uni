<script>
	export default {
		onLoad() {
			// 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
			const value = uni.getStorageSync('launchFlag');
			const token = uni.getStorageSync('token');
			if (value) {
				// uni.redirectTo({
				// 	url: '/pages/login/login'
				// });
				if (token) {
					uni.switchTab({
						url: '/pages/tabs/tab1'
					})
				} else{
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
		}
	}
</script>
