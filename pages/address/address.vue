<template>
	<view >
		<!-- <uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="收货地址" color='white' fixed="true" status-bar="true" ></uni-nav-bar> -->
		<view class="container">
		  <view class="address-management">收货地址管理</view>
		  <view class="address-card" v-for="(item,index) in addressData" :key="index" @click="changeAddress(item._id)">
		    <view>
		      <text>{{item.name}}</text>
		      <text class="address-phone">{{item.phone}}</text>
		      <text class="order-small-card">{{item.label}}</text>
		    </view>
		    <view class="address-small">{{item.province}}{{item.city}}{{item.area}}{{item.road}}</view>
		    <view class="addres-edit">
		      <view>
		        <label  @click.stop="defaultChage(index)">
		          <checkbox
		            style="transform:scale(0.7)"
		            :checked="item.isdefault"
		            color="#e51c23"
		          />默认地址
		        </label>
		      </view>
		      <view class="rigth-edit">
		        <view class="right-img" @click.stop="editAddress(index)">
		          <image
		            src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/icon_address_edit.png"
		            
		          />
		          <text class="area-font">编辑</text>
		        </view>
		        <view class="right-img" @click.stop="deleteAddress(item._id)">
		          <image
		            src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/icon_address_delete.png"
		            
		          />
		          <text class="area-font">删除</text>
		        </view>
		      </view>
		    </view>
		  </view>
		  <view class="address-add">
		    <text class="add-adress-btn" @click="addnewress">添加新地址</text>
		  </view>
		</view>
	</view>
 
</template>

<script>
export default {
  data() {
    return {
      addressData: [] //地址信息
    }
  },
  created() {
    this.getallArea()
  },
  onload() {
    this.getallArea()
  },
  methods: {
    addnewress() {
      uni.navigateTo({
        url: '../../pages/address/adressadd?type=add'
      })
    },
    // 地址
    editAddress(index) {
      uni.setStorageSync('addressDataInfo', this.addressData[index])
      uni.navigateTo({
        url: '../../pages/address/adressedit?type=edit'
      })
    },
    // 删除地址
    deleteAddress(id) {
      this.$http({
        path: this.$o2oApi + '/malls/address/'+id,
        data: {
        },
        method: 'delete'
      }).then(res => {
        //console.log(res)
        setTimeout(function() {
            uni.showToast({
          title: '删除成功',
          icon: 'none'
        })
        }, 1000);
        this.getallArea()
      })
    },
    // 获取所有收货地址
    getallArea() {
      this.$http({
        path: this.$o2oApi + '/malls/address',
        data: {
          type: 'all'
        }
      }).then(res => {
        //console.log(res.data.data)
        this.addressData = res.data.data
        //  alert('订单已生成')
      })
    },
    // 修改默认地址
    defaultChage(e) {
      this.addressData.map((item, index) => {
        if (e == index) {
          item.isdefault = true
        } else {
          item.isdefault = false
        }
      })
      this.$http({
        path: this.$o2oApi + '/malls/address',
        data: {
          param: JSON.stringify({
          _id: this.addressData[e]._id,
          name: this.addressData[e].name,
          phone: this.addressData[e].phone,
          province: this.addressData[e].province,
          city: this.addressData[e].city,
          area: this.addressData[e].area,
          road: this.addressData[e].road,
          label: this.addressData[e].label,
          detail: this.addressData[e].detail,
          postcode: this.addressData[e].postcode,
          isdefault: true
          })
        },
        type: 'formData',
        method: 'PUT'
      }).then(res => {
        // console.log(res.data.data)
        // this.addressData = res.data.data
        uni.showToast({
          title: '修改成功',
          icon: 'none'
        })
        //  alert('订单已生成')
      })
    },
    // 点击修改订单收货地址
    changeAddress(id){
        this.addressData.map((item,index) =>{
          if(item._id == id){
             uni.setStorageSync('addressChange', item)
             uni.setStorageSync('addressLabel', true)
            uni.navigateTo({
                url: '../../pages/order/index'
            })
          }else{

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
.area-font {
  font-size: 14px;
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
  background: #e51c23;
  color: #fff;
  padding: 5rpx 10rpx;
  transform: scale(0.7);
  border-radius: 26rpx;
  margin-left: 20rpx;
  width: 90rpx;
  text-align: center;
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
  position: fixed;
  bottom: 50rpx;
  width: 100%;
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
.right-img {
  image {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
    margin: 0 20rpx;
  }
}
</style>
