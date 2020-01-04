<template name="evaluate">
	<view>
		<view class="post_cent" v-for="(item,index) in viewlist" :key='index'>
			<view class="post_titile">
				<image :src="item.logo"></image>
				<view class="post_new">
					<view class="new_le">
						<view>{{item.name}}</view>
						<view>
							<image src="../../static/images/icon17.png"></image>
						</view>
					</view>
					<view class="new_ri">{{item.time}}</view>
				</view>
			</view>
			<view class="center_box">
				<view class="center_el">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "postBox",
		props: ['viewlist']
	}
</script>
<style>
	@import url("evaluate.css");
</style>
