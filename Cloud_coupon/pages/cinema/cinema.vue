<template>
	<view style="width: 100%;position: absolute;top: 0;bottom: 0;background: #f0f0f0;overflow: hidden;">
		<view class="cinema_title">
			<view>大地影院(财富国际店)</view>
			<view>红花岗区外环路财富广场负一楼</view>
		</view>
		<ynGallery :galleryheight="150" 
			  bkstart="#000000" 
			  bkend="#000000" 
			 :imgviewwidth="85" 
			 :imgviewheight="105" 
			 :showbadge="true"
			  badegtype="round" 
			  badegwidth="25" 
			  badegheight="25" 
			 :showdec="true" 
			 :images="testimgs"></ynGallery>
		<view class="soon_swiper">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper1" :autoplay="autoplay" :interval="interval" :duration="duration" display-multiple-items="3"
						 circular="true">
							<swiper-item v-for="(item,index) in imgbox" :key='index' :class="{active:currentIndex===index}" @tap="changeIndex(index)">
								<view class="swiper-item item_el">
									<view>{{item}}</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="film_box">
			<view class="film_list">
				<view class="list_el">
					<view>
						<text>12:20</text>
						<text>英语3D</text>
					</view>
					<view>
						<text>14:04散场</text>
						<text>4号厅(激光)</text>
					</view>
				</view>
				<view class="list_icon">一元购票</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ynGallery from 'components/YnComponents/ynGallery/ynGallery.vue'
	export default {
		components: {
			ynGallery
		},
		data() {
			return {
				currentIndex: 0,
				imgbox: ['今天11月25日', '周三11月26日', '周四11月27日', '周五11月28日', '周六11月29日'],
				testimgs: [{
						url: "http://p1.meituan.net/movie/d94e5c3054778f6f48bff3a813b0b7cd5300998.jpg@170w_235h_1e_1c",
					},
					{
						url: "http://p0.meituan.net/movie/616cd50a33550a9225ac781e52d14ae54967551.jpg@170w_235h_1e_1c"
					},
					{
						url: "http://p0.meituan.net/movie/fc4dd6cd0c6f7db566a128cc05c475355664427.jpg@170w_235h_1e_1c"	
					},
					{
						url: "http://p0.meituan.net/movie/0aef20518b12365b524917332424e3c9293610.jpg@170w_235h_1e_1c"
					},
					{
						url: "http://p0.meituan.net/movie/034069fc367db8a7d9644717b416cc2c332883.jpg@170w_235h_1e_1c"
					},
					{
						url: "http://p0.meituan.net/movie/9ef02a501fee7f62d49d2096b52175d32155331.jpg@170w_235h_1e_1c"
					}
				],
			}
		},
		onLoad(){
			this.setimgs();
		},
		methods: {
			changeIndex(index) {
				console.log(index)
				this.currentIndex = index;
			},
			
			setimgs() {
				var imgs=[];
				for (let i in this.testimgs) {									
					 let imgobj={
						  dec:'',                   //图像描述信息
						  badeg:'',                 //角标文字
						  badegcolor:'#000000',     //角标颜色
						  url:'',                   //图源  
						  dominant:''               //主色  
					};
					imgobj.url=this.testimgs[i].url;
					imgobj.dominant = this.retcolor(); //随机主色
					imgobj.dec = i; //描述  
					imgobj.badeg = i; //角标文字
					imgobj.badegcolor = (i % 2) == 0 ? 'red' : 'LimeGreen'; //角标颜色
					
					imgs.push(imgobj)
				}
				this.testimgs=imgs;
			},
			retcolor() {
				let color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
				return color;
			}
		}
	}
</script>

<style>
	@import url("cinema.css");
</style>
