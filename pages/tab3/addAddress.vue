<template>
	<view class="layout">
		<uni-nav-bar left-icon="back" @clickLeft="onClickBack" title="添加新地址" status-bar="true" fixed="true"></uni-nav-bar>
		<!-- 内容 -->
		<view style="margin-top: 20upx;padding: 0 30upx;background-color: #FFFFFF;">
			<uni-list class="list_custom list_custom_item list_custom_margin20">
				<uni-list-item title="收货人：" :showArrow="false">
					<view slot="right" class="input">
						<input type="text" value="" placeholder="请输入收货人姓名" placeholder-style="color: #CCCCCC;" />
					</view>
				</uni-list-item>
				<uni-list-item title="联系电话：" :showArrow="false">
					<view slot="right" class="input">
						<input type="text" value="" placeholder="请输入联系电话" placeholder-style="color: #CCCCCC;" />
					</view>
				</uni-list-item>
				<uni-list-item title="所在地区：">
					<view slot="right" class="change_address">
						<!-- <input type="text" value="" placeholder="请选择所在地区" /> -->
						<text>请选择所在地区</text>
					</view>
				</uni-list-item>
				<uni-list-item title="详细地址：" :showArrow="false">
					<view slot="right" class="input">
						<input type="text" value="" placeholder="请输入街道、楼牌号等" placeholder-style="color: #CCCCCC;" />
						<!-- <textarea class="textarea" :adjust-position="true" :auto-height="true" placeholder-style="color:#CCCCCC" placeholder="请输入街道、楼牌号等" /> -->
					</view>
				</uni-list-item>
				<uni-list-item title="邮政编码：" :showArrow="false">
					<view slot="right" class="input">
						<input type="text" value="" placeholder="请输入邮政编码" placeholder-style="color: #CCCCCC;" />
					</view>
				</uni-list-item>
				<uni-list-item title="标签：" :showArrow="false">
					<view slot="right" class="button_tag">
						<text :class="{button_tag_active:item.clicked}" @click="onChangeTags(item.id)" v-for="item in tagsList" :key="item.id">{{item.name}}</text>
					</view>
				</uni-list-item>
				<uni-list-item title="设置为默认地址" :showArrow="false">
					<view slot="right">
						<switch style="transform:scale(0.9);" color="#3BC1BB" />
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<button @click="onConfirm" class="address_button" :class="{address_button_active: true}">确定</button>
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
				}, {
					id: '111',
					name: '牛皮糖',
					phone: '13928863927',
					tags: '家',
					address: '上海市静安区西藏南路666号大型创意园C666',
					value: '默认地址',
					checked: false
				}, {
					id: '222',
					name: '王女士',
					phone: '13928863927',
					tags: '公司',
					address: '上海市静安区西藏南路666号大型创意园C666',
					value: '默认地址',
					checked: false
				}],
				tagsList: [{
					id: 0,
					name: '家',
					clicked: false
				}, {
					id: 1,
					name: '公司',
					clicked: false
				}, {
					id: 2,
					name: '学校',
					clicked: false
				}, {
					id: 3,
					name: '酒店',
					clicked: false
				}],
				indexTag: 0
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
				// this.$router.push({
				//   path: "/qrCode"
				// });
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
			onChangeTags(id) {
				for (let item of this.tagsList) {
					if (item.id == id) {
						item.clicked = true
						this.indexTag = id
					} else {
						item.clicked = false
					}
				}
			},
			onConfirm() {
				uni.navigateBack({
					delta: 1
				})
			}
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

	.input {
		width: 429upx;
		font-weight: 400;
		font-size: 28upx;
		line-height: 40upx;
	}

	.change_address {
		width: 394upx;
		font-size: 28upx;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 40upx;
	}

	.textarea {
		width: 429upx;
		font-weight: 400;
		font-size: 28upx;
		line-height: 40upx;
		overflow: hidden;
	}

	.button_tag {
		text {
			display: inline-block;
			width: 100upx;
			height: 60upx;
			border-radius: 5upx;
			border: 1px solid rgba(218, 218, 218, 1);
			font-size: 28upx;
			font-weight: 400;
			color: rgba(74, 74, 74, 1);
			line-height: 60upx;
			margin-left: 20upx;
			text-align: center;
		}

		.button_tag_active {
			background: rgba(254, 242, 243, 1);
			border: 1px solid rgba(189, 103, 108, 1);
			color: rgba(189, 103, 108, 1);
		}
	}

	.input::-webkit-input-placeholder {
		font-size: 28upx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.input:-moz-placeholder {
		font-size: 28upx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.input:-ms-input-placeholder {
		font-size: 28upx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.change_address {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}

	.address_button {
		width: 690upx;
		height: 98upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 6upx;
		font-size: 30upx;
		font-weight: 500;
		color: rgba(178, 178, 178, 1);
		line-height: 98upx;
		text-align: center;
		margin-top: 80upx;
	}

	.address_button_active {
		background-color: #3BC1BB;
		color: #FFFFFF;
	}
</style>
