<template>
	<view style="position: absolute;top: 0;left: 0;width: 100%;bottom: 0;background: #F0F0F0;overflow: scroll;">
		<view class="trans_box">
			<view class="trans_time">
				<picker mode="date" :value="date"  @change="bindDateChange" fields="month">
					<text>{{date}}</text>
					<image src="../../static/images/icon1.png"></image>
				</picker>
			</view>
			<view class="trans_money">
				<text>支出￥3000.00</text>
				<text>收入￥3000.00</text>
			</view>
		</view>
		<view class="follow_box">
			<view class="post_titile">
				<image src="../../static/images/logo.png"></image>
				<view class="post_new">
					<view class="new_le">
						<view>扫二维码付款给惺惺惜惺惺下</view>
						<view>12月7日08:23</view>
					</view>
					<view class="new_ri">-12.00</view>
				</view>
			</view>
			<view class="post_titile">
				<image src="../../static/images/logo.png"></image>
				<view class="post_new">
					<view class="new_le">
						<view>扫二维码付款给惺惺惜惺惺下</view>
						<view>12月7日08:23</view>
					</view>
					<view class="new_ri">-12.00</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date:'2019年12月',
			}
		},
		methods: {
			bindDateChange: function(e) {
				//转化时间格式
				var oDate = new Date(e.target.value);
				//拼接年月
				this.date = oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月'
			},
		}
	}
</script>

<style>
	@import url("records.css");
</style>
