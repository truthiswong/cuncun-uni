<template>
	<view>
		<view>
			<view class="uni-padding-wrap">
				<view class="uni-title">日期：{{year}}年{{month}}月{{day}}日</view>
			</view>
			<picker-view style="height: 300px;" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data: function() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		methods: {
			bindChange: function(e) {
				const val = e.detail.value
				this.month = this.months[val[0]]
				this.day = this.days[val[1]]
			}
		}

	}
</script>

<style scoped lang="scss">
	.item {
		height: 60upx;
		line-height: 100upx;
		text-align: center;
	}
</style>
