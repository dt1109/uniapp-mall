<template>
  <view>
    <uni-nav-bar
      left-icon="back"
      left-text="返回"
      right-text="菜单"
      title="导航栏组件"
    ></uni-nav-bar>
    <view class="container">
      <view
        class="test"
        @click="change"
      >
        <view id="goodsItem">
          <view
            class="goodsPrice"
            data-id="123"
          >123</view>
        </view>
        <view
          class="categoryItem"
          data-id="12"
        ></view>
      </view>

    </view>
  </view>

</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
  data() {
    return {
      val: null
    }
  },
  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  methods: {
    change(e) {
      console.log(e)
    }
  },
  components: {
    uniNavBar
  }
}
</script>

<style lang="stylus">
.container
  padding 20px
  font-size 14px
  line-height 24px
.test
  width 200rpx
  height 200rpx
  background-color red
  view
    width 50%
    height 50%
    background-color yellow
</style>
