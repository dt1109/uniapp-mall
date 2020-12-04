<template>
	<view class="container">
      <uni-popup ref="popupType"
                 type="bottom">
        <view class="goods-choose-type">
          <image class="goods-closeimg"
                 @click="closeImg('type')"
                 src="https://lztimg.oss-cn-qingdao.aliyuncs.com/home/img/icons/grayX.png"
                 mode="" />
          <view class="goods-choose">
            <view class="goods-choose-col">
              <image v-if="goodsSpecObj" :src="goodsSpecObj.tupian || goodsInfo.banner[0] || ''"
                     mode="" />
                     <!-- {{图片}} -->
              <view style="padding-top:70rpx;margin-left:30rpx">
                <text><text class="goods-small">￥</text><text v-if="goodsSpecObj.xianjai">{{goodsSpecObj.xianjai}}</text><text
                        v-else-if="!goodsSpecObj.xianjai && goodsData.goods.newprice">{{goodsData.goods.newprice}}</text></text>
                <view class="goods-kucun">库存：<text>{{goodsData.goods.stocks}}</text></view>
              </view>
            </view>
            <view v-for="(item, index) in goodsData.goods.specifications"
                  :key="index">
              <view class="goods-bold" v-for="(children,keys) in item" :key="keys">
                {{ keys }}
              </view>
              <view class="good-btn" v-for="(children,keys) in item" :key="children[keys]">
                <button :data-info="idx"
                        class="good-btn-item"
                        :class="items === selectStocksKey[index] ? 'active' : ''"
                        v-for="(items, idx) in item[keys]"
                        :key="idx"
                        size="mini"
                        @click="selectSpec(index, keys, items)"><text>{{items}}</text></button>
              </view>
            </view>
            <view class="goods-numbox">
              <view class="goods-bold"> 数量</view>
              <view class="goods-numbox-right">
                <uni-number-box @change="bindChangeNumBox"
                                :value="submitGoodsData.number"
                                class="numboxwidth"></uni-number-box>
              </view>
            </view>
          </view>
          <view class="goods-buynow">
            <view class="goods-buynow-wid"
                  v-if="!isbuyNow">
              <text class="goos-buynow-btn btnyellow"
                    @click="addCart">加入购物车</text>
            </view>
            <view class="goods-buynow-wid"
                  v-if="!isbuyNow">
              <text class="goos-buynow-btn btnred"
                    @click="buyNow">立即购买</text>
            </view>
            <view class="goos-buynow-btnsure"
                  v-if="isbuyNow">
              <text class="goos-buynow-btn btnred"
                    @click="buyNow">确定</text>
            </view>
          </view>
        </view>
      </uni-popup>
	</view>
</template>

