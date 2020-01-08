<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: scroll;background: #F0F0F0;">
		<view class="voucher_title">
			<view v-for="(item,index) in titlebox" :key='index' @tap="tapindex(index)">
				<text :class="{active:titleindex===index}" >{{item}}</text>
			</view>
		</view>
		
		<view class="dining_title" v-for="(item,index) in collelist" :key='index'>
			<view class="dining_pic">
				<image v-if="https" :src="item.pic"></image>
			</view>
			<view class="dining_text">
				<view class="text_list">
					<view>{{item.name}}</view>
					<view>
						<text>{{item.hour}}</text>
						<view>:</view>
						<text>{{item.minu}}</text>
						<view>:</view>
						<text>{{item.sec}}</text>
					</view>
				</view>
				<view class="text_two">{{item.address}}</view>
				<view class="text_three">
					<text>{{item.coupon}}</text>
				</view>
				<view class="text_five">
					有效时间:{{item.orderid}}-{{item.warnremark}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleindex:0,
				titlebox:['预约中','预约成功','预约失败'],
				open:false,
				start:0,
				collelist:[],
				https:this.http,
				pagenum:1,
				result:{},
			}
		},
		onLoad() {
			this.getyuyues();
		},
		methods: {
			tapindex(index){
				this.titleindex = index
				this.start = this.titleindex
				this.getyuyues()
			},
			open_box:function(){
				this.open = !this.open
			},
			close:function(){
				this.open = !this.open
			},
			getyuyues(){
				let _this = this;
				uni.request({
					url:_this.http+'/FansController/getmyxianshimioashaall.do',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						pagenum:this.pagenum,
						storeid:1,
						tombstone:this.start,
					},
					success:res =>{
						let collect_list = JSON.parse(res.data.data)
						if(res.data.msg == 'succeed'){
							console.log(collect_list)
							for (var l = 0; l < collect_list.list.length; l++) {
								//开始时间
								let voucher_begintime = new Date(collect_list.list[l].seckillinfo.seckilltime)
								let beginyear=voucher_begintime.getFullYear();
								let beginmonth=voucher_begintime.getMonth()+1; 
								let beginday=voucher_begintime.getDate(); 
								//结束时间
								let voucher_endtime = new Date(collect_list.list[l].seckillinfo.seckillendtime)
								let endyear=voucher_endtime.getFullYear();
								let endmonth=voucher_endtime.getMonth()+1; 
								let endday=voucher_endtime.getDate(); 
								//获取当前时间戳
								let timestamp = (new Date()).getTime();
								//结束时间时间戳
								let timestamp1 = collect_list.list[l].seckillinfo.seckillendtime
								//获取时间戳的差距
								let timestamp_el = timestamp1-timestamp
								console.log(timestamp_el)
								//计算的到时分秒
								let hour = parseInt((timestamp_el % (1000 * 3600 *3600 * 24)) / (1000 * 60 * 60));
								let minu = parseInt((timestamp_el % (1000 * 3600 )) / (1000 * 60));
								let sec = parseInt((timestamp_el % (1000 * 60)) / 1000);
			                    let millisecond = (timestamp_el % (1000)) / 1; //毫秒
								_this.collelist.push({
									pic: _this.https+'/'+collect_list.list[l].seckillinfo.couponinfo.storeinfo.obligatestrone,
									name:collect_list.list[l].seckillinfo.couponinfo.storeinfo.storename,
									address:collect_list.list[l].seckillinfo.couponinfo.storeinfo.storeaddress,
									coupon:collect_list.list[l].seckillinfo.couponinfo.couponname,
									orderid:beginyear+'.'+beginmonth+'.'+beginday,
									warnremark:endyear+'.'+endmonth+'.'+endday,
									hour: hour,
									minu: minu,
									sec: sec,
									millisecond:millisecond,
								})
							}
							
							for(let o = 0;o<_this.collelist.length;o++){
								this.timer = setInterval(() => {
									_this.collelist[o].millisecond = _this.collelist[o].millisecond - 1000;
									if (_this.collelist[o].millisecond <= 0) {
										_this.collelist[o].millisecond = 1000;
										_this.collelist[o].sec = _this.collelist[o].sec - 1;
									}
									if (_this.collelist[o].sec <= -1) {
										_this.collelist[o].sec = 59;
										_this.collelist[o].minu = _this.collelist[o].minu - 1;
									}
										
									if (_this.collelist[o].minu <= -1) {
										_this.collelist[o].minu = 59;
										_this.collelist[o].hour = _this.collelist[o].hour - 1;
									}
									if (_this.collelist[o].sec <= 9) {
										_this.collelist[o].sec = "0" + _this.collelist[o].sec;
									}
								}, 1000);
							}
							
							console.log(_this.collelist)
							
							// let atime = new Date(collect_list.list[0].seckillinfo.seckillendtime)
							// let btime =new Date();
							// console.log(atime);
							
						}else if(res.data.msg == 'failure'){
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
	@import url("intment.css");
</style>
