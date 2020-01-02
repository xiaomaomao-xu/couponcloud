<template>
	<view>
		<view class="details">
			<view class="deta_list">
				<view class="list_name">
					<view></view>
					<text>1</text>
					<text>2</text>
					<text>3</text>
				</view>
				<view class="entry">
					<text>个人信息</text>
					<text>店铺信息</text>
					<text>商户证件</text>
				</view>
			</view>
			<view class="details_data">
				<view class="datails_list">
					<view>身份证姓名<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>身份证号码<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>身份证有效期<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>开户名称<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>开户银行<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>开户银行全称<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>银行账号<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>商家类型<text>*</text></view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
						<image src="../../static/images/icon13.png"></image>
					</picker>
				</view>
				<view class="datails_list">
					<view>区域选择<text>*</text></view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
						<image src="../../static/images/icon13.png"></image>
					</picker>
				</view>
				<view class="notes">注:红色星号为必填(其他可根据需要填写)</view>
			</view>
			
			<view class="details_data">
				<view class="datails_list">
					<view>客户电话<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>商户简称<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>门店名称<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>门店街道名称<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>超级管理员姓名<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>开户银行全称<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>手机号码<text>*</text></view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>联系邮箱</view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="explain">
					<view>补充说明(非必填)</view>
					<textarea value="" placeholder="补充说明" />
				</view>
				<view class="notes">注:红色星号为必填(其他可根据需要填写)</view>
			</view>
			
			<view class="passport">
				<view class="pass_el">证件照片<text>*</text></view>
				<view class="pass_list">
					<view class="port_pic">
						<image></image>
					</view>
					<view class="port_name">身份证人像照</view>
					<view class="port_btn">拍照/上传照片</view>
				</view>
				<view class="pass_list">
					<view class="port_pic">
						<image></image>
					</view>
					<view class="port_name">身份证国徽照</view>
					<view class="port_btn">拍照/上传照片</view>
				</view>
			</view>
			
			<view class="passport">
				<view class="pass_el">营业证明<text>*</text></view>
				<view class="pass_list">
					<view class="port_pic">
						<image></image>
					</view>
					<view class="port_name">商家营业执照</view>
					<view class="port_btn">拍照/上传照片</view>
				</view>
				<view class="pass_list">
					<view class="port_pic">
						<image></image>
					</view>
					<view class="port_name">经营场地照片</view>
					<view class="port_btn">拍照/上传照片</view>
				</view>
			</view>
			
			<view class="passport">
				<view class="pass_el">门店门头照片<text>*</text></view>
				<view class="pass_list">
					<view class="port_pic">
						<image></image>
					</view>
					<view class="port_name">门头照片</view>
					<view class="port_btn">拍照/上传照片</view>
				</view>
			</view>
			
			<view class="datails_pic">
				<view class="pic_title">店内环境(上传3张照片)<text>*</text></view>
				<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
					<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
				</view>
				<view class="datails_sub" @tap="Addimg" v-if="Piclist">
					<image src="../../static/images/icon26.png"></image>
				</view>
			</view>
			
			<view class="datails_pic">
				<view class="pic_title">提交资料(上传5张照片)<text>*</text></view>
				<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
					<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
				</view>
				<view class="datails_sub" @tap="Addimg" v-if="Piclist">
					<image src="../../static/images/icon26.png"></image>
				</view>
			</view>
			
			<view class="btn_submit">
				<view>下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Piclist:true,
				Imglist:true,
				addpic:[],
				array: ['男', '女'],
				index: 0,
			}	
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			Addimg:function(e){
				uni.chooseImage({ 
				    count: 5, //相册选择多选图片数量
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success:(res)=>{  
						var tempFilePaths = res.tempFilePaths
						this.addpic = this.addpic.concat(tempFilePaths)
						//图片展示数量
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
	@import url("entry.css");
</style>
