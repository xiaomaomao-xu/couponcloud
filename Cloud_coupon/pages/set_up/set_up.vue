<template>
	<view class="center">
		<view class="edit_pic">
			<view class="pic_el">
				<image src="../../static/images/logo.png"></image>
				<view>设置更换店铺头像</view>
			</view>
		</view>
		<view class="edit_form">
			<view class="form_el">
				<text>店铺名称：</text>
				<input type="text" placeholder="请输入店铺名称">
			</view>
			<view class="form_el">
				<text>店铺地址：</text>
				<input type="text" placeholder="请输入店铺详细地址">
			</view>
			<view class="form_el">
				<text>店铺电话：</text>
				<input type="text" placeholder="请输入店铺电话">
			</view>
		</view>
		<view class="datails_pic">
			<view class="pic_title">添加商铺图片/视频</view>
			<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
				<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
			</view>
			<view class="datails_sub" @tap="Addimg" v-if="Piclist">
				<image src="../../static/images/icon26.png"></image>
			</view>
		</view>
		<view class="sure"><view>确定</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: '请输入您的生日!',
				date1: currentDate,
				array: ['男', '女'],
				index: 0,
				Piclist:true,
				Imglist:true,
				addpic:[],
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				var oDate1 = new Date(this.date1);
				var oDate2 = new Date(e.target.value);
				console.log(oDate2)
				console.log(oDate2.getTime)
				if (oDate1.getTime() > oDate2.getTime()) {
					this.date = e.target.value
				} else {
					uni.showModal({
						title: '提示',
						content: '生日不能大于或等于当前日期!',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			Addimg:function(e){
				uni.chooseImage({ 
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success:(res)=>{  
						var tempFilePaths = res.tempFilePaths
						this.addpic = this.addpic.concat(tempFilePaths)
						if(this.addpic.length == 3){
							this.Piclist = !this.Piclist
						}
				    }
				})
			},
			deleteImage:function(index){
				uni.showModal({
					title: '提示',
					content: '确定要删除此图片吗？',
					success:(res)=>{
			        	console.log(index)
						this.addpic = this.addpic.splice(index,1)
						if(this.addpic.length < 3){
							this.Piclist = !this.Piclist
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("set_up.css");
</style>
