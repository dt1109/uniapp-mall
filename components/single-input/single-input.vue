<template name="singleInput">
  <view class="contentBox">
    <view class="content">

      <view v-if="isPwd">
        <input @click="changeFocus"
               :class="borderStyle == 'all' ? 'iptbox all' : 'iptbox btm'"
               v-for="index in iptIndex"
               disabled
               type="password"
               v-model="value[index]"
               :key="index">
      </view>
      <view v-else>
        <input @click="changeFocus"
               :class="borderStyle == 'all' ? 'iptbox all' : 'iptbox btm'"
               v-for="index in iptIndex"
               disabled
               type="text"
               v-model="value[index]"
               :key="index">
      </view>
    </view>
    <input class="ipt"
           :focus="isFocus"
           :maxlength="length"
           v-model="value">
  </view>

</template>

<script>
export default {
  name: 'singleInput',
  props: {
    length: {
      type: Number,
      default: 4
    },
    isPwd: {
      type: Boolean,
      default: false
    },
    borderStyle: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      isFocus: true,
      value: '',
      iptIndex: []
    }
  },
  mounted() {
    for (let i = 0; i < this.length; i++) {
      this.iptIndex.push(i)
    }
    console.log(this.iptIndex)
  },
  watch: {
    value(e) {
      this.$emit('input', e)
    }
  },
  methods: {
    clearVal() {
      this.value = ''
    },
    changeFocus() {
      this.isFocus = true
      // this.$nextTick(function() {
      //   let uniBox = document.getElementsByClassName('ipt')[0]
      //   uniBox.getElementsByClassName('uni-input-input')[0].focus()
      // })
    }
  }
}
</script>

<style>
.contentBox {
  position: relative;
}
.content > view {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.iptbox {
  position: relative;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.all {
  border: 1rpx solid #ddd;
}
.btm {
  border-bottom: 1rpx solid #ddd;
}
.ipt {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
.btn-area {
  width: 80%;
  background-color: orange;
  color: white;
}
</style>
