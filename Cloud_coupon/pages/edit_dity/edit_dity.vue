<template>
	<view>
		<view class="details">
			<view class="details_data">
				<view class="datails_list">
					<view>商品条码</view>
					<input type="text" placeholder="请输入商品条码" v-model="offering.barcode">
				</view>
				<view class="datails_list">
					<view>商品名称</view>
					<input type="text" placeholder="请输入商品名称" v-model="offering.commodiname">
				</view>
				<view class="datails_list">
					<view>规格型号</view>
					<input type="text" placeholder="请输入规格型号" v-model="offering.standard">
				</view>
				<view class="datails_list">
					<view>库存单位</view>
					<input type="text" placeholder="请输入库存单位" v-model="offering.repertory">
				</view>
				<view class="datails_list">
					<view>商品原价</view>
					<input type="text" placeholder="请输入商品原价" v-model="offering.originalprice">
				</view>
				<view class="datails_list">
					<view>商品折后价</view>
					<input type="text" placeholder="请输入商品折后价" v-model="offering.currentprice">
				</view>
			</view>
			<view class="datails_pic">
				<view class="pic_title">商品图片</view>
				<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
					<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
				</view>
				<view class="datails_sub" @tap="changeImg" v-if="Piclist">
					<image :src="offerimg"></image>
				</view>
			</view>
			<view class="btn_submit" v-if="flag">
				<view @click="submitoffering(2)">放回仓库</view>
				<view @click="submitoffering(0)">立即上架</view>
			</view>
			<view class="btn_submit1" v-if="!flag">
				<view @click="addoffering">添加到仓库</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offeringid:'',
				flag:false,
				offerimg:'',
				offering:{
					comdiid:0,
					storeid:0,
					commodityid:0,
					commodiname:'',
					standard:'',
					repertory:0,
					commodiimg:'',
					originalprice:0,
					currentprice:0,
					commdis:0,
					barcode:'',
					commodistart:0,
					commodiremark:'',
					commodiaudit:'',
					auditremark:'',
					obligatestrone:'',
					obligateintone:0
				},
				Piclist:true,
				Imglist:true,
				addpic:[],
			}	
		},
		onLoad() {
			this.offeringid=uni.getStorageSync('comdiid')
			if(this.offeringid){
				this.flag = true
			}
			if(this.flag){
				this.getoffering()
				uni.setStorageSync('comdiid','')
			}
		},
		methods: {
			addoffering(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/putaddmerchandise.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						storeid: uni.getStorageSync('storeid'),
						commodiname:this.offering.commodiname,
						standard:this.offering.standard,
						repertory:this.offering.repertory,
						commodiimg:this.offering.commodiimg,
						originalprice:this.offering.originalprice,
						currentprice:this.offering.currentprice,
						commdis:this.offering.commdis,
						barcode:this.offering.barcode,
						commodiremark:this.offering.commodiremark
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
			submitoffering(val){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/putupdatemerchandise.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						comdiid: this.offering.comdiid,
						commodiname:this.offering.commodiname,
						standard:this.offering.standard,
						repertory:this.offering.repertory,
						commodiimg:this.offering.commodiimg,
						originalprice:this.offering.originalprice,
						currentprice:this.offering.currentprice,
						commdis:this.offering.commdis,
						barcode:this.offering.barcode,
						commodiremark:this.offering.commodiremark,
						commodistart:val
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
								this.offering.commodiimg = res.data
								this.offerimg = _this.http + '/' + res.data
							}
						});
					}
				});
			},
			getoffering(){
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getontmerchand.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						comdiid: uni.getStorageSync('comdiid')
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							this.offering=taiy_list
							this.offerimg = _this.http + '/' + this.offering.commodiimg
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
	@import url("edit_dity.css");
</style>
