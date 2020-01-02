<template>
	<view class="center">
		<view class="adver_unp">
			<view class="adver_title"><text>广告投放位置</text><text>(1天50元起)</text></view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view class="radio_pic">
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view class="radio_text">{{item.name}}</view>
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
		methods: {
			change:function (e){
				console.log(e)
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			Addimg:function(e){
				uni.chooseImage({ 
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera '], //从相册选择
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
	@import url("advertisement.css");
</style>
