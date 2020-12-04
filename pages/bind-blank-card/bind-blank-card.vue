<template>
	<view >
		<uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="添加银行卡" color='white' fixed="true" status-bar="true" ></uni-nav-bar>
		<view class="content">
			<text class="title" >请绑定持卡本人的银行卡</text>
			<view class="blankNumBox">
				<text>卡号</text>
				<input type="text" v-model="cardNum" placeholder="请输入银行卡号" />
			</view>
			<view class="deal">
				<label>
					<radio color="#E51C23" checked /><text>我已阅读并同意<text class="dealLink" @click="goDeal">《指乎协议》</text></text>
				</label>
			</view>
			<view class="next" @click="next">下一步</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				deal: false,
				cardNum: null,
			}
		},
		methods: {
			goDeal(){
				uni.navigateTo({
					url: '/pages/deal/deal'
				})
			},
			next(){
				if (this.cardNum) {
					this.$http({
						path: this.$o2oApi + '/account/binding/cardinfo',
						data: {
							cardnum: this.cardNum
						}
					}).then(res => {
						uni.setStorageSync('blankNum', this.cardNum)
						uni.navigateTo({
							url: `/pages/add-blank-info/add-blank-info?bankname=${res.data.data[0].bankname}&cardtype=${res.data.data[0].cardtype}&cardnum=${this.cardNum}`
						})
					})
				}else {
					uni.showToast({
						title: '请输入银行卡卡号',
						icon: 'none'
					})
				}
			},
			toback() {
				uni.navigateBack();
			
			}
		}
	}
</script>

<style lang="stylus" scoped>
.content
	padding 0 26rpx
	.title
		font-size 24rpx
		color #999999
		padding-left 20rpx
	.blankNumBox
		width: 100%;
		border-radius 12rpx
		background-color #FFFFFF
		margin 0 auto
		margin-top 10rpx
		display flex
		justify-content space-between
		align-items center
		padding 35rpx 26rpx
		font-size 28rpx
		input
			width 500rpx
	.next
		width 698rpx
		height 96rpx
		background-color #E51C23
		text-align center
		line-height 96rpx
		border-radius 48rpx
		color #FFFFFF
		font-size 36rpx
		position absolute
		bottom 400rpx
	.deal
		text-align center
		font-size 24rpx
		position absolute
		bottom 520rpx
		left 0
		right 0
		margin 0 auto
		.dealLink
			color #E51C23
</style>
