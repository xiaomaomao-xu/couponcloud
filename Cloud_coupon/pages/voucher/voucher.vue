<template>
	<view class="content">
		<view class="voucher_title">
			<view v-for="(item,index) in titlebox" :key='index' @tap="tapindex(index)">
				<text :class="{active:titleindex===index}">{{item}}</text>
			</view>
		</view>
		<view class="user_image" v-for="(item,index) in voucher" :key='index'>
			<image src="../../static/images/jb.png"></image>
			<view class="user_le">
				<view>{{item.name}}</view>
				<view>到期时间:{{item.time}}</view>
			</view>
			<view class="user_ri" @tap="open_box">{{item.state}}</view>
		</view>
		<view class="popup" v-if="open" v-for="(item,index) in pop_box" :key='index'>
			<view class="pop_list">
			    <image src="../../static/images/icon16.png" @tap="close"></image>
				<navigator class="rq_code" url="../evaluation/evaluation" hover-class="none">
					<image src="../../static/images/ewm.jpg"></image>
				</navigator>
				<view class="shop_name">
					<view>{{item.shop_name}}</view>
					<view>{{item.cup_name}}</view>
					<view>
						<image src="../../static/images/icon9.png"></image>
						<text>{{item.address}}</text>
						<image src="../../static/images/icon29.png" @tap="phone"></image>
					</view>
				</view>
				<view class="rq_two">{{item.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleindex:0,
				titlebox:['未使用','已使用','已过期'],
				open:false,
				voucher:[],
				pop_box:[],
				state:'立即使用',
			}
		},
		onLoad() {
			this.getvouchertinfo();
		},
		methods: {
			tapindex(index){
				this.titleindex = index
				this.getvouchertinfo()
				if(index == 0){
					this.state = '立即使用'
				}
				if(index == 1){
					this.state = '已使用'
				}
				if(index == 2){
					this.state = '已过期'
				}
			},
			open_box:function(){
				this.open = !this.open
			},
			close:function(){
				this.open = !this.open
			},
			phone:function(){
				
			},
			getvouchertinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/MycouponController/putgoonmycoupones.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: 1,
						userid: 5,
						couponstart: _this.titleindex,
					},
					success: res => {
						let voucher_list = JSON.parse(res.data.data)
						_this.voucher.length = 0
						console.log(voucher_list)
						if (res.data.msg == 'succeed') {
							for (var l = 0; l < voucher_list.list.length; l++) {
								let voucher_time = new Date(voucher_list.list[l].couponinfo.createtime)
								let year=voucher_time.getFullYear();
							    let month=voucher_time.getMonth()+1; 
							    let day=voucher_time.getDate(); 
								_this.voucher.push({
									name:voucher_list.list[l].couponinfo.couponname,
									time:year+'年'+month+'月'+day+'日',
									state:_this.state,
								})
								_this.pop_box.push({
									shop_name:voucher_list.list[l].couponinfo.storeinfo.storename,
									cup_name:voucher_list.list[l].couponinfo.couponname,
									address:voucher_list.list[l].couponinfo.storeinfo.storeaddress,
									time:year+'年'+month+'月'+day+'日',
								})
							}
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
		}
	}
</script>

<style>
	@import url("voucher.css");
</style>