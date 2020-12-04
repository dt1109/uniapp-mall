<template>
  <view class="container">
    <view class="intro">
      <singleInput v-model="val"
                   :length="6"></singleInput>
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
  methods: {},
  components: {
    singleInput
  }
}
</script>

<style>
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}
</style>
