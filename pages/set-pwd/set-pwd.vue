<template>
	<view>
		<uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="设置支付密码" color='white' fixed="true" status-bar="true" ></uni-nav-bar>
		<view class="codeIpt"><single-input ref="setPwd" v-model="ckeckPwd" :length="6" :isPwd="true"></single-input></view>
		<view class="msg">{{msg}}</view>
		<uni-popup ref="popup" type="dialog">
			<view class="successDialog">
				<image src="https://lztimg.oss-cn-qingdao.aliyuncs.com/miniprogram/pay/pwd-setted.png" mode=""></image>
				<view>密码设置成功</view>
				<view class="btmBtn" v-if="!toactivity" @click="goPay">完成</view>
				<view class="btmBtn" v-if="toactivity" @click="goactivity">完成</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import singleInput from '../../components/single-input/single-input.vue'
	import { hexMD5 } from '../../static/utils/md5.js'
	import Base64 from '../../static/utils/base64.js'
	// 通过本地存储的 toactivity 判断是否 跳转
	var toactivity =  false
	if( uni.getStorageSync('toactive')){
		toactivity = true
	}else{
		toactivity = false
	}
	export default {
		data() {
			return {
				pwd: null,
				ckeckPwd: null,
				msg: '请设置指乎支付密码，用户支付验证',
				toactivity: toactivity
			};
		},
		methods:{
			goPay(){
				uni.navigateTo({
					url: '../pay-order/pay-order'
				})
			},
			// 跳转回活动页
			goactivity(){
				uni.removeStorageSync('toactive')
				uni.navigateTo({
					url: '../activity/activity'
				})
			}
		},
		watch:{
			ckeckPwd(val){
				if (!this.pwd && this.ckeckPwd && this.ckeckPwd.length == 6) {
					this.pwd = this.ckeckPwd
					this.$refs.setPwd.clearVal()
					this.ckeckPwd = null
					this.msg = '请再次输入，以确认密码'
				}
				if (this.pwd && this.ckeckPwd && this.ckeckPwd.length == 6){
					if (this.pwd == this.ckeckPwd) {
						this.$http({
							path: this.$o2oApi + '/account/fingerpay/pwdsetting',
							data: {
								param: JSON.stringify({
									pwd: Base64.encode(hexMD5(this.ckeckPwd))
								})
							},
							method: 'POST',
							type: 'formData'
						}).then(res => {
							wx.setStorageSync('hasPayPassword', true)
							this.$refs.popup.open()
						})
					}else {
						this.pwd = null
						this.ckeckPwd = null
						this.$refs.setPwd.clearVal()
						this.msg = '您两次输入的密码不一致,请重新输入'
					}
				}
			}
		},
		components:{
			singleInput,
			uniPopup
		}
	}
</script>

<style lang="stylus" scoped>
.codeIpt
	background-color #FFFFFF
	width 600rpx
	margin 150rpx auto 20rpx
.msg
	width 600rpx
	font-size 26rpx
	margin 0 auto
	color #656565
.successDialog
	width: 589rpx
	height 419rpx
	background-color #FFFFFF
	border-radius 12rpx
	margin 200rpx auto 0
	text-align center
	font-size 28rpx
	color #333333
	position relative
	image
		width 128rpx
		height 128rpx
		display inline-block
		margin 60rpx 0 30rpx
	.btmBtn
		height 96rpx
		width 100%
		border-top 1px solid #F7F7F7
		position absolute
		bottom 0
		left 0
		line-height 96rpx
		font-size 36rpx
</style>
