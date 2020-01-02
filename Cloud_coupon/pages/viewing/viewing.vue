<template>
	<view style="width: 100%;height: auto;background: #f0f0f0;">
		<view class="banner_img">
			<view class="benner_search">
				<input type="text" value="全网搜">
				<view class="search">
					<text>搜索</text>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" interval="3000" duration="500" effect="coverflow"
						 indicator-color="white" indicator-active-color="#dca970">
							<swiper-item v-for="(item,index) in imgbox" :key="index">
								<view class="swiper-item">
									<image :src="item.pic"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="benner_title">
			<view>热门影片</view>
			<view><text>查看全部</text><image src="../../static/images/icon13.png"></image></view>
		</view>
		<view class="soon_swiper">
			<view class="uni-padding-wrap">
				<view class="page-section">
					<view class="page-section-spacing">
						<swiper class="swiper1" :autoplay="autoplay" :interval="interval" :duration="duration" display-multiple-items="3" circular="true">
							<swiper-item>
								<view class="swiper-item item_el" @tap="details">
									<image src="../../static/images/video.jpg"></image>
									<view>9.1分</view>
									<view>攀登者</view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item item_el">
									<image src="../../static/images/bar.jpg"></image>
									<view>9.1分</view>
									<view>冰雪奇缘2</view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item item_el">
									<image src="../../static/images/bar.jpg"></image>
									<view>9.1分</view>
									<view>冰雪奇缘2</view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item item_el">
									<image src="../../static/images/bar.jpg"></image>
									<view>9.1分</view>
									<view>冰雪奇缘2</view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item item_el">
									<image src="../../static/images/bar.jpg"></image>
									<view>9.1分</view>
									<view>冰雪奇缘2</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="benner_title">
			<view>附近影城</view>
			<view><text>查看全部</text><image src="../../static/images/icon13.png"></image></view>
		</view>
		<view class="film_list" @tap="cinema">
			<view class="list_el">
				<text>大地影城(财富国际店)</text>
				<text>1.1km</text>
			</view>
			<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				indicatorDots: true,
		      	imgbox:[{
					pic:'../../static/images/bg.png'
				},{
					pic:'../../static/images/bg.png'
				},{
					pic:'../../static/images/bg.png'
				},{
					pic:'../../static/images/bg.png'
				},{
					pic:'../../static/images/bg.png'
				},{
					pic:'../../static/images/bg.png'
				}]
			}
		},
		methods: {	
			details:function(){
				uni.navigateTo({
					url:'../film_details/film_details'
				})
			},
			cinema:function(){
				uni.navigateTo({
					url:'../cinema/cinema'
				})
			}
		}
	}
</script>

<style>
	@import url("viewing.css");
</style>
