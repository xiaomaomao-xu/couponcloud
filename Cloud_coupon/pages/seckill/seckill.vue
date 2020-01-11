<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 0;height: auto;overflow: scroll;background: #f0f0f0;">
		<view class="seckil_title">
			<view v-for="(item,index) in seckilBox" :key="index" @tap="changeIndex(index)"><text :class="{active:currentIndex===index}">{{item}}</text></view>
		</view>
		<view class="seckil_center">
			<madjob v-if="show1" :time='time' :hour='hour' :minu='minu' :sec="sec" :mad_center='mad_center'></madjob>
			<soon v-if="show2" :mad_center='mad_center'></soon>
			<notice v-if="show3" :mad_center='mad_center'></notice>
		</view>
	</view>
</template>

<script>
	import madjob from "../../components/madjob/madjob.vue"
	import soon from "../../components/soon/soon.vue"
	import notice from "../../components/notice/notice.vue"
	export default {
		components: {
			madjob,
			soon,
			notice
		},
		data() {
			return{
		      	seckilBox:['正在疯抢','限时开抢','预告'],
				currentIndex:0,
				show1: true,
				show2: false,
				show3: false,
				district:'',
				issuenumber:0,
				mad_center:[],
				time:0,
				hour:'',
				minu:'',
				sec:'',
			}
		},
		onLoad() {
			console.log( uni.getStorageSync("district"));
			this.district = uni.getStorageSync("district")
			this.getseckillinfo()
		},
		methods: {
			//正在疯抢
			getseckillinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/getdessnoseckill.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum:1,
						issuenumber:_this.issuenumber,
						seckilladreess: _this.district,
						userid:1,
					},
					success: res => {
						_this.mad_center.splice(0,_this.mad_center.length)
						if (res.data.msg == 'succeed') {
							let top_list = JSON.parse(res.data.data)
							console.log(top_list)
							for(let i = 0; i< top_list.list.length;i++){
								_this.mad_center.push({
									pic:_this.http + '/' +top_list.list[i].couponinfo.storeinfo.obligatestrone,
									address:top_list.list[i].couponinfo.storeinfo.storeaddress,
									coupon:top_list.list[i].couponinfo.couponname,
									num:top_list.list[i].couponinfo.drawcouponnum,
									number:top_list.list[i].couponinfo.couponnumbers,
								})
							}
							_this.time = top_list.list[0].seckilltimeframe.setfbeginstr
							//获取当前时间戳
							let timestamp = (new Date()).getTime();
							//结束时间时间戳
							let timestamp1 = top_list.list[0].seckillendtime
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
							console.log(_this.time)
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
			changeIndex(index) {
				this.currentIndex = index;
				if (index == 0) {
					this.show1 = true
					this.show2 = false
					this.show3 = false
					this.issuenumber = 0
					this.getseckillinfo()
				}
				if (index == 1) {
					this.show1 = false
					this.show2 = true
					this.show3 = false
					this.issuenumber = 1
					this.getseckillinfo()
				}
				if (index == 2) {
					this.show1 = false
					this.show2 = false
					this.show3 = true
					this.issuenumber = 2
					this.getseckillinfo()
				}
			}
		}
	}
</script>

<style>
	@import url("seckill.css");
</style>
