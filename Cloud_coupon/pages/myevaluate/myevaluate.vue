<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;width: 100%;background: #F0F0F0;overflow: scroll;">
		<view class="eval_title">我的评价</view>
		<scroll-view class="cart_list"  scroll-y="true" @scrolltolower="lower" style="height:100% ;">
		<view class="commodity_el" v-for="(item,index) in collelist" :key='index'>
			<view class="business">
				<image v-if="https" :src="https+'/'+item.userinfo.userimg"></image>
				<view>
					<text>{{item.userinfo.username}}</text>
					<text>{{item.esmaremark}}</text>
				</view>
				<view>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<text>月销售{{item.storeinfo.marketcount}}单</text>
				</view>
				<view class="eval_pic">
					<text>商家:{{item.grade}}星</text>
					<text>服务:{{item.grade}}星</text>
					<text>优惠:{{item.grade}}星</text>
				</view>
				<view>{{item.storereview}}</view>
				<view class="eval_bus" @click="dianji(index)">
					<image v-if="https" :src="https+'/'+item.storeinfo.obligatestrone"></image>
					<view>{{item.storeinfo.storename}}</view>
					<image src="../../static/images/icon13.png"></image>
				</view>
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
	export default {
		data() {
			return {
				pas:1,
				pbs:1,
				collelist:[],
				https:this.http,
				pagenum:1,
				defect_el: false,
				defect_name: '还未评价商店',
				storegrou:[],
				latitude: [{
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}],
			}
		},onLoad() {
			this.getmypinlun();
		},
		methods: {
			getmypinlun(){
				let _this = this;
				uni.request({
					url:_this.http+'/MyratingController/getmyratingaller.do',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						pagenum:this.pagenum,
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
								collect_list.list[l].esmaremark = ""+year+'年'+month+'月'+day+'日'
								
								let stgr = 0;
								stgr = collect_list.list[l].storeinfo.storegrade;
								stgr=stgr/2;
								stgr=Math.round(stgr)
								
							}
							
							
						}else if(res.data.msg == 'failure'){
							_this.defect_el = true
						}
					}
				})
			},
			latcount(lse) {
				for (let m = 0; m < stgr; m++) {
					this.latitude[m].pic = '../../static/images/icon14.png'
				}
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
	@import url("myevaluate.css");
</style>
