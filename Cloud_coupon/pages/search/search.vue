<template>
	<view>
		<view class="search">
			<view class="search_cent">
				<input type="text" v-model="uservalue" focus='true'/>
				<image src="../../static/images/icon2.png" @tap="clearval()"></image>
			</view>
			<text>取消</text>
		</view>
		<view class="search_box" v-if="search_box">
			<view class="search_name">历史记录</view>
			<view class="choice">
				<view class="choice_lsit" v-for="(item,index) in historybox" :key="index"><text @tap="retrieval(index)">{{item}}</text></view>
			</view>
			<view class="search_name">热搜</view>
			<view class="choice">
				<view class="choice_lsit" v-for="(item,index) in searchbox" :key="index"><text @tap="rear_jump(index)">{{item}}</text></view>
			</view>
		</view>
		<view class="search_el" v-if="search_el">
			<view class="commodity_el" v-for="(item,index) in list_view" :key='index'>
				<view class="business" @tap="businel">
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
					</view>
					<view>
						<text>评</text>
						<text>{{item.eval}}</text>
						<text>收藏</text>
						<text>{{item.coll}}</text>
					</view>
				</view>
				<view class="commodity_list" @tap="details" v-for="(item,index) in dity_list" :key='index'>
					<image v-if="https" :src="item.pic"><text class="quan">{{item.coupon}}</text></image>
					<view>{{item.introduce}}</view>
					<view><text>原价:￥{{item.price}}</text><text>{{item.count}}折</text></view>
					<view><text>券后:￥{{item.after}}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import amap from '../../components/amap-wx.js';
	export default {
		data() {
			return {
				search_box:true,
				search_el:false,
				uservalue:'',
				historybox:[],
				searchbox:[],
				key:'6ffbe58a99e0487a6012276570256325',
				latitude:'',
				longitude:'',
				list_view:[],
				dity_list:[],
				district:'',
				https: this.http,
			}
		},
		onLoad() {
			this.getiddress();
		},
		methods: {
			//获取区域位置
			getiddress() {
				this.amapPlugin = new amap.AMapWX({
					key: this.key
				});
				this.amapPlugin.getRegeo({
					success: data => {
						let province = data[0].regeocodeData.addressComponent.province;
						let city = data[0].regeocodeData.addressComponent.city;
						let district = data[0].regeocodeData.addressComponent.district;
						this.district = province + city + district
						this.longitude = data[0].longitude;
						this.latitude = data[0].latitude;
						this.getsearchinfo();
						this.gethotinfo();
					}
				});
			},
			//历史记录
			getsearchinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/searchRecord/getSearchRecordsByUser.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: 1,
						pagesize: 10,
						searchRecordUserId: 1,
					},
					success: res => {
						let history_list = JSON.parse(res.data.data)
						console.log(history_list)
						if (res.data.msg == 'succeed') {
							for (var k = 0; k < history_list.list.length; k++) {
								_this.historybox.push(history_list.list[k].searchRecordContent)
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
			//点击搜索
			clearval: function() {
				let _this = this;
				uni.request({
					url: _this.http + '/searchRecord/saveSearchRecord.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						longitude: _this.longitude,
						latitude: _this.latitude,
						searchRecordUserId: 1,
						searchRecordContent: _this.uservalue,
						pagenum: 1,
						pagesize: 10,
					},
					success: res => {
						_this.gethistoryinfo();
						let jump_list = JSON.parse(res.data.data)
						console.log(jump_list)
						if (res.data.msg == 'succeed') {
							for(var g = 0;g<jump_list.list.length;g++){
								_this.list_view.push({
									image: _this.http + '/' + jump_list.list[g].storeimg,
									name: jump_list.list[g].storename,
									disce: jump_list.list[g].storeaddress,
									address: jump_list.list[g].storegrade,
									sale: '销售量:' + jump_list.list[g].storebrowse,
									eval: jump_list.list[g].goodreputation + '人',
									coll: jump_list.list[g].storefans + '人',
								})
								_this.dity_list.push({
									pic: _this.http + '/' + jump_list.list[g].commodityinfos[g].commodiimg,
									introduce: jump_list.list[g].commodityinfos[g].commodiremark,
									coupon: jump_list.list[g].commodityinfos[g].commodiname,
									price: jump_list.list[g].commodityinfos[g].originalprice,
									count: jump_list.list[g].commodityinfos[g].commdis,
									after: jump_list.list[g].commodityinfos[g].currentprice	
								})
							}	
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '未搜索到店铺',
								showCancel: false
							});
						}
					}
				})
				_this.search_el = !_this.search_el
				_this.search_box = !_this.search_el
			},
			gethistoryinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/searchRecord/getSearchRecordsByUser.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: 1,
						pagesize: 10,
						searchRecordUserId: 1,
					},
					success: res => {
						let _this = this;
						let history_list = JSON.parse(res.data.data)
						if (_this.uservalue == null || _this.uservalue == undefined || _this.uservalue == '') {
							uni.showModal({
								title: '温馨提示',
								content: '搜索内容不能为空',
								showCancel: false
							});
						} else {
							if (res.data.msg == 'succeed') {
								_this.historybox.unshift(_this.uservalue)
								if (_this.historybox.length > 10) {
									_this.historybox.pop(_this.uservalue)
								}
							} else if (res.data.msg == 'failure') {
								uni.showModal({
									title: '温馨提示',
									content: '暂无数据',
									showCancel: false
								});
							}
						}
					}
				})
			},
			//热搜
			gethotinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/hotSearchRechord/getHotSearchRecordByAddress.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: 1,
						pagesize: 10,
						hsrAddress: _this.district,
					},
					success: res => {
						console.log(_this.district)
						let search_list = JSON.parse(res.data.data)
						console.log(search_list)
						if (res.data.msg == 'succeed') {
							for (var l = 0; l < search_list.list.length; l++) {
								_this.searchbox.push(search_list.list[l].hsrContent)
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
			//热搜点击跳转
			rear_jump(index) {
				let _this = this;
				uni.request({
					url: _this.http + '/hotSearchRechord/useHotGetStore.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						hsrContent: _this.searchbox[index],
						hsrAddress: _this.district,
					},
					success: res => {
						
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
			retrieval: function(index) {
				this.uservalue = this.searchbox[index]
			},
			businel: function() {
				uni.navigateTo({
					url: "../merchant/merchant"
				})
			},
		}
	}
</script>
<style>
	@import url("search.css");
	@import url("../page_home/page_home.css");
</style>
