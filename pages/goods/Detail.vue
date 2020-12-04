<template>
	<view class="container">
		<view class="container-box">
        <image v-for="(item,index) in datas" @touchstart="touchstartClick($event,index)" @touchmove="touchmoveClick($event,index)" @touchend="touchendClick($event,index)" :src="item" mode="widthFix" />
    </view>
	</view>
</template>

<script>
	export default {
    props:['datas'],
		data() {
			return {
				 scrollYclientYstart:0,
        scrollYclientYend:0
			}
		},
		methods: {
        // 查看图文详情动画
      touchstartClick(e){
           this.scrollYclientYstart = e.touches[0].clientY
      },
      touchmoveClick(e){
        // console.log(e)
        this.scrollYclientYend = e.touches[0].clientY
      },
      touchendClick(e,index){
        if(index < 2){
        let Yclint = this.scrollYclientYend - this.scrollYclientYstart
        // console.log(Yclint)
        if(Yclint > 110){
            this.goGoodsDetail()
        }
        }
      },
      // 滚动到商品详情
      goGoodsDetail(){
          //  uni
					// 	.createSelectorQuery()
					// 	.select('.parentcontainer')
					// 	.boundingClientRect(data => {
					// 		//目标节点
					// 		uni
					// 			.createSelectorQuery()
					// 			.select('.xiaozhuchaungyi')
					// 			.boundingClientRect(res => {
									//最外层盒子节点
									uni.pageScrollTo({
										duration: 100, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
										scrollTop: 575 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
									})
						// 		})
						// 		.exec()
						// })
						// .exec()
      },
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
    .container-box{
      width: 95%;
      margin: 0 auto;
      image{
        width: 100%;
      }
    }
	}
</style>
