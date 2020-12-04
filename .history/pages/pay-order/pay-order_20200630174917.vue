<template>
	<view>
		
<<<<<<< HEAD
=======
		<!-- <uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="选择支付方式" color='white' fixed="true" status-bar="true" ></uni-nav-bar> -->
>>>>>>> 3de2f7f2757687f5923229b24d454a0b49238f74
		<view class="content">
			<view class="redBg"></view>
			<view class="orderInfo">
				<view class="mountDesc">总金额</view>
				<view class="mount"><text>￥</text><text class="price">{{orderInfo.payablePrice}}</text></view>
				<view class="storeName">{{orderInfo.businessname}}</view>
			</view>
			<view class="payType">
				<radio-group class="radioGroup" @change="radioChange">
					<label class="radioItems">
						<view>
							<image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/miniprogram/pay/change-pay.png" mode=""></image>
							<text>零钱支付（可用￥{{userInfo.rebateSurplusAmount}}）</text>
						</view>
						<radio :disabled="userInfo.rebateSurplusAmount == 0" color="#E51C23" value="1" />
					</label>
					<label class="radioItems">
						<view>
							<image mode="" src="https://lztimg.oss-cn-qingdao.aliyuncs.com/miniprogram/pay/credit.png"></image>
							<text>银行卡支付</text>
						</view>
						<radio checked color="#E51C23" value="2" />
					</label>
				</radio-group>
			</view>
			<view class="payBtn" @click="payBtn">
				<text>￥</text>
				<text class="payMoney">{{orderInfo.payablePrice}}</text>
				<text>支付</text>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="payAlert">
					<view class="title">
						<view class="headerLeft" @click="closePayAlert">
							<image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/miniprogram/pay/close.png" mode=""></image>
						</view>
						<view class="headerTitle"><text>确认付款</text></view>
						<view class="headerRight"></view>
					</view>
					<view class="alertBody">
						<view class="alertMoney">￥<text>{{orderInfo.payablePrice}}</text></view>
						<view class="payMsg">
							<text>付款信息：</text>
							<text class="value">{{orderInfo.businessname}}</text>
						</view>
						<view class="alertPayType">
							<text>付款方式：</text>
							<view class="value" @click="selectBlank">
							{{defaultBlankCard.bankname ? defaultBlankCard.bankname : '请选择' }}
							<image v-if="payType == 2" class="rows" src="https://lztimg.oss-cn-qingdao.aliyuncs.com/miniprogram/pay/j.png" alt="">
							</view>
						</view>
					</view>
					<view class="pay" @click="pay">立即支付</view>
				</view>
			</uni-popup>
			<uni-popup ref="cardList" type="bottom">
				<view class="payAlert">
					<view class="title">
						<view class="headerLeft" @click="closeBlankAlert">
							<image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/miniprogram/pay/arrow-l.png" mode=""></image>
						</view>
						<view class="headerTitle"><text>选择付款方式</text></view>
						<view class="headerRight" @click="bindBlankCard">
							<image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/miniprogram/pay/more.png" mode=""></image>
						</view>
					</view>
					<view class="alertBody blankListBox">
						<view class="blankListItem" v-for="item in blackCardList" :key="item.signNo" @click="selectBlankCard(item)">
							<view>
								<image class="blankIcon" :src="item.banklogo" mode=""></image>
								<text>{{item.bankname}}({{item.cardnum}})</text>
							</view>
							<image v-if="defaultBlankCard.signNo == item.signNo" class="blankSelectIcon" src="http://lztimg.oss-cn-qingdao.aliyuncs.com/test/20200618173146/7157715.png" mode=""></image>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
	
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
        orderId: null,
				orderInfo:{
					payablePrice: 100,
					businessname: '饺子'
				},
				userInfo: {
					rebateSurplusAmount: null
				},
				payType: "2",
				defaultBlankCard:{
					bankname: '零钱支付',
					signNo: null
				},
				blackCardList: []
			}
		},
		onLoad(option){
      this.orderId = option.id
			this.getOrderInfo()
			this.getMoney()
      this.getBlankCard()
		},
		methods: {
			// 支付
			pay(){
				if(this.payType == 1){
					if (this.userInfo.rebateSurplusAmount >= this.orderInfo.payablePrice) {
						uni.getStorageSync('hasPayPassword') ? this.goPayCheck() : uni.navigateTo({
							url: '../set-pwd/set-pwd'
						})
					}else{
						uni.showToast({
							title: '余额不足',
							icon: 'none'
						})
					}
				}else if (this.payType == 2){
					if(!this.defaultBlankCard.signNo){
						uni.showToast({
							title: '请添加银行卡',
							icon: 'none'
						})
					} else {
						uni.getStorageSync('hasPayPassword') ? this.goPayCheck() : uni.navigateTo({
							url: '../set-pwd/set-pwd'
						})
					}
				}
			},
			// 跳支付验证码
			goPayCheck(){
				uni.navigateTo({
					url: `../pay-check/pay-check?ids=${this.orderInfo._id}&signNo=${this.defaultBlankCard.signNo}&payType=${this.payType}`
				})
			},
			// 关闭银行卡弹窗
			closeBlankAlert(){
				this.$refs.cardList.close()
			},
			// 选择银行卡
			selectBlankCard(item){
				this.defaultBlankCard = item
			},
			// 绑定银行卡
			bindBlankCard(){
				uni.navigateTo({
					url: '../bind-blank-card/bind-blank-card'
				})
			},
			// 选择银行卡
			selectBlank(){
				if (this.payType == 2){
					this.$refs.cardList.open()
				}
			},
			// 获取绑定银行卡
			getBlankCard() {
				this.$http({
					path: this.$o2oApi + '/account/binding/getcards'
				}).then(res => {
					this.blackCardList = res.data.data
					this.blackCardList[0] ? this.defaultBlankCard = JSON.parse(JSON.stringify(this.blackCardList[0])) : this.defaultBlankCard = { bankname: null,
					signNo: null }
				})
			},
			// 钱包信息
			getMoney(){
				this.$http({
					path: this.$o2oApi + '/account/merchantInfo'
				}).then(res => {
					this.userInfo = res.data.data
				})
			},
			// 支付按钮
			payBtn(){
				this.$refs.popup.open()
			},
			// 关闭支付弹窗
			closePayAlert(){
				this.$refs.popup.close()
			},
			getOrderInfo(){
				this.$http({
					path: this.$api + '/o2o/miniProgram/order/get',
					data: {
						id: this.orderId
					}
				}).then(res => {
					this.orderInfo = res.data.data
					uni.setStorageSync('pay-money', res.data.data.payablePrice)
				})
			},
			radioChange(e){
				this.payType = e.detail.value
				if (e.detail.value == 1){
					this.defaultBlankCard = {
						bankname: '零钱支付',
						signNo: null,
					}
				}else if (e.detail.value == 2){
					if(this.blackCardList[0]){
						this.defaultBlankCard = {...this.blackCardList[0]}
					}else {
						this.defaultBlankCard = {
							bankname: null,
							signNo: null,
						}
					}
				}
			}
		},
		components:{
			uniPopup
		}
	}
