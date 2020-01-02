<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;width: 100%;background: #f0f0f0;overflow: scroll;">
		<view class="lssui_box">
			<view class="lssui_list" @tap="open_list">
				<view>券的类型:</view>
				<image src="../../static/images/icon28.png"></image>
				<input type="text" :value="value">
			</view>
			<view class="list_oust" v-if="show">
				<view v-for="(item,index) in text_box" :class="{active:currentIndex===index}" :key="index" @tap="changeIndex(index)">{{item.name}}</view>
			</view>
			<!-- <view class="lssui_list">
				<view>是否指定商品</view>
				<view class="switch">
					<switch checked @change="switch1Change" />
				</view>
			</view> -->
			<view class="lssui_list" v-for="(item,index) in num_box" :key='index' v-if="state?false:index == currentIndex">
				<view>{{item.name}}:</view>
				<input type="text" :value="item.num">
			</view>
			<view class="lssui_list">
				<view>发布时间:</view>
				<view class="list_time">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="lssui_list">
				<view>到期时间:</view>
				<view class="list_time">
					<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
						<view class="uni-input">{{date1}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="notice">
			<textarea placeholder="请描述使用优惠券的注意事项,有助于用户使用" maxlength="200" />
			</view>
		<view class="preview" @tap="preview">预览</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				state:false,
				title: 'picker',
				date: '请选择发布时间',
				date1: '请选择到期时间',
				show: false,
				value: '请选择发布券的类型',
				currentIndex: 0,
				num_box:[{
					name:'折扣优惠',
					num:'请填写折扣'
				},{
					name:'代金券',
					num:'请输入抵扣金额'
				},{
					name:'免单券',
					num:'免费使用活动套餐'
				},{
					name:'满减金额',
					num:'例:满300减30'
				},{
					name:'团购人数',
					num:'请填写团购人数'
				},{
					name:'体验券',
					num:'免费使用一次服务'
				},{
					name:'试睡金额',
					num:'请输入试睡金额'
				},{
					name:'半价券',
					num:'消费价格减半'
				},{
					name:'兑换商品',
					num:'请填写要兑换的商品'
				}],
				text_box: [{
					name: '折扣券'
				}, {
					name: '代金券'
				}, {
					name: '免单券'
				}, {
					name: '满减券'
				}, {
					name: '团购券'
				}, {
					name: '体验券'
				}, {
					name: '试睡券'
				}, {
					name: '半价券'
				}, {
					name: '兑换券'
				}]
			}
		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			changeIndex(index) {
				this.currentIndex = index;
				this.value = this.text_box[index].name
				this.show = !this.show
			},
			open_list: function() {
				this.show = !this.show
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindDateChange1: function(e) {
				this.date1 = e.target.value
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
			preview:function () {
				if(this.date<this.date1){
					uni.navigateTo({
						url:'../preview/preview'
					})
				}else if(isNaN(Date.parse(this.date)) == true || isNaN(Date.parse(this.date1)) == true){
					uni.showModal({
						title: '时间不能为空',
						content: '请重新选择',
						success: function (res) {
						    if (res.confirm) {
						        console.log('用户点击确定');
						    } else if (res.cancel) {
						        console.log('用户点击取消');
						    }
						}
					});
				}else if(this.date==this.date1){
					uni.showModal({
						title: '有效时间不能低于一天',
						content: '请重新选择',
						success: function (res) {
						    if (res.confirm) {
						        console.log('用户点击确定');
						    } else if (res.cancel) {
						        console.log('用户点击取消');
						    }
						}
					});
				}else{
					uni.showModal({
						title: '到期时间不能小于发布时间',
						content: '请重新选择',
						success: function (res) {
						    if (res.confirm) {
						        console.log('用户点击确定');
						    } else if (res.cancel) {
						        console.log('用户点击取消');
						    }
						}
					});
				}
			}
		}
	}
</script>

<style>
	@import url("Issuing.css");
</style>
