<template>
  <view>
    <uni-nav-bar
      left-icon="back"
      backgroundColor="#e51c23"
      title="验证手机号"
      color="white"
      fixed="true"
      status-bar="true"
    ></uni-nav-bar>
    <view class="codeBox">
      <view>验证码已发送到您的手机</view>
      <view>请输入验证码</view>
      <single-input class="codeIpt" borderStyle="btm" :length="6" v-model="authcode"></single-input>
      <view class="countDown" v-if="countNum > 0">
        <text class="reSend">{{countNum}}s</text>后重新获取
      </view>
      <view class="countDown reSend" v-else @click="reSend">重新获取</view>
    </view>
    <view class="next" @click="submit">下一步</view>
  </view>
</template>

<script>
import singleInput from "../../components/single-input/single-input.vue";
export default {
  data() {
    return {
      authcode: "",
      cardInfo: {},
      timer: null,
      countNum: 60
    };
  },
  onLoad(options) {
    console.log(options);
    this.cardInfo = options;
    this.countDown();
  },
  methods: {
    // 提交绑卡
    submit() {
      if (this.authcode.length == 6) {
        this.$http({
          path: this.$o2oApi + "/account/binding/authcode",
          data: {
            param: JSON.stringify({
              signNo: this.cardInfo.signNo,
              authcode: this.authcode
            })
          },
          method: "POST",
          type: "formData"
        }).then(res => {
          if (uni.getStorageSync("hasPayPassword")) {
            if (uni.getStorageSync("toactive")) {
              uni.removeStorageSync("toactive");
              uni.navigateTo({
                url: "../activity/activity"
              });
            } else {
              uni.navigateTo({
                url: "../pay-order/pay-order"
              });
            }
          } else {
            uni.navigateTo({
              url: "../set-pwd/set-pwd"
            });
          }
        });
      }
    },
    // 重新获取
    reSend() {
      let fromData = JSON.parse(JSON.stringify(this.cardInfo));
      Object.keys(fromData).forEach(v => {
        if (fromData[v] == "undefined") {
          delete fromData[v];
        }
      });
      delete fromData.signNo;
      this.$http({
        path: this.$o2oApi + "/account/binding/realname",
        data: {
          param: JSON.stringify(fromData)
        },
        method: "POST",
        type: "formData"
      }).then(res => {
        this.cardInfo = res.data.data[0];
        this.countDown();
      });
    },
    // 倒计时
    countDown() {
      this.countNum = 60;
      this.timer = setInterval(() => {
        this.countNum -= 1;
        if (this.countNum === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    }
  },
  components: {
    singleInput
  }
};
</script>

<style lang="stylus" scoped>
.codeBox {
  width: 698rpx;
  height: 375rpx;
  background-color: #FFFFFF;
  margin: 30rpx auto 0;
  border-radius: 12rpx;
  font-size: 30rpx;
  text-align: center;
  padding: 67rpx 0;

  view {
    margin: 10rpx 0;
  }

  .countDown {
    text-align: right;
    padding-right: 40rpx;
  }

  .reSend {
    color: #E51B23;
  }

  .codeIpt {
    margin-top: 20rpx;
  }
}

.next {
  width: 698rpx;
  height: 96rpx;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #E51C23;
  text-align: center;
  line-height: 96rpx;
  border-radius: 48rpx;
  color: #FFFFFF;
  font-size: 36rpx;
  position: absolute;
  bottom: 400rpx;
}
</style>
