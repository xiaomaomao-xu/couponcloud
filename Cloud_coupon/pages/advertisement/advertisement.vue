<template>
	<view class="center" style="margin-bottom: 120rpx;">
		<view class="adver_unp">
			<view class="adver_title"><text>广告投放位置</text><text>(1天50元起)</text></view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.adsiid">
						<view class="radio_pic">
							<radio :value="item.adsiid" :checked="index === current" />
						</view>
						<view class="radio_text">{{item.advertname}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="adver_unp">
			<view class="adver_title"><text>选择上传图片</text><text>(1张)</text></view>
			<view class="datails_sub" @tap="Addimg" v-if="Piclist">
				<image v-if="https" :src="morenimg"></image>
			</view>
		</view>
		<view class="adver_unp">
			<view class="adver_title"><text>广告投放天数</text><text>({{everymonery/100}}天1元)</text></view>
			<view class="calendar">
				<uni-calendar  :showMonth="true" @change="change"  :date="info.date" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate" :range="info.range"/>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 100%;height: 120rpx;background: white;border-top: 1px solid #EAEAEA;">
			<view style="display: block;margin: 20rpx auto;font-size: 0.8rem;width: 80%;height:80rpx;line-height: 80rpx;text-align: center;border-radius: 10rpx;;background: #f18711;color: white;" @tap="paydianji()">确定投放</view>
		</view>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				morenimg:'../../static/images/icon26.png',
				advictjson:'',
				advicetimes:[],
				orderids:'',
				monges:1,
				adverimg:'',
				changeimg:'',
				advetypeid:1,
				everymonery:1,
				district:'',
				storeinfo:[],
				storeid:1,
				https:this.http,
				notime:'',
				info: {
					date: '',
					startDate: '',
					endDate: '',
					lunar: true,
					range: true,
				},
				Piclist:true,
				Imglist:true,
				addpic:[],
				items: [{
						value: '首页广告',
						name: '首页广告'
					},
					{
						value: '秒杀广告',
						name: '秒杀广告',
						checked: 'true'
					},
					{
						value: '拼团广告',
						name: '拼团广告'
					},
					{
						value: '中部广告',
						name: '中部广告'
					},
					{
						value: '发现广告',
						name: '发现广告'
					},
					{
						value: '电影广告',
						name: '电影广告'
					},
				],
				current: 0,
			}
		},
		onLoad() {
			this.ontimeser()
			uni.setStorageSync('district',this.district);
			this.storeid=uni.getStorageSync('storeid');
			this.getadvertypes();
		},
		methods: {
			ontimeser(){
				let dates= new Date();
				let year=dates.getFullYear();
				let month=dates.getMonth()+1;
				let day=dates.getDate();
				this.notime=year+'-'+month+'-'+day
				console.log(this.notime)
			}
			,
			getadvertypes(){
				let dangqiandate = new Date();
				let _this = this;
				uni.request({
					url: _this.http + '/AdverrecordController/getmyadverrecorder.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						
					},
					success: res => {
						console.log(res)
						if (res.data.msg == 'succeed') {
							let taiy_list = JSON.parse(res.data.data)
							this.advetypeid = taiy_list[0].adsiid
							this.everymonery=taiy_list[0].advertmoney
							this.items = taiy_list
							console.log(taiy_list)
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
			getadvertisement(){
				let dangqiandate = new Date();
				let _this = this;
				uni.request({
					url: _this.http + '/AdverrecordController/getthesamemonthadverrecorder.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						district:this.district,
						advertypeid:1,
						adverbegintime: dangqiandate,
					},
					success: res => {
						console.log(res)
						if (res.data.msg == 'succeed') {
							let taiy_list = JSON.parse(res.data.data)
							console.log(taiy_list)
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
			// 添加投放
			 addadvertiv(){
				let _this = this;
				this.monges = this.everymonery*this.advicetimes.length
				 uni.request({
				 	url: _this.http + '/AdverrecordController/putaddadverrecorder.do',
				 	method: 'POST',
				 	header: {
				 		'content-type': 'application/x-www-form-urlencoded'
				 	},
				 	data: {
				 		timejson:this.advictjson,
				 		storeid:this.storeid,	//商家编号
				 		orderid:this.orderids,
				 		advertypeid:this.advetypeid,
				 		adverimg:this.adverimg,
				 		adverhare:"../merchant/merchant?id="+this.storeid, // 商家编号
				 		advermonery:this.everymonery*this.advicetimes.length,
				 		adtotaldays:this.advicetimes.length,
				 	},
				 	success: res => {
						console.log('进入其中')
				 		console.log(res)
				 		if (res.data.msg == 'succeed') {
				 			console.log('添加成功')
							this.pay()
				 		} else if (res.data.msg == 'failure') {
				 			uni.showModal({
				 				title: '温馨提示',
				 				content: '购买失败',
				 				showCancel: false
				 			});
				 		}else{
							let qizhongdate = res.data.data
							uni.showModal({
								title: '温馨提示',
								content: qizhongdate+'这天已被抢购完了',
								showCancel: false
							});
						}
				 	}
				 })
				 
			 },
			 // 移除投放
			  deleadvertiv(){
			 	let _this = this;
				this.monges = this.everymonery*this.advicetimes.length
			 	 uni.request({
			 	 	url: _this.http + '/AdverrecordController/putdeleadverrecorder.do',
			 	 	method: 'POST',
			 	 	header: {
			 	 		'content-type': 'application/x-www-form-urlencoded'
			 	 	},
			 	 	data: {
			 	 		timejson:this.advictjson,
			 	 		storeid:this.storeid,	//商家编号
			 	 		orderid:this.orderids,
			 	 		advertypeid:this.advetypeid,
			 	 		adverimg:this.adverimg,
			 	 		adverhare:"../merchant/merchant?id="+this.storeid, // 商家编号
			 	 		advermonery:this.everymonery*this.advicetimes.length,
			 	 		adtotaldays:this.advicetimes.length,
			 	 	},
			 	 	success: res => {
			 			console.log('进入其中')
			 	 		console.log(res)
			 	 		if (res.data.msg == 'succeed') {
			 	 			console.log('成功')
			 	 		} else if (res.data.msg == 'failure') {
			 	 			console.log('失败')
			 	 		}else{
			 				console.log('失败')
			 			}
			 	 	}
			 	 })
			 	 
			  }
			 ,
			 //生成订单
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
			 			userid: 3, //登陆的userid
			 			couponmonery:this.monges,
			 			paystart:1,
			 			orderstart:3,
			 		},
			 		success: res => {
			 			if (res.data.msg == 'succeed') {
			 				this.orderids=res.data.data
							this.addadvertiv()
			 				
			 				
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
			// 点击事件
			paydianji: function(){
				let timeleng = this.advicetimes.length
				let adveimgs = this.adverimg
				if(adveimgs!=null&&adveimgs!=''&&adveimgs!=undefined){
					if(timeleng>0){
						this.orderidsqian()
					}else{
						uni.showModal({
							title: '温馨提示',
							content: '请选择投放日期',
							showCancel: false
						});
					}
					
				}else{
					uni.showModal({
						title: '温馨提示',
						content: '请添加投放图片',
						showCancel: false
					});
				}
			}
			,
			change:function (e){
				//日期选择
				console.log(e)
				this.advicetimes=e.range.data
				if(this.advicetimes.length == 0){
					this.advicetimes = [],
					console.log(e.fulldate)
					this.advicetimes.push(e.fulldate)
					console.log("进入其中")
					console.log(this.advicetimes)
				}
				var timejson = JSON.stringify(this.advicetimes)
				this.advictjson = timejson
				console.log(this.advicetimes)
				console.log(this.advictjson)
			},
			radioChange: function(evt) {
				console.log("evt")
				console.log(evt)
				
				console.log("radioChange")
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].adsiid == evt.target.value) {
						console.log("this.items[i].value111")
						console.log(this.items[i].adsiid)
						this.advetypeid = this.items[i].adsiid
						this.everymonery = this.items[i].advertmoney
						
						this.current = i;
						break;
					}
				}
			},
			pay: function() {
				let _this = this;
				uni.request({
					url: _this.http + '/wxpay/WxUnified_order.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						body: '广告投放',
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
										
										
										
									} else {
										_this.deleadvertiv()
										_this.zhifushibai()
										uni.showModal({
											title: '温馨提示',
											content: '支付失败',
											showCancel: false
										});
									}
								},
								fail(e) {
									_this.deleadvertiv()
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
							_this.deleadvertiv()
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
			,
			Addimg:function(e){
				let _this=this;
				uni.chooseImage({ 
				    
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.addpic = this.addpic.concat(tempFilePaths)
						console.log("this.addpic")
						console.log(this.addpic)
						
						console.log("this.ad2454545dpic")
						console.log(tempFilePaths[0] )
						
						this.changeimg = tempFilePaths[0]
						uni.uploadFile({
							url: _this.http + '/pload/pictureUpLoad.do', 
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								this.adverimg =res.data
								this.morenimg = this.https+'/'+res.data
								console.log("this.adverimg")
								console.log(this.adverimg)
							}
						});
						
						if(this.addpic.length == 3){
							this.Piclist = !this.Piclist
						}
					}
					
				})
			},
			deleteImage:function(index){
				uni.showModal({
					title: '提示',
					content: '确定要删除此图片吗？',
					success:(res)=>{
			        	console.log(index)
						this.addpic = this.addpic.splice(index,1)
						if(this.addpic.length < 3){
							this.Piclist = !this.Piclist
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("advertisement.css");
</style>
