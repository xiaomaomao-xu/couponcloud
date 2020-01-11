<template>
	<view style="background: #FFFFFF;height: auto;overflow: scroll;width: 100%;">
		<view class="page_title">
			<view class="title_name" v-if="https">
				<view class="tab" :class="{'actives':index==tabIndex}" @tap="toggleTab(item,index)" v-for="(item,index) in tabList"
				 :key="index">{{item.name}}</view>
				<w-picker mode="region" :defaultVal="defaultVal" :hideArea="false" @confirm="onConfirm" ref="region"
				 themeColor="#f00">
				</w-picker>
				<image :src="https+'/front_image/icon1.png'"></image>
			</view>
			<view class="title_input" @tap="btn_title">
				<input type="text" disabled="disabled">
				<image v-if="https" :src="https+'/front_image/icon2.png'"></image>
			</view>
			<view class="title_scanning" @tap="RQcode">
				<image v-if="https" :src="https+'/front_image/icon3.png'"></image><text>扫一扫</text>
			</view>
		</view>
		<view class="membership">
			<view class="member_card">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" interval="3000" duration="500" effect="coverflow"
							 indicator-color="#868686" indicator-active-color="#dca970">
								<swiper-item v-for="(item,index) in imgbox" :key="index">
									<view class="swiper-item uni-bg-red">
										<image :src="item.pic" @tap="url_pic"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="special">
			<view class="special_el" v-for="(item,index) in spercial" :key="index" @tap="order_le(item.num)">
				<image :src="item.img"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="activity">
			<view class="activity_le">
				<image v-if="https" :src="https+'/front_image/pg1.png'"></image>
			</view>
			<view class="activity_ri">
				<view>
					<image v-if="https" :src="https+'/front_image/pg2.png'"></image>
				</view>
				<view>
					<image v-if="https" :src="https+'/front_image/pg3.png'"></image>
				</view>
			</view>
		</view>
		<view class="commodity">
			<tab-max-auto class="tabmax" :navlist="navList" @loadData="loadData" @changeTab="changeTab" @tabClick="tabClick">
				<view slot="scrollContent" v-show="tabCurrentIndex == 0" class="commodity_el" v-for="(item,index) in list_view" :key='index'>
					<view class="business" @tap="businel(index)">
						<image v-if="https" :src="item.image"></image>
						<view>
							<text>{{item.name}}</text>
							<text>{{item.disce}}</text>
						</view>
						<view>
							<view>
								<image v-if="https" :src="https+'/front_image/icon15.png'"></image>
								<image v-if="https" :src="https+'/front_image/icon15.png'"></image>
								<image v-if="https" :src="https+'/front_image/icon15.png'"></image>
								<image v-if="https" :src="https+'/front_image/icon15.png'"></image>
								<image v-if="https" :src="https+'/front_image/icon15.png'"></image>
							</view>
							
							<text>{{item.sale}}</text>
							<text>{{item.aste}}</text>
						</view>
						<view>
							<text>评</text>
							<text>{{item.eval}}</text>
							<text>收藏</text>
							<text>{{item.coll}}</text>
						</view>
					</view>
					<view class="commodity_list" @tap="details" v-for="(item,index) in dity_list" :key='index' >
						<image v-if="https" :src="item.pic"><text class="quan">{{item.coupon}}</text></image>
						<view>{{item.introduce}}</view>
						<view><text>原价:￥{{item.price}}</text><text>{{item.count}}折</text></view>
						<view><text>券后:￥{{item.after}}</text></view>
					</view>
				</view>
			</tab-max-auto>
		</view>
		
		<!-- <view class="tabbar_list">
			<view class="list_el" v-for="(item,index) in coupon" :key="index"  :class="{active:currentIndex===index}"  @tap="changeIndex(index)">
				<image class="animated" :class="{rotateIn:currentIndex===index}" :src="currentIndex===index?item.img:item.pic"></image>
				<view>{{item.name}}</view>
			</view>
		</view>-->
	</view>
</template>

