<template>
	<view style="width: 100%;background: #EAEAEA;position: absolute;top: 0;bottom: 120rpx;overflow: scroll;">
		<view class="post_cent">
			<view class="post_titile">
				<image src="../../static/images/logo.png"></image>
				<view class="post_new">
					<view class="new_le">
						<view>人间水蜜桃</view>
						<view>
							<image src="../../static/images/icon17.png"></image>
						</view>
						<image src="../../static/images/icon16.png"></image>
					</view>
					<view class="new_ri">2019/10/16</view>
				</view>
			</view>
			<view class="center_box">
				<view class="center_el">
					每年保持说不出口不是的 基本擦还是不错的不错的时间经常保持保持时间长的白色垃圾不是大不了失败百度才看见爱上彼差别不是，不会参考
					每年保持说不出口不是的 基本擦还是不错的不错的时间经常保持保持时间长的白色垃圾不是大不了失败百度才看见爱上彼差别不是，不会参考
					每年保持说不出口不是的 基本擦还是不错的不错的时间经常保持保持时间长的白色垃圾不是大不了失败百度才看见爱上彼差别不是，不会参考
				</view>
				<view class="image_box">
					<view class="image_el" v-for="(item,index) in pirve_box" :key="index" @tap="pirve_image">
						<image :src="item"></image>
					</view>
				</view>
				<view class="icon_lcoation">
					<image src="../../static/images/icon9.png"></image>
					<view>红花岗区大连路时代天街购物广场</view>
				</view>
				<view class="comment">
					<view class="comment_le">14.5万阅读</view>
					<view class="comment_ri">
						<view v-for="(item,index) in imgbox" :key="index" @tap="order_le(item.num,index)">
						    <image :src="index == ins?item.img:item.pic"></image>
							<text>{{item.name}}</text>
						    <button :open-type="item.num=='shareclick'?'share':''"></button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="whole">
			<view class="whole_title">全部评论(1895)</view>
			<view class="post_titile">
				<image src="../../static/images/logo.png"></image>
				<view class="post_new">
					<view class="new_le">
						<view>人间水蜜桃</view>
						<view>
							<image src="../../static/images/icon17.png"></image>
						</view>
						<view class="thumbs" @tap="showUp_down">
						    <image src="../../static/images/icon11.png" v-show="showUpImg"></image>
						    <image src="../../static/images/icon12.png" v-show="!showUpImg"></image>
							<text>{{data_num}}</text>
						</view>
					</view>
					<view class="new_ri">2019/10/16</view>
				</view>
			</view>
			<view class="center_box">
				<view class="center_el">
					每年保持说不出口不是的 基本擦还是不错的不错的时间经常保持保持时间长的白色垃圾不是大不了失败百度才看见爱上彼差别不是，不会参考
					每年保持说不出口不是的 基本擦还是不错的不错的时间经常保持保持时间长的白色垃圾不是大不了失败百度才看见爱上彼差别不是，不会参考
					每年保持说不出口不是的 基本擦还是不错的不错的时间经常保持保持时间长的白色垃圾不是大不了失败百度才看见爱上彼差别不是，不会参考
				</view>
			</view>
		</view>
		<view class="reply_input">
			<view class="reply_le">
				<input type="text" placeholder="请输入你要输入的内容">
			</view>
			<view class="reply_ri">
				<text>发送</text>
				<image src="../../static/images/icon11.png"></image>
				<image src="../../static/images/icon10.png"></image>
				<image src="../../static/images/icon19.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var bitmap = null;
	export default {
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		},
		data() {
			return {
				showall: false,
				showUpImg:true,
				data_num:2255,
				title: '自定义分享标题',
				path: '/pages/test/test?id=123',
				ins:0,
				imgbox:[{
					pic: "../../static/images/icon12.png",
					img: "../../static/images/icon11.png",
					name:4396,
					num:'listclick'
				},
				{
					pic: "../../static/images/icon10.png",
					name:4396,
					num:'commclick'
				},
				{
					pic: "../../static/images/icon19.png",
					name:4396,
					num:'shareclick'
				}],
				pirve_box: [
					"../../static/images/bar.jpg",
					"../../static/images/bar.jpg",
					"../../static/images/bar.jpg",
					"../../static/images/bar.jpg",
					"../../static/images/bar.jpg",
					"../../static/images/bar.jpg"
				]
			};
		},
		methods: {
			order_le: function(methodsWords,index) {
				this[methodsWords](index)
			},
			listclick: function(index) {
					if(this.ins==index){
						this.ins=-1;
						this.imgbox[0].name++
					}else{
						this.ins=index;
						this.imgbox[0].name--
					}
			},
			commclick:function(){
				uni.navigateTo({
					url:'../page_home/page_home',
				})
			},
			shareclick:function(){
				
			},
			showUp_down:function(){
				console.log(this.showUpImg)
				if(this.showUpImg == true){
					this.showUpImg = !this.showUpImg
				    this.data_num++
				}else{
					this.showUpImg = !this.showUpImg
					this.data_num--
				}
			},
			pirve_image: function() {
				console.log(this.pirve_box)
				uni.previewImage({
					urls: this.pirve_box,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("comment.css");
</style>
