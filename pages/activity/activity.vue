<template>
	<view class="box">
		<uni-nav-bar left-icon="back" left-text="返回" fixed="true" status-bar="true"></uni-nav-bar>
		<view class="container">
			<!-- 介绍 -->
			<view class="introduce">
				<view class="card-title">
					<view class="yellow">
						<view class="blue">
							<text>指纹应用是什么?</text>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="explain">
						为生态体系合作伙伴，提供整套或部分 (核心版+指纹模组+软件开发) 解决方案与服务如：指纹算法、指纹Sensor、指纹模组、安卓核心版、指纹识别技术应用软件开发。
					</view>
					<view class="product-name">
						玉如意 ZC2004-I01
					</view>
					<view class="product-trait">
						刷脸+指纹 双生物识别认证
					</view>
					<image class="product-img" :src="pic+'9daiji.png'" mode=""></image>
					<view class="trait-list">
						<view class="item" v-for=" (item,key) in traitList" :key="key">
							<image :src="item.url" mode=""></image>
							<view class="text">{{item.title}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 应用场景 -->
			<view class="species-list">
				<view class="card-title">
					<view class="yellow">
						<view class="blue">
							<text>使用多场景 轻巧高颜值</text>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="item" v-for=" (item,key) in speciesList" :key="key">
						<image :src="item" mode=""></image>
					</view>
				</view>
				<image class="left-link" src="https://lztimg.oss-cn-qingdao.aliyuncs.com/static/h5/WechatIMG7.png" mode=""></image>
			</view>
			<!-- 产品用法 -->
			<view class="product">
				<view class="num-title" :style="{backgroundImage:'url('+pic+'01%403x.png' }">
					<view class="top">
						即插即用的桌面收银设备
					</view>
					<view class="bottom">
						无需安装插件
					</view>
				</view>
				<image :src="pic+'1%403x.png'" mode="" style="width: 240rpx;height:446rpx ;  margin-top: 60rpx;"></image>
				<view class="tap">
					<image :src="pic+'zhiwen%403x.png'" mode=""></image>
					<image :src="pic+'face%403x.png'" mode=""></image>
				</view>
				<view class="bottom">
					指纹、刷脸收款 统统兼顾
				</view>
				<view class="num-title" :style="{backgroundImage:'url('+pic+'02%403x.png' }" style="margin-top: 30rpx;">
					<view class="top">
						总能匹配您的收银台
					</view>
					<view class="bottom">
						180°旋转+自由伸缩
					</view>
				</view>
				<image class="pic2" :src="pic+'30%403x.png'" style="width:455rpx; height: 571rpx; margin-top: 19rpx; margin-bottom: 30rpx;"
				 mode=""></image>
				<view class="num-title" :style="{backgroundImage:'url('+pic+'03%403x.png' }">
					<view class="top">
						操作简单 一瞄即付
					</view>
					<view class="bottom">
						USB即插即用，支持刷码付款
					</view>
				</view>
				<view class="browse" v-for="(items,keys) in stepsList" :key="keys">
					<button class="btn" v-if="keys === 0">会员注册流程</button>
					<button class="btn" v-if="keys === 1">人脸核验</button>
					<view class="browse-content" v-for="(item,key) in items" :key="key">
						<view class="browse-title">
							{{ item.title}}
						</view>
						<view class="item-list">
							<view class="left" v-for="(i,k) in item.content" :key="k" v-bind:style="{marginLeft:i.left+'rpx',marginRight:i.right+'rpx'}">
								<image class="item-bg" v-if="!i.count" :src="pic+'9daixian%403x.png'" mode=""></image>
								<image class="item-cont" v-if="!i.count" :src="i.cont" mode=""></image>
								<image class="item-bg2" v-if="i.count" :src="pic+'41%403x.png'" mode=""></image>
								<view class="steps">
									{{i.title}}
								</view>
							</view>
							<view class="line" v-if="item.line">
								<view class="s-box">

								</view>
								<view>
									按压【会员】按钮
								</view>

							</view>
						</view>
					</view>
				</view>
				<image class="left-link" src="https://lztimg.oss-cn-qingdao.aliyuncs.com/static/h5/WechatIMG7.png" mode=""></image>
				<image class="right-link" src="https://lztimg.oss-cn-qingdao.aliyuncs.com/static/h5/WechatIMG7.png" mode=""></image>
			</view>
			<!-- 概括文字 -->
			<view class="life">
				<text>
					刷脸+指纹乘公交、刷脸+指纹坐地铁、刷脸+指纹就餐、
					\n
					刷脸+指纹购物、刷脸+指纹就医……
					\n
					千万不要觉得这些离我们还很远。
					\n
					一场浩浩荡荡的巨变已经来了！
					\n
					科技改变生活，科技也颠覆着那些一成不变的传统行业。
					\n
					对于众多的商家来说，该系统将极大的提高支付效率，
					\n
					降低支付成本！
					\n
					拥抱创新，就是拥抱未来
				</text>
			</view>
			<!-- 产品列表 -->
			<view class="scenario" :class="{toon:isShow}">
				<view class="card-title">
					<view class="yellow">
						<view class="blue">
							<text>使用多场景 轻巧高颜值</text>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="item" v-for="(item,key) in scenarioList " :key="key">
						<image :src="item.url" mode=""></image>
						<view class="name">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<!-- 绑定银行卡	 -->
			<view class="binding" v-if="isShow">
				<button type="default" class="btn" @touchstart="tobind">立即绑定</button>
				<view class="agreement">
					绑定即同意 <text @touchstart="todeal">《指乎指纹应用（绑卡）用户协议》</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		nativeMethods
	} from "../../static/utils/until.js"
	export default {
		data() {
			return {
				// 图片前缀
				pic: 'https://lztimg.oss-cn-qingdao.aliyuncs.com/static/h5/',
				height: '',
				isApp: '',
				traitList: '',
				speciesList: '',
				stepsList: '',
				scenarioList: '',
				tokens: '',
				isShow: true,
			}
		},
		methods: {
			// 返回
			toback() {
				uni.navigateBack();
				nativeMethods('routeBack')
			},
			// 绑定事件
			tobind() {
				uni.setStorageSync('toactive',true)
				let theToken = uni.getStorageSync('auth-token')
				if (theToken) {
					
                    nativeMethods('webJumpPhone', { pageName: 'lzt://myBankCardTarget' })
				} else {
					nativeMethods('lztLoginAction')
				}


			},
			// 跳转至用户协议
			todeal() {
				uni.navigateTo({
					url: "../deal/deal"
				});
			},
			// 校验
			verifyCertification() { // 校验 实名 认证
				this.$http({
					path: this.$o2oApi + '/user/info',
					data: {},
					type: '',
					method: 'GET'
				}).then(res => {
					// 实名认证过的隐藏绑定按钮
					if (res.data.data[0].realname) {
						this.isShow = false
					}
				})
			},
			// 截取url
			urlscile(paraName) {
				var url = document.location.toString()
				var arrObj = url.split('?')
				if (arrObj.length > 1) {
					var arrPara = arrObj[1].split('&')
					var arr
					for (var i = 0; i < arrPara.length; i++) {
						arr = arrPara[i].split('=')
						if (arr != null && arr[0] === paraName) {
							return arr[1]
						}
					}
					return ''
				} else {
					return ''
				}
			},
			geturl() {
				// uni.setStorageSync('isapp',this.urlscile('isapp'))
				// uni.setStorageSync('height',this.urlscile('height'))
			}

		},
		beforeCreate() {
			uni.showLoading({
				title: '加载中'
			});
		},
		created() {

			// nativeMethods('changeTopColor', {
			// 	color: 1
			// })
			// 刷新时获取token
			let theToken = this.urlscile('token')
			// 进入时删除本地token
			uni.removeStorageSync('auth-token');
			// 返回时判断url是否有token
		
			window.lztReloadData = token => {
				window['token'] = token
					// alert(theToken)
				if (token) {
					uni.setStorageSync('auth-token', token)
                    this.verifyCertification()
				}
			}
			// 判断是否登录隐藏绑定按钮
			if (theToken) {
				uni.setStorageSync('auth-token', theToken)
				this.verifyCertification()
			}

		},
		beforeMount() {
			this.traitList = [{
						url: this.pic + 'lujing 1%403x.png',
						title: '更简单'
					},
					{
						url: this.pic + '4%403x.png',
						title: '更快捷'
					},
					{
						url: this.pic + '7%403x.png',
						title: '更安全'
					}
				],
				this.speciesList = [
					this.pic + 'chaoshi%403x.png',
					this.pic + 'shangchang%403x.png',
					this.pic + 'naicha%403x.png',
					this.pic + 'shuiguo%403x.png',
					this.pic + 'fuzhaung%403x.png',
					this.pic + 'kafei%403x.png',
					this.pic + 'jiudian%403x.png',
					this.pic + 'chanting%403x.png',
					this.pic + 'yaodian%403x.png',
				]
			this.stepsList = [
				[{
						title: '1.首页启动，打开应用界面。',
						content: [{

								cont: this.pic + 'open%403x.png',
								title: '首页启动',
								left: '86'
							},
							{
								cont: this.pic + 'home.png',
								title: '打开应用',
								right: '87'
							}
						]

					},
					{
						title: '2.点击键盘上的【会员】键按钮，进入注册页面，按要求输入手机号及验证码。',
						line: true,
						content: [{

								cont: this.pic + 'open%403x.png',
								count: true,
								left: 86,
							},
							{

								cont: this.pic + 'login%403x.png',
								right: 67
							}
						]
					},
					{
						title: '3.采集5次指纹，完成注册，身份识别码默认为手机号后六位。',
						content: [{
								cont: this.pic + '9daixiangao%403x.png',
								title: '采集指纹',

								left: 86,
							},
							{

								cont: this.pic + 'zhuche%403x.png',
								title: '注册成功',
								right: 87
							}
						]
					}
				],
				[{
						btn: '人脸核验',
						title: '1.首页启动，打开应用界面。',
						content: [{

								cont: this.pic + 'open%403x.png',
								title: '首页启动',
								left: '86'
							},
							{

								cont: this.pic + 'home.png',
								title: '打开应用',
								right: '87'
							}
						]

					},
					{
						title: '2.点击键盘上的【会员】键按钮，进入注册页面，按要求输入手机号及验证码。',
						line: true,
						content: [{

								cont: this.pic + 'open%403x.png',
								// title: '首页启动',
								count: true,
								left: 86,
							},
							{

								cont: this.pic + 'login%403x.png',
								// title: '打开应用',
								right: 67
							}
						]
					},
					{
						title: '3.采集5次指纹，完成注册，身份识别码默认为手机号后六位。',
						content: [{
								cont: this.pic + '9daixiangao%403x.png',
								title: '人脸核验',

								left: 86,
							},
							{

								cont: this.pic + 'suess%403x.png',
								title: '核验成功',
								right: 87
							}
						]
					}
				]
			]
			this.scenarioList = [{
					url: this.pic + '1.png',
					name: '指纹收款设备'
				},
				{
					url: this.pic + '2.png',
					name: '指纹现磨咖啡机'
				},
				{
					url: this.pic + '60.png',
					name: '指纹门禁'
				},
				{
					url: this.pic + '61.png',
					name: '指纹共享电动车'
				},
				{
					url: this.pic + '62.png',
					name: '指纹笔记本'
				},
				{
					url: this.pic + '63.png',
					name: '指纹云考勤'
				},
				{
					url: this.pic + '64.png',
					name: '指纹手提包'
				},
				{
					url: this.pic + '65.png',
					name: '指纹拉杆箱'
				},
				{
					url: this.pic + '66.png',
					name: '指纹道闸'
				},
				{
					url: this.pic + '67.png',
					name: '指纹电梯'
				},
				{
					url: this.pic + '68%403x.png',
					name: '指纹汽车'
				},

			]

		},
		mounted() {

			setTimeout(function() {
				uni.hideLoading();
			}, 1000);
		},
		components: {
			uniNavBar
		},
		onReady() {
			// alert('ok')
		},
		onShow(){
			 if( uni.getStorageSync('auth-token')){
				  this.verifyCertification()
			 }
			 //
		}


	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		position: absolute;
		// 背景图
		background-image: url(https://lztimg.oss-cn-qingdao.aliyuncs.com/static/h5/51.png);
		background-size: 100%;
		padding: 0 32rpx;

		.introduce {
			display: flex;
			flex-direction: column;
			background: white;
			margin-top: 697rpx;
			position: relative;
			background: #ffffff;
			border-radius: 12rpx;
		}

		.content {
			text-align: center;

			.explain {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				line-height: 55rpx;
				margin: 0 30rpx;
				margin-top: 25rpx;
				text-indent: 2em;
				text-align: left;
				color: #666666;
			}

			.product-name {
				font-size: 42rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				color: #dec828;
				text-align: center;
				margin-top: 50rpx;
				font-weight: 700;
			}

			.product-trait {
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: center;
				color: #0f57e4;
				margin-top: 20rpx;
			}

			.product-img {
				width: 506rpx;
				height: 528rpx;
				margin-top: 40rpx;
			}

			.trait-list {
				display: flex;
				justify-content: space-between;
				padding: 0 80rpx;
				margin-top: 42rpx;
				margin-bottom: 51rpx;

				.item {
					image {
						width: 52rpx;
						height: 52rpx;
					}

					.text {
						font-size: 36rpx;
						margin-top: 20rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #666666;
					}
				}

				:last-child {
					image {
						width: 42rpx;
						height: 52rpx;
					}
				}

			}

		}

		.species-list {
			background: #ffffff;
			border-radius: 12rpx;
			margin-top: 84rpx;
			padding: 0 67rpx;
			position: relative;

			.list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.item {
					image {
						width: 120rpx;
						height: 120rpx;
					}

					margin-bottom: 60rpx;

				}

				.item:nth-child(2) {
					margin: 0 95rpx;
				}

				.item:nth-child(5) {
					margin: 0 95rpx;
				}

			}
		}

		.product {
			margin-top: 48rpx;
			position: relative;
			background: #ffffff;
			border-radius: 12rpx;
			text-align: center;

			view:nth-of-type(7) {
				padding-top: 0;
			}

			.bottom {
				margin-top: 20rpx;
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				color: #0f57e4;
			}

			.num-title {
				background-size: 246rpx 221rpx;
				background-repeat: no-repeat;
				background-position: center 0;
				padding-top: 111rpx;
				text-align: center;

				.top {
					font-size: 42rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					color: #dec828;
				}


			}
		}

		.tap {
			margin-top: 60rpx;
			display: flex;
			justify-content: center;
			margin-bottom: 20rpx;

			image {
				width: 120rpx;
				height: 120rpx;
			}

			:last-child {
				margin-left: 59rpx;
			}
		}

		.browse {
			padding-top: 50rpx;

			.uni-button:after {
				border: none;
			}

			.btn {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				background: #00a9fd;
				border-radius: 32rpx;
				color: #ffffff;
				margin: 0 169rpx;
				height: 63rpx;
				line-height: 63rpx;
				margin-bottom: 50rpx;
			}

			.browse-content {
				.browse-title {
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #666666;
					text-align: left;
					padding-left: 60rpx;
					padding-right: 29rpx;
					margin-bottom: 50rpx;
					line-height: 46rpx;
				}

				.item-list {
					// padding: 0 66rpx;
					display: flex;
					justify-content: space-between;
					position: relative;

					.line {
						font-size: 20rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						color: #666666;
						position: absolute;
						width: 190rpx;
						top: 99rpx;
						padding-top: 11rpx;
						border-top: 1px solid #333333;
						// z-index: 999;
						left: 259rpx;

						view {
							white-space: nowrap;
							transform: scale(0.8);
						}

						.s-box {
							position: absolute;
							content: '';
							width: 40rpx;
							height: 32rpx;
							border: 1rpx solid black;
							top: 0;
							left: -41rpx;
							transform: translateY(-61%);

						}
					}

					// .line ::before {

					// 	position: absolute;
					// 	content: '';
					// 	width: 48rpx;
					// 	height: 38rpx;
					// 	border: 1rpx solid black;
					// 	top: -42rpx;
					// 	left: -76rpx;
					// 	// transform: translate(-150%,-100%);

					// }

					.item-bg {
						width: 205rpx;
						height: 306rpx;
					}

					.item-bg2 {
						margin-top: 18rpx;
						width: 181rpx;
						height: 264rpx;
					}

					.left,
					.right {
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						margin-bottom: 50rpx;

						.steps {
							font-size: 24rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							font-weight: 400;
							color: #333333;
							margin-top: 20rpx;
						}

						.item-cont {
							position: absolute;
							width: 102rpx;
							height: 155rpx;
							margin-top: 33rpx;
						}

					}

				}

			}
		}

		.life {
			background: white;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #666666;
			line-height: 16rpx;
			background: #ffffff;
			border-radius: 12rpx;
			margin-top: 46rpx;

			padding: 0 38rpx;
			padding-top: 61rpx;
			padding-bottom: 27rpx;

		}

		.scenario {
			background: white;
			border-radius: 12rpx;
			margin-top: 82rpx;
			padding-left: 24rpx;
			padding-right: 27rpx;
			margin-bottom: 60rpx;

			.content {
				margin-top: 19rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.item {

					image {
						width: 186rpx;
						height: 180rpx;


						background: #ebe9e9;
						border-radius: 50%;

					}

					.name {
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						font-weight: 400;
						color: #666666;

					}

					margin-bottom: 61rpx;
				}

				view:last-of-type {
					margin-right: auto;
					margin-left: 36rpx;
				}
			}

		}

		.toon {
			margin-bottom: 233rpx;
		}

		.binding {
			width: 100%;
			background: #FFFFFF;
			position: absolute;
			bottom: 0;
			left: 0;

			.btn {
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				background: #0F57E4;

				border-radius: 39rpx;
				color: #ffffff;
				margin: 20rpx 68rpx;
				height: 77rpx;
				line-height: 77rpx;

			}

			.agreement {
				font-size: 26rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #333333;
				text-align: center;

				text {
					color: #0F57E4;
				}

				margin-bottom: 19rpx;
			}
		}
	}




	// 左连接管
	.left-link {
		position: absolute;
		width: 23rpx;
		height: 83rpx;
		left: 87rpx;
		bottom: -64rpx;
		// z-index: 999;
	}

	// 右连接管
	.right-link {
		position: absolute;
		width: 23rpx;
		height: 83rpx;
		right: 87rpx;
		bottom: -64rpx;
		// z-index: 999;
	}

	// 卡片标题
	.card-title {
		transform: translateY(-50%);
		position: relative;
		height: 71rpx;
		display: flex;
		justify-content: center;
		margin: 0 auto;
		align-items: center;

		.blue {
			background: #00A9FD;
			padding: 13rpx 35rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #ffffff;
			box-shadow: 0pt 7rpx 36rpx 0rpx rgba(15, 87, 228, 0.4);
		}

		.yellow {
			padding: 0 14rpx;
			height: 55rpx;
			background: #FEDB0B;
			display: flex;
			align-items: center;
			box-shadow: 0pt 7rpx 36rpx 0rpx rgba(15, 87, 228, 0.4);
		}
	}

	uni-button:after {
		border: none;
	}
</style>
