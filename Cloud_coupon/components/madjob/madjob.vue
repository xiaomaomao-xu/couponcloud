<template name="madjob">
	<view>
		<view class="madbox">
			<view class="mad_title">
				<image src="../../static/images/icon32.png" class="animated ring infinite"></image>
				<view><text>09:00</text>正在疯抢</view>
			</view>
			<view class="mad_time">
				<view>距结束</view>
				<view>
					<text>{{hour}}</text><view>:</view>
					<text>{{minu}}</text><view>:</view>
					<text>{{sec}}</text>
				</view>
			</view>
		</view>
		<view class="mad_center">
			<view class="mad_left"><image src="../../static/images/logo.png"></image></view>
			<view class="mad_right">
				<view class="mad_list">阿三大苏打撒旦撒撒打算</view>
				<view class="mad_speed">
					<view>满减券</view>
					<view>5/10张</view>
				</view>
				<view class="mad_btn">
					<view>马上抢</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "madjob",
		data() {
			return {
				hour:'',
				minu:'',
				sec:''
			}
		},
		mounted:function () {
			let date = new Date().getTime();
			let time = new Date(date)
			let hour = time.getHours();
			let minu = time.getMinutes();
			let sec = time.getSeconds();
			let millisecond = time.getMilliseconds(); //毫秒
			this.timer = setInterval(() => {
				console.log(millisecond)
				millisecond = millisecond - 1000;
				if (millisecond <=0) {
					millisecond =  1000;
					sec = sec - 1;
				}
				if (sec <= -1) {
					sec = 59;
					minu = minu - 1;
				}
						 
				if (minu <= -1) {
					minu = 59;
					hour =hour - 1;
				}
				if (sec <= 9) {
					sec = "0" + sec;
				}
				this.hour = hour
				this.minu = minu
				this.sec = sec
			}, 1000);
		},
		methods:{
			
		}
		
	}
</script>
<style>
	@import url("madjob.css");
	@import url("animate.css");
</style>
