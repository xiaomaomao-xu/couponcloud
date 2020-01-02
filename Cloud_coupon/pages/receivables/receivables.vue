<template>
	<view style="position: absolute;top: 0;left: 0;width: 100%;bottom: 0;background: #F0F0F0;overflow: scroll;">
		<view class="code_box">
			<view class="code_title">扫一扫向我付钱</view>
			<view class="code_pic">
				<tki-qrcode  cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit"  :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
				<!-- <image src="../../static/images/ewm.jpg"></image> -->
			</view>
			<view class="code_image" @tap="preserv">保存收款码</view>
			<navigator url="../records/records" hover-class="none" class="record">
				<image src="../../static/images/icon33.png"></image>
				<text>收款记录</text>
				<image src="../../static/images/icon13.png"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
    import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				val: '哦吼!完蛋咯', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				icon: '../../static/images/logo.png', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		methods: {
			preserv: function() {
				let urls = this.src
				uni.downloadFile({
					url: urls,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				})
			},
			qrR(res) {
				this.src = res
				console.log(res)
			},
		}
	}
</script>

<style>
	@import url("receivables.css");
</style>
