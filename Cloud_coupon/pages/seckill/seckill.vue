<template>
	<view style="width: 100%;position: absolute;top: 0;left: 0;bottom: 0;height: auto;overflow: scroll;background: #f0f0f0;">
		<view class="seckil_title">
			<view v-for="(item,index) in seckilBox" :key="index" @tap="changeIndex(index)"><text :class="{active:currentIndex===index}">{{item}}</text></view>
		</view>
		<view class="seckil_center">
			<madjob v-if="show1"></madjob>
			<soon v-if="show2"></soon>
			<notice v-if="show3"></notice>
		</view>
	</view>
</template>

<script>
	import madjob from "../../components/madjob/madjob.vue"
	import soon from "../../components/soon/soon.vue"
	import notice from "../../components/notice/notice.vue"
	export default {
		components: {
			madjob,
			soon,
			notice
		},
		data() {
			return{
		      	seckilBox:['正在疯抢','限时开抢','预告'],
				currentIndex:0,
				show1: true,
				show2: false,
				show3: false,
				district:'',
				issuenumber:0,
			}
		},
		onLoad() {
			console.log( uni.getStorageSync("district"));
			this.district = uni.getStorageSync("district")
			this.getseckillinfo()
		},
		methods: {
			//正在疯抢
			getseckillinfo(){
				let _this = this;
				uni.request({
					url: _this.http + '/ActivrecordController/getdessnoseckill.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pagenum:1,
						issuenumber:_this.issuenumber,
						seckilladreess: _this.district,
						userid:1,
					},
					success: res => {
						console.log(res)
						if (res.data.msg == 'succeed') {
							let top_list = JSON.parse(res.data.data)
							console.log(top_list)
							// let all = top_list.length
							// for(let i = 0; i< all;i++){
							// 	_this.data_list.push({
							// 		pic:_this.http + '/' +top_list[i].wholesaleimg,
							// 		name:top_list[i].couponinfo.storeinfo.storename,
							// 		couponname:top_list[i].couponinfo.couponname,
							// 		num:top_list[i].whoperson +'人团',
							// 		numbox:top_list[i].wholesaleprorlenum +'人已参与',
							// 	})
							// }
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
			changeIndex(index) {
				this.currentIndex = index;
				if (index == 0) {
					this.show1 = true
					this.show2 = false
					this.show3 = false
				}
				if (index == 1) {
					this.show1 = false
					this.show2 = true
					this.show3 = false
				}
				if (index == 2) {
					this.show1 = false
					this.show2 = false
					this.show3 = true
				}
			}
		}
	}
</script>

<style>
	@import url("seckill.css");
</style>
