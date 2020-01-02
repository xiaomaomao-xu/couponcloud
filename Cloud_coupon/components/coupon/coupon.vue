<template name="couponBox">
	<view>
		<view class="coun_box">
			<view class="user_image" v-for="(item,index) in counpon_box" :key='index'>
				<image :src="item.pic"></image>
				<view class="user_le">
					<view>折扣券</view>
					<view>使用期限:2019年11月01~2019年11月30日</view>
				</view>
				<view class="user_ri" @tap="open_box">立即使用</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "couponBox",
		data() {
			return {
				counpon_box:[{
					pic:'../../static/images/jb.png'
				},{
					pic:'../../static/images/jb.png'
				},{
					pic:'../../static/images/jb.png'
				},{
					pic:'../../static/images/jb.png'
				},{
					pic:'../../static/images/jb.png'
				},]
			};
		}
	}
</script>
<style>
	@import url("coupon.css");
</style>
