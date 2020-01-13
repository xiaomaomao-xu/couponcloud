<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 0;height: auto;overflow: scroll;background: #f0f0f0;">
		<view class="time_box">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{date}}</view>
			</picker>
			<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
				<view class="uni-input">{{date1}}</view>
			</picker>
			<view @click="data_query">数据查询</view>
		</view>
		<view class="pic_title">
			<view>
				<text class="ac1"></text>
				<text>发券量</text>
			</view>
			<view>
				<text class="ac2"></text>
				<text>领券量</text>
			</view>
			<view>
				<text class="ac3"></text>
				<text>已领券</text>
			</view>
			<view>
				<text class="ac4"></text>
				<text>已使用</text>
			</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
			 :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA"
			 @touchend="touchEndLineA"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-common-mt" style="font-size:14px;text-align: center;padding: 20rpx 0;background: white;">
			图表上左右移动查看更多数据
		</view>
		<view class="data_list" v-for="(item,index) in data_box" :key='index'>
			<view class="years">{{item.time}}</view>
			<view class="list_el">
				<view>发券量<text>:</text><text>{{item.num1}}</text></view>
				<view>领劵量<text>:</text><text>{{item.num2}}</text></view>
				<view>已使用<text>:</text><text>{{item.num3}}</text></view>
				<view>已过期<text>:</text><text>{{item.num4}}</text></view>
			</view>
		</view>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaLineA = null;
	var lastMoveTime = null; //最后执行移动的时间戳
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: '初始时间',
				date1: '结束时间',
				startdate: '',
				enddate: '',
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				Interactive: '', //交互显示的数据
				data_box: [],
				LineA: {
					// categories: ['10月18', '10月19', '10月20', '10月21', '10月22', '10月23', '10月18', '10月19', '10月20', '10月21', '10月22',
					// 	'10月23'
					// ],
					categories: [],
					series: [{
						name: '发券量',
						data: []
					}, {
						name: '领券量',
						data: []
					}, {
						name: '已使用',
						data: []
					}, {
						name: '已过期',
						data: []
					}, ]
				}
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						console.log("adfasdfasdfasd")
						console.log("asdasdfasdfsad545555")
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			//当前时间
			let startdate = new Date()
			startdate.setTime(startdate.getTime());
			this.startdate = startdate
			//前五天
			let enddate = new Date()
			enddate.setTime(enddate.getTime() - 24 * 60 * 60 * 1000 * 5);
			this.enddate = enddate
			console.log(this.enddate)
			console.log(this.startdate)
			this.getcouponrecord()
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
			data_query(){
				let s1 = Date.parse(new Date(this.date1))
				let s =  Date.parse(new Date(this.date))
				let das = parseInt((s1-s)/ (1000 * 60 * 60 * 24))
				if(this.date > this.date1){
					uni.showModal({
						title: '温馨提示',
						content: '初始时间大于结束时间',
						showCancel: false
					});
				}else if(das > 5){
					uni.showModal({
						title: '温馨提示',
						content: '只展示5天数据,请重新选择',
						showCancel: false
					});
				}else{
					this.enddate = new Date(this.date)
					this.startdate = new Date(this.date1)
					this.getcouponrecord()
				}
			},
			getcouponrecord() {
				let _this = this;
				uni.request({
					url: _this.http + '/MerchantController/getstorebyidcouponlist.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						altertime: _this.enddate,
						createtime: _this.startdate,
						scrstore: uni.getStorageSync('storeid')
					},
					success: res => {
						//折线图配置
						let LineA = this.LineA;
						LineA.categories = this.LineA.categories;
						LineA.series = this.LineA.series;
						_self.textarea = JSON.stringify(this.LineA);
						_self.showLineA("canvasLineA", LineA);
						console.log(res)
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							_this.data_box.splice(0,_this.data_box.length)
							LineA.categories.splice(0,LineA.categories.length)
							LineA.series[0].data.splice(0,LineA.series[0].data.length)
							LineA.series[1].data.splice(0,LineA.series[1].data.length)
							LineA.series[2].data.splice(0,LineA.series[2].data.length)
							LineA.series[3].data.splice(0,LineA.series[3].data.length)
							for (var i = 0; i < taiy_list.length; i++) {
								let voucher_time = new Date(taiy_list[i].createtime)
								let year = voucher_time.getFullYear();
								let month = voucher_time.getMonth() + 1;
								let day = voucher_time.getDate();
								_this.data_box.push({
									time: year + '年' + month + '月' + day + '日',
									num1: taiy_list[i].scrdelivernum,
									num2: taiy_list[i].scrdrawnum,
									num3: taiy_list[i].scrusenum,
									num4: taiy_list[i].scroverduenum,
								})
								LineA.categories.push( month + '月' + day + '日')
								LineA.series[0].data.push(taiy_list[i].scrdelivernum)
								LineA.series[1].data.push(taiy_list[i].scrdrawnum)
								LineA.series[2].data.push(taiy_list[i].scrusenum)
								LineA.series[3].data.push(taiy_list[i].scroverduenum)
							}
							console.log(_this.LineA)
							console.log(LineA.categories)
							console.log(LineA.series)
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
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					colors: ['#fe6110', '#43a4f6', '#7943f6', '#ff0000'],
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: false,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,
					//网格XY轴设置
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						itemCount: 5, //x轴单屏显示数据的数量，默认为5个
						scrollShow: false, //新增是否显示滚动条，默认false
						scrollAlign: 'left', //滚动条初始位置
						scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
						scrollColor: '#DEE7F7', //默认为 #A6A6A6
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						format:(val)=>{return val.toFixed(0)}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						//线条直线虚线设置（straight/curve）
						line: {
							type: 'curve'
						}
					}
				});

			},

			touchLineA(e) {
				canvaLineA.scrollStart(e);
				lastMoveTime = Date.now();
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
				let currMoveTime = Date.now();
				let duration = currMoveTime - lastMoveTime;
				if (duration < Math.floor(1000 / 60)) return; //每秒60帧
				lastMoveTime = currMoveTime;

				let currIndex = canvaLineA.getCurrentDataIndex(e);
				if (currIndex > -1 && currIndex < canvaLineA.opts.categories.length) {
					let riqi = canvaLineA.opts.categories[currIndex];
					let leibie = canvaLineA.opts.series[0].name;
					let shuju = canvaLineA.opts.series[0].data[currIndex];
					this.Interactive = leibie + ':' + riqi + '-' + shuju + '元';
				}
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				let currIndex = canvaLineA.getCurrentDataIndex(e);
				if (currIndex > -1 && currIndex < canvaLineA.opts.categories.length) {
					let riqi = canvaLineA.opts.categories[currIndex];
					let leibie = canvaLineA.opts.series[0].name;
					let shuju = canvaLineA.opts.series[0].data[currIndex];
					this.Interactive = leibie + ':' + riqi + '-' + shuju + '元';
				}
				canvaLineA.touchLegend(e);
			},
			changeData() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../static/images/alert-warning.png'
					})
				}
			}
		}
	}
</script>

<style>
	@import url("echarts.css");

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
