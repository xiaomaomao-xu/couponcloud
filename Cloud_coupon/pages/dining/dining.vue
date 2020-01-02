<template>
	<view style="width: 100%;background: #f0f0f0;overflow: scroll;position: absolute;top: 0;left: 0;bottom: 120rpx;padding-bottom: 30rpx;box-sizing: border-box;">
		<view class="dining_title">
			<view class="dining_pic">
				<image src="../../static/images/bar.jpg"></image>
			</view>
			<view class="dining_text">
				<view class="text_one">香港路重庆火锅店</view>
				<view class="text_two">地址:汇川区香港路盛邦帝标</view>
				<view class="text_three">
					<text>折扣券</text>
					<text>10/20张</text>
				</view>
				<view class="text_four">
					<view>
						<view>距结束</view>
						<view>
							<text>{{hour}}</text>
							<view>:</view>
							<text>{{minu}}</text>
							<view>:</view>
							<text>{{sec}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="auth_data">
			<view class="benner_title" @tap="open_box">
				<view>40人正在拼单,可直接参与</view>
				<view><text>查看更多</text><image src="../../static/images/icon13.png"></image></view>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 360rpx;">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<view>
						<image :src="item.pic"></image>
						<view>
							<text>{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<view><text>{{item.num}}</text></view>
					</view>
					<view>
						<image :src="item.pic"></image>
						<view>
							<text>{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<view><text>{{item.num}}</text></view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="dining_rule">
			<view>活动规则</view>
			<view>1.爱神的箭撒肯定就扫街都死啊基地啊搜集撒娇的窘境萨蒂哦撒决赛哦对死哦啊大家噢噢噢噢噢噢噢噢噢噢噢噢哦哦撒娇的赌东道赌东道撒大大大大大大撒东坡爱神的箭欧帕萨迪扫平的空间</view>
		</view>
		<view class="dining_ment">
			<view>￥150</view>
			<view>立即支付</view>
		</view>
		<view class="popup" v-if="open">
			<view class="time_list">
			    <image src="../../static/images/icon16.png" @tap="close"></image>
				<view class="time_title">正在拼单</view>
				<view class="list_otrl">
					<view v-for="(item, index) in msg" :key="index">
						<image :src="item.pic"></image>
						<view>
							<text>{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<view><text>{{item.num}}</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				open:false,
				hour: '',
				minu: '',
				sec: '',
				msg: [{
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					time:'剩余10:28:26.00',
					num: '去拼单'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					time:'剩余10:28:26.00',
					num: '去拼单'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					time:'剩余10:28:26.00',
					num: '去拼单'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '去拼单'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					time:'剩余10:28:26.00',
					num: '去拼单'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					time:'剩余10:28:26.00',
					num: '去拼单'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					time:'剩余10:28:26.00',
					num: '去拼单'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					time:'剩余10:28:26.00',
					num: '去拼单'
				}, ]
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
	@import url("dining.css");
</style>
