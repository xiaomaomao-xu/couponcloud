<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;left: 0;background: white;height: auto;overflow: scroll;">
		<scroll-view class="cart_list" scroll-y="true" @scrolltolower='lower'>
		<view class="collect"  v-for="(item,index) in collelist" :key = 'index'>
			<view class="collect_le">
				<image v-if="https" :src="https+'/'+item.storeinfo.obligatestrone"></image>
			</view>
			<view class="collect_ri">
				<view class="collect_add">
					<text>{{item.storeinfo.storename}}</text><text>{{item.storeinfo.obligatestrtow}} 千米</text>
				</view>
				<view class="collect_stars">
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
				</view>
				<view class="collect_sales">月销售{{item.storeinfo.marketcount}}单</view>
				<view class="collect_res">{{item.storeinfo.storeaddress}}</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	import amap from '../../components/amap-wx.js';
	export default {
		data() {
			return {
				collelist:[],
				https:this.http,
				key: '6ffbe58a99e0487a6012276570256325',
				latitude:'',
				longitude:'',
				pagenum:1,
			}
		},onLoad() {
			this.getiddress();
			uni.getLocation({
				type: 'wgs84',
				success: res => {
					this.latitude = res.latitude
					this.longitude = res.longitude
				}
			})
			
			
		},
		methods: {
			//获取区域位置
			getiddress() {
				this.amapPlugin = new amap.AMapWX({
					key: this.key
				});
				this.amapPlugin.getRegeo({
					success: data => {
						this.longitude= data[0].longitude;
						this.latitude= data[0].latitude;
						this.getmycollect();
					}
				});
			},
			getmycollect(){
				let _this = this;
				uni.request({
					url:_this.http+'/BusinessController/mystorecollect.do',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						longitude:_this.longitude,
						latitude:_this.latitude,
						pagenum:_this.pagenum,
						userid:5,
					},
					success:res =>{
						
						let collect_list = JSON.parse(res.data.data)
						if(res.data.msg == 'succeed'){
							this.collelist = collect_list.list;
						}else if(res.data.msg == 'failure'){
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
			},//滚动到底部
			lower(){
				this.page=this.page+1;
				console.log("下一页"+this.page);
				this.getmygeneral();
			}
		}
	}
</script>

<style>
	@import url("collection.css");
</style>