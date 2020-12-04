<template name="singleInput">
	<view>
		<view class="content">
			
			<view v-if="isPwd">
				<input
				@click="changeFocus"
				:class="borderStyle == 'all' ? 'iptbox all' : 'iptbox btm'" 
				v-for="index in length" 
				disabled
				type="password"
				v-model="value[index-1]" 
				:key="index"
				>
			</view>
			<view v-else>
				<input
				@click="changeFocus"
				:class="borderStyle == 'all' ? 'iptbox all' : 'iptbox btm'" 
				v-for="index in length" 
				disabled
				type="text"
				v-model="value[index-1]" 
				:key="index"
				>
			</view>
		</view>
		<input class="ipt" :maxlength="length" v-model="value">
	</view>
	
</template>

<script>
	export default {
		name: 'singleInput',
		props:{
			length: {
				type: Number,
				default: 4
			},
			isPwd: {
				type: Boolean,
				default: false
			},
			borderStyle: {
				type: String,
				default: 'all'
			}
		},
		data() {
			return {
				isFocus:true,
				value: ''
			};
		},
		watch:{
			value(e){
				this.$emit('input', e)
			}
		},
		methods:{
			clearVal(){
				this.value = ''
			},
			changeFocus(){
				this.$nextTick(function(){
					let uniBox = document.getElementsByClassName('ipt')[0]
					uniBox.getElementsByClassName('uni-input-input')[0].focus()
				})
			}
		}
	}
</script>

<style>
.content view{
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
}
.iptbox{
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.all{
	border:1rpx solid #ddd;
}
.btm{
	border-bottom:1rpx solid #ddd;
}
.ipt{
  width: 0;
  height: 0;
	min-height: 0;
}
.btn-area{
  width: 80%;
  background-color: orange;
  color:white;
}
</style>
