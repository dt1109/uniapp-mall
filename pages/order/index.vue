<template>
	<view >
			<!-- <uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="确认订单" color='white' fixed="true" status-bar="true" ></uni-nav-bar> -->
			<view class="container">
			  <view class="order-top"></view>
			  <view class="order-card" @click="goToAddress">
			    <view>
			      <text class="order-small-card">{{defaultAddres.label}}</text>
			      <text>{{defaultAddres.province}}{{defaultAddres.city}}{{defaultAddres.area}}</text>
			    </view>
			    <view class="order-area">
			      {{defaultAddres.detail}}
			      <image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/rightArrows.png" />
			    </view>
			    <view class="order-phone">
			      <text>{{defaultAddres.name}}</text>
			      <text class="order-left">{{defaultAddres.phone}}</text>
			    </view>
			    <view class="order-add-area" v-if="!defaultAddres.name">
			      <text class="ple-add">+ 请添加收货地址</text>
			    </view>
			  </view>
        <!--推荐人手机号  -->
        <view class="order-margin-card-phone" v-if="distributionState">
            <view class="address-flex">
              <view class="left-label">推荐人账号</view>
              <input
                class="uni-input"
                placeholder-class="cl"
                placeholder="请输入推荐人手机号(非必填)"
                :disabled="phoneDisabled"
                v-model="phone"
                @input="checkRecommendedPhone"
              />
            </view>
        </view>
			  <!-- 店铺信息 -->
			  <view class="order-margin-card">
			    <view class="order-shop">
			      <image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/shopIcon.png" />
			      <text>{{shopContent.store.name}}</text>
			    </view>
			    <view class="order-shop-content">
			      <image :src="shopContent.store.showimg" />
			      <view class="order-shop-right">
			        <view class="order-small-text">{{orderInfo.goods[0].name}}</view>
			        <view style="margin-top:20rpx">
			          <text class="order-gray-text">{{orderInfo.goods[0].goodstype}}</text>
			        </view>
			        <view class="order-jusify-text">
			          <text class="order-redcolor">￥{{orderInfo.goods[0].newprice}}</text>
			          <text>X{{orderInfo.goods[0].buynum}}</text>
			        </view>
			        <view>
			          <text class="order-zhengpin">正品质量保证</text>
			        </view>
			      </view>
			    </view>
			    <view class="order-jusify-text">
			      <view>配送方式</view>
			      <view class="order-peisong">
			        <text style="margin-right:18rpx">快递运输 包邮</text>
			        <image
			          src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/rightArrows.png"
			          
			        />
			      </view>
			    </view>
			  </view>
			  <!-- 纹豆 -->
			  <view class="order-margin-card">
			    <view>
			      纹豆抵扣
			      <label class="radio">
			        <radio value="r1" disabled="true" style="transform: scale(0.5)" />当前订单不可使用纹豆
			      </label>
			    </view>
			    <view class="order-jusify-text order-lineheight">
			      <text>可获得纹豆</text>
			      <text class="order-gray">+0</text>
			    </view>
			    <view class="order-jusify-text order-lineheight">
			      <text>商品金额</text>
			      <text class="order-gray">{{orderInfo.goods[0].newprice * orderInfo.goods[0].buynum}}</text>
			    </view>
			    <view class="order-jusify-text order-lineheight">
			      <text>运费</text>
			      <text class="order-redcolor">+0</text>
			    </view>
			    <view class="order-jusify-text order-lineheight">
			      <text>优惠券</text>
			      <text class="order-redcolor">-0</text>
			    </view>
			    <view class="order-jusify-text order-lineheight">
			      <text>红包</text>
			      <text class="order-redcolor">-0.0</text>
			    </view>
			    <view class="order-jusify-text order-lineheight">
			      <text>纹豆</text>
			      <text class="order-redcolor">-0</text>
			    </view>
			  </view>
        <view class="order-margin-card" v-if="distributionState && orderInfo.payment.openName">
          <view class="remittance-title remittance-height" style="padding-top:0">
            汇款信息
          </view>
             <view class="remittance-height">
               <text>开户名称:</text><text class="remittance-margin">{{orderInfo.payment.openName}}</text>
             </view>
             <view class="remittance-height">
               <text>开户银行:</text><text class="remittance-margin">{{orderInfo.payment.openBank}}</text>
             </view>
              <view class="remittance-height">
               <text>汇款账号:</text><text class="remittance-margin">{{orderInfo.payment.account}}</text><text class="remittance-copy" @click="copy(orderInfo.payment.account)">复制</text>
             </view>
              <view class="remittance-height">
               <text>汇款备注:</text><text class="remittance-margin">{{orderInfo.payment.remark}}</text>
             </view>
             <view class="remittance-height remittancezhu">
               注：{{orderInfo.payment.note}}
             </view>
        </view>
       
			  <!-- 提交订单 -->
			  <view class="order-submit">
			    <view class="order-submit-left">
			      共
			      <text>{{orderInfo.goods[0].buynum}}</text>件,合计
			      <text class="order-small-text">￥</text>
			      <text>{{orderInfo.goods[0].newprice * orderInfo.goods[0].buynum}}</text>
			    </view>
			    <view class="order-submit-right">
			      <text class="order-submitbtn" @click="submitOrder">提交订单</text>
			    </view>
			  </view>
			</view>
	</view>
  
