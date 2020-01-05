<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: hidden;">
		<view class="details">
			<video v-if="videos" :src="video_el"></video>
			<view class="image_box" v-if="images">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" interval="3000" duration="500">
								<swiper-item v-for="(item,index) in imgbox" :key="index">
									<view class="swiper-item uni-bg-red">
										<image :src="item"></image>
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
					<view :name='name'>{{name}}</view>
					<view>
						<image src="../../static/images/icon9.png"></image><text>详细位置</text>
					</view>
				</view>
				<view class="introduce_ol">
					<view class="latitude">
						<image v-for="(item,index) in latitude" :key='index' :src="item.pic"></image>
					</view>
					<text :marketcount='marketcount'>月销售{{marketcount}}单</text>
					<view class="count_img">
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
					<view class="collect" @tap="collection">
						<image :src="https+'/front_image/icon30.png'" v-show="showUpImg"></image>
						<image :src="https+'/front_image/icon31.png'" v-show="!showUpImg"></image>
						<text :coll_el='coll_el'>{{coll_el}}</text>
					</view>
				</view>
				<view class="assembly">
					<view class="defect" v-show="defect_el">
						<image v-if="https" :src="https+'/front_image/fault.png'"></image>
						<text :defect_name='defect_name'>{{defect_name}}</text>
					</view>
					<postBox v-if="show1" :dity_list='dity_list'></postBox>
					<couponBox v-if='show2' :voucher='voucher'></couponBox>
					<evaluate v-if='show3' :viewlist='viewlist'></evaluate>
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
				showUpImg: true,
				defect_el: false,
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
				imgbox: [],
				latitude: [{
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}, {
					pic: "../../static/images/icon15.png"
				}],
				id: '',
				name: '',
				marketcount: '',
				storegrade: 0,
				dity_list: [],
				voucher: [],
				viewlist: [],
				video_el: '',
				https: this.http,
				defect_name: '该商家还没有商品哦！亲',
				coll_el: '收藏',
				tombstone: 0,
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getshopinfo()
			if (this.tombstone == 0) {
				this.showUpImg = true
			} else {
				this.showUpImg = false
			}
		},
		methods: {
			//根据得到的商家id得到数据
			getshopinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/putgostorebyuser.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: 5,
						stid: _this.id,
					},
					success: res => {
						let comm_el = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							console.log(comm_el)
							_this.name = comm_el.storeaddress
							_this.marketcount = comm_el.marketcount
							_this.storegrade = comm_el.storegrade
							_this.video_el = _this.http + '/' + comm_el.storevideo
							_this.tombstone = comm_el.tombstone
							let image_list = comm_el.storeimg.split(',')
							for (let h = 0; h < image_list.length; h++) {
								_this.imgbox.push(_this.http + '/' + image_list[h])
							}
							_this.latcount()
							_this.getstoreinfo()
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
			},

			//获取商品列表
			getstoreinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getstoreidbyshoppinges.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: 1,
						storeid: _this.id,
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							for (let k = 0; k < taiy_list.list.length; k++) {
								_this.dity_list.push({
									image: _this.http + '/' + taiy_list.list[k].commodiimg,
									name: taiy_list.list[k].commodiremark,
									price: taiy_list.list[k].originalprice,
									coupon: taiy_list.list[k].currentprice,
									shop: taiy_list.list[k].commodiname,
								})
							}
						} else if (res.data.msg == 'failure') {
							_this.defect_el = true
						}
					}
				})
			},
			//获取商家可领取优惠券
			getmerchantinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getmerchantcoupon.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: 1,
						storeid: _this.id,
					},
					success: res => {
						let voucher_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							for (let n = 0; n < voucher_list.list.length; n++) {
								let voucher_time = new Date(voucher_list.list[n].createtime)
								let year = voucher_time.getFullYear();
								let month = voucher_time.getMonth() + 1;
								let day = voucher_time.getDate();
								_this.voucher.push({
									name: voucher_list.list[n].couponname,
									time: year + '年' + month + '月' + day + '日',
								})
							}
						} else if (res.data.msg == 'failure') {
							_this.defect_el = true
						}
					}
				})
			},

			//商家评论
			getviewlistinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/StorecompController/getstoreviewlist.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum: 1,
						storeid: _this.id,
					},
					success: res => {
						console.log(res)
						let viewlist = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							for (let l = 0; l < viewlist.list.length; l++) {
								let view_time = new Date(viewlist.list[l].createtime)
								let year = view_time.getFullYear();
								let month = view_time.getMonth() + 1;
								let day = view_time.getDate();
								_this.viewlist.push({
									logo: _this.http + '/' + viewlist.list[l].userinfo.userimg,
									name: viewlist.list[l].userinfo.username,
									time: year + '年' + month + '月' + day + '日',
									content: viewlist.list[l].storereview,
								})
							}

						} else if (res.data.msg == 'failure') {
							_this.defect_el = true
						}
					}
				})
			},
			latcount() {
				let list_pic = this.storegrade
				for (let m = 0; m < list_pic; m++) {
					this.latitude[m].pic = '../../static/images/icon14.png'
				}
			},
			ass_pic: function() {
				uni.navigateTo({
					url: '../assemble/assemble'
				})
			},
			seck_pic: function() {
				uni.navigateTo({
					url: '../seckill/seckill'
				})
			},
			changeIndex(index) {
				this.currentIndex = index;
				if (index == 0) {
					this.show1 = true
					this.show2 = false
					this.show3 = false
					this.defect_name = '该商家还没有商品哦！亲'
					this.getstoreinfo()
				}
				if (index == 1) {
					this.show1 = false
					this.show2 = true
					this.show3 = false
					this.defect_name = '该商家还没有优惠券！敬请期待'
					this.getmerchantinfo()
				}
				if (index == 2) {
					this.show1 = false
					this.show2 = false
					this.show3 = true
					this.defect_name = '该商家暂未评价'
					this.getviewlistinfo()
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
			},
			//取消店铺
			getputstorebyinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/BusinessController/putstorebystshoucang.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: 5,
						storeid: _this.id,
					},
					success: res => {
						console.log(res)
					}
				})
				this.getshopinfo()
			},
			//点击是否收藏店铺
			collection() {
				console.log(this.tombstone)
				if (this.tombstone == 0) {
					this.showUpImg = false
					this.getputstorebyinfo()
				} else {
					this.showUpImg = true
					this.getputstorebyinfo()
				}
			}
		}
	}
</script>

<style>
	@import url("merchant.css");
</style>
