<template>
	<view>
		<view style="position: absolute;top: 0;bottom: 0;width: 100%;">
			<view class="scra_box">
				<image :src="https+'/front_image/ggbj.png'" class="image_list1"></image>
				<image :src="https+'/front_image/gg5.png'" class="image_list2 animated flash infinite" style="animation-delay: 1s;"></image>
				<image :src="https+'/front_image/gg1.png'" class="image_list3 animated translatesUpDown infinite" style="animation-delay: 0s;animation-duration: 2s;"></image>
				<image :src="https+'/front_image/gg2.png'" class="image_list4 animated translatesUpDown infinite" style="animation-delay: 0.2s;animation-duration: 2s;"></image>
				<image :src="https+'/front_image/gg3.png'" class="image_list5 animated translatesUpDown infinite" style="animation-delay: 0.4s;animation-duration: 2s;"></image>
				<image :src="https+'/front_image/gg4.png'" class="image_list6"></image>
				<image :src="https+'/front_image/gg4.png'" class="image_list7 animated fadeInUpFZ infinite"></image>
			</view>
			<view class="scra_center">
				<image :src="https+'/front_image/gg6.png'"></image>
				<view class="center_el animated" :class="{fadeOut:isFadeout == true}">
					<view class="scra_title">你还有<text>{{num_el}}</text>次刮奖机会</view>
					<view class="scra_btn" @tap="el_view">{{src_btn}}</view>
					<view class="scra_botm">已有<text>{{sharenum}}</text>人参与刮奖</view>
				</view>
			</view>
			<view class="prize">
				<view class="auth_data">
					<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 100%;">
						<swiper-item v-for="(item, index) in msg" :key="index">
							<image :src="item.pic"></image>
							<text>{{item.name}}</text>
							<text>{{item.num}}</text>
						</swiper-item>
					</swiper>
				</view>
				<view class="prize_title">
					<view>
						<view></view>
					</view>
					<view>奖品池</view>
					<view>
						<view></view>
					</view>
				</view>
				<view class="prize_center">
					<swiper autoplay="true" circular="true" interval="3000" style="height: 100%;">
						<swiper-item class="user_image" v-for="(item,index) in voucher" :key='index'>
							<image v-if="https" :src="https+'/front_image/jb.png'"></image>
							<view class="user_le">
								<view>{{item.name}}</view>
								<view>使用期限:{{item.time}}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="prize_el" v-show="secrch"></view>
			<view class="prize_tc" v-show="secrch">
				<image :src="https+'/front_image/icon16.png'" @tap="colse"></image>
				<image src="../../static/images/ggtc.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				https: this.http,
				secrch: false,
				title: 'Hello',
				isFadeout: false,
				msg: [],
				gid: '',
				voucher: [],
				district: '',
				time: '',
				sharenum: 0,
				num_el: 0,
				src_btn: '',
			}
		},
		onLoad(open) {
			this.gid = open.gid
			this.district = uni.getStorageSync("district")
			this.getbilityinfo()
			this.getControinfo()
			this.getwardinfo()
		},
		methods: {
			//奖池内优惠券
			getControinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/getguaprize.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						guaprizeaddress: _this.district
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							let taiy_list = JSON.parse(res.data.data)
							console.log(taiy_list)
							for (let k = 0; k < taiy_list.length; k++) {
								let voucher_time = new Date(taiy_list[k].couendtime)
								let year = voucher_time.getFullYear();
								let month = voucher_time.getMonth() + 1;
								let day = voucher_time.getDate();
								_this.voucher.push({
									name: taiy_list[k].couponname,
									time: year + '年' + month + '月' + day + '日',
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
			//中奖名单
			getwardinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/getguaawardinfo.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						guaawardaddress: _this.district,
						guaguaid: _this.gid
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							let ward_list = JSON.parse(res.data.data)
							console.log(ward_list)
							for (let i = 0; i < ward_list.length; i++) {
								//获取当前时间戳
								let timestamp = (new Date()).getTime();
								//结束时间时间戳
								let timestamp1 = ward_list[i].createtime
								//获取时间戳的差距
								let timestamp_el = timestamp - timestamp1
								//天,时，分
								let day = parseInt(timestamp_el / (1000 * 60 * 60 * 24))
								let hour = parseInt((timestamp_el % (1000 * 3600 * 3600 * 24)) / (1000 * 60 * 60));
								let minu = parseInt((timestamp_el % (1000 * 3600)) / (1000 * 60));
								if (minu > 0 && hour < 0 && day < 0) {
									_this.time = minu + '分钟之前'
								}
								if (minu > 0 && hour > 0 && day < 0) {
									_this.time = hour + '小时之前'
								}
								if (minu > 0 && hour > 0 && day > 0) {
									_this.time = day + '天之前'
								}
								_this.msg.push({
									pic: _this.http + '/' + ward_list[i].userinfo.userimg,
									name: ward_list[i].userinfo.username,
									num: _this.time
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
			//查询抽奖次数
			getbilityinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/getuserfalsifiabilitylotto.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						guaawardaddress: _this.district,
						guaguaid: _this.gid,
						userid: 1
					},
					success: res => {
						let bility = JSON.parse(res.data.data)
						console.log(res.data.msg)
						_this.sharenum = bility.sharenum
						_this.num_el = bility.tombstone
						_this.src_btn = '立即刮奖'
					}
				})
			},
			//点击抽奖
			el_view: function() {
				// this.isFadeout = !this.isFadeout
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/putlatombola.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						guaawardaddress: _this.district,
						guaguaid: _this.gid,
						userid: 5
					},
					success: res => {
						let tombola = JSON.parse(res.data.data)
						console.log(res.data.msg)
						if (res.data.msg == 'succeed') {
							console.log(1)
							_this.secrch = true
							// _this.num_el = tombola.tombstone
							// _this.src_btn = '立即刮奖1'
							
						} else if (res.data.msg == 'abnormal') {
							console.log(2)
							// _this.num_el = tombola.tombstone
							// _this.src_btn = '去分享'
							
						} else if (res.data.msg == 'rester') {
							console.log(3)
							// _this.num_el = tombola.tombstone
							// _this.src_btn = '立即刮奖2'
						} else {
							console.log(4)
							// _this.num_el = tombola.tombstone
							// _this.src_btn = '明日再来'
						}
					}
				})	
			}
		}
	}
</script>

<style>
	@import url("scratch.css");
	@import url("animate.css");
</style>
