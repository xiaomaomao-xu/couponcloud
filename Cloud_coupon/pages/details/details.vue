<template>
	<view style="width: 100%;height: auto;overflow: hidden;">
	<view style="width: 100%;position: absolute;top: 0;bottom: 100rpx;overflow: scroll;background: #F5F5F5;">
		<view class="details">
			<video v-if="videos" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"></video>
			<view class="image_box" v-if="images">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper"  interval="3000" duration="500">
								<swiper-item v-for="(item,index) in imgbox" :key="index">
									<view class="swiper-item uni-bg-red">
										<image :src="item.pic"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="btn_deta">
				<view @tap="changeIndex(index)" v-for="(item,index) in btnbox" :key="index" :class="{active:currentIndex===index}">{{item}}</view>
			</view>
		</view>
		<view class="introduce">
			<view class="introduce_el">
				<view>格莱美酒店某某某餐厅牛排</view>
				<view><image src="../../static/images/icon9.png"></image><text>详细位置</text></view>
			</view>
			<view class="introduce_ol">
				<view><image src="../../static/images/icon10.png"></image><text>999条点评</text></view>
				<view><image src="../../static/images/icon11.png"></image><text>999人点赞</text></view>
			</view>
		</view>
		<view class="comment">
			<view>商品评价<text>(3221369)</text></view>
			<view><text>查看全部</text><image src="../../static/images/icon13.png"></image></view>
		</view>
		<view class="recommend">
			<view class="reco_title"><text>为你推荐</text></view>
			<view class="commodity_list">
				<image src="../../static/images/pg4.png"></image>
				<view>精品大龙虾,汁多味美,价格优惠,值得一搞</view>
				<view><text>￥88</text><text>￥66</text></view>
			</view>
			<view class="commodity_list">
				<image src="../../static/images/pg4.png"></image>
				<view>精品大龙虾,汁多味美,价格优惠,值得一搞</view>
				<view><text>￥88</text><text>￥66</text></view>
			</view><view class="commodity_list">
				<image src="../../static/images/pg4.png"></image>
				<view>精品大龙虾,汁多味美,价格优惠,值得一搞</view>
				<view><text>￥88</text><text>￥66</text></view>
			</view><view class="commodity_list">
				<image src="../../static/images/pg4.png"></image>
				<view>精品大龙虾,汁多味美,价格优惠,值得一搞</view>
				<view><text>￥88</text><text>￥66</text></view>
			</view><view class="commodity_list">
				<image src="../../static/images/pg4.png"></image>
				<view>精品大龙虾,汁多味美,价格优惠,值得一搞</view>
				<view><text>￥88</text><text>￥66</text></view>
			</view>
		</view>
		<view class="details_bt">
			<view>
				<view>￥<text>88</text></view>
				<view>优惠券<text>10</text>张</view>
			</view>
			<view>领券</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:0,
				videos:false,
				images:false,
				btnbox:["视频","图片"],
				imgbox: [{
					pic: "../../static/images/bar.jpg"
				}, {
					pic: "../../static/images/bar.jpg"
				}, {
					pic: "../../static/images/bar.jpg"
				}, {
					pic: "../../static/images/bar.jpg"
				}],
			}
		},
		onLoad() {

		},
		methods: {
			changeIndex(index) {
				console.log(index)
				this.currentIndex = index
				if(index ==0 && this.videos == true){
					this.videos = this.videos
					this.images = this.images
				}
				if(index ==0 && this.videos == false){
					this.videos = !this.videos
					this.images = !this.images
				}
				if(index ==1 && this.videos == true){
					this.videos = !this.videos
					this.images = !this.images
				}
				if(index ==1 && this.videos == false){
					this.videos = this.videos
					this.images = this.images
				}
			}
		}
	}
</script>
<style>
	@import url("details.css");
</style>
