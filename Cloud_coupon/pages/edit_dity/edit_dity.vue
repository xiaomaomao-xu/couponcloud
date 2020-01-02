<template>
	<view>
		<view class="details">
			<view class="details_data">
				<view class="datails_list">
					<view>商品条码</view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>商品名称</view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>规格型号</view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>库存单位</view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>商品原价</view>
					<input type="text" placeholder="请输入商品条码">
				</view>
				<view class="datails_list">
					<view>商品折后价</view>
					<input type="text" placeholder="请输入商品条码">
				</view>
			</view>
			<view class="datails_pic">
				<view class="pic_title">商品图片</view>
				<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
					<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
				</view>
				<view class="datails_sub" @tap="Addimg" v-if="Piclist">
					<image src="../../static/images/icon26.png"></image>
				</view>
			</view>
			<view class="btn_submit">
				<view>放回仓库</view>
				<view>立即上架</view>
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
			}	
		},
		methods: {
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