</template>

<script>
import { GetUrlParam ,checkMobile} from '../../static/utils/until' //获取url参数
import {handleClipboard} from '../../static/utils/until'//复制剪贴板
export default {
  data() {
    return {
      //店铺信息
      shopContent: {
        store: {
          showimg:
            'http://lztimg.oss-cn-qingdao.aliyuncs.com/mall/images/20200615/dqy188.png',
          name: '智联旗舰店',
          goodsnum: '10086',
          followsNum: '12580'
        }
      },
      // 默认收货信息
      defaultAddres: {},
      // 商品订单信息
      orderInfo: {
        payment:{
          remark:""
        }
      },
      addresschange:false,
      // 分销商品推荐人手机号
      phone:null,
      buyPhone:"13366998833",
      time:"2020-6-8",
      Ninemachinezhengshi:"5ed60cbcf794c55461a8319f",//正式
      Ninemachineceshi:"5e6b417fb8d6b92026c94ada",//测试
      distributionState:false,
      phoneDisabled:false
    }
  },
  created() {
    this.getshopInfo()
    this.getorderInfo()
    this.getchangeAddress()
    this.isNinemachineGoods()
  },
  onLoad(options) {
    this.getshopInfo()
    this.getDefaultAddres()
    if(options.sharingUserId !== 'undefined' && options.sharingUserId !== '' && options.sharingUserId !== null){
      this.distributionState = true
    this.shareGoodsPhone(options)
    }
  },
  methods: {
    // 分享分销商品
    shareGoodsPhone(params){
        this.$http({
        path: this.$o2oApi + '/malls/order/checkRecommendPhone',
        data: {
          phone: params.sharingUserId
        }
      }).then(res => {
        this.phone = res.data.data.phone
        this.phoneDisabled = true
      })
    },
    // 是否九代机分销商品
    isNinemachineGoods(){
        if(this.Ninemachineceshi == this.orderInfo.goods[0]._id){
            this.distributionState = true
        }
        // this.distributionState = true
    },
    // 校验推荐人账号
    checkRecommendedPhone(e){
      if (!checkMobile(e.target.value)) {
        uni.showToast({
          title: '请输入正确的11位手机号',
          icon: 'none'
        })
        return
      }
        this.$http({
        path: this.$o2oApi + '/malls/order/checkRecommendPhone',
        data: {
          phone: this.phone
        }
      }).then(res => {
        console.log(res)
      })
    },
    // 复制粘贴V
    copy(data){
      handleClipboard(data, event, () => {
				        uni.showToast({
				        	icon: 'none',
				        	title: '复制成功'
				        })
				      }, () => {
				        uni.showToast({
				        	icon: 'none',
				        	title: '复制失败'
				        })
				      })
    },
    submitOrder() {
      uni.showToast({
				        	icon: 'none',
				        	title: '复制失败'
				        })
      this.$http({
        path: this.$o2oApi + '/malls/order/confirm',
        data: {
          param: JSON.stringify({"addressid": this.defaultAddres._id,"payRemark":this.orderInfo.payment.remark, "recommendPhone":this.phone,"idCard": null,"item": [{"businessid": uni.getStorageSync('businessid'),"couponId": null,"expressname": null,"goods": [{"_id": this.orderInfo.goods[0]._id,"buynum": this.orderInfo.goods[0].buynum,"goodstype": this.orderInfo.goods[0].goodstype,"sharingUserId": ''}],"redPackageId": null}],"ptType": '',"teamId": '',"useLztCoin": false})
          // param:JSON.stringify({"addressid":"5a98f0640cf2756972a902fe","idCard":null,"item":[{"businessid":"5b15ed9144f4abd27c25b224","couponId":null,"expressname":null,"goods":[{"_id":"5b16024744f4abd27c26405a","buynum":1,"goodstype":"尺码:100cm,颜色:米色","sharingUserId":""}],"redPackageId":null}],"ptType":"","teamId":"","useLztCoin":false})
        },
        type: 'formData',
        method: 'POST'
      }).then(res => {
        //console.log(res)
        let orderId = res.data.data[0]._id
        uni.navigateTo({
          url: '../../pages/pay-order/pay-order?id='+orderId
        })
      })
    },
    getshopInfo() {
      const value = uni.getStorageSync('shopContent')
      this.shopContent = value
    },
    // 获取默认收货地址
    getDefaultAddres() {
      if(!uni.getStorageSync('addressLabel')){
           this.$http({
        path: this.$o2oApi + '/malls/address',
        data: {
          type: 'default'
        }
      }).then(res => {
        this.defaultAddres = res.data.data[0]
      })
      }
    },
    // 跳转收货地址
    goToAddress() {
      uni.navigateTo({
        url: '../../pages/address/address'
      })
    },
    // 获取商品规格价格缓存信息
    getorderInfo() {
      let orderInfo = uni.getStorageSync('orderInfo')
      if (orderInfo[0]) {
        this.orderInfo = Object.assign(this.orderInfo,orderInfo[0])
      } else {
        uni.showToast({
          title: '订单信息获取失败',
          icon: 'none'
        })
      }
    },
    // 获取选中的收货地址
    getchangeAddress(){
      if(uni.getStorageSync('addressLabel')){
          let addressArea = uni.getStorageSync('addressChange')
          this.defaultAddres = addressArea
          uni.setStorageSync('addressLabel', false)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  font-size: 28rpx;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: #f7f7f7;
  height: calc(100vh - 170rpx);
  overflow-x: hidden;
}
/**公共样式 */
.order-left {
  margin-left: 30rpx;
}
.order-margin {
  margin-top: 30rpx;
}
.order-small-text {
  font-size: 12px;
}
.order-gray-text {
  font-size: 12px;
  color: #999999;
}
.order-gray {
  color: #999999;
}
.order-redcolor {
  color: #e51c23;
}
.order-zhengpin {
  padding: 6rpx;
  display: inline-block;
  border: 1rpx solid #e51c23;
  border-radius: 26rpx;
  font-size: 12px;
  color: #e51c23;
  transform: scale(0.8);
}
.radio {
  margin-left: 60rpx;
}
.order-lineheight {
  line-height: 60rpx;
}
/**结束 */
.order-top {
  width: 100%;
  height: 120rpx;
  background: url(https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/bg_confirm_order.png)
    no-repeat;
  background-size: 100% 100%;
}
.order-card {
  width: 90%;
  margin: 0 auto;
  margin-top: -60rpx;
  border-radius: 16rpx;
  background: #fff;
  z-index: 999;
  padding: 30rpx 18rpx 0;
  min-height: 200rpx;
  .order-small-card {
    display: inline-block;
    background: #f5a53d;
    color: #fff;
    min-width: 60rpx;
    text-align: center;
    padding: 5rpx;
    transform: scale(0.7);
    border-radius: 12rpx;
  }
  .order-area {
    height: 70rpx;
    line-height: 70rpx;
    font-weight: bold;
    align-items: center;
    display: flex;
    image {
      width: 15rpx;
      height: 25rpx;
      margin-left: auto;
    }
  }
  .order-phone {
    height: 60rpx;
    line-height: 60rpx;
  }
}
.order-margin-card {
  width: 90%;
  margin: 0 auto;
  margin-top: 20rpx;
  border-radius: 16rpx;
  background: #fff;
  z-index: 999;
  padding: 30rpx 18rpx;
  .order-shop {
    image {
      width: 12px;
      height: 12px;
    }
    text {
      margin-left: 10rpx;
      font-weight: bold;
    }
  }
  .order-shop-content {
    margin-top: 5rpx;
    display: flex;
    .order-shop-right {
      margin-left: 10rpx;
      width: calc(100% - 120rpx);
    }
  }
  .order-shop-content image {
    width: 120rpx;
    height: 120rpx;
  }
  .order-jusify-text {
    display: flex;
    text-align: justify;
    justify-content: space-between;
    .order-peisong {
      image {
        width: 15rpx;
        height: 25rpx;
      }
    }
  }
}
.order-margin-card-phone{
  width: 90%;
  margin: 0 auto;
  margin-top: 20rpx;
  border-radius: 16rpx;
  background: #fff;
  z-index: 999;
  padding: 12rpx 18rpx;
  .address-flex {
  display: flex;
  height: 90rpx;
  line-height: 90rpx;
  .uni-input {
    height: 90rpx;
    line-height: 90rpx;
  }
  .cl {
    font-size: 13px;
  }
  .left-label {
  width: 160rpx;
  }
  }
}
.order-submit {
  width: 100%;
  height: 95rpx;
  box-sizing: border-box;
  line-height: 95rpx;
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 0 30rpx;
  display: flex;
  text-align: justify;
  justify-content: space-between;
}
.order-submit-left {
  font-size: 28rpx;
}
.order-submit-right {
  align-items: center;
}
.order-submitbtn {
  display: inline-block;
  padding: 0rpx 18rpx;
  height: 58rpx;
  line-height: 58rpx;
  box-sizing: border-box;
  background: #e51c23;
  color: #fff;
  border-radius: 32rpx;
  font-size: 29rpx;
  font-weight: bold;
}
.order-add-area {
  text-align: center;
  .ple-add {
    display: inline-block;
    width: 70%;
    height: 60rpx;
    line-height: 60rpx;
    background: #ffffff;
    border-radius: 26rpx;
    border: 2rpx solid #e51c23;
    color: #e51c23;
    margin-top: 30rpx;
  }
}
/**汇款信息style */
.remittance-height{
  padding: 18rpx 0;
}
.remittancezhu{
    font-size: 12px !important;
}
.remittance-title{
  font-weight: bold;
}
.remittance-margin{
  margin-left: 12rpx;
}
.remittance-copy{
  display: inline-block;
  padding:1rpx 15rpx;
  border: 1rpx solid #e51c23;
  float: right;
  border-radius: 26rpx;
  color: #e51c23;
  font-size: 12px;
}
</style>
