<template>
	<view style="position: absolute;top: 0;left: 0;width: 100%;bottom: 0;background: white;overflow: scroll;">
		<view class="follow_box">
			<view class="post_titile">
				<image src="../../static/images/logo.png"></image>
				<view class="post_new">
					<view class="new_le">
						<view>人间水蜜桃</view>
						<view>撒娇的离开手机打开拉萨决定离开了</view>
					</view>
					<view class="new_ri" v-if="soure" @tap="sourelse">已关注</view>
					<view class="new_ri ritive" v-if="cancle" @tap="sourelse">关注</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				soure:true,
				cancle:false
			}
		},
		methods: {
			sourelse:function(){
				let _this = this
				if(_this.soure == true){
					uni.showModal({
						title: '是否取消关注',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								_this.soure = !_this.soure;
								_this.cancle = !_this.cancle;
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					_this.soure = !_this.soure;
					_this.cancle = !_this.cancle;
				}
				
			}
		}
	}
</script>

<style>
	@import url("follow.css");
</style>
