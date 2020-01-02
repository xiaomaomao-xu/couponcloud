<template>
	<view class="center">
		<view class="edit_pic">
			<view class="pic_el">
				<image src="../../static/images/logo.png"></image>
				<view>点击更换头像</view>
			</view>
		</view>
		<view class="edit_form">
			<view class="form_el">
				<text>昵称：</text>
				<input type="text" value="请输入你的昵称">
			</view>
			<view class="form_el">
				<text>性别：</text>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
			<view class="form_el">
				<text>生日：</text>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
			</view>
		</view>
		<view class="autograph">
			<view>个性签名</view>
			<textarea value="" placeholder="不打算让别人知道你的个性吗?" />
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
			}
		}
	}
</script>

<style>
	@import url("edit_data.css");
</style>
