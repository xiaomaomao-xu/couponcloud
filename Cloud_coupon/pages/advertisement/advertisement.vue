<template>
	<view class="center">
		<view class="adver_unp">
			<view class="adver_title"><text>广告投放位置</text><text>(1天50元起)</text></view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.adsiid">
						<view class="radio_pic">
							<radio :value="item.adsiid" :checked="index === current" />
						</view>
						<view class="radio_text">{{item.advertname}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="adver_unp">
			<view class="adver_title"><text>选择上传图片</text><text>(1张)</text></view>
			<view class="datails_sub" v-for="(item,index) in addpic" :key="index" v-if="Imglist">
				<image :src="item" @longpress="deleteImage(index)"  data-index='index'></image>
			</view>
			<view class="datails_sub" @tap="Addimg" v-if="Piclist">
				<image src="../../static/images/icon26.png"></image>
			</view>
		</view>
		<view class="adver_unp">
			<view class="adver_title"><text>广告投放天数</text><text>(1天1元)</text></view>
			<view class="calendar">
				<uni-calendar  :showMonth="true" @change="change"  :date="info.date" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate" :range="info.range"/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				info: {
					date: '',
					startDate: '',
					endDate: '',
					lunar: true,
					range: true,
				},
				Piclist:true,
				Imglist:true,
				addpic:[],
				items: [{
						value: '首页广告',
						name: '首页广告'
					},
					{
						value: '秒杀广告',
						name: '秒杀广告',
						checked: 'true'
					},
					{
						value: '拼团广告',
						name: '拼团广告'
					},
					{
						value: '中部广告',
						name: '中部广告'
					},
					{
						value: '发现广告',
						name: '发现广告'
					},
					{
						value: '电影广告',
						name: '电影广告'
					},
				],
				current: 0
			}
		},
		onLoad() {
			this.getadvertisement();
		},
		methods: {
			getadvertisement(){
				console.log("wojinlailyayayayaya")
				let _this = this;
				uni.request({
					url: _this.http + '/AdverrecordController/getmyadverrecorder.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						// storeid: uni.getStorageSync('storeid'),
						// commodistart: this.tabIndex,
						// pagenum: this.page
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						console.log("mymymyres")
						console.log(taiy_list)
						if (res.data.msg == 'succeed') {
							this.items = taiy_list;
							console.log("this.items")
							console.log(this.items)
							// if(this.page==1){
							// 	this.list=taiy_list.list
							// }else{
							// 	for(var i=0;i<taiy_list.list.length;i++){
							// 		this.list.push(taiy_list.list[i])
							// 	}
							// }
							// console.log("getlist")
							// console.log(this.list)
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
			change:function (e){
				console.log(e)
			},
			radioChange: function(evt) {
				
				console.log("evt")
				console.log(evt)
				
				
				console.log("radioChange")
				for (let i = 0; i < this.items.length; i++) {
					// console.log("this.items[i].value")
					// console.log(this.items[i].adsiid)
					// console.log("evt.target.value")
					// console.log(evt.target.value)
					if (this.items[i].adsiid == evt.target.value) {
						console.log("this.items[i].value111")
						console.log(this.items[i].adsiid)
						console.log("evt.target.value222")
						console.log(evt.target.value)
						this.current = i;
						break;
					}
				}
			},
			Addimg:function(e){
				uni.chooseImage({ 
				    // count: 1, //默认9
				    // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    // sourceType: ['album','camera '], //从相册选择
				  //   success:(res)=>{  
						// var tempFilePaths = res.tempFilePaths
						// this.addpic = this.addpic.concat(tempFilePaths)
						// if(this.addpic.length == 3){
						// 	this.Piclist = !this.Piclist
						// }
				  //   }
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.addpic = this.addpic.concat(tempFilePaths)
						console.log("this.addpic")
						console.log(this.addpic)
						
						console.log("this.ad2454545dpic")
						console.log(tempFilePaths[0] )
						
						this.changeimg = tempFilePaths[0]
						uni.uploadFile({
							url: _this.http + 'pload/pictureUpLoad.do', 
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								this.uploadimg = _this.http + res.data
								this.storeinfo.obligatestrone = res.data
								console.log("this.uploadimg")
								console.log(this.uploadimg)
							}
						});
						
						if(this.addpic.length == 3){
							this.Piclist = !this.Piclist
						}
						// this.changeimg = tempFilePaths[0] 
						// uni.uploadFile({
						// 	url: _this.http + 'pload/pictureUpLoad.do', 
						// 	filePath: tempFilePaths[0],
						// 	name: 'file',
						// 	success: (res) => {
						// 		this.uploadimg = _this.http + res.data
						// 		this.storeinfo.obligatestrone = res.data
						// 		console.log("this.uploadimg")
						// 		console.log(this.uploadimg)
						// 	}
						// });
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
	@import url("advertisement.css");
</style>
