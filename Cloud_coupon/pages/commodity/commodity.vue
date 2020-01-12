<template>
	<view>
		<view class='box_view'>
			<view class="user_com">
				<view :class="{'actives':index==tabIndex}" @tap="btn_click(index)" v-for="(item,index) in userBox" :key="index">{{item.name}}</view>
			</view>
			<!-- <view class="cart_title">
				<view class="title_left">
					共
					<text>{{piece}}</text>件商品
				</view>
				<view class="title_right">
					合计:
					<text>￥{{totalPrice}}</text>
				</view>
				<view class='delete' @tap="delisel">
					<image src="/images/icon13.png"></image>
					<text>清空</text>
				</view>
			</view> -->
			<scroll-view class="cart_list" scroll-y="true" @scrolltolower='lower'>
				<view v-for="(item,index) in list" :key="index">
					<view class="list_view">
						<view class="shop_name">
							<image src="../../static/images/icon21.png" class="radio_group" v-if="!item.selected" @tap="checkedtap(index)"></image>
							<image src="../../static/images/icon22.png" class="radio_group" v-else @tap="checkedtap(index)"></image>
							<text>{{item.commodiname}}</text>
						</view>
						<image src="../../static/images/icon23.png" class="empty" @tap='deletes(index)'></image>
						<view class="shop_couent" @tap="couent(item.comdiid)">
							<view class="couent_pic">
								<!-- <image src="../../static/images/pg1.png"></image> -->
								<image :src="item.commodiimg"></image>
							</view>
							<view class="text_el">
								<textarea disabled="disabled" value="商品 描述 "></textarea>
								<view class="mymoney"><text>原价:{{item.originalprice}}</text><text>库存:{{item.repertory}}</text></view>
								<view class="centitel"><text>￥{{item.originalprice}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="shop_price ">
				<view class="radio_box ">
					<image src="../../static/images/icon21.png" class="radio_group" v-if="!selectAllStatus" @tap='selectAll'></image>
					<image src="../../static/images/icon22.png" class="radio_group" v-else @tap='selectAll'></image>
					<text @tap='selectAll'>全选</text>
				</view>
				<view class="title_left">
					共
					<text>{{piece}}</text>件商品
				</view>
				<view class="btn_list">
					<view v-for="(item,index) in codebtnlist" :key="index" @click="offeroperation(index)" >
						<image :src="item.pic"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1 ,
				offerlist:[],
				argumentlist:[],
				list:[],
				totalPrice: 0,
				piece: 0,
				tabIndex: 0,
				selectAllStatus: false,
				canClick: true,
				userBox: [{
					name: '已上架'
				}, {
					name: '已下架'
				}, {
					name: '仓库中'
				}],
				btnList: [{
					name: '上架',
					pic: "../../static/images/icon24.png",
					code:0
				}, {
					name: '下架',
					pic: "../../static/images/icon25.png",
					code:1
				}, {
					name: '删除',
					pic: "../../static/images/icon23.png",
					code:2
				}, {
					name: '添加',
					pic: "../../static/images/icon23.png",
					code:3
				}],
				codebtnlist:[]
			}
		},
		onLoad() {
			for(var i=0;i<this.btnList.length;i++){
				if(i != 0 && i != 3){
					this.codebtnlist.push(this.btnList[i])
				}
			}
			this.getofferings();
		},
		methods: {
			offeroperation(val){
				var mycode = this.codebtnlist[val].code
				console.log("mycode")
				console.log(mycode)
				if(mycode == 3){
					this.addoffer()
				}else if(mycode == 2){
					this.delisel(mycode)
				}else {
					let _this = this;
					let list = this.list;
					var mylist = [];
					for(var i=0;i<_this.offerlist.length;i++){
						_this.argumentlist.push(_this.offerlist[i].comdiid)
						mylist.push(_this.offerlist[i].comdiid)
					}
					var param = JSON.stringify(_this.argumentlist);
					uni.request({
						url: _this.http + '/MerchantController/putmerchandstart.do',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							jsonsrt:param,
							commodistart: mycode
						},
						success: res => {
							if (res.data.msg == 'succeed') {
								for(var i=0;i<list.length;i++)
								{
									for(var j=0;j<mylist.length;j++){
										if(list[i].comdiid == mylist[j]){
											list.splice(i,1);
										}
									}
								}
							} else if (res.data.msg == 'failure') {
								uni.showModal({
									title: '温馨提示',
									content: '暂无数据',
									showCancel: false
								});
							}
						}
					})
					_this.argumentlist=[];
				}
			},
			//滚动到底部
			lower(){
				
				this.page=this.page+1;
				this.getofferings();
			},
			getofferings() {
				let _this = this;

				uni.request({
					url: _this.http + '/MerchantController/getallmerchandise.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						storeid: uni.getStorageSync('storeid'),
						commodistart: this.tabIndex,
						pagenum: this.page
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						console.log("taiy_list")
						console.log(taiy_list)
						if (res.data.msg == 'succeed') {
							for(var i=0;i<taiy_list.list.length;i++){
								taiy_list.list[i].commodiimg = _this.http + '/' + taiy_list.list[i].commodiimg
							}
							if(this.page==1){
								this.list=taiy_list.list
							}else{
								for(var i=0;i<taiy_list.list.length;i++){
									this.list.push(taiy_list.list[i])
								}
							}
							
						} else if (res.data.msg == 'failure') {
							uni.showModal({
								title: '温馨提示',
								content: '暂无数据',
								showCancel: false
							});
						}
					}
				})
				// this.codebtnlist=[];
			},
			couent: function(comdiid) {
				uni.setStorageSync('comdiid', comdiid);
				uni.navigateTo({
					url: '../edit_dity/edit_dity'
				})
			},
			addoffer: function() {
				uni.navigateTo({
					url: '../edit_dity/edit_dity'
				})
			},
			btn_click: function(index) {
				console.log(index)
				this.codebtnlist=[];
				if(index == 0){
					for(var i=0;i<this.btnList.length;i++){
						if(i != 0 && i != 3){
							this.codebtnlist.push(this.btnList[i])
						}
					}
				}else if(index == 1){
					for(var i=0;i<this.btnList.length;i++){
						if(i != 1 && i != 3){
							this.codebtnlist.push(this.btnList[i])
						}
					}
				}else if(index == 2){
					for(var i=0;i<this.btnList.length;i++){
						this.codebtnlist.push(this.btnList[i])
					}
				}
				this.page=1;
				this.piece=0;
				this.list=[];
				this.tabIndex = index;
				this.offerlist = [];
				// 默认全选
				this.selectAllStatus = false;
				this.getofferings();
			},
			//单选
			checkedtap(index) {
				var that = this;
				// 获取到商品列表数据
				var list = this.list;
				
				var offerlist = this.offerlist;
				// 默认全选
				this.selectAllStatus = true;
				// 循环数组数据，判断----选中/未选中[selected]
				list[index].selected = !list[index].selected;
				if (list[index].selected == true) {
					this.piece = this.piece + 1
					this.offerlist.push(list[index])
				} else if (list[index].selected == false){
					this.piece = this.piece - 1
					for(var i=0;i<offerlist.length;i++)
					{
						if(offerlist[i].comdiid == list[index].comdiid){
							offerlist.splice(i,1);
						}
					}
				}
				// 如果数组数据全部为selected[true],全选
				for (var i = list.length - 1; i >= 0; i--) {
					if (!list[i].selected) {
						this.selectAllStatus = false;
						break;
					} else {
						console.log("sdaf")
					}
				}
				// 重新渲染数据
				that.list = list;
				that.offerlist = offerlist;
				that.selectAllStatus = this.selectAllStatus
			},
			//全选
			selectAll(index) {
				// 全选ICON默认选中
				let selectAllStatus = this.selectAllStatus;
				// true  -----   false
				selectAllStatus = !selectAllStatus;
				// 获取商品数据
				let list = this.list;
				// 循环遍历判断列表中的数据是否选中
				for (let i = 0; i < list.length; i++) {
					list[i].selected = selectAllStatus;
				}
				// 页面重新渲染
				if (selectAllStatus == true) {
					this.piece = list.length
					for(var i=0;i<list.length;i++){
						this.offerlist.push(list[i])
					}
				} else {
					this.piece = 0
					this.offerlist = []
				}
				this.selectAllStatus = selectAllStatus

			},
			//删除
			deletes: function(index) {
				var that = this;
				// 获取商品列表数据
				let list = this.list;
				let selectAllStatus = this.selectAllStatus;
				uni.showModal({
					title: '提示',
					content: '确认删除吗',
					success: function(res) {
						if (res.confirm) {
							if(that.list[index].selected == true){
								that.piece = that.piece - 1;
							}
							
							that.argumentlist.push(that.list[index].comdiid)
							var param = JSON.stringify(that.argumentlist);
							uni.request({
								url: that.http + '/MerchantController/putdelemerchandise.do',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									jsonsrt:param
								},
								success: res => {
									if (res.data.msg == 'succeed') {
										for(var i=0;i<list.length;i++)
										{
											if(list[i].comdiid == that.list[index].comdiid){
												list.splice(i,1);
											}
										}
									} else if (res.data.msg == 'failure') {
										uni.showModal({
											title: '温馨提示',
											content: '暂无数据',
											showCancel: false
										});
									}
								}
							})
							// 删除索引从1
							// list.splice(index, 1);
							// 页面渲染数据
							that.list = list
							that.selectAllStatus = false
							// that.piece = list.length
							that.argumentlist=[];
							console.log("that.piece")
							console.log(that.piece)
							console.log("that.list[]")
							console.log(list[index])
							console.log("sdf")
							// 如果数据为空
							if (!list.length) {
								that.hasList = false
							} else {

							}
						} else {
							console.log(res);
						}
					},
					fail: function(res) {
						console.log(res);
					}
				})
			},
			delisel(index) {
				var that = this;
				// 获取索引
				// 获取商品列表数据
				let list = this.list;
				var sk = list.length
				let selectAllStatus = this.selectAllStatus;
				uni.showModal({
					title: '提示',
					content: '确认清空购物车吗',
					success: function(res) {
						if (res.confirm) {
							var mylist = [];
							for(var i=0;i<that.offerlist.length;i++){
								that.argumentlist.push(that.offerlist[i].comdiid)
								mylist.push(that.offerlist[i].comdiid)
							}
							var param = JSON.stringify(that.argumentlist);
							uni.request({
								url: that.http + '/MerchantController/putdelemerchandise.do',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									jsonsrt:param
								},
								success: res => {
									if (res.data.msg == 'succeed') {
										for(var i=0;i<list.length;i++)
										{
											for(var j=0;j<mylist.length;j++){
												if(list[i].comdiid == mylist[j]){
													list.splice(i,1);
												}
											}
										}
									} else if (res.data.msg == 'failure') {
										uni.showModal({
											title: '温馨提示',
											content: '暂无数据',
											showCancel: false
										});
									}
								}
							})
							that.argumentlist=[];
							// 删除索引从1
							// list.splice(index, sk);
							// 页面渲染数据
							that.list = list,
							that.selectAllStatus = false
							// 如果数据为空
							if (!list.length) {
								that.hasList = false
							} else {

							}
						} else {
							console.log(res);
						}
					},
					fail: function(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style>
	@import url("commodity.css");
</style>
