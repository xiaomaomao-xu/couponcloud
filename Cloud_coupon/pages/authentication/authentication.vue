<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 120rpx;height: auto;overflow: hidden;background: #f0f0f0;">
		<view class="auth_pic">
			<image src="../../static/images/auth.png"></image>
			<view>{{approvertype.approveremark}}</view>
			<image src="../../static/images/icon27.png"></image>
		</view>
		<view class="auth_data">
			<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 100%;">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<image :src="item.stores.obligatestrone"></image>
					<text>{{item.stores.storename}}</text>
					<text>{{item.num}}分钟前</text>
				</swiper-item>
			</swiper>
		</view>
		<view class="btn_submit" @click="submitapprovertype"><text>立即认证</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fenzhong:'',
				userinfo:{},
				storid:0,
				myorderid:'',
				approvertype:'',
				msg: [{
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, {
					pic: "../../static/images/logo.png",
					name: '某某商家已经认证',
					num: '两分钟前'
				}, ]
			}
		},
		onLoad() {
			this.getapprovertype()
			this.getmsg()
		},
		methods: {
			getminute(val){
				var mydate = new Date(val);
				var date = new Date();
				var leaddate = date - mydate
				this.fenzhong=Math.floor(leaddate/(60*1000))

			},
			getmsg(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getappreoveshopss.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							for(var i=0;i<taiy_list.length;i++){
								taiy_list[i].stores.obligatestrone = _this.http + '/' + taiy_list[i].stores.obligatestrone
								_this.getminute(taiy_list[i].createtime)
								taiy_list[i].num = _this.fenzhong
							}
							_this.msg = taiy_list
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
			},
			submitapprovertype(){
				let _this = this;
				uni.request({
					url: _this.http + '/usertoterraceOrder/saveUsertoterraceOrder.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
					},
					success: res => {
						console.log("res::")
						console.log(res)
						this.storid=uni.getStorageSync('storeid')
						console.log("this.storid")
						console.log(this.storid)
						console.log("this.approvertype.aptyid")
						console.log(this.approvertype.aptyid)
						console.log("this.approvertype.approvemoney")
						console.log(this.approvertype.approvemoney)
						if (res.data.msg == 'succeed') {
							uni.request({
								url: _this.http + '/wxpay/WxUnified_order.do',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									body: '充值',
									out_trade_no: res.data.data,
									total_fee: this.approvertype.approvemoney*100,
									spbill_create_ip: '39.108.176.62',
									notify_url: 'http://cim.kaifanzhe.club/dingmain/payment/payment.do',
									trade_type: 'JSAPI',
									openid: _this.userinfo.openid
								},
								success: res1 => {
									if (res1.data.map.result_code == 'SUCCESS' && res1.data.map.return_code == 'SUCCESS') {
										uni.requestPayment({
											provider: 'wxpay',
											timeStamp: res1.data.map.timeStamp,
											nonceStr: res1.data.map.nonceStr,
											package: res1.data.map.package,
											signType: res1.data.map.signType,
											paySign: res1.data.map.paySign,
											success: ree => {
												if (ree.errMsg == 'requestPayment:ok') {
													//支付成功后调用
													uni.request({
														url: _this.http + '/MerchantController/putapproveshops.do',
														method: 'POST',
														header: {
															'content-type': 'application/x-www-form-urlencoded'
														},
														data: {
															storid:this.storid,
															orderid:res.data.data,
															approvetypeid:this.approvertype.aptyid
														},
														success: res2 => {
															console.log("res2")
															console.log(res2)
															if (res2.data.msg == 'succeed') {
																
															} else if (res2.data.msg == 'failure') {
																uni.showModal({
																	title: '温馨提示',
																	content: '暂无数据',
																	showCancel: false
																});
															}
														}
													})
												} else {
													uni.showModal({
														title: '温馨提示',
														content: '支付失败',
														showCancel: false
													});
												}
											},
											fail(e) {
												console.log(e);
												uni.showModal({
													title: '温馨提示',
													content: '调起支付失败',
													showCancel: false
												});
											}
										});
									} else {
										uni.showModal({
											title: '温馨提示',
											content: '生成支付失败',
											showCancel: false
										});
									}
								}
							});
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
				
			},
			getapprovertype(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantbgController/putgettopapprovertype.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						console.log("res")
						console.log(res)
						console.log("taiy_list")
						console.log(taiy_list)
						if (res.data.msg == 'succeed') {
							this.approvertype=taiy_list
							console.log("this.approvertype:::")
							console.log(this.approvertype)
							this.approvertype.approvebageimg = _this.http + '/' + this.approvertype.approvebageimg
							console.log("this.approvertype.approvebageimg")
							console.log(this.approvertype.approvebageimg)
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
	@import url("authentication.css");
</style>
