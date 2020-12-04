<template>
	<view>
			<!-- <uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="支付成功" color='white' fixed="true" status-bar="true" ></uni-nav-bar> -->
		<image class="success" src="http://lztimg.oss-cn-qingdao.aliyuncs.com/test/20200613142825/9314286.png" mode=""></image>
		<view class="pay-amount">
			<view>
				<text>支付成功</text>
			</view>
			<view>
				<text class="payMoney">实付：￥{{price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: 0
			};
		},
		onLoad(){
			this.price = uni.getStorageSync('pay-money')
			setTimeout(() =>{
				uni.navigateTo({
					url: '../goods/index'
				})
			}, 2000)
		}
	}
</script>

<style lang="stylus">
.success{
  width: 120rpx;
  height: 120rpx;
  margin-top: 180rpx;
  margin-left: 315rpx;
}
.pay-amount
	margin-top 70rpx
	text-align center
	font-size 36rpx
	font-weight bold
	.payMoney
		font-size 28rpx
		color #999999
		font-weight 200
</style>
