<template>
  <view
    style="background:#f7f7f7"
    class="parentcontainer"
  >
    <uni-nav-bar
      left-icon="back"
      right-icon="菜单"
      fixed="true"
      @clickLeft="goBack"
      @clickRigh="goShare"
    >
      <view
        style="text-align:center;width:100%"
        v-if="scrollTopIndex > 1000"
      >图文详情</view>
      <view slot="right">
        <image
          class="good-right-img"
          src='https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/shareIcon.png'
          v-if="false"
        >
        </image>
      </view>
    </uni-nav-bar>
    <view
      class="goodsFixview"
      v-if="scrollTopIndex <= 1000"
    >
      <view
        @click="switchTab(index)"
        v-for="(item, index) in navList"
        :key="index"
        :class="(index + 1) === navTab ? 'active' : ''"
      >
        {{item}}
        <view class="goods-bottom-view"></view>
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="container">
      <uni-swiper-dot
        :info="goodsInfo.banner"
        :current="current"
        field="content"
        :dotsStyles="dotsStyles"
        :mode="mode"
      >
        <swiper
          class="goods-swiper"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          @change="change"
        >
          <swiper-item
            v-for="(item, index) in goodsInfo.banner"
            :key="index"
          >
            <view class="swiper-item uni-bg-red">
              <image
                class="good-swiper-img"
                :src='item'
              ></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
    </view>
    <!-- 商品价格卡片 -->
    <view style="position:relative;">
      <view class="goods-card">
        <view class="goods-price">
          <text class="goods-newprice">￥{{goodsData.goods.newprice}}</text>
          <text class="goods-oldprice">￥{{goodsData.goods.oldprice}}</text>
          <text class="goods-saled">已出售{{goodsData.goods.sales}}件</text>
        </view>
        <view class="goods-info">
          {{goodsData.goods.name}}
        </view>
      </view>
      <!-- 商品规格 -->
      <view
        class="goods-card goods-margin"
        @click="openType('type')"
      >
        <text class="goods-style-title">已选</text>
        <text class="goods-style"><text
            v-for="(item,index) in submitGoodsData.specList"
            :key="index"
          >{{item}}</text> </text>
        <view class="goods-more">
          <image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/more.png"></image>
        </view>
      </view>
      <!-- 收货地址 -->
      <view
        class="goods-card goods-margin"
        @click="openType('area')"
      >
        <view class="goods-area">
          <view class="goods-style-title">送至</view>
          <view class="goods-style">{{addressDatacheckd.province}},{{addressDatacheckd.city}} <view class="goods-state"><text v-if="goodsData.goods.stocks >= 1">现货</text><text v-if="goodsData.goods.stocks < 1">缺货</text></view>
          </view>
          <view class="goods-more goods-more-left">
            <image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/more.png"></image>
          </view>
        </view>
      </view>
      <!-- 运费 -->
      <view class="goods-card goods-margin">
        <text class="goods-style-title">运费</text>
        <text class="goods-style">免费包邮</text>
      </view>
      <!-- 7天无理由 -->
      <view class="goods-conditions">
        <view>
          <image
            src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/guaranteeIcon.png"
            mode=""
          />
          </image>
          <text>支持7天无理由退换货</text></view>
        <view>
          <image
            src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/guaranteeIcon.png"
            mode=""
          />
          </image><text>正品保证</text></view>
        <view>
          <image
            src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/guaranteeIcon.png"
            mode=""
          />
          </image><text>店铺发货&售后</text></view>
      </view>
      <!-- 用户评价 -->
      <view class="goods-user-evaluate goods-card goods-margin">
        <view class="goods-evaluate-num">用户评价<text>({{storesNum.cmsCount}})</text></view>
        <view class="goods-grads">
          <view>
            <view>
              <text class="goods-grads-text">综合评分</text>
              <text class="goods-grads-num">{{storesNum.star}}.0</text>
            </view>
            <view class="goods-rate">
              <uni-rate
                size="13"
                color="#e51c23"
                active-color="#e51c23"
                disabled="true"
                value="5"
              ></uni-rate>
            </view>
          </view>
          <view class="goods-praise"><text class="goods-praise-color">100%</text>好评率</view>
        </view>
        <view>
          <goods-eva
            :datas="storesNum.list"
            :bottomType="1"
          ></goods-eva>
        </view>
        <view class="goods-eva-more">
          <text
            class="goods-eva-moretext"
            v-if="storesNum.cmsCount > 0"
          >查看更多评价</text>
          <text
            class="goods-eva-moretext"
            v-if="storesNum.cmsCount == 0"
          >暂无评价</text>
        </view>
      </view>

      <!--店铺 -->
      <view class="goods-card goods-margin">
        <view class="shopInfo">
          <image
            class="userBigPhoto"
            :src="shopContent.store.showimg"
            alt=""
          ></image>
          <view>
            <view
              class="shopBuild"
              @click="goShop"
            >
              <text class="shopName">{{shopContent.store.name}}</text>
              <image
                class="rightBlack"
                :src="'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/rightArowBlack.png'"
                alt=""
              ></image>
            </view>
            <view class="shopDetail">
              <text class="allGoodsNum">全部宝贝 <text class="allGoodsNumnum">{{shopContent.store.goodsnum}}</text></text>
              <text class="allGoodsNum allGoodsNumleft">关注人数 <text class="allGoodsNumnum">{{shopContent.store.followsNum}}</text></text>
            </view>
          </view>
        </view>
        <view class="goshop">
          <view class="goshop-text">进店逛逛</view>
        </view>
      </view>
      <!-- 图文详情 -->
      <view class="upData">
        <image
          style="margin-right:15rpx"
          :src="'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/upArow.png'"
          alt=""
        ></image>
        <text>上拉查看图文详情</text>
      </view>
      <view class="tuwenxiangqing"></view>
      <goods-detail :datas="goodsData.goods.productDetailUrls"></goods-detail>
      <!-- 加入购物车 -->
      <view class="goods-addcart">
        <uni-goods-nav
          :fill="true"
          :options="options"
          @click="onClick"
          @buttonClick="buttonClick"
        />
      </view>
      <!-- 规格弹窗 -->
      <uni-popup
        ref="popupType"
        type="bottom"
      >
        <view class="goods-choose-type">
          <image
            class="goods-closeimg"
            @click="closeImg('type')"
            src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/grayX.png"
            mode=""
          />
          <view class="goods-choose">
            <view class="goods-choose-col">
              <image
                :src="goodsSpecObj.图片 || goodsInfo.banner[0]"
                mode=""
              />
              <view style="padding-top:70rpx;margin-left:30rpx">
                <text><text class="goods-small">￥</text><text v-if="goodsSpecObj.现价">{{goodsSpecObj.现价}}</text><text v-else-if="!goodsSpecObj.现价 && goodsData.goods.newprice">{{goodsData.goods.newprice}}</text></text>
                <view class="goods-kucun">库存：<text>{{goodsData.goods.stocks}}</text></view>
              </view>
            </view>
            <view
              v-for="(item, index) in goodsData.goods.specifications"
              :key="index"
            >
              <view
                class="goods-bold"
                v-for="(children,keys) in item"
                :key="keys"
              >
                {{ keys }}
              </view>
              <view
                class="good-btn"
                v-for="(children,keys) in item"
                :key="children[keys]"
              >
                <button
                  :data-info="idx"
                  class="good-btn-item"
                  :class="items === selectStocksKey[index] ? 'active' : ''"
                  v-for="(items, idx) in item[keys]"
                  :key="idx"
                  size="mini"
                  @click="selectSpec(index, keys, items)"
                ><text>{{items}}</text></button>
              </view>
            </view>
            <view class="goods-numbox">
              <view class="goods-bold"> 数量</view>
              <view class="goods-numbox-right">
                <uni-number-box
                  @change="bindChangeNumBox"
                  :value="submitGoodsData.number"
                  class="numboxwidth"
                ></uni-number-box>
              </view>
            </view>
          </view>
          <view class="goods-buynow">
            <view
              class="goods-buynow-wid"
              v-if="!isbuyNow"
            >
              <text
                class="goos-buynow-btn btnyellow"
                @click="addCart"
              >加入购物车</text>
            </view>
            <view
              class="goods-buynow-wid"
              v-if="!isbuyNow"
            >
              <text
                class="goos-buynow-btn btnred"
                @click="buyNow"
              >立即购买</text>
            </view>
            <view
              class="goos-buynow-btnsure"
              v-if="isbuyNow"
            >
              <text
                class="goos-buynow-btn btnred"
                @click="buyNow"
              >确定</text>
            </view>
          </view>
        </view>
      </uni-popup>
      <!-- 收货地址 -->
      <uni-popup
        ref="popupArea"
        type="bottom"
      >
        <view class="goods-choose-area">
          <image
            class="goods-closeimg"
            @click="closeImg('area')"
            src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/grayX.png"
            mode=""
          />
          <view class="good-title">
            配送至
          </view>
          <view
            v-for="(item,index) in addressData"
            :key="index"
          >
            <view
              class="goods-area-list"
              :class="index == addressDataindex ? 'addressactive' : ''"
              @click="changeAddress(index,item)"
            >
              <view v-if="index < 3">
                <image
                  src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/icon_goods_address.png"
                  class="img-location"
                ></image>
                <text
                  class="block-text"
                  style="margin-left:20rpx"
                >{{item.province}}{{item.city}}{{item.area}}{{item.road}}</text>
                <image
                  src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/icon_pay_select.png"
                  :class="index == addressDataindex ? 'imgshow' : ''"
                  class="img-right imghide"
                ></image>
              </view>
            </view>
            <view class="goods-buynow">
              <view class="goos-buynow-btnsure">
                <text
                  class="goos-buynow-btn btnred"
                  @click="chooseOtheraddress"
                >选择其他收货地址</text>
              </view>
            </view>
          </view>
        </view>
      </uni-popup>
      <view style="height:50px;width:100%">

      </view>
      <!-- 分割线&*&*&*&*&*&*&* -->
    </view>
  </view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue' //自定义导航
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue' //图
import uniRate from '@/components/uni-rate/uni-rate.vue' //评分
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue' //商品导航
import uniPopup from '@/components/uni-popup/uni-popup.vue' //弹窗
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue' //数字输入框
import goodsEva from './components/evaluate.vue'
import goodsDetail from './Detail.vue'
import { GetUrlParam } from '../../static/utils/until' //获取url参数
export default {
  data() {
    return {
      URLWAY: {
        urlWay: 'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img'
      },
      navTab: 1, // 1商品2详情3评价
      navList: ['商品', '详情', '评价'],
      goodsData: {
        goods: []
      }, // 商品详情
      goodsId: '5e69fb59b8d6b92026761a0b', // 商品id
      goodsDataid: {}, // id 商品id  businessid店铺id
      goodsInfo: {
        banner: []
      },
      // 选择商品规格详情
      goodsSpecObj: {
        图片: '',
        现价: ''
      },
      // 轮播图配置
      autoplay: true,
      interval: 3000,
      duration: 1000,
      current: 0,
      mode: 'round', //指示点样式
      dotsStyles: {
        bottom: 30,
        backgroundColor: '#fff',
        selectedBackgroundColor: '#e51c23',
        selectedBorder: 'none'
      },
      // 商品评价
      storesNum: {
        star: 0,
        list: []
      }, // 总评价
      shopContent: {
        store: {
          showimg:
            'http://lztimg.oss-cn-qingdao.aliyuncs.com/mall/images/20200615/dqy188.png',
          name: '指联旗舰店',
          goodsnum: '10086',
          followsNum: '12580'
        }
      }, //店铺信息
      //加入购物车导航配置
      options: [
        {
          icon:
            'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/serviceIconBlack.png',
          text: '客服'
        },
        {
          icon:
            'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/starFalse.png',
          text: '收藏'
        },
        {
          icon:
            'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/shopIconGoods.png',
          text: '店铺'
        }
      ],
      isCollection: false, //是否收藏
      goosbutton: [
        { name: '111', type: 'warn' },
        { name: '222', type: 'default' },
        { name: '333', type: 'default' }
      ], //规格
      goosbuttonIndex: 0, //规格选择
      scrollTopIndex: 1,
      isbuyNow: false, //是否立即购买
      submitGoodsData: {
        specList: [],
        number: 1,
        id: '',
        goodsShopName: ''
      }, //提交订单商品信息
      // 选择规格列表
      selectStocksList: [],
      // 选中的标签
      selectStocksKey: [],
      businessid: '',
      addressData: [], //地址信息
      addressDatacheckd: {}, //选中的地址信息
      addressDataindex: 0 //选中的地址信息
    }
  },
  components: {
    uniNavBar,
    uniSwiperDot,
    uniRate,
    goodsEva,
    uniGoodsNav,
    uniPopup,
    uniNumberBox,
    goodsDetail
  },
  onPageScroll(res) {
    this.scrollTopIndex = res.scrollTop
    //console.log(res.scrollTop);//距离页面顶部距离
  },
  watch: {
    goodsId(newVal) {
      this.goodsId = newVal
    }
  },
  created() {
    this.goodsId = GetUrlParam('goodsId')
  },
  onLoad() {
    this.goodsId = GetUrlParam('goodsId')
    this.getGoodsInfo()
    this.getEvaluate()
    this.getallArea()
  },
  computed: {},
  computed: {},
  methods: {
    // 获取所有收货地址
    getallArea() {
      let token = uni.getStorageSync('auth-token')
      if (token) {
        this.$http({
          path: this.$o2oApi + '/malls/address',
          data: {
            type: 'all'
          }
        }).then(res => {
          //console.log(res.data.data)
          this.addressData = res.data.data
          this.addressDatacheckd = this.addressData[0]
        })
      }
    },
    // 修改收货地址
    changeAddress(index, item) {
      this.addressDataindex = index
      this.addressDatacheckd = item
    },
    chooseOtheraddress() {
      uni.navigateTo({
        url: '../../pages/address/address'
      })
    },
    //获取商品详情信息
    getGoodsInfo() {
      this.$http({
        path: this.$o2oApi + '/malls/goods',
        data: {
          _id: this.goodsId
        }
      }).then(res => {
        // console.log(res)
        // 商品详情
        this.goodsData = res.data.data[0]
        // console.log(this.goodsData)
        // console.log(this.goodsData)
        this.businessid = res.data.data[0].store._id
        uni.setStorageSync('businessid', this.businessid)
        // 商品轮播图
        if (res.data.data[0].goods.urls) {
          this.goodsInfo.banner = res.data.data[0].goods.urls
        } else {
          this.goodsInfo.banner.push(res.data.data[0].goods.url)
        }
        // 获取店铺信息
        this.$http({
          path: this.$o2oApi + '/malls/stores',
          data: {
            _id: res.data.data[0].store._id
          }
        }).then(result => {
          //console.log(result.data.data)
          this.shopContent = res.data.data[0]
          uni.setStorageSync('shopContent', this.shopContent)
          //console.log(this.shopContent)
        })
        //uni.setStorageSync('blankNum', this.cardNum)
      })
    },
    //获取店铺商品总评价
    getEvaluate() {
      this.$http({
        path: this.$o2oApi + '/malls/goods/commentsInfo',
        data: {
          _id: this.goodsId,
          createtime: 0,
          type: 0
        }
      }).then(res => {
        // console.log(res.data)
        this.storesNum = res.data.data
        console.log(this.storesNum)
      })
    },
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    // 去分享
    goShare() {},
    // 点击切换
    switchTab(index) {
      if (index + 1 === 3) {
      }
      if (index + 1 === 2) {
        uni
          .createSelectorQuery()
          .select('.parentcontainer')
          .boundingClientRect(data => {
            //目标节点
            uni
              .createSelectorQuery()
              .select('.tuwenxiangqing')
              .boundingClientRect(res => {
                //最外层盒子节点
                uni.pageScrollTo({
                  duration: 500, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
                  scrollTop: res.top - data.top //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
                })
              })
              .exec()
          })
          .exec()
      }
      if (index + 1 === 1) {
        this.navTab = 1
      }
    },
    change(e) {
      this.current = e.detail.current
    },
    // 购物车按钮组
    onClick(e) {
      if (e.index == 1 && this.isCollection == false) {
        this.options[1].icon =
          'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/starTrue.png'
        this.isCollection = true
        uni.showToast({
          title: '收藏成功',
          icon: 'none'
        })
      } else if (e.index == 1) {
        this.options[1].icon =
          'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/starFalse.png'
        this.isCollection = false
      }
    },
    buttonClick(e) {
      if (e.index == 0) {
        uni.showToast({
          title: '加入购物车成功',
          icon: 'none'
        })
      } else {
        // // 阻止订单提交
        // return false
        if (this.goosbutton.length > 1) {
          this.isbuyNow = true
          this.$refs.popupType.open()
        }
      }
    },
    // 已选商品规格
    openType(type) {
      this.isbuyNow = false
      if (type == 'type') {
        this.$refs.popupType.open()
      } else {
        this.$refs.popupArea.open()
      }
    },
    //关闭弹窗
    closeImg(type) {
      if (type == 'type') {
        this.$refs.popupType.close()
      } else {
        this.$refs.popupArea.close()
      }
    },
    // 按钮
    ggBtnclick(e, index) {
      this.goosbuttonIndex = index
      // console.log(e)
    },
    // 选择规格
    selectSpec(index, key, item) {
      console.log(this.goodsData.goods.specifications)
      console.log(key)
      this.goosbuttonIndex = index
      this.selectStocksList.splice(index, 1, { keys: key, items: item })
      this.selectStocksKey.splice(index, 1, item)
      if (
        this.goodsData.goods.specifications.length ===
        this.selectStocksList.length
      ) {
        let selData = {}
        for (let j = 0; j < this.selectStocksList.length; j++) {
          selData[this.selectStocksList[j].keys] = this.selectStocksList[
            j
          ].items
        }
        this.goodsData.goods.stockslist.map(stockslistItem => {
          let itemSpec = this.contrastObj(stockslistItem, selData)
          if (this.isObjectValueEqual(itemSpec, selData)) {
            let array = ''
            let arrayR = []
            for (let i = 0; i < this.selectStocksList.length; i++) {
              let specification = this.selectStocksList[i].keys + ':' + item
              array += specification
              arrayR.push(specification)
            }
            this.submitGoodsData.specList = array
            this.submitGoodsData.specListR = arrayR
            this.goodsSpecObj = stockslistItem
          }
        })
      }
    },
    // 使返回规格列表字段，和用户点击字段相等，用于对比
    contrastObj(obj1, obj2) {
      let obj2Keys = Object.keys(obj2)
      let assObj1 = {}
      for (let k = 0; k < obj2Keys.length; k++) {
        assObj1[obj2Keys[k]] = obj1[obj2Keys[k]]
      }
      return assObj1
    },
    // 判断两对象是否相等
    isObjectValueEqual(a, b) {
      let aProps = Object.getOwnPropertyNames(a)
      let bProps = Object.getOwnPropertyNames(b)
      if (aProps.length !== bProps.length) {
        return false
      }
      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i]
        var propA = a[propName]
        var propB = b[propName]
        if (propA !== propB) {
          return false
        }
      }
      return true
    },
    // 购物车数量
    bindChangeNumBox(val) {
      if (this.submitGoodsData.specList.length <= 0) {
        uni.showToast({
          title: '请选择商品规格',
          icon: 'none'
        })
        return
      }
      this.submitGoodsData.number = val
    },
    // 加入购物
    addCart() {
      uni.showToast({
        title: '加入购物车成功',
        icon: 'none'
      })
    },
    //立即购买 确定规格购买
    buyNow() {
      if (this.submitGoodsData.specList.length <= 0) {
        uni.showToast({
          title: '请选择商品规格',
          icon: 'none'
        })
        return
      }
      // // 阻止提交
      // return
      this.$http({
        path: this.$o2oApi + '/malls/order',
        data: {
          param: JSON.stringify([
            {
              _id: '5e69fb59b8d6b92026761a0b',
              num: this.submitGoodsData.number,
              goodstype: this.submitGoodsData.specList,
              ptType: '',
              sharingUserId: ''
            }
          ])
        },
        type: 'formData',
        method: 'POST'
      }).then(res => {
        // console.log(res)
        uni.setStorageSync('orderInfo', res.data.data)
        uni.navigateTo({
          url:
            '../../pages/order/index?id=5e69fb59b8d6b92026761a0b' +
            this.goodsId +
            '&buynum=' +
            this.submitGoodsData.number +
            ''
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/** 公共样式*/
.goods-small {
  font-size: 12px;
  display: inline-block;
  transform: scale(0.8);
}
.goods-bold {
  font-weight: bold;
  font-size: 28rpx;
  margin-top: 40rpx;
}
view {
  font-size: 30rpx;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.numboxwidth {
  width: 150rpx;
  margin-top: 20rpx;
}
.btnyellow {
  background: #f5a53d;
  color: #fff;
}
.btnred {
  background: #e51c23;
  color: #fff;
}
.good-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-top: 30rpx;
}
.img-location {
  width: 18rpx;
  height: 22rpx;
  vertical-align: middle;
}
.img-right {
  width: 30rpx;
  height: 30rpx;
  margin-left: auto;
  vertical-align: middle;
}
/**公共样式结束 */
.container {
  padding: 0px;
  font-size: 14px;
  line-height: 24px;
}
/* 导航样式 */
.good-right-img {
  width: 32rpx;
  height: 32rpx;
}
.goodsFixview {
  position: fixed;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999999;
  width: 390rpx;
  opacity: 1;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.goodsFixview > view {
  width: 130rpx;
  text-align: center;
  font-size: 16px;
  font-family: PingFang-SC-Bold;
}
.active {
  font-weight: bold;
}
.goodsFixview .goods-bottom-view {
  width: 26rpx;
  height: 6rpx;
  border-radius: 3rpx;
  margin: 0 auto;
}
.active .goods-bottom-view {
  background: #e51c23;
}
/* 轮播图 */
.goods-swiper {
  height: 800rpx;
  // z-index: 1;
}
.swiper-item.uni-bg-red {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.good-swiper-img {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.goods-card {
  width: 90%;
  margin: 0 auto;
  margin-top: -40rpx;
  border-radius: 16rpx;
  background: #fff;
  z-index: 999;
  padding: 18rpx;
}
/* 商品详情 */
.goods-price {
  height: 70rpx;
  line-height: 70rpx;
  .goods-newprice {
    color: #e51c23;
    font-size: 18px;
  }
  .goods-oldprice {
    color: #999999;
    font-size: 12rpx;
    margin-left: 10rpx;
    text-decoration: line-through;
  }
  .goods-saled {
    color: #999999;
    font-size: 12rpx;
    margin-left: 10rpx;
    float: right;
    clear: both;
  }
}
.goods-info {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 3rpx;
}
.goods-style-title {
  font-weight: bold;
  font-size: 30rpx;
}
.goods-margin {
  margin-top: 20rpx;
}
.goods-style {
  font-size: 25rpx;
  margin-left: 50rpx;
}
.goods-more {
  width: 32rpx;
  height: 8rpx;
  float: right;
}
.goods-more image {
  width: 32rpx;
  height: 8rpx;
}
.goods-area {
  display: flex;
}
.goods-state {
  font-size: 25rpx;
  color: #e51c23;
}
.goods-more-left {
  margin-left: auto;
}
.goods-conditions {
  width: 90%;
  margin: 0 auto;
  display: flex;
  padding: 8rpx 18rpx;
  background: #e4e4e4;
  border-radius: 9rpx;
}
.goods-conditions view {
  font-size: 24rpx;
  transform: scale(0.7);
  -ms-transform: scale(0.7);
  margin-left: 10rpx;
  image {
    width: 24rpx;
    height: 24rpx;
    vertical-align: middle;
    margin-right: 5rpx;
  }
}
/*用户评价 */
.goods-evaluate-num {
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 28rpx;
}
.goods-grads {
  margin-top: 18rpx;
  font-size: 24rpx;
  letter-spacing: 2rpx;
  display: flex;
  .goods-grads-num {
    font-size: 30rpx;
    margin-left: 8rpx;
    color: #faae02;
  }
  .goods-grads-text {
    color: #999999;
    font-size: 24rpx;
  }
  .goods-rate {
    display: flex;
    padding: 20rpx 0 20rpx;
  }
  .goods-praise {
    margin-left: 90rpx;
    color: #999999;
    font-size: 30rpx;
  }
  .goods-praise-color {
    color: #e51c23;
  }
}
.goods-eva-more {
  text-align: center;
  .goods-eva-moretext {
    display: inline-block;
    padding: 0 26rpx;
    height: 50rpx;
    line-height: 50rpx;
    font-size: 28rpx;
    border: 1px solid #e7e7e7;
    border-radius: 26rpx;
    font-weight: 400;
    margin-top: 10rpx;
  }
}
/* 店铺*/
.shopInfo {
  display: flex;
  letter-spacing: 2rpx;
  .userBigPhoto {
    width: 90rpx;
    height: 90rpx;
    margin-right: 36rpx;
    border-radius: 50%;
  }
  .shopName {
    font-weight: bold;
    font-family: PingFang SC;
  }
  .rightBlack {
    width: 9rpx;
    height: 14rpx;
    vertical-align: middle;
    margin-left: 8rpx;
  }
  .shopDetail {
    margin-top: 10rpx;
    .allGoodsNumleft {
      margin-left: 20rpx;
    }
  }
  .allGoodsNum {
    font-size: 24rpx;
    .allGoodsNumnum {
      font-size: 24rpx;
      font-weight: bold;
      letter-spacing: 1rpx;
      display: inline-block;
      transform: scale(0.9);
    }
  }
}
.goshop {
  text-align: center;
  margin-top: 30rpx;
  .goshop-text {
    display: inline-block;
    padding: 0 26rpx;
    height: 50rpx;
    line-height: 50rpx;
    font-size: 28rpx;
    border: 1px solid #e7e7e7;
    border-radius: 26rpx;
    font-weight: 400;
    margin-top: 10rpx;
  }
}
/**图文详情 */
.upData {
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
  image {
    width: 26rpx;
    height: 26rpx;
  }
}
/**加入购物车 */
.goods-addcart {
  position: fixed;
  bottom: 0;
  width: 100%;
}
/** modua 样式*/
.goods-choose-type {
  width: 100%;
  height: 70vh;
  border-radius: 20rpx 20rpx 0 0;
  background: #ffffff;
  position: relative;
  .goods-choose {
    padding: 20rpx;
    image {
      width: 150rpx;
      height: 150rpx;
    }
    .goods-numbox {
      display: flex;
      .goods-numbox-right {
        margin-left: auto;
      }
    }
  }
  .goods-choose-col {
    display: flex;
    flex: 1;
    color: #e51c23;
    position: relative;
    .goods-kucun {
      color: #999999;
      font-size: 26rpx;
    }
  }
}
.goods-closeimg {
  width: 27.2rpx;
  height: 27.2rpx;
  float: right;
  margin: 25rpx 28rpx;
}
/** 按钮组 规格*/
.good-btn {
  margin-top: 20rpx;
  .good-btn-item {
    background: #e7e7e7;
  }
  .active {
    background: #e51c23;
    color: #fff;
  }
  button {
    border-radius: 26rpx;
    height: 50rpx;
    line-height: 50rpx;
    -webkit-text-size-adjust: none;
    // font-size: 2px;
  }
  button text {
    display: inline-block;
    transform: scale(0.8);
  }
  button:not(:nth-child(1)) {
    margin-left: 30rpx;
  }
  button::after {
    border: none;
  }
}
/** 立即购买*/
.goods-buynow {
  position: absolute;
  bottom: 20rpx;
  width: 100%;
  display: flex;
  .goods-buynow-wid {
    width: 50%;
  }
  .goos-buynow-btn {
    display: block;
    width: 70%;
    margin: 0 auto;
    height: 55rpx;
    line-height: 55rpx;
    border-radius: 28rpx;
    text-align: center;
    font-size: 12px;
  }
  .goos-buynow-btnsure {
    width: 100%;
  }
}
/**收货地址 */
.goods-choose-area {
  width: 100%;
  height: 40vh;
  border-radius: 20rpx 20rpx 0 0;
  background: #ffffff;
  overflow: hidden;
  .goods-area-list {
    display: flex;
    width: 80%;
    margin: 0 auto;
    align-items: center;
    box-sizing: border-box;
    height: 56rpx;
    line-height: 56rpx;
    margin-top: 30rpx;
  }
  .addressactive {
    color: #e51c23;
  }
  .imghide {
    display: none;
  }
  .imgshow {
    display: block;
  }
}
.block-text {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>