<template>
	<view>
		<uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="验证支付密码" color='white' fixed="true" status-bar="true" ></uni-nav-bar>
		<view class="codeIpt"><single-input ref="setPwd" v-model="ckeckPwd" :length="6" :isPwd="true"></single-input></view>
		<view class="next" @click="next">确认支付</view>
	</view>
</template>

<script>
	import singleInput from '../../components/single-input/single-input.vue'
	import { hexMD5 } from '../../static/utils/md5.js'
	import Base64 from '../../static/utils/base64.js'
	export default {
		data() {
			return {
				ckeckPwd: '',
				payInfo: {}
			};
		},
		onLoad(options){
			this.payInfo = options
		},
		methods:{
			next(){
				if(this.ckeckPwd.length == 6){
					let formData = { ids: this.payInfo.ids, signNo: this.payInfo.signNo }
					let payApi
					if (this.payInfo.payType == 1) {
						payApi = '/malls/walletPay'
					} else if (this.payInfo.payType == 2) {
						payApi = '/account/fingerpay/pay'
					}
					this.$http({
						path: this.$o2oApi + payApi,
						data: {
							param: JSON.stringify({
								...formData,
								pwd: Base64.encode(hexMD5(this.ckeckPwd)),
							})
						},
						method: 'POST',
						type: 'formData',
					}).then(res => {
						uni.navigateTo({
							url: '../pay-success/pay-success'
						})
					})
				}
			}
		},
		components:{
			singleInput
		}
	}
</script>

<style lang="stylus">
.codeIpt
	background-color #FFFFFF
	width 600rpx
	margin 150rpx auto 20rpx
.next
	width 698rpx
	height 96rpx
	margin 153rpx auto 0
	color #FFFFFF
	border-radius 48rpx
	background-color #E51B23
	text-align center
	line-height 96rpx
	font-size 36rpx
</style>
