<template>
	<view @click="chooseAddress" style="background-color: #FFFFFF;">
		<uni-popup ref="popupDate" type="bottom" @touchmove.stop.prevent @touchend.stop>
			<view class="popup_wrap">
				<view class="popup_title">
					<text>选择送达时间</text>
					<image class="close_btn" @click="closePopupDate" src="../static/tab2/close.png" mode=""></image>
				</view>
				<view>
					<picker-view style="height: 570upx;" :value="dateValue" @change="changeDate">
						<picker-view-column>
							<view class="date_item" v-for="(item,index) in dates" :key="index">{{item.value}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="date_item" v-for="(item,index) in hours" :key="index">{{item.value}}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</uni-popup>
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
		},
		data() {
			return {
				dates: [{
						id: 0,
						value: '07-27（周六）',
						checked: 'false',
					},
					{
						id: 1,
						value: '07-28（周日）',
						checked: 'false',
					},
					{
						id: 2,
						value: '07-29（周一）',
						checked: 'false',
					},
					{
						id: 3,
						value: '07-30（约满）',
						checked: 'false',
					},
					{
						id: 4,
						value: '07-31（周三）',
						checked: 'false',
					},
					{
						id: 5,
						value: '08-01（周四）',
						checked: 'false',
					},
					{
						id: 6,
						value: '08-02（周五）',
						checked: 'false',
					},
					{
						id: 7,
						value: '08-03（周六）',
						checked: 'false',
					},
					{
						id: 8,
						value: '08-04（周日）',
						checked: 'false',
					},
					{
						id: 9,
						value: '08-05（周一）',
						checked: 'false',
					},
					{
						id: 10,
						value: '08-06（周二）',
						checked: 'false',
					}
				],
				hours: [{
						id: 0,
						value: '09:00～10:00',
						checked: 'false',
					},
					{
						id: 1,
						value: '10:00～11:00',
						checked: 'false',
					},
					{
						id: 2,
						value: '11:00～12:00',
						checked: 'false',
					},
					{
						id: 3,
						value: '12:00～13:00',
						checked: 'false',
					},
					{
						id: 4,
						value: '13:00～14:00',
						checked: 'false',
					},
					{
						id: 5,
						value: '14:00～15:00',
						checked: 'false',
					},
					{
						id: 6,
						value: '15:00～16:00',
						checked: 'false',
					},
					{
						id: 7,
						value: '16:00～17:00',
						checked: 'false',
					},
					{
						id: 8,
						value: '17:00～18:00',
						checked: 'false',
					},
					{
						id: 9,
						value: '18:00～19:00',
						checked: 'false',
					},
					{
						id: 10,
						value: '19:00～20:00',
						checked: 'false',
					}
				],
				dateValue: [3,3],
			}
		},
		methods: {
			changeDate(e) {
				const val = e.detail.value
				console.log(val[0])
				console.log(val[1])
				this.dateValue1 = val[0]
				this.dateValue2 = val[1]
				this.date = this.dates[val[0]].value + " " + this.hours[val[1]].value
			},
			chooseAddress() {
				this.$refs.popupDate.open()
			}
		}
}
</script>

<style scoped lang="scss">
	.date_item {
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size:26upx;
		font-weight:400;
		color:rgba(40,40,40,1);
	}
</style>
