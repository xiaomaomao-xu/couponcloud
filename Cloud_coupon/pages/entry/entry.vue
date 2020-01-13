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
			<view class="details_data" v-show="data1">
				<view class="datails_list" v-for="(item,index) in datails_box" :key='index'>
					<view>{{item.name}}<text>*</text></view>
					<input type="text" v-model="item.value" :placeholder="item.pla">
				</view>
				<view class="datails_list">
					<view>商家类型<text>*</text></view>
					<picker :value="index" :range="shopingtype"  @change="bindPickerChange">
						<view class="uni-input">{{shopingtype[index]}}</view>
						<image src="../../static/images/icon13.png"></image>
					</picker>
				</view>
				<view class="datails_list">
					<view>区域选择<text>*</text></view>
					<picker :value="index" :range="address"  @change="bindPickerChange1">
						<view class="uni-input">{{address[index]}}</view>
						<image src="../../static/images/icon13.png"></image>
					</picker>
				</view>
				<view class="notes">注:红色星号为必填(其他可根据需要填写)</view>
				<view class="btn_submit" @tap="show1">
					<view>下一步</view>
				</view>
			</view>
			
			<view class="details_data" v-show="data2">
				<view class="datails_list" v-for="(item,index) in business" :key='index'>
					<view>{{item.name}}<text>*</text></view>
					<input type="text" v-model="item.value" :placeholder="item.pla">
				</view>
				<view class="explain">
					<view>补充说明(非必填)</view>
					<textarea value="" placeholder="补充说明" />
				</view>
				<view class="notes">注:红色星号为必填(其他可根据需要填写)</view>
				<view class="btn_submit" @tap="show2">
					<view>下一步</view>
				</view>
			</view>
			<view  v-show="data3">
				<view class="passport">
					<view class="pass_el">证件照片<text>*</text></view>
					<view class="pass_list" v-for="(item,index) in port_box" :key='index'>
						<view class="port_pic">
							<image :src="item.src"></image>
						</view>
						<view class="port_name">{{item.name}}</view>
						<view class="port_btn" @tap="port_btn(index)">{{item.num}}</view>
					</view>
				</view>
				
				<view class="passport">
					<view class="pass_el">营业证明<text>*</text></view>
					<view class="pass_list" v-for="(item,index) in port_box1" :key='index'>
						<view class="port_pic">
							<image :src="item.src"></image>
						</view>
						<view class="port_name">{{item.name}}</view>
						<view class="port_btn" @tap="port_btn1(index)">{{item.num}}</view>
					</view>
				</view>
				
				<view class="passport">
					<view class="pass_el">门店门头照片<text>*</text></view>
					<view class="pass_list" v-for="(item,index) in port_box2" :key='index'>
						<view class="port_pic">
							<image :src="item.src"></image>
						</view>
						<view class="port_name">{{item.name}}</view>
						<view class="port_btn" @tap="port_btn2(index)">{{item.num}}</view>
					</view>
				</view>
				
				<view class="datails_pic">
					<view class="pic_title">店内环境(上传3张照片)<text>*</text></view>
					<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
						<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
					</view>
					<view class="datails_sub" @tap="Addimg" v-show="Piclist">
						<image src="../../static/images/icon26.png"></image>
					</view>
				</view>
				
				<view class="datails_pic">
					<view class="pic_title">提交资料(上传5张照片)<text>*</text></view>
					<view class="datails_sub" v-for="(item,index) in addpic1" :key="index" v-if="Imglist1">
						<image :src="item" @longpress="deleteImage1(index)"  data-index='index'></image>
					</view>
					<view class="datails_sub" @tap="Addimg1" v-show="Piclist1">
						<image src="../../static/images/icon26.png"></image>
					</view>
				</view>
				<view class="btn_submit" @tap="show3">
					<view>下一步</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFilePaths:'',
				tempFilePaths1:'',
				tempFilePaths2:'',
				port_box:[{
					src:'../../static/images/sctp.png',
					name:'身份证人像照',
					num:'拍照/上传照片'
				},{
					src:'../../static/images/sctp.png',
					name:'身份证国徽照',
					num:'拍照/上传照片'
				}],
				port_box1:[{
					src:'../../static/images/sctp.png',
					name:'商家营业执照',
					num:'拍照/上传照片'
				},{
					src:'../../static/images/sctp.png',
					name:'场地经营照片',
					num:'拍照/上传照片'
				}],
				port_box2:[{
					src:'../../static/images/sctp.png',
					name:'门头照',
					num:'拍照/上传照片'
				}],
				data1:false,
				data2:false,
				data3:true,
				Piclist:true,
				Piclist1:true,
				Imglist:true,
				Imglist1:true,
				addpic:[],
				addpic1:[],
				array: ['男', '女'],
				shopingtype:[],
				address:[],
				index: 0,
				index1:0,
				input_box:[],
				datails_box:[{
					name:'身份证姓名',
					value:'',
					pla:'请输入身份证姓名'
				},{
					name:'身份证号码',
					value:'',
					pla:'请输入身份证号码'
				},{
					name:'身份证有效期',
					value:'',
					pla:'请输入身份证有效期'
				},{
					name:'手机号码',
					value:'',
					pla:'请输入手机号码'
				},{
					name:'开户名称',
					value:'',
					pla:'请输入开户名称'
				},{
					name:'银行省市编码',
					value:'',
					pla:'请输入开户行省市编码'
				},{
					name:'开户银行全称',
					value:'',
					pla:'请输入开户银行全称'
				},{
					name:'银行卡号',
					value:'',
					pla:'请输入银行卡号'
				}],
				business:[{
					name:'客户电话',
					value:'',
					pla:'请输入客户电话'
				},{
					name:'商户简称',
					value:'',
					pla:'请输入商户简称'
				},{
					name:'门店名称',
					value:'',
					pla:'请输入门店名称'
				},{
					name:'门店省市编码',
					value:'',
					pla:'请输入门店省市编码'
				},{
					name:'门店街道名称',
					value:'',
					pla:'请输入门店街道名称'
				},{
					name:'联系邮箱',
					value:'',
					pla:'请输入联系邮箱'
				}]
			}	
		},onLoad(option) {
			this.getshopinfo(),
			this.getaddress()
		},
		methods: {
			show1(){
				//身份证
				let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
				//手机号码
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				//银行卡号
				let card = /^(\d{16}|\d{19})$/;
				var index=0;
				for(var g =0;g<this.datails_box.length;g++){
					console.log(this.datails_box[g].value)
					if(this.datails_box[g].value == null || this.datails_box[g].value=='' || this.datails_box[g].value == undefined){
						uni.showModal({
							title: '温馨提示',
							content: this.datails_box[g].pla,
							showCancel: false
						});
						break;
					}
					index++;
					if(index==this.datails_box.length){
						if(this.index == null || this.index =='' || this.index ==undefined){
							uni.showModal({
								title: '温馨提示',
								content: '请选择商家分类',
								showCancel: false
							});
							break;
						}
						if(this.index1 == null || this.index1 =='' || this.index1 ==undefined){
							uni.showModal({
								title: '温馨提示',
								content: '请选择所在区域',
								showCancel: false
							});
							break;
						}
						if(reg.test(this.datails_box[1].value) === false){
							uni.showModal({
								title: '温馨提示',
								content: '请输入正确的身份证号码',
								showCancel: false
							});
							break;
						}
						if(myreg.test(this.datails_box[3].value) === false){
							uni.showModal({
								title: '温馨提示',
								content: '请输入正确的手机号码',
								showCancel: false
							});
							break;
						}
						if(card.test(this.datails_box[7].value) === false){
							uni.showModal({
								title: '温馨提示',
								content: '请输入正确的银行卡号',
								showCancel: false
							});
							break;
						}
						if(this.datails_box[g].value != null && this.index != null && this.index1 != null){}{
							this.data1 = false
							this.data2 = true
							this.data3 = false
						}
					}
				}
			},
			show2(){
				//手机号码
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				var index=0;
				for(var k =0;k<this.business.length;k++){
					console.log(this.business[k].value)
					if(this.business[k].value == null || this.business[k].value=='' || this.business[k].value == undefined){
						uni.showModal({
							title: '温馨提示',
							content: this.business[k].pla,
							showCancel: false
						});
						break;
					}
					index++;
					if(index==this.business.length){
						if(myreg.test(this.business[0].value) === false){
							uni.showModal({
								title: '温馨提示',
								content: '请输入正确的手机号码',
								showCancel: false
							});
							break;
						}
						if(this.business[k].value != null){}{
							this.data1 = false
							this.data2 = false
							this.data3 = true
						}
					}
				}
			},
			show3(){
				if(this.port_box[0].src != this.tempFilePaths){
					uni.showModal({
						title: '温馨提示',
						content: '请上传身份证人像照片',
						showCancel: false
					});
					return;
				}
				if(this.port_box[1].src != this.tempFilePaths){
					uni.showModal({
						title: '温馨提示',
						content: '请上传身份证国徽照',
						showCancel: false
					});
					return;
				}
				if(this.port_box1[0].src != this.tempFilePaths1){
					uni.showModal({
						title: '温馨提示',
						content: '请上传营业执照',
						showCancel: false
					});
					return;
				}
				if(this.port_box1[1].src != this.tempFilePaths){
					uni.showModal({
						title: '温馨提示',
						content: '请上传场地经营照片',
						showCancel: false
					});
					return;
				}
				if(this.port_box2[0].src != this.tempFilePaths2){
					uni.showModal({
						title: '温馨提示',
						content: '请上传门店门头照',
						showCancel: false
					});
					return;
				}
				if(this.addpic.length <3){
					uni.showModal({
						title: '温馨提示',
						content: '店内环境图片为3张',
						showCancel: false
					});
					return;
				}
				if(this.addpic1.length <5){
					uni.showModal({
						title: '温馨提示',
						content: '提交资料图片为五张',
						showCancel: false
					});
					return;
				}
				console.log()
				console.log(this.addpic1.length)
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			bindPickerChange1: function(e) {
				this.index1 = e.target.value
			},
			port_btn(index){
				uni.chooseImage({
				    count: 1, //相册选择多选图片数量
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success:(res)=>{  
						this.tempFilePaths = res.tempFilePaths
						this.port_box[index].src = this.tempFilePaths
				    }
				})
			},
			port_btn1(index){
				uni.chooseImage({
				    count: 1, //相册选择多选图片数量
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success:(res)=>{  
						this.tempFilePaths1 = res.tempFilePaths
						this.port_box1[index].src = this.tempFilePaths1
				    }
				})
			},
			port_btn2(index){
				uni.chooseImage({
				    count: 1, //相册选择多选图片数量
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success:(res)=>{  
						this.tempFilePaths2 = res.tempFilePaths
						this.port_box2[index].src = this.tempFilePaths2
				    }
				})
			},
			Addimg:function(e){
				uni.chooseImage({ 
				    count: 3, //相册选择多选图片数量
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success:(res)=>{  
						var tempFilePaths = res.tempFilePaths
						this.addpic = this.addpic.concat(tempFilePaths)
						//图片展示数量
						if(this.addpic.length == 3){
							this.Piclist = false
						}
				    }
				})
			},
			Addimg1:function(e){
				uni.chooseImage({ 
				    count: 5, //相册选择多选图片数量
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success:(res)=>{  
						var tempFilePaths = res.tempFilePaths
						this.addpic1 = this.addpic1.concat(tempFilePaths)
						//图片展示数量
						if(this.addpic1.length == 5){
							this.Piclist1 = false
						}
				    }
				})
			},
			deleteImage:function(index){
				uni.showModal({
					title: '提示',
					content: '确定要删除此图片吗？',
					success:(res)=>{
						this.addpic.splice(index,1)
						if(this.addpic.length < 3){
							this.Piclist = true
						}
					}
				})
			},
			deleteImage1:function(index){
				uni.showModal({
					title: '提示',
					content: '确定要删除此图片吗？',
					success:(res)=>{
						this.addpic1.splice(index,1)
						console.log(this.addpic1)
						if(this.addpic1.length < 5){
							this.Piclist1 = true
						}
					}
				})
			},
			//商家类型
			getshopinfo() {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantbgController/getallshoptype.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							let collect_list = JSON.parse(res.data.data)
							for(var i=0;i<collect_list.length;i++){
								_this.shopingtype.push(collect_list[i].sttyname)
							}
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '数据拉取失败',
								showCancel: false
							});
						}
					}
				})
			},
			//区域选择
			getaddress() {
				let _this = this;
				uni.request({
					url: _this.http + '/regionController/getregiontolist.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						
					},
					success: res => {
						if (res.data.msg == 'succeed') {
							let address_list = JSON.parse(res.data.data)
							for(var j=0;j<address_list.length;j++){
								_this.address.push(address_list[j].reginaddress)
							}
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '数据拉取失败',
								showCancel: false
							});
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
