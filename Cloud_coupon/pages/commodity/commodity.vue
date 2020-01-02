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
			<view class="cart_list">
				<block v-for="(item,index) in list" :key="index">
					<view class="list_view">
						<view class="shop_name">
							<image src="../../static/images/icon21.png" class="radio_group" v-if="!item.selected"  @tap="checkedtap(index)"></image>
							<image src="../../static/images/icon22.png" class="radio_group" v-else @tap="checkedtap(index)"></image>
							<text>某某某商品</text>
						</view>
						<image src="../../static/images/icon23.png" class="empty" @tap='deletes'></image>
						<view class="shop_couent" @tap="couent">
							<view class="couent_pic">
								<image src="../../static/images/pg1.png"></image>
							</view>
							<view class="text_el">
								<textarea disabled="disabled" value="商品 描述 "></textarea>
								<view class="mymoney"><text>原价:998</text><text>库存:166</text></view>
								<view class="centitel"><text>￥111</text></view>
							</view>
						</view>
					</view>
				</block>
			</view>
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
					<view v-for="(item,index) in btnList" :key="index">
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
				list: [{
					selected:false
				},
				{
					selected:false
				}],
				totalPrice: 0,
				piece: 0,
				tabIndex:0,
				selectAllStatus: false,
				canClick: true,
				userBox:[{
					name:'已上架'
				},{
					name:'已下架'
				},{
					name:'仓库中'
				}],
				btnList:[{
					name:'上架',
					pic:"../../static/images/icon24.png"
				},{
					name:'下架',
					pic:"../../static/images/icon25.png"
				},{
					name:'删除',
					pic:"../../static/images/icon23.png"
				}]
			}
		},
		onLoad() {

		},
		methods: {
			couent:function(){
				uni.navigateTo({
					url:'../edit_dity/edit_dity'
				})
			},
			btn_click:function(index){
				this.tabIndex=index;
			},
			//单选
			checkedtap(index) {
			  var that = this;
			  // 获取到商品列表数据
			  var list = this.list;
			  // 默认全选
			  this.selectAllStatus = true;
			  // 循环数组数据，判断----选中/未选中[selected]
			  console.log(list)
			  console.log(list[index])
			  list[index].selected = !list[index].selected;
			  if(list[index].selected == true){
				  this.piece = this.piece + 1
			  }else{
				  this.piece = this.piece - 1
			  }
			  // 如果数组数据全部为selected[true],全选
			  for (var i = list.length - 1; i >= 0; i--) {
			    if (!list[i].selected) {
			      this.selectAllStatus = false;
			      break;
			    }else{
					
				}
			  }
			  // 重新渲染数据
			    that.list = list,
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
			  if(selectAllStatus == true){
			  		this.piece = list.length
			  }else{
			  		this.piece = 0
			  }
			  this.selectAllStatus = selectAllStatus,
			  this.list = list
			},
			//删除
			deletes: function (index) {
			  var that = this;
			  // 获取商品列表数据
			  let list = this.list;
			  console.log(list.length)
			  let selectAllStatus = this.selectAllStatus;
			  uni.showModal({
			    title: '提示',
			    content: '确认删除吗',
			    success: function (res) {
			      if (res.confirm) {
			        // 删除索引从1
			        list.splice(index, 1 );
			        // 页面渲染数据
			          that.list = list,
			          that.selectAllStatus = false
					  this.piece = list.length
			        // 如果数据为空
			        if (!list.length) {
			          that.hasList = false
			        } else {
						
			        }
			      } else {
			        console.log(res);
			      }
			    },
			    fail: function (res) {
			      console.log(res);
			    }
			  })
			},
			delisel(index){
			  var that = this;
			  // 获取索引
			  // 获取商品列表数据
			  let list = this.list;
			  var sk = list.length
			  let selectAllStatus = this.selectAllStatus;
			  uni.showModal({
			    title: '提示',
			    content: '确认清空购物车吗',
			    success: function (res) {
			      if (res.confirm) {
			        // 删除索引从1
			        list.splice(index, sk);
			        // 页面渲染数据
			          that.list = list,
			          that.selectAllStatus = false
			        // 如果数据为空
			        if(!list.length) {
			          that.hasList = false
			        } else {
						
			        }
			      } else {
			        console.log(res);
			      }
			    },
			    fail: function (res) {
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
