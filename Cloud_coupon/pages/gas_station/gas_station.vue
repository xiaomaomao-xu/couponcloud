<template>
	<view class="content">
		<view class="voucher_title">
			<view v-for="(item,index) in titlebox" :key='index' @tap="tapindex(index)">
				<text :class="{active:titleindex===index}">{{item}}</text>
			</view>
		</view>
		<view class="user_image">
			<image src="../../static/images/jb.png"></image>
			<view class="user_le">
				<view>折扣券</view>
				<view>使用期限:2019年11月01~2019年11月30日</view>
			</view>
			<view class="user_ri" @tap="open_box">立即使用</view>
		</view>
		<view class="popup" v-if="open">
			<view class="pop_list">
			    <image src="../../static/images/icon16.png" @tap="close"></image>
				<view class="rq_code">
					<image src="../../static/images/ewm.jpg"></image>
				</view>
				<view class="shop_name">
					<view>香港路重庆火锅</view>
					<view>优惠券(待使用)</view>
					<view>
						<image src="../../static/images/icon9.png"></image>
						<text>汇川区香港路盛邦地标5楼501sdaasdsad</text>
						<image src="../../static/images/icon29.png"></image>
					</view>
				</view>
				<view class="rq_two">过期时间:2019.10.22(剩余10天)</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleindex:0,
				titlebox:['拼团中','拼团成功','拼团失败'],
				open:false,
			}
		},
		methods: {
			tapindex(index){
				this.titleindex = index
			},
			open_box:function(){
				this.open = !this.open
			},
			close:function(){
				this.open = !this.open
			}
		}
	}
</script>

<style>
	@import url("gas_station.css");
</style>
