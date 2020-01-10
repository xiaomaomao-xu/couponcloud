<template>
	<view class="center">
		<view class="edit_pic">
			<view class="pic_el">
				<image :src="uploadimg"></image>
				<!-- <input type="hidden" v-model="userinfo.userimg"> -->
				<view @click="changeImg">点击更换头像</view>
			</view>
		</view>
		<view class="edit_form">
			<view class="form_el">
				<text>昵称：</text>
				<input type="text" v-model="userinfo.username">
			</view>
			<view class="form_el">
				<text>性别：</text>
				<picker @change="bindPickerChange" v-model="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
			<view class="form_el">
				<text>生日：</text>
				<picker mode="date" v-model="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{transformDate(date)}}</view>
				</picker>
			</view>
		</view>
		<view class="autograph">
			<view>个性签名</view>
			<textarea v-model="userinfo.leaveword" placeholder="不打算让别人知道你的个性吗?" />
		</view>
		<view class="sure" @click="submituserinfo()"><view>确定</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				uploadimg:'',
				usid:'',
				userimg:'',
				username:'',
				usersex:'',
				leaveword:'',
				storestart:'',
				userinfo:'',
				date: '请输入您的生日!',
				date1: currentDate,
				array: ['女', '男'],
				index: 3,
			}
		},onLoad() {
			this.getuserinfo();
		},
		methods: {
			changeImg() {
				let _this = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.changeimg = tempFilePaths[0] 
						uni.uploadFile({
							url: _this.http + '/pload/pictureUpLoad.do', 
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								this.userinfo.userimg = res.data
								this.uploadimg = _this.http + '/' + res.data
							}
						});
					}
				});
			},
			submituserinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/PersonageController/putuserinfobyid.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						usid: this.userinfo.usid,
						userimg:this.userinfo.userimg,
						username:this.userinfo.username,
						usersex:this.index,
						leaveword:this.userinfo.leaveword,
						userbirthday:new Date(this.date)
					},
					success: res => {

						if (res.data.msg == 'succeed') {

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
			getuserinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/PersonageController/getuserinfobyid.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						usid: 5
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							this.userinfo=taiy_list
							this.uploadimg = _this.http + '/' +this.userinfo.userimg
							this.date=this.userinfo.userbirthday
							this.index=this.userinfo.usersex
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
			}

			,transformDate(value) {
				var date = new Date(value);
				var Y = date.getFullYear();
				var m = date.getMonth() + 1;
				var d = date.getDate();
				var H = date.getHours();
				var i = date.getMinutes();
				var s = date.getSeconds();
				if (m < 10) {
					m = '0' + m;
				}
				if (d < 10) {
					d = '0' + d;
				}
				if (H < 10) {
					H = '0' + H;
				}
				if (i < 10) {
					i = '0' + i;
				}
				if (s < 10) {
					s = '0' + s;
				}
				var t = Y + '-' + m + '-' + d;
				return t;
			}
		}
	}
</script>

<style>
	@import url("edit_data.css");
</style>
