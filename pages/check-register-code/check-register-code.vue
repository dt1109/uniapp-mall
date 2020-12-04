<template>
	<view>
		<uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="登录" color='white' fixed="true" status-bar="true" ></uni-nav-bar>
		<view class="content">
			<view class="regTitle">
				<text>{{isSendCode ? '请输入验证码' : '请输入手机号码'}}</text>
				<view class="codeStatus" v-if="isSendCode"><text>已发送验证码</text>
					<text class="reSend" v-if="countTimer > 0">{{countTimer}}s</text>
					<text class="reSend" v-else @click="sendCode">重新发送</text>
				</view>
				<view class="sendPhone" v-if="isSendCode">+86 {{phone}}</view>
			</view>
			<view class="iptPhone" v-if="!isSendCode">
				<input type="tel" placeholder="请输入手机号码" v-model="phone" />
				<view class="sendCode" @click="sendCode">发送验证码</view>
			</view>
			<view class="iptCode" v-if="isSendCode">
				<single-input borderStyle="btm" v-model="code" />
			</view>
			<view class="login">
				<view :class="isSendCode ? 'loginBtn isSend' : 'loginBtn'" @click="login">
					登录
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import singleInput from '../../components/single-input/single-input.vue'
	export default {
		data() {
			return {
				code: null,	// 验证码
				phone: '',	// 手机号
				isSendCode: false,	// 是否发送验证码
				countTimer: 60,
				timer: null	// 定时器
			}
		},
		mounted(){
			
		},
		methods: {
			sendCode() {
				if (this.phone.length === 11) {
					this.$http({
						path: this.$o2oApi + '/account/logincode',
						data: { phone: this.phone }
					}).then(res => {
						this.isSendCode = true
						this.countDown()
					})
				}else{
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}
				
			},
			login(){
				if (this.isSendCode) {
					this.$http({
						path: this.$o2oApi + '/account/logincode',
						data: {
							param: JSON.stringify({ phone: this.phone, logincode: this.code })
						},
						method: 'POST',
						type: 'formData',
					}).then(res => {
						uni.setStorageSync('auth-token', res.data.data[0].token)
						uni.setStorageSync('hasPayPassword', res.data.data[0].haspaypwd)
						uni.navigateBack({
							data: 1,
							animationType: 'pop-out',
							animationDuration: 200
						})
					})
				}
				
			},
			countDown(){
				this.countTimer = 60
				this.timer = setInterval(() => {
					this.countTimer -= 1
					if (this.countTimer <= 0){
						clearInterval(this.timer)
					}
				}, 1000)
			}
		},
		components:{
			singleInput
		}
	}
</script>

<style lang="stylus" scoped>

.regTitle
	text-align center
	color #333333
	font-size 50rpx
	font-weight bold
	margin 90rpx 0 75rpx
	.codeStatus
		font-size 28rpx
		color #999999
		font-weight 200
		margin-top 50rpx
		.reSend
			color #E51C23
			margin-left 48rpx
	.sendPhone
		font-size 34rpx
		color #333333
		margin-top 10rpx
.iptPhone
	width: 630rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 1rpx solid #E7E7E7;
	margin 0 auto
	font-size 36rpx
	padding-bottom 10rpx
	.sendCode
		font-size 24rpx
		border 1rpx solid #999999
		color #999999
		width 150rpx
		height 50rpx
		line-height 48rpx
		text-align center
		border-radius 5rpx
.login
	position fixed
	top 650rpx
	left: 0;
	right: 0;
	margin 0 atuo
	.loginBtn
		width 698rpx
		height 98rpx
		background-color #FF989B
		text-align center
		line-height 98rpx
		font-size 34rpx
		color #FFFFFF
		margin 0 auto
		border-radius 10rpx
	.isSend
		background-color #E51C23

</style>
