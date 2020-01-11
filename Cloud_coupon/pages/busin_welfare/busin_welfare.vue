<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 120rpx;height: auto;overflow: scroll;background: #f0f0f0;">
		<view class="auth_pic">
			<image src="../../static/images/auth.png"></image>
		</view>
		<view class="busin_list">
			<text>剩余优惠券</text>
			<text>20</text>
		</view>
		<view class="dining_rule">
			<view>活动规则</view>
			<view>1.爱神的箭撒肯定就扫街都死啊基地啊搜集撒娇的窘境萨蒂哦撒决赛哦对死哦啊大家噢噢噢噢噢噢噢噢噢噢噢噢哦哦撒娇的赌东道赌东道撒大大大大大大撒东坡爱神的箭欧帕萨迪扫平的空间</view>
		</view>
		<view class="dining_ment">
			<view>￥9.9</view>
			<view>立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeweifare:''
				
			}
		},
		onLoad() {
			this.getmerchantweifare()
		},
		methods: {
			getmerchantweifare(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getmerchantweifare.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						stid: uni.getStorageSync('storeid')
					},
					success: res => {
						// let taiy_list = JSON.parse(res.data.data)
						console.log("res")
						console.log(res)
						if (res.data.msg == 'rester') {
							this.storeweifare=taiy_list
							console.log("this.storeweifare:::")
							console.log(this.storeweifare)
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("busin_welfare.css");
</style>
