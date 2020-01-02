<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: hidden;">
		<view class="details">
			<video v-if="videos" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"></video>
			<view class="image_box" v-if="images">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" interval="3000" duration="500">
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
				<view @tap="changeous(index)" v-for="(item,index) in btnbox" :key="index" :class="{active:mislist===index}">{{item}}</view>
			</view>
		</view>
		<view class="merch_center" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend"
		 :style="{top:HN_top}">
			<view class="introduce">
				<view class="introduce_el">
					<view>格莱美酒店某某某餐厅牛排</view>
					<view>
						<image src="../../static/images/icon9.png"></image><text>详细位置</text>
					</view>
				</view>
				<view class="introduce_ol">
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<image src="../../static/images/icon14.png"></image>
					<text>月销售500单</text>
					<view>
						<image src="../../static/images/icon36.png" @tap="ass_pic"></image>
						<image src="../../static/images/icon37.png" @tap="seck_pic"></image>
						<image src="../../static/images/icon29.png"></image>
					</view>
				</view>
			</view>
			<view class="center_list">
				<view class="list_el">
					<view class="details_el">
						<view v-for="(item,index) in box_el" :key='index' @tap="changeIndex(index)"><text :class="{active1:currentIndex===index}">{{item}}</text></view>
					</view>
					<view class="collect">
						<image src="../../static/images/icon31.png"></image>
						<text>收藏</text>
					</view>
				</view>
				<view class="assembly">
					<postBox v-if="show1"></postBox>
					<couponBox v-if='show2'></couponBox>
					<evaluate v-if='show3'></evaluate>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import postBox from "../../components/dities/details.vue"
	import couponBox from "../../components/coupon/coupon.vue"
	import evaluate from "../../components/evaluate/evaluate.vue"
	export default {
		components: {
			postBox,
			couponBox,
			evaluate,
		},

		data() {
			return {
				box_el: ['商品列表', '领券', '评论'],
				mislist: 0,
				show1: true,
				show2: false,
				show3: false,
				lastY: 0,
				offY: 0,
				flag: 0,
				HN_height: '',
				HN_top: 300 + 'rpx',
				currentIndex: 0,
				videos: false,
				images: true,
				btnbox: ["图片", "视频"],
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
		methods: {
			ass_pic:function(){
				uni.navigateTo({
					url:'../assemble/assemble'
				})
			},
			seck_pic:function(){
				uni.navigateTo({
					url:'../seckill/seckill'
				})
			},
			changeIndex(index) {
				this.currentIndex = index;
				if (index == 0) {
					this.show1 = true
					this.show2 = false
					this.show3 = false
				}
				if (index == 1) {
					this.show1 = false
					this.show2 = true
					this.show3 = false
				}
				if (index == 2) {
					this.show1 = false
					this.show2 = false
					this.show3 = true
				}
			},
			changeous(index) {
				this.mislist = index
				if (index == 0 && this.videos == false) {
					this.videos = this.videos
					this.images = this.images
				}
				if (index == 0 && this.videos == true) {
					this.videos = !this.videos
					this.images = !this.images
				}
				if (index == 1 && this.videos == false) {
					this.videos = !this.videos
					this.images = !this.images
				}
				if (index == 1 && this.videos == true) {
					this.videos = this.videos
					this.images = this.images
				}
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
				this.HN_top = (offY + ty) + 'px'
			},
			handletouchend: function(event) {
				if (event.changedTouches[0].pageY - this.lastY > 0) {
					let _this = this;
					//获取当前窗口高度
					uni.getSystemInfo({
						success: function(res) {
							_this.HN_height = res.windowHeight
							if (parseInt(_this.HN_top) > 0 && parseInt(_this.HN_top) < _this.HN_height / 2) {
								_this.HN_top = 200 + 'rpx'
							} else {
								_this.HN_top = 640 + 'rpx'
							}
						}
					});
					this.flag = 0;
					this.text = '没有滑动'
				}
			}
		}
	}
</script>

<style>
	@import url("merchant.css");
</style>
