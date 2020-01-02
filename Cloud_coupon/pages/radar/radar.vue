<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: hidden;">
		<view class="map_box">
			<map style="width: 100%; height: 100%;z-index: 99 !important;" :latitude="latitude" :longitude="longitude"
			 @callouttap="location()">
			 <cover-view class="chant_lilst" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend"
			  :style="{top:HN_top}">
			 	<cover-view class="chant_title">点击查看商家列表</cover-view>
			 	<cover-view class="chant_center">
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 		<cover-view class="center_el"></cover-view>
			 	</cover-view>
			 </cover-view>
			</map>
		</view>
		<view class="search">
			<input type="text" placeholder="搜索商家丶分类丶找路线">
			<view>搜索</view>
		</view>

		
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
				lastY: 0,
				offY: 0,
				flag: 0,
				HN_height:'',
				HN_top: 90 + '%',
			}
		},
		methods: {
			click_el: function() {
				this.chant = !this.chant
				this.title = !this.title
			},
			handletouchstart: function(event) {
				//第一次鼠标触点坐标
				this.lastY = event.changedTouches[0].pageY;
				this.offY = event.currentTarget.offsetTop;
			},
			handletouchmove: function(event) {
				if (this.flag !== 0) {
					return;
				}
				//第二次鼠标触点
				let currentY = event.changedTouches[0].pageY;
				//滑动距离
				let ty = currentY - this.lastY;
				//得到距顶部距离
				let offY = this.offY
				//top值
				this.HN_top = (offY+ty) + 'px'
			},
			handletouchend: function(event) {
				 let _this = this;
				 //获取当前窗口高度
				uni.getSystemInfo({
				    success: function (res) {
						_this.HN_height = res.windowHeight
						if(parseInt(_this.HN_top) > 0 && parseInt(_this.HN_top) < _this.HN_height/3){
							_this.HN_top = 0 + '%'
						}else if (parseInt(_this.HN_top) > 0 && parseInt(_this.HN_top) < _this.HN_height/3*2){
							_this.HN_top = 60 + '%'
						}else{
							_this.HN_top = 90 + '%'
						}
				    }
				});
				this.flag = 0;
				this.text = '没有滑动'
			},
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
		}
	}
</script>

<style>
	@import url("radar.css");
</style>
