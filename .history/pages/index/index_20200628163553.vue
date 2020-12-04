<template>
  <view class="container">
    <view
      class="test"
      @click.stop="change"
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
</template>

<script>
import singleInput from '../../components/single-input/single-input.vue'
export default {
  data() {
    return {
      val: null
    }
  },
  methods: {
    change(e) {
      console.log(e.target.dataset)
    }
  },
  components: {
    singleInput
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
