<template>
	<view style="position: absolute;top: 0;bottom: 0;width: 100%;overflow: hidden;">
		<view v-show="map_true">
			<view class="map_box">
				<map :latitude="latitude" :longitude="longitude" @callouttap="location()"></map>
			</view>
			<view class="chant_lilst" @tap="btn_list">点击查看商家列表</view>
			<cover-view class="search" @tap="btn_list">
				<cover-view>搜索商家丶分类丶找路线</cover-view>
				<cover-view>搜索</cover-view>
			</cover-view>
		</view>
		<view v-show="list_true" class="search_box">
			<view class="search_input">
				<image src="../../static/images/icon13.png" @tap="btn_searsh"></image>
				<input type="text" placeholder="搜索商家丶分类丶找路线" />
				<view>搜索</view>
			</view>
			<view class="post_new">
				<view class="new_le">
					<view>某某某酒店</view>
					<view>某某某地址</view>
				</view>
				<view class="new_ri">
					<image src="../../static/images/icon38.png"></image>
					<view>到这去</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map_true:true,
				list_true: false,
				latitude: 34.780254,
				longitude: 113.699559,
			}
		},
		methods: {
			btn_list(){
				this.map_true = false
				this.list_true = true
			},
			btn_searsh(){
				this.map_true = true
				this.list_true = false
			}
		}
	}
</script>

<style>
	@import url("radar.css");
</style>
