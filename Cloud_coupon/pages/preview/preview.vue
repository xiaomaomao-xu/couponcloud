<template>
	<view style="position: absolute;top: 0;bottom: 100rpx;left: 0;width: 100%;background: #f0f0f0;overflow: scroll;">
		<view class="preview_tiitle">
			<image src="../../static/images/bg.png"></image>
			<!-- <view class="list_one">
				<text>券的类型</text>
				<text>打折优惠</text>
				<text>有效时间段:2019.10.30~2019.11.11</text>
			</view> -->
		</view>
		<view class="lssui_box">
			<view class="lssui_list" @tap="open_list">
				<view>发布途径:</view>
				<image src="../../static/images/icon28.png"></image>
				<input type="text" placeholder="请选择券的发布途径" v-model="value">
			</view>
			<view class="list_oust" v-if="show">
				<view v-for="(item,index) in text_box" :class="{active:currentIndex===index}" :key="index" @tap="changeIndex(index)">{{item.name}}</view>
			</view>
			<view class="lssui_list" v-show="assemble">
				<view>开团数量:</view>
				<input type="text" placeholder="填写发券数量" v-model="num1" @blur='blur1'>
			</view>
			<view class="lssui_list" v-show="assemble" >
				<view>拼团人数:</view>
				<input type="text" placeholder="填写发券时间" v-model="number" @blur='blur'>
			</view>
			<view class="lssui_list">
				<view>发券数量:</view>
				<input type="text" placeholder="填写发券数量" v-model="num">
			</view>
			<view class="lssui_list" v-show="ass_time">
				<view>开始日期:</view>
				<view class="list_time">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="lssui_list" v-show="ass_time">
				<view>结束日期:</view>
				<view class="list_time">
					<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
						<view class="uni-input">{{date1}}</view>
					</picker>
				</view>
			</view>
			<view class="lssui_list" v-show="assemble">
				<view>团长金额:</view>
				<input type="text" placeholder="填写发券数量" v-model="mander">
			</view>
			<view class="lssui_list" v-show="assemble">
				<view>团员金额:</view>
				<input type="text" placeholder="填写发券时间" v-model="member">
			</view>
		</view>
		<view class="notice" v-show="assemble">
			<textarea placeholder="注:(免单券/体验券/试睡券/兑换券)特殊券需要注明部分商品还是全场可用" maxlength="200" v-model="rarea_el"/>
		</view>
		<view class="modol">
			<text>温馨提示:撒德哈是拉开点距离喀什觉得拉萨看就得了撒开绿灯就撒了看大家阿斯利康大家拉斯阿斯达克laws建档立卡设计大赛离开</text>
		</view>
		<view class="preview"><text>支付￥122</text><text @tap="payment">立即支付</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				assemble:false,
				ass_time:false,
				show: false,
				value: '',
				currentIndex: 0,
				text_box: [{
					name: '秒杀活动'
				}, {
					name: '拼团活动'
				},{
					name: '刮刮活动'
				},{
					name: '直接获取'
				}],
				date: '请选择开始日期',
				date1: '请选择结束日期',
				num:'',
				num1:'',
				number:'',
				mander:'',
				member:'',
				rarea_el:'',
			}
		},
		onLoad() {
			console.log(uni.getStorageSync("data"));
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
			blur(){
				this.num = parseInt(this.number * this.num1)
			},
			blur1(){
				this.num = parseInt(this.number * this.num1)
			},
			//验证
			payment(){
				if(this.value == ''){
					uni.showModal({
					title: '温馨提示',
						content: '请选择券的类型',
						showCancel: false
					});
					return
				}
				if(this.currentIndex == 2 || this.currentIndex == 3){
					if(this.num == ''){
						uni.showModal({
							title: '温馨提示',
							content: '请填写发券数量',
							showCancel: false
						});
						return
					}
					this.paymoney()
				}
				if(this.currentIndex == 0){
					if(this.num == ''){
						uni.showModal({
							title: '温馨提示',
							content: '请填写发券数量',
							showCancel: false
						});
						return
					}
					this.verifct()
					this.paymoney()
				}
				if(this.currentIndex == 1){
					if(this.num == '' || this.num1 == '' || this.number == '' || this.mander == '' || this.member == '' || this.rarea_el == ''){
						uni.showModal({
							title: '温馨提示',
							content: '拼团数据没有填写完整',
							showCancel: false
						});
						return
					}
					this.verifct()
					this.paymoney()
				}
			},
			//数据对应
			changeIndex(index) {
				this.currentIndex = index;
				this.value = this.text_box[index].name
				this.show = !this.show
				if(index == 0){
					this.assemble = false
					this.ass_time = true
				}
				if(index == 1){
					this.assemble = true
					this.ass_time = true
				}
				if(index == 2){
					this.assemble = false
					this.ass_time = false
				}
				if(index == 3){
					this.assemble = false
					this.ass_time = false
				}
			},
			//时间判断
			verifct(){
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
						title: '结束时间不能小于开始时间',
						content: '请重新选择',
						showCancel: false
					});
					return
				}
			},
			//支付
			paymoney(){
				console.log(123)
			},
			open_list: function() {
				this.show = !this.show
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
		}
	}
</script>

<style>
	@import url("preview.css");
</style>
