<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 120rpx;height: auto;overflow: scroll;background: #f0f0f0;">
		<view class="auth_pic">
			<image src="../../static/images/auth.png"></image>
		</view>
		<view class="busin_list">
			<text>获得优惠券</text>
			<text>20</text>
		</view>
		<view class="dining_rule">
			<view>活动规则</view>
			<view>{{fuli.welfactvarchar}}</view>
		</view>
		<view class="dining_ment">
			<view>{{monges}}元</view>
			<view @tap="zhifu">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeweifare: '',
				monges:1,
				fuli: [],
				userinfo:[],
				orderids:'',
				activid:1,
			}
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('userinfo');
			this.getmerchantweifare()
		},
		methods: {
			getmerchantweifare() {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getmerchantweifare.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: 3
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						console.log(res)
						if (res.data.msg == 'succeed') {
							console.log(taiy_list)
							this.fuli = taiy_list
							this.monges=taiy_list.welfactmonery/100
							this.activid=taiy_list.weacid
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '活动暂未开启',
								showCancel: false
							});
						} else {
							this.fuli = taiy_list
							this.monges=taiy_list.welfactmonery/100
							this.activid=taiy_list.weacid
							uni.showModal({
								title: '温馨提示',
								content: '你已参加过活动',
								showCancel: false,
								success: function (res) {
								    if (res.confirm) {
										uni.navigateBack({
										    delta: 1
										});
								    }
								}
							});
						}

					}
				})
			},
			//开通活动
			kaitonghuodon(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/putstoreweifarebuy.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						weuserid:3,
						weorderid:this.orderids,
						weacid:this.activid,
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							this.orderids=res.data.data
							
							
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						} else {
							uni.showModal({
								title: '温馨提示',
								content: '你已经购买过了',
								showCancel: false
							});
						}
				
					}
				})
			}
			,
			zhifu: function(){
				this.orderidsqian()
				
			} ,
			orderidsqian: function(){
				//订单生成
				let _this = this;
				uni.request({
					url: _this.http + '/CouponsController/putzhifuordershengcheng.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: 3,
						couponmonery:this.monges,
						paystart:1,
						orderstart:4,
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							this.orderids=res.data.data
							this.pay()
							
						}else {
							this.zhifushibai()
						}
				
					}
				})
				
			},
			// 支付成功
			zhifuchengogn(){
				let _this = this;
				uni.request({
					url: _this.http + '/CouponsController/putupadtezhifuzuangtai.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						orderid:this.orderids
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							console.log("支付成功")
							
						} else {
							uni.showModal({
								title: '温馨提示',
								content: '支付成功--异常',
								showCancel: false
							});
						}
				
					}
				})
			},
			//支付失败
			zhifushibai(){
				let _this = this;
				uni.request({
					url: _this.http + '/CouponsController/putpayshibaidele.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						orderid:this.orderids
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							console.log("支付失败")
							
						}  else {
							uni.showModal({
								title: '温馨提示',
								content: '支付失败--异常',
								showCancel: false
							});
						}
				
					}
				})
			}
			,
			pay: function() {
				let _this = this;
				uni.request({
					url: _this.http + '/wxpay/WxUnified_order.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						body: '充值',
						out_trade_no: _this.orderids,
						total_fee: this.monges,
						spbill_create_ip: '39.108.176.62',
						notify_url: 'http://cim.kaifanzhe.club/dingmain/payment/payment.do',
						trade_type: 'JSAPI',
						openid:'o8UYa4xZ2KJHNB2Est52hjU_48CA'
					},
					success: res3 => {
						if (res3.data.map.result_code == 'SUCCESS' && res3.data.map.return_code == 'SUCCESS') {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res3.data.map.timeStamp,
								nonceStr: res3.data.map.nonceStr,
								package: res3.data.map.package,
								signType: res3.data.map.signType,
								paySign: res3.data.map.paySign,
								success: ree => {
									if (ree.errMsg == 'requestPayment:ok') {
										//支付成功后调用
										this.zhifuchengogn()
										this.kaitonghuodon()
										
										
									} else {
										_this.zhifushibai()
										uni.showModal({
											title: '温馨提示',
											content: '支付失败',
											showCancel: false
										});
									}
								},
								fail(e) {
									_this.zhifushibai()
									console.log(e);
									uni.showModal({
										title: '温馨提示',
										content: '调起支付失败',
										showCancel: false
									});
								}
							});
						} else {
							_this.zhifushibai()
							uni.showModal({
								title: '温馨提示',
								content: '生成支付失败',
								showCancel: false
							});
						}
					}
				});

			}
		}
	}
</script>

<style>
	@import url("busin_welfare.css");
</style>
