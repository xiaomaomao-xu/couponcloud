<template>
	<view style="position: absolute;top: 0;left: 0;width: 100%;bottom: 0;background: #F0F0F0;overflow: scroll;">
		<scroll-view class="cart_list" scroll-y="true" @scrolltolower='lower'>
		<view class="follow_box" >
			<view class="post_titile" v-for="(item,index) in collelist" :key = 'index'>
				<image v-if="https" :src="https+'/'+item.userinfo.userimg"></image>
				<view class="post_new">
					<view class="new_le">
						<view>{{item.userinfo.username}}核销了优惠劵</view>
						<view>{{item.userinfo.leaveword}}</view>
					</view>
					<view class="new_ri">+ {{(item.ugmonery)/100}} 元</view>
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
				voucher:[],
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
					url:_this.http+'/PersonageController/getmygeneralize.do',
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						pagenum:this.pagenum,
						shareuserid:2,
					},
					success:res =>{
						let collect_list = JSON.parse(res.data.data)
						console.log(collect_list);
						if(res.data.msg == 'succeed'){
							this.collelist = collect_list.list;
							console.log(this.collelist);
							for (var l = 0; l < collect_list.list.length; l++) {
								let voucher_time = new Date(collect_list.list[l].createtime)
								let year=voucher_time.getFullYear();
							    let month=voucher_time.getMonth()+1; 
							    let day=voucher_time.getDate(); 
								collect_list.list[l].userinfo.leaveword = ""+year+'年'+month+'月'+day+'日'
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
				this.page=this.page+1;
				console.log("下一页"+this.page);
				this.getmygeneral();
			}
			
		}
		
	}
</script>

<style>
	@import url("extension.css");
</style>
