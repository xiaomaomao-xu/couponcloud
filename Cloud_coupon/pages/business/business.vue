<template>
	<view class="center">
		<view class="business_top">
			<view>总收益</view>
			<view>￥{{storeinfo.myearnings}}</view>
			<view>"通过核销优惠券产生的收益"</view>
			<view class="coupon_box">
				<view>
					<text>{{storeinfo.sendcoupon}}</text>
					<text>总发券量</text>
				</view>
				<view>
					<text>{{storeinfo.getcoupon}}</text>
					<text>总领券量</text>
				</view>
				<view>
					<text>{{storeinfo.usecoupon}}</text>
					<text>总使用量</text>
				</view>
			</view>
			<view class="coupon_btn">查看明细</view>
		</view>
		<view class="business_bot">
			<view class='myService'>
				<view class='myService_center'>
					<view class="gopages" v-for="(item,index) in busineBox" :key="index" @tap="order_le(item.num)">
						<view class="pictrue">
							<image :src="item.pic"></image>
						</view>
						<view>{{item.name}}</view>
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
				storeinfo:'',
				busineBox:[{
					pic:'../../static/images/bus1.png',
					name:'发券',
					num:'listone'
				},{
					pic:'../../static/images/bus2.png',
					name:'商家认证',
					num:'listtwo'
				},{
					pic:'../../static/images/bus3.png',
					name:'店铺管理',
					num:'listthree'
				},{
					pic:'../../static/images/bus4.png',
					name:'商品管理',
					num:'listfour'
				},{
					pic:'../../static/images/bus5.png',
					name:'广告投放',
					num:'listfive'
				},{
					pic:'../../static/images/bus6.png',
					name:'用券详情',
					num:'listsex'
				},{
					pic:'../../static/images/bus7.png',
					name:'收款码',
					num:'listseven'
				},{
					pic:'../../static/images/bus8.png',
					name:'商家福利',
					num:'welfare'
				}]
			}
		},
		onLoad() {
			this.getstoreinfo()
		},
		methods: {
			getstoreinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/putaccessstoreer.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: 5
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'auditpass' || res.data.msg == 'audituppass') {
							this.storeinfo=taiy_list
							console.log("this.storeinfo.stid")
							console.log(this.storeinfo.stid)
							uni.setStorageSync('storeid', this.storeinfo.stid);
							console.log("this.storeinfo:::")
							console.log(this.storeinfo)
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
			order_le: function(methodsWords) {
				this[methodsWords]()
			},
			listone:function(){
				uni.navigateTo({
					url:'../Issuing/Issuing'
				})
			},
			listtwo:function(){
				uni.navigateTo({
					url:'../authentication/authentication'
				})
			},
			listthree:function(){
				uni.navigateTo({
					url:'../set_up/set_up'
				})
			},
			listfour:function(){
				uni.navigateTo({
					url:'../commodity/commodity'
				})
			},
			listfive:function(){
				uni.navigateTo({
					url:'../advertisement/advertisement'
				})
			},
			listsex:function(){
				uni.navigateTo({
					url:'../echarts/echarts'
				})
			},
			listseven:function(){
				uni.navigateTo({
					url:'../receivables/receivables'
				})
			},
			welfare:function(){
				uni.navigateTo({
					url:'../busin_welfare/busin_welfare'
				})
			}
		}
	}
</script>

<style>
	@import url("business.css");
</style>
