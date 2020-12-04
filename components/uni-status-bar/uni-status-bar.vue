<template>
  <view :style="{ height: statusBarHeight }" class="uni-status-bar">
    <slot />
  </view>
</template>

<script>
var statusBarHeight = uni.getSystemInfoSync().statusBarHeight  + 15 + 'px'

export default {
  name: 'UniStatusBar',
  data() {
    return {
      statusBarHeight: statusBarHeight
    }
  },
  created() {
    if(process.env.NODE_ENV === 'development'){　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
        console.log('开发环境')
    }else{　　　　　
        console.log('生产环境')　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
    }　　
    //console.log(statusBarHeight)
  }
}
</script>

<style lang="scss" scoped>
.uni-status-bar {
  width: 750rpx;
  height: 20px;
  height: var(--status-bar-height);
}
</style>
