<template>
	<view style="width: 100%;background: #f0f0f0;overflow: scroll;position: absolute;top: 0;left: 0;bottom: 120rpx;padding-bottom: 30rpx;box-sizing: border-box;">
		<view class="dining_title">
			<view class="dining_pic">
				<image :src="tail_pic"></image>
			</view>
			<view class="dining_text">
				<view class="text_one">{{tail_name}}</view>
				<view class="text_two">地址:{{tail_address}}</view>
				<view class="text_three">
					<text>{{tail_coupon}}</text>
					<text>{{tail_num}}/{{tail_numbers}}张</text>
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
				<view>{{num_el}}人正在拼单,可直接参与</view>
				<view><text>查看更多</text><image src="../../static/images/icon13.png"></image></view>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 360rpx;">
				<swiper-item v-for="(item, index) in list_el" :key="index">
					<view  v-for="(items,indexs) in item" :key="indexs">
						<image :src="items.pic"></image>
						<view>
							<text>{{items.name}}</text>
							<text>还差{{items.tnum}}人拼团结束</text>
						</view>
						<view><text>{{items.num}}</text></view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="dining_rule">
			<view>活动规则</view>
			<view>{{attentionremark}}</view>
		</view>
		<view class="dining_ment">
			<view>￥{{money}}</view>
			<view @tap="payment">立即支付</view>
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
							<text>还差{{item.tnum}}人拼团结束</text>
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
				millisecond:'',
				msg: [],
				whoid:0,
				tail_pic:'',
				tail_name:'',
				tail_address:'',
				tail_coupon:'',
				tail_numbers:'',
				tail_num:'',
				num_el:0,
				list_el:[],
				money:0,
				tombstone:0,
				attentionremark:'',
			}
		},
		onLoad(option) {
			this.whoid = option.id
			this.gettailsinfo()
		},
		methods: {
			//拼团详情
			gettailsinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/getwholesaledetails.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						whoid: _this.whoid		
					},
					success: res => {
						console.log(res)
						if (res.data.msg == 'succeed') {
							let details_list = JSON.parse(res.data.data)
							console.log(details_list)
							_this.tail_pic =_this.http + '/' + details_list.couponinfo.storeinfo.obligatestrone
							_this.tail_name = details_list.couponinfo.storeinfo.storename
							_this.tail_address = details_list.couponinfo.storeinfo.storeaddress
							_this.tail_coupon = details_list.couponinfo.couponname
							_this.tail_numbers  = details_list.couponinfo.couponnumbers 
							_this.tail_num = details_list.couponinfo.drawcouponnum 
							_this.num_el = details_list.wholesaleprorlenum
							_this.money = details_list.colonelmonery/100
							_this.tombstone =details_list.tombstone
							_this.attentionremark = details_list.couponinfo.attentionremark
							if(details_list.groupbooklist[0].groupbookid!=null&&details_list.groupbooklist[0].groupbookid!=undefined&&details_list.groupbooklist[0].groupbookid!=''){
								for(let i =0;i<details_list.groupbooklist.length;i++){
									_this.msg.push({
										pic: _this.http + '/' +details_list.groupbooklist[i].groupremark,
										name: details_list.groupbooklist[i].groupname,
										tnum:details_list.groupbooklist[i].grouppeoplenum - details_list.groupbooklist[i].currentnum,
										num: '去拼单',
									})
								}
								for(let j = 0; j<details_list.groupbooklist.length;j+=2){
									_this.list_el.push(_this.msg.slice(j,j+2))
								}
							}
							
							console.log(_this.msg)
							//获取当前时间戳
							let timestamp = (new Date()).getTime();
							//结束时间时间戳
							let timestamp1 = details_list.whoendtime
							//获取时间戳的差距
							let timestamp_el = timestamp1-timestamp
							console.log(timestamp_el)
							//计算的到时分秒
							let hour = parseInt((timestamp_el % (1000 * 3600 *3600 * 24)) / (1000 * 60 * 60));
							let minu = parseInt((timestamp_el % (1000 * 3600 )) / (1000 * 60));
							let sec = parseInt((timestamp_el % (1000 * 60)) / 1000);
							let millisecond = (timestamp_el % (1000)) / 1; //毫秒
							this.timer = setInterval(() => {
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
								_this.hour = hour
								_this.minu = minu
								_this.sec = sec
							}, 1000);
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
			open_box:function(){
				this.open = !this.open
			},
			close:function(){
				this.open = !this.open
			},
			payment(){
				if(this.tombstone == 1){
					
				}else{
					uni.showModal({
						title: '温馨提示',
						content: '该优惠券您已经开过团!结束后重新开团',
						showCancel: false
					});
				}
			}
		}
	}
</script>

<style>
	@import url("dining.css");
</style>
