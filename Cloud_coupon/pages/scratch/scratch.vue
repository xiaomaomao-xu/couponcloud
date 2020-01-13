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
					<button v-show='btn_oul' class="scra_btn" @click="fenxiang" open-type="share">{{src_btn}}</button>
					<view v-show='btn_on' class="scra_btn" @tap="el_view">{{src_btn}}</view>
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
				<view class="btn_tcel">
					<view>成功获取<text>{{coupnamess}}</text></view>
					<view><text @tap="xiangqian">查看详情</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:[],
				coupnamess:'优惠劵',
				btn_on: false,
				btn_oul: false,
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
				starts: 0,
			}
		},
		onLoad(open) {
			this.userinfo = uni.getStorageSync('userinfo');
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
							console.log("进入中奖名单")
							console.log(ward_list)
							//this.sharenum=ward_list.length
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
								this.msg.push({
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
						userid: 5
					},
					success: res => {
						let bility = JSON.parse(res.data.data)
						console.log(res.data.msg)
						if (res.data.msg == 'succeed') {
							this.num_el = 1
							this.starts = 0
							 _this.sharenum = bility.sharenum
							_this.src_btn = '立即刮奖'
							this.btn_on = true
							this.btn_oul = false
						} else if (res.data.msg == 'abnormal') {
							this.num_el = 0
							this.starts = 1
							_this.src_btn = '去分享'
							this.btn_oul = true
							this.btn_on = false
							_this.sharenum = bility.sharenum
						} else if (res.data.msg == 'rester') {
							this.num_el = 1
							this.starts = 0
							_this.src_btn = '立即刮奖'
							this.btn_oul = false
							this.btn_on = true
							_this.sharenum = bility.sharenum
						} else {
							this.num_el = 0
							this.starts = 0
							_this.sharenum = bility.sharenum
							_this.src_btn = '明日再来'
							this.btn_oul = false
							this.btn_on = true
						}

						
					}
				})
			},
			//点击抽奖
			el_view: function() {
				console.log()
				if (this.starts == 0) {
					//可抽奖
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
							console.log(res)
							
							if (res.data.msg == 'succeed') {
								let tombola = JSON.parse(res.data.data)
								console.log(tombola);
								this.coupnamess = tombola.couponinfo.couponname
								_this.secrch = true
							} else if (res.data.msg == 'failure') {
								console.log(2)

							}else{
								uni.showModal({
									title: '温馨提示',
									content: '奖品已被你全部拿走了',
									showCancel: false
								});
							}
						}
					})
				} else {
					//分享
					console.log("进入分享")
					//this.onShareAppMessage()
					this.fenxiang();
				}


			},
			//查看详情
			xiangqian: function(){
				console.log(123)
				uni.switchTab({
					url: "../voucher/voucher"
				})
			}
			
			,
			//分享事件
			fenxiang(){
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/putlottosharebyuserwx.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
				
						userid: 5
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							this.btn_oul = false 
							this.btn_on = true
							this.getbilityinfo
						} else if (res.data.msg == 'failure') {
						
						}
						
					}
					
				})
			}
			
			,
			colse: function() {
				this.secrch = false
				this.getbilityinfo();
			}, //转发
			onShareAppMessage(res) {
				if (res.from === 'button') { // 来自页面内分享按钮
					
				}
				return {
					title: '自定义分享标题',
					// path: '/pages/test/test?id=123'
					success: function() {
						let _this = this;
						uni.request({
							url: _this.http + '/ActivrecordController/putlottosharebyuserwx.do',
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {

								userid: 5
							},
							success: res => {
								console.log(res)
								this.getbilityinfo
							}
							
						})
					},
					fail: function(){
						console.log("进入其中")
						let _this = this;
						uni.request({
							url: _this.http + '/ActivrecordController/putlottosharebyuserwx.do',
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								userid: 5
							},
							success: res => {
								console.log(res)
								this.getbilityinfo
							}
						})
					}
				}
			}
		}
	}
</script>

<style>
	@import url("scratch.css");
	@import url("animate.css");
</style>
