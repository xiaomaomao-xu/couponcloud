<template>
	<view style="position: absolute;top: 0;left: 0;width: 100%;bottom: 0;background: white;overflow: scroll;">
		<scroll-view class="cart_list"  scroll-y="true" @scrolltolower="lower" style="height:100% ;">
		<view class="follow_box" v-for="(item,index) in collelist" :key='index'>
			<view class="post_titile">
				<view class="post_new">
					<view class="new_le">
						<view>{{item.consumeremark}}</view>
						<view>{{item.orderid}}</view>
					</view>
					<view class="new_ri">{{item.monetary/100}}元</view>
				</view>
			</view>
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
			}
		},onLoad() {
			this.getmygeneral();
		},
		methods: {
			getmygeneral(){
				let _this = this;
				uni.request({
					url:_this.http+'/WalletController/getwalletrecord.do',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						pagenum:this.pagenum,
						userid:2,
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
								console.log(this.collelist)
							}else{
								if(this.pagenum <= a){
									for(var l = 0; l < collect_list.list.length; l++){
										this.collelist.push(collect_list.list[l])
									}
									console.log(this.collelist)
								}
								
							}
							
							for (var l = 0; l < collect_list.list.length; l++) {
								let voucher_time = new Date(collect_list.list[l].createtime)
								let year=voucher_time.getFullYear();
							    let month=voucher_time.getMonth()+1; 
							    let day=voucher_time.getDate(); 
								collect_list.list[l].orderid = ""+year+'年'+month+'月'+day+'日'
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
			},//滚动到底部
			lower(){
				this.pagenum=this.pagenum+1;
				if(this.pagenum <= this.pas){
					console.log("下一页"+this.pagenum);
					this.getmygeneral();
				}
			}
		}
	}
</script>

<style>
	@import url("sumption.css");
</style>
