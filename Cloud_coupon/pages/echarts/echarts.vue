<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 0;height: auto;overflow: scroll;background: #f0f0f0;">
		<view class="time_box">
			<input type="text" placeholder="初始时间" disabled="disable">
			<input type="text" placeholder="结束时间" disabled="disable">
			<view>数据查询</view>
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
		<view class="data_list">
			<view class="years">10月18</view>
			<view class="list_el">
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
			</view>
		</view>
		<view class="data_list">
			<view class="years">10月18</view>
			<view class="list_el">
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
			</view>
		</view>
		<view class="data_list">
			<view class="years">10月18</view>
			<view class="list_el">
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
			</view>
		</view>
		<view class="data_list">
			<view class="years">10月18</view>
			<view class="list_el">
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
				<view>发券量<text>:</text><text>3</text></view>
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
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				Interactive: '', //交互显示的数据
				LineA: {
					categories: ['10月18', '10月19', '10月20', '10月21', '10月22', '10月23','10月18', '10月19', '10月20', '10月21', '10月22', '10月23'],
					series: [{
						name: '发券量',
						data: [5, 2, 5, 7, 4, 2, 5, 2, 5, 7, 4, 2]
					}, {
						name: '领券量',
						data: [7, 4, 6, 10, 4, 6, 7, 4, 6, 10, 4, 6, ]
					}, {
						name: '已领券',
						data: [10, 8, 5, 5, 2, 1, 7, 4, 6, 10, 4, 6, ]
					}, {
						name: '已使用',
						data: [6, 3, 8, 2, 3, 11, 7, 4, 6, 10, 4, 6, ]
					}]
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
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {
				let LineA = this.LineA;
				LineA.categories = this.LineA.categories;
				LineA.series = this.LineA.series;
				_self.textarea = JSON.stringify(this.LineA);
				_self.showLineA("canvasLineA", LineA);
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// 		console.log(res)
				// 		let LineA={categories:[],series:[]};
				// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// 		LineA.categories=res.data.data.LineA.categories;
				// 		LineA.series=res.data.data.LineA.series;

				// 		//第二根线为虚线的设置
				// 		// LineA.series[1].lineType='dash';
				// 		// LineA.series[1].dashLength=10;
				// 		_self.textarea = JSON.stringify(res.data.data.LineA);
				// 		_self.showLineA("canvasLineA",LineA);
				// 	},
				// 	fail: () => {
				// 		_self.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
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
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'left', //滚动条初始位置
						scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
						scrollColor: '#DEE7F7', //默认为 #A6A6A6
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
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
