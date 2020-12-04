<template>
  <view class="container">
    <view
      class="test"
      @click.stop="change"
    >
    </view>
    <view class="goodsItem"></view>
    <view class="categoryItem"></view>
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
      console.log(e)
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
</style>
