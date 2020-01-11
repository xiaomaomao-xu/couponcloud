<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: scroll;background: white;left: 0;height: auto;">	
		<view class="virt_list">
			<scroll-view class="cart_list"  scroll-y="true" @scrolltolower="lower" style="height:100% ;">
			<view class="virt_card" v-for="(item,index) in collelist" :key = 'index'>
				<view class="virt_le" >
					<view>
						<text>{{item.gasStation.gasStationName}}</text>
						<text>{{item.gasCard.gasCardPrice}}元油卡</text>
					</view>
					<view>{{item.gasCard.gasCardId}}</view>
					<view>使用期限:{{item.gasCard.gasCardImitTime}}</view>
				</view>
			</view>
			<view class="defect" v-show="defect_el">
				<image v-if="https" :src="https+'/front_image/fault.png'"></image>
				<text :defect_name='defect_name'>{{defect_name}}</text>
			</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pas:1,
				pbs:1,
				defect_el: false,
				collelist:[],
				https:this.http,
				pagenum:1,
				defect_name:'你还没有购买油卡',
				pagesize:10,
			}
		},onLoad(option) {
			this.getshopinfo()
		},
		methods: {
			//根据得到的商家id得到数据
			getshopinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/ownerGasCard/getOwnerGasCards.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userId: 2,
						pagenum: _this.pagenum,
						pagesize:_this.pagesize,
					},
					success: res => {
						if (res.data.msg == 'succeed') {
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
						} else if (res.data.msg == 'failure') {
							_this.defect_el = true
						}
					}
				})
			},//滚动到底部
			lower(){
				this.pagenum=this.pagenum+1;
				if(this.pagenum <= this.pas){
					this.getshopinfo();
				}
			}
		}
	}
</script>

<style>
	@import url("my_card.css");
</style>
