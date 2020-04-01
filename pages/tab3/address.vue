<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="地址管理" status-bar="true" fixed="true">
			<view slot="right" @click="onClickRight" class="header_icon">
				<text>添加新地址</text>
			</view>
		</uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="address_list" v-for="item in addressList" :key="item.id">
				<radio-group @change="onPayChangeStyle">
					<view class="row list_top">
						<text class="top_name">{{item.name}}</text>
						<text class="top_phone">13928863927</text>
						<uni-tag :text="item.tags" size="small" :inverted="true" type="error"></uni-tag>
					</view>
					<text class="address">上海市静安区西藏南路666号大型创意园C666</text>
					<view class="row flex_between list_bottom">
						<view>
							<!-- <checkbox-group class="check_box">
								<checkbox style="transform:scale(0.8);" color="rgba(59, 193, 187, 1)" />
							</checkbox-group> -->
							<label>
								<radio :value="item.id" :checked="item.checked" style="transform:scale(0.8);" color="rgba(59, 193, 187, 1)" />
								<text>默认地址</text>
							</label>
						</view>
						<view class="row">
							<view class="row image1">
								<image src="../../static/tab3/delete.png" mode=""></image>
								<text class="custom_text">删除</text>
							</view>
							<view class="row image2">
								<image src="../../static/tab3/editor.png" mode=""></image>
								<text class="custom_text">编辑</text>
							</view>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				checked: true,
				addressList: [{
					id: '000',
					name: '王女士',
					phone: '13928863927',
					tags: '学校',
					address: '上海市静安区西藏南路666号大型创意园C666',
					value: '默认地址',
					checked: true
				},{
					id: '111',
					name: '牛皮糖',
					phone: '13928863927',
					tags: '家',
					address: '上海市静安区西藏南路666号大型创意园C666',
					value: '默认地址',
					checked: false
				},{
					id: '222',
					name: '王女士',
					phone: '13928863927',
					tags: '公司',
					address: '上海市静安区西藏南路666号大型创意园C666',
					value: '默认地址',
					checked: false
				}]
			};
		},
		watch: {},
		computed: {},
		created() {},
		activated() {},
		deactivated() {},
		mounted() {},
		methods: {
			onClickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onClickRight() {
				uni.navigateTo({
					url: '/pages/tab3/addAddress'
				})
			},
			onDefaultAddress() {
				this.checked = !this.checked
			},
			onPayChangeStyle(evt) {
				console.log(evt.target.value)
				for (let i = 0; i < this.addressList.length; i++) {
					if (this.addressList[i].id === evt.target.value) {
						this.addressList[i].checked = true
					} else {
						this.addressList[i].checked = false
					}
				}
			},
		}
	};
</script>

<style>
	page {
		background-color: #F9F9F9;
	}
</style>

<style scoped lang="scss">
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
	.header_right {
		font-size: 0.28rem;
		color: rgba(3, 166, 166, 1);
	}

	.address_list {
		margin-top: 0.2rem;
		background-color: #FFFFFF;
		padding: 30upx;
		.list_top {
			font-size:28upx;
			font-weight:500;
			color:rgba(40,40,40,1);
			.top_name {
				display: block;
				width: 140upx;
			}
			.top_phone {
				margin-right: 40upx;
			}
		}
		.address {
			font-size:26upx;
			font-weight:400;
			color:rgba(104,104,104,1);
			line-height:37upx;
		}
		.list_bottom {
			border-top: 2upx solid #F2F2F2;
			padding-top: 20upx;
			margin-top: 20upx;
			.check_box {
				.uni-checkbox-input {
					background-color: #03A6A6;
					color: #FFFFFF;
					border-radius: 50%;
				}
				
			}
			text {
				font-size:28upx;
				font-weight:400;
				color:rgba(68,68,68,1);
			}
			.image1 {
				image {
					width: 18upx;
					height: 26upx;
				}
			}
			.image2 {
				margin-left: 40upx;
				image {
					width: 26upx;
					height: 26upx;
				}
			}
			.custom_text {
				background-color: rgba(0,0,0,0);
				border: 0 none;
				font-size:28upx;
				font-weight:400;
				color:rgba(68,68,68,1);
				vertical-align: top;
				margin-left: 10upx;
			}
		}
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
