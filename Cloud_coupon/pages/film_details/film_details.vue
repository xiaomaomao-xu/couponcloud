<template>
	<view style="width: 100%;position: absolute;top: 0;bottom: 0;background: #f0f0f0;overflow: hidden;">
		<view class="introduce">
			<image src="../../static/images/video.jpg"></image>
		</view>
		<view class="mouclist">
			<view class="intrtitle">
				<view class="infinite_le">
					<image src="../../static/images/video.jpg"></image>
				</view>
				<view class="infinite_ri">
					<h6>攀登者</h6>
					<view>climber</view>
					<h7>9.5</h7>
					<h8>剧情,冒险</h8>
					<h8>中国大陆/125分钟</h8>
					<h8>2019-11-22 08:00大陆上映</h8>
				</view>
			</view>
			<view class="box_view">
				<view class="soon_swiper">
					<view class="uni-padding-wrap">
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper1" :autoplay="autoplay" :interval="interval" :duration="duration" display-multiple-items="4"
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
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
					</view>
					<view class="film_list">
						<view class="list_el">
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
					</view>
					<view class="film_list">
						<view class="list_el">
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
					</view>
					<view class="film_list">
						<view class="list_el">
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
					</view>
					<view class="film_list">
						<view class="list_el">
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
					</view>
					<view class="film_list">
						<view class="list_el">
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
					</view>
					<view class="film_list">
						<view class="list_el">
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
					</view>
					<view class="film_list">
						<view class="list_el">
							<text>大地影城(财富国际店)</text>
							<text>1.1km</text>
						</view>
						<view class="list_icon">红花岗区四大皆空撒娇撒娇的</view>
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
				currentIndex: 0,
				imgbox: ['11月25', '11月26', '11月27', '11月28', '11月29'],
			}
		},
		methods: {
			changeIndex(index) {
				console.log(index)
				this.currentIndex = index;
			},
		}
	}
</script>

<style>
	@import url("film_details.css");
</style>