<script>
	import tabMaxAuto from '@/components/tab-max-auto.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import amap from '../../components/amap-wx.js';
	export default {
		components: {
			tabMaxAuto,
			wPicker
		},
		data() {
			return {
				address:0,
				list_view:[],
				dity_list:[],
				pagenum: 1,
				indicatorDots: true,
				currentStatus: 0,
				navList: [],
				loadingType: 'more',
				district:'',
		    	amapPlugin: null,
				key: '6ffbe58a99e0487a6012276570256325',
				latitude:'',
				longitude:'',
				imgbox: [],
				image_url:[],
				spercial: [{
					img: '../../static/images/icon4.png',
					name: '拼团',
					num: 'assemble'
				}, {
					img: '../../static/images/icon5.png',
					name: '秒杀',
					num: 'seckill'
				}, {
					img: '../../static/images/icon6.png',
					name: '油卡',
					num: 'ooil_card'
				}, {
					img: '../../static/images/icon7.png',
					name: '观影',
					num: 'viewing'
				}, {
					img: '../../static/images/icon8.png',
					name: '刮刮',
					num: 'scratch'
				}],
				coupon: [{
					pic: '../../static/images/tab1.png',
					img: '../../static/images/tab2.png',
					name: '首页'
				}, {
					pic: '../../static/images/tab3.png',
					img: '../../static/images/tab4.png',
					name: '券包'
				}, {
					pic: '../../static/images/tab5.png',
					img: '../../static/images/tab6.png',
					name: '发现'
				}, {
					pic: '../../static/images/tab7.png',
					img: '../../static/images/tab8.png',
					name: '雷达'
				}, {
					pic: '../../static/images/tab9.png',
					img: '../../static/images/tab10.png',
					name: '个人中心'
				}],
				comm_el: ["优品好物", "电影", "上衣", "外卖", "食品", "裤子", "电器"],
				tabList: [],
				tabIndex: 0,
				currentIndex: 0,
				defaultVal: [],
				https: this.http,
				guaid:0,
			}
		},
		onLoad() {
			this.getiddress();
		},
		computed: {
			tabCurrentIndex() {
				return this.currentStatus
			}
		},
		methods: {
			//获取区域位置
			getiddress() {
				this.amapPlugin = new amap.AMapWX({
					key: this.key
				});
				this.amapPlugin.getRegeo({
					success: data => {
						console.log(data)
					    let province = data[0].regeocodeData.addressComponent.province;
					    let city = data[0].regeocodeData.addressComponent.city;
					    let district = data[0].regeocodeData.addressComponent.district;
						this.district = province + city + district
						console.log(this.district)
						this.longitude= data[0].longitude;
						this.latitude= data[0].latitude;
						this.tabList.push({
							mode: "region",
							name:district
						})
						this.defaultVal.push(province,city,district)
						this.getshoptype();
			            this.gettaiyinfo();
					}
				});
			},
			//获取商家分类列表
			getshoptype() {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantbgController/getallshoptype.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							try {
							    uni.setStorageSync('district',this.district);
							} catch (e) {
							   uni.showModal({
							   	title: '温馨提示',
							   	content: '区域选择失败,请重新选择',
							   	showCancel: false
							   });
							}
							_this.navList = [];
							let navLists = JSON.parse(res.data.data)
							for (let i = 0; i < navLists.length; i++) {
								_this.navList.push({
									id: navLists[i].sttyid,
									title: navLists[i].sttyname
								});
							}
							_this.getshopinfo(_this.navList[_this.currentStatus].id);
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
			//根据商家分类获取商品数据
			getshopinfo(sttyid) {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getshopbytypelist.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: _this.pagenum,
						district: _this.district,
						storetyid: sttyid,
						latitude:_this.latitude,
						longitude:_this.longitude
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							let comm_el = JSON.parse(res.data.data)
							for (let j=0;j<comm_el.list.length;j++) {
								console.log(comm_el.list[j].stid)
								_this.list_view.push({
									image:_this.http + '/' +comm_el.list[j].obligatestrone,
									name:comm_el.list[j].storename,
									disce:comm_el.list[j].storeaddress,
									address:comm_el.list[j].storegrade,
									sale: '销售量:' + comm_el.list[j].marketcount ,
									aste:comm_el.list[j].obligatestrtow + '米',
									eval:comm_el.list[j].goodreputation + '人',
									coll:comm_el.list[j].storefans+ '人',
									stid:comm_el.list[j].stid
								})
								_this.dity_list.push({
									pic:_this.http + '/' +comm_el.list[j].commoditylist[j].commodiimg,
									introduce:comm_el.list[j].commoditylist[j].commodiremark,
									coupon:comm_el.list[j].commoditylist[j].commodiname,
									price:comm_el.list[j].commoditylist[j].originalprice,
									count:comm_el.list[j].commoditylist[j].commdis,
									after:comm_el.list[j].commoditylist[j].currentprice
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
			//头部轮播广告
			gettaiyinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/AdverrecordController/gettaiyakiadverrecord.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						advertypeid: 1,
						district: _this.district
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							let taiy_list = JSON.parse(res.data.data)
							for (let k = 0; k < taiy_list.length; k++) {
								_this.imgbox.push({
									pic:_this.http + '/' +taiy_list[k].adverimg,
								})
								_this.image_url.push({
									url:taiy_list[k].adverhare
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
			url_pic(){
				console.log(this.image_url)
			},
			changeTab(index) {
				this.currentStatus = index
				console.log(index)
			},
			tabClick(index) {
				this.currentStatus = index
				console.log(index)
			},
			loadData() {
				
			},
			btn_title: function() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			details: function() {
				uni.navigateTo({
					url: "../details/details"
				})
			},
			businel: function(index) {
				let stid = this.list_view[index].stid
				uni.navigateTo({
					url: "../merchant/merchant?id="+stid
				})
			},
			RQcode: function() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				})
			},
			//区域选择
			toggleTab(item, index) {
				this.tabIndex = index;
				this.mode = item.mode;
				this.defaultVal = item.value;
				this.$refs[item.mode].show();
			},
			//确定选择区域
			onConfirm(val) {
				this.tabList[0].name = val.checkArr[2];
				this.district = val.result
				this.getshoptype()
			},
			//底部
			changeIndex(index) {
				this.currentIndex = index;
			},
			order_le: function(methodsWords) {
				this[methodsWords]()
			},
			//判断活动是否开启
			scratch() {
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/getgoonguagua.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						guaawardaddress:_this.district
					},
					success: res => {
						console.log(res)
						if (res.data.msg == 'succeed') {
							let usid_el = JSON.parse(res.data.data)
							console.log(usid_el)
							_this.guaid = usid_el.guaid
							let guaid = _this.guaid
							uni.navigateTo({
								url: "../scratch/scratch?gid="+guaid
							})
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '活动暂未开启',
								showCancel: false
							});
						}
					}
				})
			},
			seckill() {
				uni.navigateTo({
					url: '../seckill/seckill'
				})
			},
			viewing() {
				uni.navigateTo({
					url: '../viewing/viewing'
				})
			},
			ooil_card() {
				uni.navigateTo({
					url: '../ooil_card/ooil_card'
				})
			},
			assemble() {
				uni.navigateTo({
					url: '../assemble/assemble'
				})
			}

		}
	}
</script>

<style>
	@import url("page_home.css");
	@import url("animate.css");
</style>
