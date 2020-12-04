<script>
import wx from 'weixin-js-sdk'
import pageAnimation from './components/Michael-pageAnimationPlus'
export default {
	mixins: [pageAnimation],
	created() {
		// this.$http({
		// 	path: this.$o2oApi + '/wxauthorize/ticket',
		// 	data: {url: encodeURIComponent(window.location.href.split('#')[0])}
		// }).then(res => {
		// 	wx.config({
		// 		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		// 		appId: res.data.appId, // 必填，公众号的唯一标识
		// 		timestamp: res.data.timestamp, // 必填，生成签名的时间戳
		// 		nonceStr: res.data.nonce_str, // 必填，生成签名的随机串
		// 		signature: res.data.signature, // 必填，签名
		// 		jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
		// 	})
		// })
	},
	onLaunch: function() {
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 引入全局scss样式 */
@import './static/common/common.scss';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
*{
	box-sizing: border-box;
}
body{
	background-color: #F6F6F6;
}
</style>
