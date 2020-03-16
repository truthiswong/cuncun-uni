<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="地址管理" status-bar="true" fixed="true">
			<view slot="right" class="header_icon">
				<text>添加新地址</text>
			</view>
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<uni-list>
				<uni-list-item :showArrow="false">
					<view slot="default" class="row">
						<text>王女士</text>
						<text>13928863927</text>
						<uni-tag text="学校" size="small" inverted="true" type="error"></uni-tag>
						<uni-tag text="公司" size="small" inverted="true" type="error"></uni-tag>
						<uni-tag text="家" size="small" inverted="true" type="error"></uni-tag>
					</view>
					<text>上海市静安区西藏南路666号大型创意园C666</text>
				</uni-list-item>
				<uni-list-item :showArrow="false">
					<view class="row">
						<view slot="default">
							<checkbox-group>
								<checkbox style="transform:scale(0.6);" color="rgba(59, 193, 187, 1)" />
							</checkbox-group>
						</view>
						<view class="row">
							<uni-icons type="trash" style="vertical-align: middle;"></uni-icons>
							<uni-tag text="选择" size="small" inverted="true" :circle="true"></uni-tag>
							<uni-icons type="compose" style="vertical-align: middle;"></uni-icons>
							<uni-tag text="选择" size="small" inverted="true" :circle="true"></uni-tag>
						</view>
					</view>
				</uni-list-item>
			</uni-list>
			<view class="address_list">
				<!-- <van-cell>
					<template slot="title">
						<view class="change_address">
							<van-checkbox :value="checked" @click="onDefaultAddress" checked-color="#3CC3BA">默认地址</van-checkbox>
							<view>
								<van-button hairline size="mini" icon="delete">删除</van-button>
								<van-button hairline size="mini" icon="edit">编辑</van-button>
							</view>
						</view>
					</template>
				</van-cell> -->
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				checked: true
			};
		},
		watch: {},
		computed: {},
		created() {},
		activated() {},
		deactivated() {},
		mounted() {},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			},
			onClickRight() {
				// this.$router.push({
				//   path: "/qrCode"
				// });
			},
			onDefaultAddress() {
				this.checked = !this.checked
			}
		}
	};
</script>

<style scoped="scoped">
	.header_icon {
		width: 200upx;
		height: 44px;
	}

	.header_icon text {
		font-size: 28upx;
		font-weight: 600;
		color: rgba(3, 166, 166, 1);
		line-height: 40upx;
		vertical-align: middle;
	}

	.layout {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: rgba(249, 249, 249, 1);
	}

	.header_right {
		font-size: 0.28rem;
		color: rgba(3, 166, 166, 1);
	}

	.content {
		position: relative;
		width: 100%;
		height: calc(100% - 0.92rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.address_list {
		margin-top: 0.2rem;
	}

	.change_address {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}
</style>
