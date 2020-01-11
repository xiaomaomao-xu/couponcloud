<template name="notice">
	<view>
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
		name: "notice",
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
	@import url("notice.css");
</style>
