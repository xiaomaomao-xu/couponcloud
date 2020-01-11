<template>
	<view class="center">
		<view class="edit_pic">
			<view class="pic_el">
				<image :src="userimg"></image>
				<view @click="changeImg">设置更换店铺头像</view>
			</view>
		</view>
		<view class="edit_form">
			<view class="form_el">
				<text>店铺名称：</text>
				<input type="text" placeholder="请输入店铺名称" v-model="storeinfo.storename">
			</view>
			<view class="form_el">
				<text>店铺地址：</text>
				<input type="text" placeholder="请输入店铺详细地址" v-model="storeinfo.storeaddress">
			</view>
			<view class="form_el">
				<text>店铺电话：</text>
				<input type="text" placeholder="请输入店铺电话" v-model="storeinfo.storephone">
			</view>
		</view>
		<view class="datails_pic">
			<view class="pic_title">添加商铺图片/视频</view>
			<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
				<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
			</view>
<!-- 			<view class="datails_sub" @tap="Addimg" v-if="Piclist">
				<image :src="userimg"></image>
			</view> -->
			<view class="datails_sub" @click="changeImg1" v-if="Piclist">
				<image :src="userimg1"></image>
			</view>
		</view>
		<view class="sure" @click="submitstoreinfo"><view>确定</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				storeinfo:'',
				userimg:'',
				userimg1:'',
				date: '请输入您的生日!',
				date1: currentDate,
				array: ['男', '女'],
				index: 0,
				Piclist:true,
				Imglist:true,
				addpic:[],
			}
		},
		onLoad() {
			this.getstoreinfo()
		},
		methods: {
			submitstoreinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/shopssetmessage.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						stid: this.storeinfo.stid,
						storename:this.storeinfo.storename,
						storephone:this.storeinfo.storephone,
						storeaddress:this.storeinfo.storeaddress,
						storeimg:this.storeinfo.storeimg,
						storenotice:this.storeinfo.storenotice,
						obligatestrone:this.storeinfo.obligatestrone
					},
					success: res => {
						console.log("resresresres")
						console.log(res)
						if (res.data.msg == 'succeed') {
							console.log("resresreasdfsadfsadfsres")
							console.log(res)
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
								this.storeinfo.storeimg = res.data
								this.userimg = _this.http + '/' + res.data
								console.log("this.userimg")
								console.log(this.userimg)
							}
						});
					}
				});
			},
			changeImg1() {
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
								this.storeinfo.obligatestrone = res.data
								this.userimg1 = _this.http + '/'  + res.data
								console.log("this.userimg1")
								console.log(this.userimg1)
							}
						});
					}
				});
			},
			getstoreinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getshopbyuserid.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: 5
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							this.storeinfo = taiy_list;
							console.log("this.storeinfo")
							console.log(this.storeinfo)
							this.userimg = _this.http + '/' + this.storeinfo.storeimg
							this.userimg1 = _this.http + '/' + this.storeinfo.obligatestrone;
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