</script>

<style lang="stylus" scoped>
.redBg
	height 182rpx
	width 100%
	background-color #E51C23
	position absolute
	top 0
	left 0
.orderInfo
	width 698rpx
	height 250rpx
	background-color #FFFFFF
	border-radius 10rpx
	position absolute
	top 50rpx
	z-index 2
	left 0
	right 0
	margin 0 auto
	text-align center
	padding 35rpx
	font-weight bold
	.mountDesc
		color #333333
		font-size 28rpx
		margin-bottom 10rpx
	.mount
		color #E51C23
		font-size 34rpx
		margin 10rpx 0
		.price
			font-size 58rpx
	.storeName
		font-size 30rpx
.payType
	width 698rpx
	background-color #FFFFFF
	position absolute
	left 0
	right 0
	margin 0 auto
	top 350rpx
	padding 20rpx 20rpx
	.radioItems
		display flex
		justify-content space-between
		align-items center
		font-size 28rpx
		color #333333
		margin 20rpx 0rpx
		view
			display flex
			align-items center
			image
				width 44rpx
				height 44rpx
		text
			margin-left 10rpx
.payBtn
	width 100%
	height 98rpx
	position absolute
	bottom 0
	left 0
	background-color #E51C23
	color #FFFFFF
	line-height 98rpx
	text-align center
	font-size 34rpx
.payMoney
	font-size 50rpx
	margin-right 32rpx
.payAlert
	width 100%
	height 698rpx
	background-color #FFFFFF
	.title
		height 100rpx
		border-bottom 1px solid #E7E7E7
		display flex
		justify-content space-between
		align-items center
		padding 0 36rpx
		.headerLeft
			height 100%
			display flex
			align-items center
			image
				width 30rpx
				height 30rpx
		.headerRight
			height 100%
			width 30rpx
			display flex
			align-items center
			image
				width 30rpx
				height 30rpx
		.headerTitle
			font-size 36rpx
			font-weight bold
			color #333333
	.alertBody
		padding 0 26rpx
		>view
			border-bottom 1px solid #E7E7E7
		.alertMoney
			height 194rpx
			line-height 220rpx
			text-align center
			font-size 34rpx
			font-weight bold
			text
				font-size 60rpx
		.payMsg, .alertPayType
			color #999999
			display flex
			justify-content space-between
			font-size 30rpx
			padding 24rpx 0
			.value
				color #333333
	.pay
		border-bottom none
		width 100%
		height 98rpx
		background-color #E51C23
		text-align center
		line-height 98rpx
		font-size 34rpx
		font-weight bold
		color #FFF
		position absolute
		bottom 0
.rows
	width 20rpx
	height 20rpx
.payAlert
	.blankListBox
		padding 0
		.blankListItem
			display flex
			justify-content space-between
			align-items center
			padding 20rpx
			>view
				display flex
				align-items center
				font-size 20rpx
				color #333333
			.blankIcon
				width 50rpx
				height 50rpx
				margin-right 20rpx
			.blankSelectIcon
				width 44rpx
				height 44rpx
</style>
