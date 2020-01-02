<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;left: 0;background: white;">
		<view class="wallet_view">
			<view class="view_pic"><image src="../../static/images/icon35.png"></image></view>
			<view>我的零钱</view>
			<view>总金额:200000</view>
			<view @tap="sumption">消费记录</view>
			<view class="wallet_el">
				<view>
					<view>可用金额</view>
					<view>100</view>
				</view>
				<view>
					<view>冻结金额</view>
					<view>100</view>
				</view>
			</view>
		</view>
		<navigator url="../recharge/recharge" hover-class="none" class="recharge">充值</navigator>
		<view class="withdrawal">提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			sumption:function(){
				uni.navigateTo({
					url:'../sumption/sumption'
				})
			}
		}
	}
</script>

<style>
	@import url("wallet.css");
</style>