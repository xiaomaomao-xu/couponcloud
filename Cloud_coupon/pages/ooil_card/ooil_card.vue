<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: hidden;">
		<view class="map_box">
			<map style="width: 100%; height: 100%;z-index: 99 !important;" :latitude="latitude" :longitude="longitude"
			@callouttap="location()"></map>
		</view>
		<cover-view class="center_el">
			<cover-view class="center_le" @tap='virtual'>
				<cover-view class="left_el">中国石化宋庄加油站</cover-view>
				<cover-view class="left_list">
					<cover-view>距离你两千米</cover-view>
					<cover-view>汇川区昆明路唯一国际</cover-view>
				</cover-view>
			</cover-view>
			<cover-view class="center_ri">
				<cover-image src="../../static/images/icon38.png"></cover-image>
			</cover-view>
		</cover-view>
		<cover-view class="search">
			<cover-input type="text" placeholder="搜索商家丶分类丶找路线" @tap='card_el'></cover-input>
			<cover-view>搜索</cover-view>
		</cover-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chant: false,
				title: true,
				latitude: 34.780254,
				longitude: 113.699559,
			}
		},
		methods: {
			click_el: function() {
				this.chant = !this.chant
				this.title = !this.title
			},
			card_el:function(){
				uni.navigateTo({
					url:'../card_list/card_list'
				})
			},
			virtual:function(){
				uni.navigateTo({
					url:'../virtual_card/virtual_card'
				})
			}
		},
		onTabItemTap(val) {
			let latitude = this.latitude
			let longitude = this.longitude
			if (val.index == 3) {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						latitude = res.latitude
						longitude = res.longitude
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
				console.log(latitude)
				console.log(longitude)
			}
		},
		map_list: function() {
			uni.navigateTo({
				url: '../gas_station/gas_station'
			})
		}
	}
</script>

<style>
	@import url("ooil_card.css");
</style>
