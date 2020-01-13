<template>
	<view style="position: absolute;top: 0;bottom: 0;left: 0;width: 100%;background: #f0f0f0;overflow: scroll;">
		<view class="lssui_box">
			<view class="lssui_list" @tap="open_list">
				<view>券的类型:</view>
				<image src="../../static/images/icon28.png"></image>
				<input type="text" :placeholder="value" v-model="value_el">
			</view>
			<view class="list_oust" v-if="show">
				<view v-for="(item,index) in text_box" :class="{active:currentIndex===index}" :key="index" @tap="changeIndex(index)">{{item.name}}</view>
			</view>
			<view class="lssui_list" v-for="(item,index) in num_box" :key='index' v-if="index == currentIndex" v-show="state">
				<view>{{item.name}}:</view>
				<input :placeholder= "item.num" v-model="item.val" type="digit" v-show="input1">
				<view v-show="input2">
					<text>满:</text>
					<input  type="digit" v-model="item.val1">
					<text>减:</text>
					<input  type="digit" v-model="item.val2">
				</view>
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
			<textarea placeholder="注:(免单券/体验券/试睡券/兑换券)特殊券需要注明部分商品还是全场可用" maxlength="200" v-model="rarea_el"/>
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
				input1:true,
				input2:false,
				state:false,
				title: 'picker',
				date: '请选择发布时间',
				date1: '请选择到期时间',
				show: false,
				value: '请选择发布券的类型',
				value_el:'',
				rarea_el:'',
				currentIndex: 0,
				num_box:[{
					name:'折扣优惠',
					num:'请填写折扣',
					val:'',
				},{
					name:'代金券',
					num:'请输入代金金额',
					val:'',
				},{
					name:'免单券',
					num:'指定商品免费使用',
					val:'',
				},{
					name:'满减金额',
					num:'例:满300减30',
					val1:'',
					val2:'',
				},{
					name:'体验券',
					num:'免费使用一次服务',
					val:'',
				},{
					name:'试睡金额',
					num:'请输入试睡金额',
					val:'',
				},{
					name:'半价券',
					num:'消费价格减半',
					val:'',
				},{
					name:'兑换商品',
					num:'请填写要兑换的商品',
					val:'',
				}],
				text_box: [{
					name: '折扣券'
				}, {
					name: '代金券'
				}, {
					name: '免单券'
				}, {
					name: '满减券'
				},{
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
				if(index == 2 || index == 4 || index == 5){
					this.num_box[index].val = '0'
					this.input1 = true
					this.input2 = false
				}
				if(index == 3){
					this.input1 = false
					this.input2 = true
				}
				if(index == 0 || index == 1 || index == 6){
					this.input1 = true
					this.input2 = false
				}
				if(index == 7){
					this.num_box[index].val = '请在备注内注明可兑换的商品'
					this.input1 = true
					this.input2 = false
				}
				this.currentIndex = index;
				this.value_el = this.text_box[index].name
				this.show = !this.show
				this.state = true
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
				if(this.value_el == ''){
					uni.showModal({
					title: '温馨提示',
						content: '请选择券的类型',
						showCancel: false
					});
					return
				}
				if(this.currentIndex == 0 || this.currentIndex == 1 || this.currentIndex == 6){
					if(this.num_box[this.currentIndex].val == ''){
						uni.showModal({
							title: '温馨提示',
							content: '请将资料填写完整',
							showCancel: false
						});
						return
					}
					this.verifct()
				}
				if(this.currentIndex == 3){
					if(this.num_box[this.currentIndex].val1 == '' || this.num_box[this.currentIndex].val2 == ''){
						uni.showModal({
							title: '温馨提示',
							content: '请将资料填写完整',
							showCancel: false
						});
						return
					}
					this.verifct()
				}
				if(this.currentIndex == 2 || this.currentIndex == 4 || this.currentIndex == 5 || this.currentIndex == 7){
					if(this.num_box[this.currentIndex].val1 == '' || this.num_box[this.currentIndex].val2 == ''){
						uni.showModal({
							title: '温馨提示',
							content: '请将资料填写完整',
							showCancel: false
						});
						return
					}
					if(this.rarea_el == ''){
						uni.showModal({
							title: '温馨提示',
							content: '特殊券需要注明备注',
							showCancel: false
						});
						return
					}
					this.verifct()
				}
			},
			verifct(){
				if(this.date<this.date1){
					try {
					    uni.setStorageSync({
							value_el:this.value_el,
						});
					} catch (e) {
						
					}
					uni.navigateTo({
						url:'../preview/preview'
					})
					return
				}
				if(isNaN(Date.parse(this.date)) == true || isNaN(Date.parse(this.date1)) == true){
					uni.showModal({
						title: '时间不能为空',
						content: '请重新选择',
						showCancel: false
					});
					return
				}
				if(this.date==this.date1){
					uni.showModal({
						title: '有效时间不能低于一天',
						content: '请重新选择',
						showCancel: false
					});
					return
				}
				if(this.date>this.date1){
					uni.showModal({
						title: '到期时间不能小于发布时间',
						content: '请重新选择',
						showCancel: false
					});
					return
				}
			}
		}
	}
</script>

<style>
	@import url("Issuing.css");
</style>
