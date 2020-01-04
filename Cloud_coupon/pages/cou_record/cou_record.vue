<template>
	<view style="position: absolute;top: 0;left: 0;width: 100%;bottom: 0;background: #F0F0F0;overflow: scroll;">
		<view class="follow_box">
			<view class="post_titile" v-for="(item,index) in collelist" :key = 'index'>
				<image v-if="https" :src="https+'/'+item.storeinfo.obligatestrone"></image>
				<view class="post_new">
					<view class="new_el">
						<view>
							<text>扫二维码付款给{{item.storeinfo.storename}}</text>
							<text>{{item.cochaddress}}</text>
						</view>
						<view>
							<text>{{item.couponname}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagenum:1,
				collelist:[],
				https:this.http,
			}
		},onLoad() {
			this.getmyusecoupon();
		},
		methods: {
			getmyusecoupon(){
				let _this = this;
				uni.request({
					url:_this.http+'/PersonageController/getmyusecouponrestu.do',
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
						if(res.data.msg == 'succeed'){
							this.collelist = collect_list.list;
							console.log(this.collelist);
							for (var l = 0; l < collect_list.list.length; l++) {
								let voucher_time = new Date(collect_list.list[l].createtime)
								let year=voucher_time.getFullYear();
							    let month=voucher_time.getMonth()+1; 
							    let day=voucher_time.getDate(); 
								collect_list.list[l].cochaddress = ""+year+'年'+month+'月'+day+'日'
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
				
			}
		}
	}
</script>

<style>
	@import url("cou_record.css");
</style>
