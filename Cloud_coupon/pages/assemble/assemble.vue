<template>
	<view style="width: 100%;height:100%;background: #f0f0f0;overflow: scroll;">
		<view class="banner_img">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" interval="3000" duration="500" effect="coverflow"
						 indicator-color="white" indicator-active-color="#dca970">
							<swiper-item v-for="(item,index) in imgbox" :key="index">
								<view class="swiper-item">
									<image :src="item.pic" @tap="url_pic"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="prize_title">
			<view>
				<view></view>
			</view>
			<view>人气前十榜单</view>
			<view>
				<view></view>
			</view>
		</view>
		<view class="pularity">
			<view class="uni-padding-wrap">
				<view class="page-section">
					<view class="page-section-spacing">
						<swiper class="swiper1" :autoplay="true" interval="3000" duration="500" effect="coverflow" circular="true" vertical="true"
						 indicator-color="white" indicator-active-color="#dca970">
							<swiper-item class="item_el" v-for="(item,index) in list_el" :key='index'>
								<view class="swiper-item">
									<view class="pularity_el" v-for="(items,indexs) in item" :key="indexs">
										<image :src="items.pic"></image>
										<view><text>NO1:</text><text>{{items.name}}</text></view>
										<view><text>{{items.couponname}}</text><text>{{items.num}}</text></view>
										<view><text>{{items.numbox}}</text><text>马上抢</text></view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="activity_list">
			<view class="list_our" v-for="(item,index) in listbox" :key='index' @tap="changeIndex(index)">
				<text :class="{active:activeindex===index}">{{item.name}}</text>
			</view>
		</view>
		<view class="riteoel">
			<view class="pularity_el" @tap="dining(index)" v-for="(item,index) in pularity" :key='index'>
				<image :src="item.pic"></image>
				<view><text>NO1:</text><text>{{item.name}}</text></view>
				<view><text>{{item.couponname}}</text><text>{{item.num}}</text></view>
				<view><text>{{item.numbox}}</text><text>马上抢</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import amap from '../../components/amap-wx.js';
	export default {
		data() {
			return {
				indicatorDots: true,
				imgbox: [],
				image_url:[],
				activeindex:0,
				listbox:[],
				district:'',
				data_list:[],
				list_el:[],
				sttyid:0,
				pularity:[],
			}
		},
		onLoad(){
			console.log( uni.getStorageSync("district"));
			this.district = uni.getStorageSync("district")
			this.getlesaleinfo()
			this.gettaiyinfo()
			this.getwholestinfo()
		},
		methods: {
			changeIndex(index){
				this.activeindex = index
				this.sttyid = this.listbox[this.activeindex].sttyid
				this.getgoonwhoinfo()
			},
			dining(index){
				let whoid = this.pularity[index].whoid
				console.log(whoid)
				uni.navigateTo({
					url:"../dining/dining?id="+whoid
				})
			},
			url_pic(){
				console.log(this.image_url)
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
						advertypeid: 3,
						district: _this.district
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
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
			//榜单前十
			getlesaleinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/gettoptenwholesale.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						groupaddress: _this.district
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							let top_list = JSON.parse(res.data.data)
							let all = top_list.length
							for(let i = 0; i< all;i++){
								_this.data_list.push({
									pic:_this.http + '/' +top_list[i].wholesaleimg,
									name:top_list[i].couponinfo.storeinfo.storename,
									couponname:top_list[i].couponinfo.couponname,
									num:top_list[i].whoperson +'人团',
									numbox:top_list[i].wholesaleprorlenum +'人已参与',
								})
							}
							for(let j = 0; j<all;j+=2){
								_this.list_el.push(_this.data_list.slice(j,j+2))
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
			//查询拼团分类
			getwholestinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/putgetwholestoretype.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						groupaddress: _this.district
					},
					success: res => {
						console.log(res)
						if (res.data.msg == 'succeed') {
							let lest_list = JSON.parse(res.data.data)
							for(let g = 0;g<lest_list.length;g++){
								_this.listbox.push({
									sttyid:lest_list[g].sttyid,
									name:lest_list[g].sttyname
								})
							}
							this.sttyid = this.listbox[this.activeindex].sttyid
							this.getgoonwhoinfo()
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
			//通过类型查询商家
			getgoonwhoinfo(){
				let _this = this;
				console.log(_this.sttyid)
				console.log(_this.district)
				uni.request({
					url: _this.http + '/ActivrecordController/getgoonwholesale.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						groupaddress: _this.district,
						pagenum:1,
						wholesaleshopid:_this.sttyid
					},
					success: res => {
						console.log(res)
						if (res.data.msg == 'succeed') {
							let goo_list = JSON.parse(res.data.data)
							console.log(goo_list)
							_this.pularity.splice(0,_this.pularity.length)
							for(let g = 0;g<goo_list.list.length;g++){
								_this.pularity.push({
									pic:_this.http + '/' +goo_list.list[g].wholesaleimg,
									name:goo_list.list[g].couponinfo.storeinfo.storename,
									couponname:goo_list.list[g].couponinfo.couponname,
									num:goo_list.list[g].whoperson +'人团',
									numbox:goo_list.list[g].wholesaleprorlenum +'人已参与',
									whoid:goo_list.list[g].whoid
								})
							}
							console.log(_this.pularity)
							
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
		}
	}
</script>

<style>
	@import url("assemble.css");
</style>
