<template>
  <view class="container">
    <view class="boxs" v-for="(dataList,index) in datas" :key="index">
      <view class="user">
        <image class="userPhoto" :src="dataList.userhead"></image> 
        <text class="userName">{{dataList.username}}</text>
        <text class="userdate">{{dateFormTransform(dataList.createtime)}}</text>
      </view>
      <view class="scoreInfo" :style="bottomType == '1' ? 'border-bottom:none' : ''">
        <view class="goods-rate">
          <uni-rate size="13" color="#999999" active-color="#e51c23" disabled="true" :value="dataList.star"></uni-rate>
        </view>
        <view class="evaluate">{{dataList.content}}</view>
        <view class="scoreimageList">
          <view v-for="(item,index) in dataList.urls" :key="index">
            <image v-if="index < 3" class="scoreimage" :src="item" ></image> 
          </view>
        </view>
        <view class="evaluate-kaunshi">
            {{dataList.goodstype}}
            <image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/more.png" v-if="goodsevaluate" @click="onenModle(dataList)"></image>
        </view>
      </view>
    </view>
    <!-- 举报评论 -->
    <uni-popup ref="popup" type="bottom">
      <view class="bottom-card">
            <view class="bottom-card-top">
            <view class="card-teitle card-color">发表时间：{{dateFormTransform(popupData.createtime)}}</view>  
            <view class="card-teitle" @click="onlyShow(popupData.goodstype)">只看当前规格</view>  
            <view class="card-teitle" @click="toReport(popupData)">举报该评论</view>  

            </view>
            <view class="bottom-card-bot" @click="closequxiao">
              取消
            </view>
      </view> 
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue' //弹窗
import uniRate from '@/components/uni-rate/uni-rate.vue'
export default {
  name: 'EvaluateShopIn',
  props: ['bottomType', 'datas','goodsevaluate'],
  components: {
    uniRate
  },
  data() {
    return {
      dateTranform:[],
      popupData:{}
    }
  },
  created() {
   //this.getdateTime()
  },
  mounted() {
   // this.getdateTime()
    // console.log(this.data)
  },
  onLoad(){
    //alert(3)
   // console.log(this.data)
    
  },
  components:{
    uniPopup
  },
  methods: {
    // 转换时间戳
    dateFormTransform(datetome){
      let date = new Date(datetome);
      let  Y = date.getFullYear() + '-';
      let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let  D = date.getDate() + ' ';
      let  h = date.getHours() + ':';
      let  m = date.getMinutes() + ':';
      let  s = date.getSeconds(); 
      return Y+M+D
    },
    onenModle(item){
        this.$refs.popup.open()
        this.popupData = item
    },
    closequxiao(){
      this.$refs.popup.close()
    },
    onlyShow(goodstype){
        this.$refs.popup.close()
    },
    toReport(){
        this.$refs.popup.close()
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  font-size: 14px;
  line-height: 24px;
}
.boxs{
  margin-top: 20rpx;
  padding-left: 30rpx;
  .user{
    height: 100rpx;
    display: flex;
    image{
      width: 72rpx;
      height: 72rpx;
    }
    .userName{
        margin-left: 8rpx;
    }
    .userdate{
      margin-left: auto;
      margin-right: 20rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
    }
  }
  .scoreInfo{
    padding-left: 30rpx;
    border-bottom: 1px dashed #E7E7E7;
    .evaluate{
      margin-top: 2rpx;
      font-size:14.5px;
      font-family: 'PingFang-SC-Medium';
      font-weight: 500;
      color: #333333;
    }
    .scoreimageList{
      margin-top: 5rpx;
      display: flex;
      justify-content: left;
      align-items: center;
      margin-left: 2rpx;
      .scoreimage{
        margin-left: 10rpx;
        width: 150rpx;
        max-height: 150rpx;
      }
    }
  }
   .goods-rate{
      display: flex;
      padding:10rpx 0 10rpx ;
    }
}
.evaluate-kaunshi{
  margin-top: 10rpx;
  color: #999999;
  font-size: 12px;
  display: flex;
  align-items: center;
  image {
		width: 32rpx;
		height: 8rpx;
    margin:0 30rpx 0 auto ;
	}
}
/**举报弹窗样式 */
.bottom-card{
  width: 100%;
  background: transparent;
  text-align: center;
  .bottom-card-top{
    background: #fff;
    margin-bottom: 16rpx;
    padding: 15rpx 30rpx;
    border-radius: 13px 13px 0 0;
    .card-teitle{
      height: 80rpx;
      line-height: 80rpx;
    }
    .card-teitle:not(:nth-child(3)){
      border-bottom:1rpx solid #f7f7f7 ;
    }
    .card-color{
      color: #999999;
    }
  }
  .bottom-card-bot{
    background: #fff;
    padding: 15rpx 30rpx;
    color: #e51c23;
  }
}
</style>
