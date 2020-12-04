<template>
	<view>
		  <view class="goods-addcart">
        <uni-goods-nav :fill="true"
                       :options="options"
                       @click="onClick"
                       @buttonClick="buttonClick" />
      </view>
      <!-- 规格弹窗 -->
      <goods-specific ref="popupTypes"></goods-specific>
	</view>
</template>

<script>
import goodsSpecific from './components/specific'
	export default {
		data() {
			return {
				//加入购物车导航配置
				options: [{
						icon: 'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/serviceIconBlack.png',
						text: '客服'
					},
					{
						icon: 'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/starFalse.png',
						text: '收藏'
					},
					{
						icon: 'https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/shopIconGoods.png',
						text: '店铺'
					}
				],
        isCollection: false, //是否收藏
        goosbutton: [{
						name: '111',
						type: 'warn'
					},
					{
						name: '222',
						type: 'default'
					},
					{
						name: '333',
						type: 'default'
					}
				], //规格
				goosbuttonIndex: 0, //规格选择
			}
    },
    created() {
      this.goodsData = uni.getStorageSync('goodsData')
    },
    components:{
      goodsSpecific
    },
		methods: {
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
           // console.log(this.$refs.popupTypes)
						this.$refs.popupTypes.$refs.popupType.open()
					}
				}
      },
      
		}
	}
</script>

<style lang="scss" scped>
/**加入购物车 */
	.goods-addcart {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
 
</style>
