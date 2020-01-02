<template>
	<view style="width: 100%;height:100%;background: #f0f0f0;overflow: scroll;">
		<view class="banner_img">
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
		<view class="prize_title">
			<view>
				<view></view>
			</view>
			<view>人气前十榜单</view>
			<view>
				<view></view>
			</view>
		</view>
		<view class="pularity">
			<view class="uni-padding-wrap">
				<view class="page-section">
					<view class="page-section-spacing">
						<swiper class="swiper1" :autoplay="true" interval="3000" duration="500" effect="coverflow" circular="true" vertical="true"
						 indicator-color="white" indicator-active-color="#dca970">
							<swiper-item class="item_el">
								<view class="swiper-item">
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO1:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO2:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
								</view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO3:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO4:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
								</view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO5:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO6:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
								</view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO7:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO8:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
								</view>
							</swiper-item>
							<swiper-item class="item_el">
								<view class="swiper-item">
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO9:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
									<view class="pularity_el">
										<image src="../../static/images/auth.png"></image>
										<view><text>NO10:</text><text>香港路某某店面</text></view>
										<view><text>2折折扣券</text><text>5人团</text></view>
										<view><text>1212人已经参与</text><text>马上抢</text></view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="activity_list">
			<view class="list_our" v-for="(item,index) in listbox" :key='index' @tap="changeIndex(index)">
				<text :class="{active:activeindex===index}">{{item}}</text>
			</view>
		</view>
		<view class="riteoel">
			<view class="pularity_el" @tap="dining">
				<image src="../../static/images/auth.png"></image>
				<view><text>NO9:</text><text>香港路某某店面</text></view>
				<view><text>2折折扣券</text><text>5人团</text></view>
				<view><text>1212人已经参与</text><text>马上抢</text></view>
			</view>
			<view class="pularity_el">
				<image src="../../static/images/auth.png"></image>
				<view><text>NO10:</text><text>香港路某某店面</text></view>
				<view><text>2折折扣券</text><text>5人团</text></view>
				<view><text>1212人已经参与</text><text>马上抢</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				imgbox: [{
					pic: '../../static/images/bg.png'
				}, {
					pic: '../../static/images/bg.png'
				}, {
					pic: '../../static/images/bg.png'
				}, {
					pic: '../../static/images/bg.png'
				}, {
					pic: '../../static/images/bg.png'
				}, {
					pic: '../../static/images/bg.png'
				}],
				activeindex:0,
				listbox:['服装','电影','上衣','美食','超市','家居']
			}
		},
		methods: {
			changeIndex(index){
				this.activeindex = index
				console.log(index)
			},
			dining:function(){
				uni.navigateTo({
					url:'../dining/dining'
				})
			}
			
		}
	}
</script>

<style>
	@import url("assemble.css");
</style>
