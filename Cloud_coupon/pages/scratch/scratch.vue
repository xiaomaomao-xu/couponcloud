<template>
	<view>
		<view style="position: absolute;top: 0;bottom: 0;width: 100%;">
			<view class="scra_box">
				<image src="../../static/images/ggbj.png" class="image_list1"></image>
				<image src="../../static/images/gg5.png" class="image_list2 animated flash infinite" style="animation-delay: 1s;"></image>
				<image src="../../static/images/gg1.png" class="image_list3 animated translatesUpDown infinite" style="animation-delay: 0s;animation-duration: 2s;"></image>
				<image src="../../static/images/gg2.png" class="image_list4 animated translatesUpDown infinite" style="animation-delay: 0.2s;animation-duration: 2s;"></image>
				<image src="../../static/images/gg3.png" class="image_list5 animated translatesUpDown infinite" style="animation-delay: 0.4s;animation-duration: 2s;"></image>
				<image src="../../static/images/gg4.png" class="image_list6"></image>
				<image src="../../static/images/gg4.png" class="image_list7 animated fadeInUpFZ infinite"></image>
			</view>
			<view class="scra_center">
				<image src="../../static/images/gg6.png"></image>
				<view class="center_el animated" :class="{fadeOut:isFadeout == true}">
					<view class="scra_title">你还有<text>3</text>次刮奖机会</view>
					<view class="scra_btn" @tap="el_view">立即刮奖</view>
					<view class="scra_botm">已有<text>263538</text>人参与刮奖</view>
				</view>
			</view>
			<view class="prize">
				<view class="auth_data">
					<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 100%;">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<image :src="item.pic"></image>
							<text>{{item.name}}</text>
							<text>{{item.num}}</text>
						</swiper-item>
					</swiper>
				</view>
				<view class="prize_title">
					<view><view></view></view>
					<view>奖品池</view>
					<view><view></view></view>
				</view>
				<view class="prize_center">
					<image src="../../static/images/gg7.png"></image>
				</view>
			</view>
			<view></view>
			<view class="prize">
				<view class="przie_lsit">
					<image src="../../static/images/ggtc.png"></image>
					<image src="../../static/images/icon16.png"></image>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				isFadeout:false,
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
				}]
			}
		},
		onLoad() {

		},
		methods: {
			el_view:function(){
				this.isFadeout = !this.isFadeout
			}
		}
	}
</script>

<style>
	@import url("scratch.css");
	@import url("animate.css");
</style>
