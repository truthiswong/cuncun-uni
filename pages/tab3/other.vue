<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="其它" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="list_padding30 list_custom_margin20" style="background-color: #FFFFFF;">
				<uni-list class="list_custom list_custom_margin20">
					<navigator url="/pages/tab3/otherPage1">
						<uni-list-item title="存存服务协议"></uni-list-item>
					</navigator>
				</uni-list>
				<uni-list class="list_custom list_custom_margin20">
					<navigator url="/pages/tab3/otherPage2">
						<uni-list-item title="存存服务须知"></uni-list-item>
					</navigator>
				</uni-list>
				<uni-list class="list_custom list_custom_margin20">
					<navigator :url="'/pages/tab3/otherPage3?versions=' + versions">
						<uni-list-item title="关于存存" :rightText="'版本 ' + versions"></uni-list-item>
					</navigator>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				versions: '1.0.0.0'
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			// 查询版本信息
			plus.runtime.getProperty(plus.runtime.appid, (wgtInfo)=> {
				console.log(wgtInfo)
				this.versions = wgtInfo.version
			});
			// #endif
		},
		onShow() {
			
		},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	};
</script>

<style>
	page {
		background-color: rgba(249,249,249,1);
	}
</style>

<style scoped lang="scss">
	.layout {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: rgba(249, 249, 249, 1);
	}
</style>
