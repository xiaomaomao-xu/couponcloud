<template>
	<view style="position: absolute;top: 0;bottom: 100rpx;left: 0;width: 100%;background: #f0f0f0;overflow: scroll;">
		<view class="preview_tiitle">
			<image src="../../static/images/bg.png"></image>
			<view class="list_one">
				<text>券的类型</text>
				<text>打折优惠</text>
				<text>有效时间段:2019.10.30~2019.11.11</text>
			</view>
		</view>
		<view class="lssui_box">
			<view class="lssui_list" @tap="open_list">
				<view>券的类型:</view>
				<image src="../../static/images/icon28.png"></image>
				<input type="text" placeholder="请选择发布券的类型" :value="value">
			</view>
			<view class="list_oust" v-if="show">
				<view v-for="(item,index) in text_box" :class="{active:currentIndex===index}" :key="index" @tap="changeIndex(index)">{{item.name}}</view>
			</view>
			<view class="lssui_list">
				<view>发布数量:</view>
				<input type="text" placeholder="填写发券数量">
			</view>
			<view class="lssui_list">
				<view>发布数量:</view>
				<input type="text" placeholder="填写发券数量">
			</view>
			<view class="lssui_list">
				<view>发布数量:</view>
				<input type="text" placeholder="填写发券时间">
			</view>
		</view>
		<view class="modol">
			<text>温馨提示:撒德哈是拉开点距离喀什觉得拉萨看就得了撒开绿灯就撒了看大家阿斯利康大家拉斯阿斯达克laws建档立卡设计大赛离开</text>
		</view>
		<view class="preview"><text>支付￥122</text><text>立即支付</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value: '获取途径',
				currentIndex: 0,
				text_box: [{
					name: '直接获取'
				}, {
					name: '秒杀活动'
				}, {
					name: '竞猜活动'
				}, {
					name: '刮刮活动'
				}, {
					name: '众筹活动'
				}, {
					name: '拼团活动'
				}]
			}
		},
		methods: {
			changeIndex(index) {
				this.currentIndex = index;
				this.value = this.text_box[index].name
				this.show = !this.show
			},
			open_list: function() {
				this.show = !this.show
			}
		}
	}
</script>

<style>
	@import url("preview.css");
</style>
