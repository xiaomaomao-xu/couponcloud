<template>
    <view class="content">
        <!-- 如果想要滑动式的滑动条,可借助 auto-tab 样式来绝对定位一个条来实现-->
        <view class="auto-tab">
            <view class="auto-navbar">
                <view v-for="item,index in navlist" :key="index" class="auto-nav-item" 
                :class="{current: tabCurrentIndex === index}" @click="tabClick(index)">
                    {{item.title}}
                </view>
            </view>
        </view>
        <swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
            <swiper-item class="tab-content" v-for="tabItem,tabIndex in navlist" :key="tabIndex">
                <scroll-view class="auto-list-scroll-content" scroll-y  @scrolltolower="loadData">
                    <slot name="scrollContent"></slot>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>
<!--
   使用方法
        <tab-max-auto 
          :navlist="navList" 
          @loadData="loadData"
          @changeTab="changeTab" 
          @tabClick="tabClick">
            <view v-show="tabCurrentIndex == 3">3
                <uni-load-more :status="loadingType"></uni-load-more>
            </view>
        </tab-max-auto>
 -->
<script>
    export default {
        "name": 'tabMaxAuto',
        props: ["navlist"],
        data(){
            return {
                tabCurrentIndex: 0
            }
        },
        methods: {
            //获取订单列表
            loadData(source){
                this.$emit("loadData")
            },
            changeTab(e){
                this.tabCurrentIndex = e.target.current;
                this.$emit("changeTab", this.tabCurrentIndex)
            },
            tabClick(index){
                this.$emit("tabClick", index)
                this.tabCurrentIndex = index;
            },
        },
        created(options){
        },
    }
</script>

<style>
/* 页面与发布 */
    page, .content{
        height: 100%;
    }
    .swiper-box{
        height: 100%;
    }
    .auto-list-scroll-content{
        height: 100%;
    }
/* tabbars */
  .auto-tab{
      width: 750upx;
      height: auto;
      box-sizing: border-box;
  }
    .auto-navbar{
        display: flex;
        height: 80upx;
        line-height: 80upx;
        padding: 0 5upx;
        background: #fff;
        box-shadow: 0 1upx 5upx rgba(0,0,0,.06);
        position: relative;
        font-size: 30upx;
        z-index: 10;
        }
        .auto-nav-item{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                color: #303133;
                position: relative;
            }
            .current{
                    color: #fa436a;
                }
                .current:after{
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    transition: all .4s;
                    -webkit-transition: all .4s;
                    width: 100upx;
                    height: 0;
                    border-bottom: 2upx solid #fa436a;
                    }
/* swiper-scroll */
    .uni-swiper-item{
        height: auto;
    }
/*  */
</style>
