<template>
	<view>
			<!-- <uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="修改地址" color='white' fixed="true" status-bar="true" ></uni-nav-bar> -->
		<view class="container">
		  <view class="address-management">修改收货地址</view>
		  <view class="address-card">
		    <view class="address-flex">
		      <view class="left-label">收货人</view>
		      <input
		        class="uni-input"
		        placeholder-class="cl"
		        placeholder="请填写收货人姓名"
		        v-model="addressData.name"
		      />
		    </view>
		    <view class="address-flex">
		      <view class="left-label">手机号码</view>
		      <input
		        class="uni-input"
		        placeholder-class="cl"
		        placeholder="请填写收货人手机号"
		        v-model="addressData.phone"
		      />
		    </view>
		    <view class="address-flex">
		      <view class="left-label">所在地区</view>
		      <pick-regions @getRegion="handleGetRegion">
		        <input
		          disabled="true"
		          class="uni-input"
		          placeholder-class="cl"
		          placeholder="省市县,街道,乡镇"
		          v-model="regionName"
		        />
		      </pick-regions>
		    </view>
		    <view class="address-flex">
		      <view class="left-label">详细地址</view>
		      <input
		        class="uni-input"
		        placeholder-class="cl"
		        placeholder="街道,楼牌号"
		        v-model="addressData.detail"
		      />
		    </view>
		  </view>
		  <view class="address-management">标签设置</view>
		  <view class="address-card">
		    <text
		      class="order-small-card"
		      v-for="(item,index) in cardlabel"
		      :class="index == activeIndex ? 'active' : '' "
		      @click="changelabel(index,item)"
		    >{{item}}</text>
		  </view>
		  <view class="address-card" style="margin-top:30rpx">
		    <view>
		      设置默认地址
		      <switch
		        @change="switchChange"
		        color="#e51c23"
		        :value="addressData.isdefault"
		        :checked="addressData.isdefault"
		        style="float:right;transform:scale(0.7)"
		      />
		    </view>
		    <view class="address-area">设置后每次下单使用改地址</view>
		  </view>
		  <view class="address-add">
		    <text class="add-adress-btn" @click="addAddress">下一步</text>
		  </view>
		</view>
	</view>
 
</template>

<script>
import pickRegions from '@/components/pick-regions/pick-regions.vue'
import { checkMobile } from '../../static/utils/until'
import { GetUrlParam } from '../../static/utils/until' //获取url参数
export default {
  components: { pickRegions },
  data() {
    return {
      cardlabel: ['家', '公司', '学校'],
      activeIndex: null,
      region: [],
      addressData: {
        name: null,
        phone: null,
        province: null,
        city: null,
        area: null,
        road: null,
        detail: null,
        postcode: null,
        label: null,
        isdefault: false
      },
      isEdit: false
      // regionName:""
    }
  },
  created() {
    console.log(GetUrlParam('type'))
    if (GetUrlParam('type') == 'edit') {
      this.getAddressArea()
    }
  },
  onload() {},
  computed: {
    regionName: {
      // 转为字符串
      get() {
        return this.region.map(item => item.name).join(' ')
      },
      set(newval) {
       
      }
    }
  },
  methods: {
    changelabel(index, item) {
      this.activeIndex = index
      this.addressData.label = item
    },
    // 获取选择的地区
    handleGetRegion(region) {
      this.region = JSON.parse(JSON.stringify(region))
      this.addressData.province = this.region[0].name
      this.addressData.city = this.region[1].name
      this.addressData.area = this.region[2].name
    },
    // 添加收货地址
    addAddress() {
      if (!checkMobile(this.addressData.phone)) {
        uni.showToast({
          title: '请输入正确的11位手机号',
          icon: 'none'
        })
        return
      }
      this.$http({
        path: this.$o2oApi + '/malls/address',
        data: { param: JSON.stringify(this.addressData) },
        type: 'formData',
        method: 'put'
      }).then(res => {
        uni.showToast({
          title: '修改成功',
          icon: 'none'
        })
        setTimeout(() => {
          uni.navigateTo({
          url: '../../pages/address/address'
        })
        }, 500);
      })
    },
    switchChange: function(e) {
      // console.log('switch2 发生 change 事件，携带值为', e.target.value)
      if (e.target.value) {
        this.addressData.isdefault = true
      } else {
        this.addressData.isdefault = false
      }
    },
    // 获取地址回显
    getAddressArea() {
      const value = uni.getStorageSync('addressDataInfo')
      this.addressData = value
      // console.log(value)
      this.region = [
        { name: value.province },
        { name: value.city },
        { name: value.area }
      ]
      this.cardlabel.map((item, index) => {
        if (item == value.label) {
          //console.log(index)
          this.activeIndex = index
          return
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  font-size: 30rpx;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: #f7f7f7;
  height: calc(100vh - 88rpx);
  overflow-x: hidden;
}
.address-management {
  background: #eeeaea;
  color: #999999;
  height: 60rpx;
  line-height: 60rpx;
  padding-left: 30rpx;
  padding-top: 10rpx;
  font-size: 13px;
}
.address-card {
  width: 95%;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 26rpx;
  padding: 20rpx 30rpx;
}
.order-small-card {
  display: inline-block;
  background: #fff;
  color: #333333;
  border: 1px solid #999999;
  padding: 5rpx 10rpx;
  transform: scale(0.7);
  border-radius: 26rpx;
  margin-left: 20rpx;
  width: 100rpx;
  text-align: center;
}
.active {
  background: #e51c23;
  color: #fff;
  border: none;
}
.address-phone {
  font-size: 14px;
  color: #999999;
  margin-left: 40rpx;
}
.address-small {
  font-size: 12px;
  margin-top: 28rpx;
}
.addres-edit {
  margin-top: 28rpx;
  display: flex;
  text-align: justify;
  justify-content: space-between;
}
.rigth-edit {
  display: flex;
}
.address-add {
  width: 100%;
  margin-top: 60rpx;
}
.add-adress-btn {
  width: 90%;
  display: block;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 36rpx;
  margin: 0 auto;
  background: #e51c23;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  letter-spacing: 1px;
}
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
}
.left-label {
  width: 130rpx;
}
.address-area {
  color: #999999;
  font-size: 12px;
  margin-top: 20rpx;
}
</style>
