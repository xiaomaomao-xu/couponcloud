<template>
	<view style="position: absolute;top: 0;left: 0;width: 100%;bottom: 0;background: #F0F0F0;overflow: scroll;">
		<scroll-view class="cart_list"  scroll-y="true" @scrolltolower="lower" style="height:100% ;">
		<view class="follow_box"  v-for="(item,index) in collelist" :key = 'index'>
			
			<view class="post_titile">
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
				pagenum:1,
				collelist:[],
				https:this.http,
				defect_el: false,
				defect_name: '还未使用卷',
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
								collect_list.list[l].cochaddress = ""+year+'年'+month+'月'+day+'日'
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
					this.getmyusecoupon();
				}
			}
		}
	}
	
</script>

<style>
	@import url("cou_record.css");
</style>
