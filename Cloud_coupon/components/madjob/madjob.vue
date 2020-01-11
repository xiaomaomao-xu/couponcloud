<template name="madjob">
	<view>
		<view class="madbox">
			<view class="mad_title">
				<image src="../../static/images/icon32.png" class="animated ring infinite"></image>
				<view><text>{{time}}</text>正在疯抢</view>
			</view>
			<view class="mad_time">
				<view>距结束</view>
				<view>
					<text>{{hour}}</text><view>:</view>
					<text>{{minu}}</text><view>:</view>
					<text>{{sec}}</text>
				</view>
			</view>
		</view>
		<view class="mad_center" v-for="(item,index) in mad_center" :key='index'>
			<view class="mad_left"><image :src="item.pic"></image></view>
			<view class="mad_right">
				<view class="mad_list">{{item.address}}</view>
				<view class="mad_speed">
					<view>{{item.coupon}}</view>
					<view>{{item.num}}/{{item.number}}张</view>
				</view>
				<view class="mad_btn">
					<view>马上抢</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "madjob",
		props: {
			time:{
				type:null,
				default: '00:00'
			},
			hour:{
				type:null,
				default: '00'
			},
			minu:{
				type:null,
				default: '00'
			},
			sec:{
				type:null,
				default: '00'
			},
			mad_center:{
				type:Array
			},
		}
	}
</script>
<style>
	@import url("madjob.css");
	@import url("animate.css");
</style>
