<template>
	<view class="container evaluate">
      <uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="商品评价" color='white' fixed="true" status-bar="true" ></uni-nav-bar>
      <view class="evaluate-card">
          <view  class="evaluate-card-btn">
            <text v-for="(item,index) in evaluateStatus" :key="index" class="evaluatebtn" :class="index == activeIndex ? 'active' : ''" @click="changeEvalute(index)">{{item.title}}{{item.number}}</text> 
          </view>
      </view>
      <view class="evaluate-card" style="margin-top:30rpx;">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
                @scroll="scroll">
              <goods-eva :datas="storesNum.list"
                     :bottomType="1" :goodsevaluate="true"></goods-eva>
          </scroll-view>
      </view>
      <!-- 加入购物车 -->
    <goods-add></goods-add>
	</view>
</template>

<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue' //商品导航
import goodsAdd from '../goods/goods'
import {mapMutations} from 'vuex'
import goodsEva from '../goods/components/evaluate.vue'
	export default {
		data() {
			return {
        evaluateStatus:[{title:'全部',number:10},{title:'好评',number:6},{title:'中评',number:1},{title:'差评',number:1},{title:'有图',number:1},{title:'追加',number:1}],
        activeIndex:0,
         scrollTop: 0,
          old: {
                scrollTop: 0
          },
        goodsId:"",
        sharingUserId:"",
        // 商品评价
				storesNum: {
					star: 0,
					list: []
				}, // 总评价
			}
    },
    onLoad(options){
      this.goodsId = options.goodsId
      this.sharingUserId = options.sharingUserId
      this.setGoodsId(this.goodsId)
      this.setShareId(this.sharingUserId)
      this.getEvaluate()
    },
    components:{
      uniGoodsNav,
      goodsAdd,
      goodsEva
    },
		methods: {
      ...mapMutations([
        'setGoodsId','setShareId'
        ]),
        changeEvalute(index){
            this.activeIndex = index
            let type = 0;
            switch (index) {
              case 0: 
               type = 0
                break;
              case 1: 
               type = 1
                break;
              case 2: 
               type = 2
                break;
              case 3: 
               type = 3
                break;
              default:
                break;
            }
            this.getcomments(type)
        },
        //获取店铺商品总评价
			getEvaluate() {
				this.$http({
					path: this.$o2oApi + '/malls/goods/commentsInfo',
					data:  {
						_id: this.goodsId,
						createtime: 0,
						type: 0
					}
				}).then(res => {
					this.storesNum = res.data.data
					//console.log(this.storesNum)
				})
      },
      scroll: function(e) {
           // console.log(e)
            // this.old.scrollTop = e.detail.scrollTop
      },
      // 获取好评差评中评有图
      getcomments(type){
          this.$http({
					path: this.$o2oApi + '/malls/goods/comments',
					data: {
						_id: this.goodsId,
						createtime: 0,
						type: type
					}
				}).then(res => {
					this.storesNum.list = res.data.data
					//console.log(this.storesNum)
				})
      }
		}
	}
</script>

<style lang="scss" scoped>
   .evaluate{
     background: #f7f7f7;
   }
	 .evaluate-card{
     background: #fff;
     width: 95%;
     margin:  0 auto;
     border-radius: 12rpx;
     padding: 10rpx;
     margin-top: 20rpx;
     display: flex;
   }
   .evaluatebtn{
     display: inline-block;
     padding: 3rpx 18rpx;
     font-size: 12px;
     border-radius: 26rpx;
     border: 1rpx solid #999999;
     width: 130rpx;
     margin:20rpx 0 0 40rpx;
     text-align: center;
   }
   .active{
     background: #e51c23;
     padding: 5rpx 18rpx;
     color: #fff;
     border: none;
   }
   .scroll-Y{
     height: 65vh;
   }
</style>
