<template name="soon">
	<view>
		<!-- <view class="soon_swiper">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration" display-multiple-items="5"
						 circular="true">
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>01:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>02:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>03:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>04:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>05:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>06:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>07:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>08:00</text></view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<text>09:00</text></view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view> -->
		<view class="mad_center" v-for="(item,index) in mad_center" :key='index'>
			<view class="mad_left"><image :src="item.pic"></image></view>
			<view class="mad_right">
				<view class="mad_list">{{item.address}}</view>
				<view class="mad_speed">
					<view>{{item.coupon}}</view>
					<view>{{item.number}}张</view>
				</view>
				<view class="mad_btn">
					<view>提醒我</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "soon",
		props: {
			mad_center: {
				type: Array
			},
		},
		data() {
			return {
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}

	}
</script>
<style>
	@import url("soon.css");
</style>
