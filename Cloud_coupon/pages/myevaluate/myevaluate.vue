<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;width: 100%;background: #F0F0F0;overflow: scroll;">
		<view class="eval_title">我的评价</view>
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
				<view class="eval_bus">
					<image v-if="https" :src="https+'/'+item.storeinfo.obligatestrone"></image>
					<view>{{item.storeinfo.storename}}</view>
					<image src="../../static/images/icon13.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collelist:[],
				https:this.http,
				pagenum:1,
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
						let collect_list = JSON.parse(res.data.data)
						console.log(collect_list);
						this.collelist=collect_list.list
						console.log(this.collelist)
						if(res.data.msg == 'succeed'){
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
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
			},
			latcount(lse) {
				for (let m = 0; m < stgr; m++) {
					this.latitude[m].pic = '../../static/images/icon14.png'
				}
			}
		}
	}
</script>

<style>
	@import url("myevaluate.css");
</style>
