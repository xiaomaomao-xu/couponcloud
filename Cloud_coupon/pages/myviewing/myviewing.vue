<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;left: 0;background: white;height: auto;overflow: scroll;">
		<scroll-view class="cart_list"  scroll-y="true" @scrolltolower="lower" style="height:100% ;">
		<view class="collect" v-for="(item,index) in collelist" :key = 'index'>
			<view class="collect_le">
				<image v-if="https" :src="https+'/'+item.film.filmPic"></image>
			</view>
			<view class="collect_ri">
				<view class="collect_add">
					<text>{{item.film.filmName}}</text><text>x1</text>
				</view>
				<view class="collect_sales">{{item.film.filmRemark}}</view>
				<view class="collect_res">{{item.film.filmTime}}</view>
				<view>
					<text class="collect_time">{{item.ticket.ticketStarttime}} {{item.ticket.ticketStarthour}}</text>
					<text class="collect_btn" @tap="film_el(index)">去使用</text>
				</view>
			</view>
			<view class="defect" v-show="defect_el">
				<image v-if="https" :src="https+'/front_image/fault.png'"></image>
				<text :defect_name='defect_name'>{{defect_name}}</text>
			</view>
		</view>
		</scroll-view>
		<view class="video_el" v-show="video"></view>
		<view class="film_box" v-show="video">
			<image src="../../static/images/icon16.png" @tap="video_list"></image>
			<view class="film">
				<view>{{namelist.cinema.cinemaName}}</view>
				<view>{{namelist.film.filmName}}</view>
				<view>{{namelist.ticket.ticketStarttime}}   {{namelist.ticket.ticketStarthour}}-{{namelist.ticket.ticketEndhour}}   {{namelist.film.filmSortType}}</view>
				<view>电影票编号:{{namelist.ticket.ticketSerialId}}</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				video:false,
				pas:1,
				pbs:1,
				defect_el: false,
				collelist:[],
				https:this.http,
				pagenum:1,
				defect_name:'还未有电影票',
				pagesize:10,
				namelist:[],
			}
		},onLoad() {
			this.getshopinfo()
		},
		methods: {
			film_el(index){
				this.video = true;
				this.namelist = this.collelist[index];
			},
			video_list(){
				this.video = false;
				this.namelist=[];
			},
			//根据得到的商家id得到数据
			getshopinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/ownerFilm/getOwnerFilmTickets.do',
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
	@import url("myviewing.css");
</style>