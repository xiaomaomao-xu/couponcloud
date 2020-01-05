<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;left: 0;background: white;">
		<view class="wallet_view">
			<view class="view_pic"><image src="../../static/images/icon35.png"></image></view>
			<view>我的零钱</view>
			<view>总金额:{{collelist.totalmoney}}</view>
			<view @tap="sumption">消费记录</view>
			<view class="wallet_el">
				<view>
					<view>可用金额</view>
					<view>{{collelist.usablemoney}}</view>
				</view>
				<view>
					<view>冻结金额</view>
					<view>{{collelist.frostmoney}}</view>
				</view>
			</view>
		</view>
		<navigator url="../recharge/recharge" hover-class="none" class="recharge">充值</navigator>
		<view class="withdrawal">提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collelist:[],
				https:this.http,
				pagenum:1,
			}
		},onLoad() {
			this.getmygeneral();
		},
		methods: {
			sumption:function(){
				uni.navigateTo({
					url:'../sumption/sumption'
				})
			},
			getmygeneral(){
				let _this = this;
				uni.request({
					url:_this.http+'/WalletController/getwallettouser.do',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						pagenum:this.pagenum,
						userid:2,
					},
					success:res =>{
						let collect_list = JSON.parse(res.data.data)
						console.log(collect_list.frostmoney);
						if(res.data.msg == 'succeed'){
							this.collelist = collect_list
						}else if(res.data.msg == 'failure'){
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
			}
			
		}
	}
</script>

<style>
	@import url("wallet.css");
</style>