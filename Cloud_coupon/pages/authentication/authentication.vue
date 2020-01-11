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
					<image :src="item.pic"></image>
					<text>{{item.name}}</text>
					<text>{{item.num}}</text>
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
		},
		methods: {
			submitapprovertype(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/putapproveshops.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						storid: uni.getStorageSync('storeid'),
						orderid:this.approvertype.orderid,
						approvetypeid:this.approvertype.approvetypeid
					},
					success: res => {
						console.log("res")
						console.log(res)
						if (res.data.msg == 'succeed') {
				
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
