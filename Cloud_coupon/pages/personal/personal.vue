<template>
	<view class="center">
		<view class="center_bg">
			<image src="../../static/images/bg.png"></image>
		</view>
		<view class="center_box">
			<view class="center_head">
				<image :src="userimg1" @tap="jump_on"></image>
			</view>
			<view class="center_mtion">
				<view class="center_name">{{userinfo.username}}</view>
				<view class="center_lable"><text>{{userinfo.leaveword}}</text>
					<image src="../../static/images/icon20.png"></image>
				</view>
			</view>
			<view class="center_number">
				<view class="number_list" v-for="(item,index) in unmber" :key="index" @tap="order_le(item.url)">
					<text>{{item.num}}</text>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class='myService'>
			<view class='myService_title'>我的服务</view>
			<view class='myService_center'>
				<view class="gopages"  v-for="(item,index) in urlbox" :key='index' @tap="gopages(item.url)">
					<view class="pictrue">
						<image :src="item.pic"></image>
					</view>
					<view>{{item.name}}</view>
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
				userimg1:'',
				userinfo:'',
				unmber: [{
					num: 0,
					name: '粉丝数'
				}, {
					num: 0,
					name: '点赞数'
				}, {
					num: 0,
					name: '关注',
					url:'follow'
				}, {
					num: 0,
					name: '积分'
				}],
				urlbox:[{
					name:'商家',
					pic:'../../static/images/sj.png',
					url:'link1'
				},{
					name:'我的拼团',
					pic:'../../static/images/pt.png',
					url:'link2'
				},{
					name:'我的油卡',
					pic:'../../static/images/yk.png',
					url:'link3'
				},{
					name:'我的观影',
					pic:'../../static/images/gy.png',
					url:'link4'
				},{
					name:'我的推广',
					pic:'../../static/images/tg.png',
					url:'link5'
				},{
					name:'用券记录',
					pic:'../../static/images/jl.png',
					url:'link6'
				},{
					name:'我的发布',
					pic:'../../static/images/fb.png',
					url:'link7'
				},{
					name:'我的收藏',
					pic:'../../static/images/sc.png',
					url:'link8'
				},{
					name:'我的预约',
					pic:'../../static/images/yy.png',
					url:'link9'
				},{
					name:'我的评价',
					pic:'../../static/images/pj.png',
					url:'link10'
				},{
					name:'我的钱包',
					pic:'../../static/images/qb.png',
					url:'link11'
				},{
					name:'商家入驻',
					pic:'../../static/images/sj.png',
					url:'link12'
				}]
			}
		},onTabItemTap() {
			console.log("usadhfiuo")
			this.getuserinfo();
		},
		methods: {
			getuserinfo(){
				let _this = this;
				console.log("sdf")
				uni.request({
					url: _this.http + '/PersonageController/getuserinfobyid.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						usid: 5
					},
					success: res => {
						let taiy_list = JSON.parse(res.data.data)
						if (res.data.msg == 'succeed') {
							this.userinfo=taiy_list
							this.userimg1=_this.http + '/' + this.userinfo.userimg
							for(var i=0;i<this.unmber.length;i++){
								if(this.unmber[i].name.trim() == '粉丝数'){
									this.unmber[i].num = this.userinfo.userfans
								}else if(this.unmber[i].name.trim() == '关注'){
									this.unmber[i].num = this.userinfo.userattention
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
			},order_le: function(methodsWords) {
				this[methodsWords]()
			},
			gopages: function(methodsWords) {
				this[methodsWords]()
			},
			follow:function(){
				uni.navigateTo({
					url:'../follow/follow'
				})
			},
			jump_on:function(){
				uni.navigateTo({
					url:'../edit_data/edit_data'
				})
			},
			link1:function(){
				uni.navigateTo({
					url:'../business/business'
				})
			},
			link2:function(){
				uni.navigateTo({
					url:'../myregimen/myregimen'
				})
			},
			link3:function(){
				uni.navigateTo({
					url:'../my_card/my_card'
				})
			},
			link4:function(){
				uni.navigateTo({
					url:'../myviewing/myviewing'
				})
			},
			link5:function(){
				uni.navigateTo({
					url:'../extension/extension'
				})
			},
			link6:function(){
				uni.navigateTo({
					url:'../cou_record/cou_record'
				})
			},
			link7:function(){
				uni.navigateTo({
					url:'../business/business'
				})
			},
			link8:function(){
				uni.navigateTo({
					url:'../collection/collection'
				})
			},
			link9:function(){
				uni.navigateTo({
					url:'../intment/intment'
				})
			},
			link10:function(){
				uni.navigateTo({
					url:'../myevaluate/myevaluate'
				})
			},
			link11:function(){
				uni.navigateTo({
					url:'../wallet/wallet'
				})
			},
			link12:function(){
				uni.navigateTo({
					url:'../entry/entry'
				})
			}
		}
	}
</script>

<style>
	@import url("personal.css");
</style>
