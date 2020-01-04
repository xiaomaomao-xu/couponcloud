<template name="couponBox">
	<view>
		<view class="coun_box">
			<view class="user_image" v-for="(item,index) in voucher" :key='index'>
				<image src="../../static/images/jb.png"></image>
				<view class="user_le">
					<view>{{item.name}}</view>
					<view>到期时间:{{item.time}}</view>
				</view>
				<view class="user_ri" @tap="open_box">立即领取</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "postBox",
		props: ['voucher']
	}
</script>
<style>
	@import url("coupon.css");
</style>
