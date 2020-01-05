<template name="postBox">
	<view>
		<view class="recommend">
			<view class="commodity_list" v-for="(item,index) in dity_list" :key='index'>
				<image :src="item.image"><text class="quan">{{item.shop}}</text></image>
				<view>{{item.name}}</view>
				<view><text>￥{{item.price}}</text><text>￥{{item.coupon}}</text></view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "postBox",
		props: ['dity_list']
	}
</script>
<style>
	@import url("details.css");
</style>
