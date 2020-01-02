<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 120rpx;height: auto;overflow: hidden;background: #f0f0f0;">
		<view class="auth_pic">
			<image src="../../static/images/auth.png"></image>
			<view>50元+V认证，立即领取20张优惠券！</view>
			<image src="../../static/images/icon27.png"></image>
		</view>
		<view class="auth_data">
			<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 100%;">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<image :src="item.pic"></image>
					<text>{{item.name}}</text>
					<text>{{item.num}}</text>
				</swiper-item>
			</swiper>
		</view>
		<view class="btn_submit"><text>立即认证</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: [{
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, ]
			}
		},
		methods: {

		}
	}
</script>

<style>
	@import url("authentication.css");
</style>
