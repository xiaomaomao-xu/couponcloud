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
			}
		},
		methods: {
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
