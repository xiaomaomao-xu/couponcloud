<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: scroll;background: #F0F0F0;">
		<view class="voucher_title">
			<view v-for="(item,index) in titlebox" :key='index' @tap="tapindex(index)">
				<text :class="{active:titleindex===index}">{{item}}</text>
			</view>
		</view>
		
		<view class="dining_title">
			<view class="dining_pic">
				<image src="../../static/images/bar.jpg"></image>
			</view>
			<view class="dining_text">
				<view class="text_list">
					<view>限时拼团|某某商家新款撒大苏打</view>
					<view>
						<text>{{hour}}</text>
						<view>:</view>
						<text>{{minu}}</text>
						<view>:</view>
						<text>{{sec}}</text>
					</view>
				</view>
				<view class="text_two">地址:汇川区香港路盛邦帝标</view>
				<view class="text_three">
					<text>折扣券</text>
				</view>
				<view class="text_five">
					结束时间:2019.12.10-2019.01-10
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hour: '',
				minu: '',
				sec: '',
				titleindex:0,
				titlebox:['拼团中','拼团成功','拼团失败'],
				open:false,
			}
		},
		mounted: function() {
			let date = new Date().getTime();
			let time = new Date(date)
			let hour = time.getHours();
			let minu = time.getMinutes();
			let sec = time.getSeconds();
			let millisecond = time.getMilliseconds(); //毫秒
			this.timer = setInterval(() => {
				console.log(millisecond)
				millisecond = millisecond - 1000;
				if (millisecond <= 0) {
					millisecond = 1000;
					sec = sec - 1;
				}
				if (sec <= -1) {
					sec = 59;
					minu = minu - 1;
				}
		
				if (minu <= -1) {
					minu = 59;
					hour = hour - 1;
				}
				if (sec <= 9) {
					sec = "0" + sec;
				}
				this.hour = hour
				this.minu = minu
				this.sec = sec
			}, 1000);
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
	@import url("intment.css");
</style>