<script>
import {mapState} from 'vuex'
	export default {
		data() {
			return {
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
        	// 选择商品规格详情
				goodsSpecObj: {
					tupian: "",
					xianjia: ""
        },
        submitGoodsData: {
					specList: [],
					number: 1,
					id: '',
					goodsShopName: ''
        }, //提交订单商品信息
        // 选择规格列表
				selectStocksList: [],
				// 选中的标签
        selectStocksKey: [],
        	goodsData: {
					goods: []
        }, // 商品详情
        goodsInfo: {
					banner: []
        },
        isbuyNow: false, //是否立即购买
			}
    },
    created() {
      this.goodsData = uni.getStorageSync('goodsData')
      this.goodsInfo = uni.getStorageSync('goodsInfodata')
      // console.log(this.goodsInfo)
    },
    computed: mapState([
          'goodsId','shareId'
    ]),
		methods: {
        	//关闭弹窗
			closeImg(type) {
				if (type == 'type') {
					this.$refs.popupType.close()
				} else {
					this.$refs.popupArea.close()
				}
      },
      	// 选择规格
			selectSpec(index, key, item) {
				//console.log(this.goodsData.goods.specifications)
				//console.log(key)
				this.goosbuttonIndex = index
				this.selectStocksList.splice(index, 1, {
					keys: key,
					items: item
				})
				this.selectStocksKey.splice(index, 1, item)
				if (
					this.goodsData.goods.specifications.length ===
					this.selectStocksList.length
				) {
					let selData = {}
					for (let j = 0; j < this.selectStocksList.length; j++) {
						selData[this.selectStocksList[j].keys] = this.selectStocksList[
							j
						].items
					}
					this.goodsData.goods.stockslist.map(stockslistItem => {
						let itemSpec = this.contrastObj(stockslistItem, selData)
						if (this.isObjectValueEqual(itemSpec, selData)) {
							let array = ''
							let arrayR = []
							for (let i = 0; i < this.selectStocksList.length; i++) {
								let specification = this.selectStocksList[i].keys + ':' + item
								array += specification
								arrayR.push(specification)
							}
							this.submitGoodsData.specList = array
							this.submitGoodsData.specListR = arrayR
						//	console.log(stockslistItem)
							if (stockslistItem) {
								this.goodsSpecObj.tupian = stockslistItem.图片
								this.goodsSpecObj.xianjia = stockslistItem.现价
							}
							// this.goodsSpecObj = stockslistItem
						}
					})
				}
      },
      	// 使返回规格列表字段，和用户点击字段相等，用于对比
			contrastObj(obj1, obj2) {
				let obj2Keys = Object.keys(obj2)
				let assObj1 = {}
				for (let k = 0; k < obj2Keys.length; k++) {
					assObj1[obj2Keys[k]] = obj1[obj2Keys[k]]
				}
				return assObj1
      },
      // 判断两对象是否相等
			isObjectValueEqual(a, b) {
				let aProps = Object.getOwnPropertyNames(a)
				let bProps = Object.getOwnPropertyNames(b)
				if (aProps.length !== bProps.length) {
					return false
				}
				for (var i = 0; i < aProps.length; i++) {
					var propName = aProps[i]
					var propA = a[propName]
					var propB = b[propName]
					if (propA !== propB) {
						return false
					}
				}
				return true
			},
      // 购物车数量
			bindChangeNumBox(val) {
				if (this.submitGoodsData.specList.length <= 0) {
					uni.showToast({
						title: '请选择商品规格',
						icon: 'none'
					})
					return
				}
				this.submitGoodsData.number = val
      },
      // 加入购物
			addCart() {
				uni.showToast({
					title: '加入购物车成功',
					icon: 'none'
				})
      },
      //立即购买 确定规格购买
			buyNow() {
				if (this.submitGoodsData.specList.length <= 0) {
					uni.showToast({
						title: '请选择商品规格',
						icon: 'none'
					})
					return
				}
				// // 阻止提交
        // return
        // console.log(this.goodsId)
				this.$http({
					path: this.$o2oApi + '/malls/order',
					data: {
						param: JSON.stringify([{
							_id: this.goodsId,
							num: this.submitGoodsData.number,
							goodstype: this.submitGoodsData.specList,
							ptType: '',
							sharingUserId: ''
						}])
					},
					type: 'formData',
					method: 'POST'
				}).then(res => {
					// console.log(res)
					uni.setStorageSync('orderInfo', res.data.data)
					uni.navigateTo({
						url: '../../pages/order/index?id=' +
							this.goodsId +
							'&buynum=' +
							this.submitGoodsData.number +'&sharingUserId='+ this.shareId+
							''
					})
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	 /** modua 样式*/
	.goods-choose-type {
		width: 100%;
		height: 70vh;
		border-radius: 20rpx 20rpx 0 0;
		background: #ffffff;
		position: relative;

		.goods-choose {
			padding: 20rpx;

			image {
				width: 150rpx;
				height: 150rpx;
			}

			.goods-numbox {
				display: flex;

				.goods-numbox-right {
					margin-left: auto;
				}
			}
		}

		.goods-choose-col {
			display: flex;
			flex: 1;
			color: #e51c23;
			position: relative;

			.goods-kucun {
				color: #999999;
				font-size: 26rpx;
			}
		}
	}
.goods-closeimg {
		width: 27.2rpx;
		height: 27.2rpx;
		float: right;
		margin: 25rpx 28rpx;
	}
  /** 立即购买*/
	.goods-buynow {
		position: absolute;
		bottom: 20rpx;
		width: 100%;
		display: flex;

		.goods-buynow-wid {
			width: 50%;
		}

		.goos-buynow-btn {
			display: block;
			width: 75%;
			margin: 0 auto;
			height: 67rpx;
			line-height: 67rpx;
			border-radius: 32rpx;
			text-align: center;
			font-size: 12px;
		}

		.goos-buynow-btnsure {
			width: 100%;
		}
  }
  /** 按钮组 规格*/
	.good-btn {
		margin-top: 20rpx;

		.good-btn-item {
			background: #e7e7e7;
		}

		.active {
			background: #e51c23;
			color: #fff;
		}

		button {
			border-radius: 26rpx;
			height: 50rpx;
			line-height: 50rpx;
			-webkit-text-size-adjust: none;
			// font-size: 2px;
		}

		button text {
			display: inline-block;
			transform: scale(0.8);
		}

		button:not(:nth-child(1)) {
			margin-left: 30rpx;
		}

		button::after {
			border: none;
		}
  }
  .numboxwidth {
		width: 150rpx;
		margin-top: 20rpx;
  }
  .btnyellow {
		background: #f5a53d;
		color: #fff;
	}

	.btnred {
		background: #e51c23;
		color: #fff;
	}
</style>
