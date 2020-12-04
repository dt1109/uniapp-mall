<template>
	<view>
		<uni-nav-bar left-icon="back" backgroundColor='#e51c23' title="填写银行卡信息" color='white' fixed="true" status-bar="true" ></uni-nav-bar>
		<view class="block">
			<text class="blockTitle">请选择银行卡类型</text>
			<view class="blockBody">
				<view class="blockItem">
					<text class="label">卡类型</text>
					<text class="value">{{cardInfo.bankname}} {{cardInfo.cardtype == 'DEBIT_CARD' ? '储蓄卡' : '信用卡'}}</text>
				</view>
				<view class="blockItem" v-if="cardInfo.cardtype == 'CREDIT_CARD'">
					<text class="label">有效期</text>
					<picker class="value" mode="date" :value="date" placeholder="请选择" @change="bindDateChange">
							<view v-if="cardInfo.expiredate">{{cardInfo.expiredate}}</view>
							<view v-else class="placeDesc">请选择</view>
					</picker>
				</view>
				<view class="blockItem" v-if="cardInfo.cardtype == 'CREDIT_CARD'">
					<text class="label">安全码</text>
					<input type="text" v-model="cardInfo.cvv2" class="value" placeholder="请输入信用卡安全码">
				</view>
			</view>
		</view>
		<view class="block">
			<text class="blockTitle">请填写银行预留信息</text>
			<view class="blockBody">
				<view class="blockItem">
					<text class="label">姓名</text>
					<input type="text" class="value" v-model="cardInfo.name" placeholder="请输入持卡人姓名">
				</view>
				<view class="blockItem">
					<text class="label">证件类型</text>
					<text class="value" v-model="cardInfo.idnum">身份证</text>
				</view>
				<view class="blockItem">
					<text class="label">证件号</text>
					<input type="text" v-model="cardInfo.idnum" class="value" placeholder="请输入证件号">
				</view>
			</view>
		</view>
		<view class="block">
			<text class="blockTitle">提醒：后续只能绑定该持卡人的银行卡</text>
			<view class="blockBody">
				<view class="blockItem">
					<text class="label">手机号</text>
					<input type="tel" v-model="cardInfo.phone" class="value" placeholder="请输入银行预留手机号">
				</view>
			</view>
		</view>
		<view class="next" @click="next">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				date: currentDate,
				cardInfo: {
					expiredate: null
				}
			};
		},
		onLoad(options){
			this.cardInfo = { ...options }
		},
		methods:{
			// 提交信息
			next(){
				const { name, idnum, cardnum, phone, cvv2, expiredate } = this.cardInfo
				this.$http({
					path: this.$o2oApi + '/account/binding/realname',
					data: {
						param: JSON.stringify({
							name, idnum, cardnum, phone, cvv2, expiredate
						})
					},
					type: 'formData',
					method: 'POST',
				}).then(res => {
					uni.navigateTo({
						url: `../check-blank-code/check-blank-code?name=${name}&idnum=${idnum}&phone=${phone}&cvv2=${cvv2}&expiredate=${expiredate}&signNo=${res.data.data[0].signNo}&cardnum=${cardnum}`
					})
					
				})
			},
			bindDateChange(e) {
				this.$set(this.cardInfo, 'expiredate', e.detail.value)
			},
			// 获取年月日信息
			getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();

					if (type === 'start') {
							year = year - 60;
					} else if (type === 'end') {
							year = year + 2;
					}
					month = month > 9 ? month : '0' + month;;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="stylus" scoped>
.block
	width 698rpx
	margin 0 auto
	.blockTitle
		font-size 24rpx
		color #999999
		margin-bottom 10rpx
		display inline-block
		padding-left 20rpx
	.blockBody
		width 100%
		background-color #FFFFFF
		border-radius 12rpx
		padding 15rpx 20rpx
		.blockItem
			display flex
			justify-content space-between
			font-size 28rpx
			color #333333
			border-bottom 1rpx solid #F8F8F8
			padding 20rpx 0
			.value
				color #E51C23
				text-align right
				.placeDesc
					color #808080
		.blockItem:last-of-type
			border-bottom none
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
