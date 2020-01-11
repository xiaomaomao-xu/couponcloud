<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;left: 0;background: white;height: auto;overflow: scroll;">
		<scroll-view class="cart_list"  scroll-y="true" @scrolltolower="lower" style="height:100% ;">
		<view class="collect"  v-for="(item,index) in collelist" :key = 'index' @click="dianji(index)">
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
		<view class="defect" v-show="defect_el">
			<image v-if="https" :src="https+'/front_image/fault.png'"></image>
			<text :defect_name='defect_name'>{{defect_name}}</text>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	import amap from '../../components/amap-wx.js';
	export default {
		data() {
			return {
				pas:1,
				pbs:1,
				defect_el: false,
				collelist:[],
				https:this.http,
				key: '6ffbe58a99e0487a6012276570256325',
				latitude:'',
				longitude:'',
				pagenum:1,
				defect_name: '还未收藏店铺',
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
						if(res.data.msg == 'succeed'){
							let collect_list = JSON.parse(res.data.data)
							let pagenums = collect_list.pageNum
							let pageSize = collect_list.pageSize
							let pages = collect_list.pages
							
							let a=parseInt(pages/pageSize)
							let b=pages%pageSize
							if(b>0){
								a=a+1
							}
							this.pas = a
							
							if(this.pagenum==1){
								this.collelist=collect_list.list
							}else{
								if(this.pagenum <= a){
									for(var l = 0; l < collect_list.list.length; l++){
										this.collelist.push(collect_list.list[l])
									}
								}
							}
							for (var l = 0; l < collect_list.list.length; l++) {
								let voucher_time = new Date(collect_list.list[l].createtime)
								let year=voucher_time.getFullYear();
							    let month=voucher_time.getMonth()+1; 
							    let day=voucher_time.getDate(); 
								collect_list.list[l].cochaddress = ""+year+'年'+month+'月'+day+'日'
							}
							
							console.log(collect_list.list)
							for (var l = 0; l < collect_list.list.length; l++) {
								let creatdates=collect_list.list[l].createtime
								let date = new Date();
								let chadate=date - creatdates;
								let tian = parseInt((chadate % (1000 * 3600 *3600  )) / (1000 * 60 * 60 *24));
								let hour = parseInt((chadate % (1000 * 3600 *3600 )) / (1000 * 60 * 60));
								console.log(tian+"天--"+hour+"小时")
								console.log(chadate)
								console.log("你好");
							}
							
							
							
							
						}else if(res.data.msg == 'failure'){
							_this.defect_el = true
						}
					}
				})
			},//滚动到底部
			lower(){
				this.pagenum=this.pagenum+1;
				if(this.pagenum <= this.pas){
					this.getmypinlun();
				}
			},dianji(index){
				let stid = this.collelist[index].storeid;
				uni.navigateTo({
					url: "../merchant/merchant?id="+stid
				})
			}
		}
	}
</script>

<style>
	@import url("collection.css");
</style>