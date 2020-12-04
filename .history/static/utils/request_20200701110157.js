let loadingNum = 0
import { GetUrlParam } from './until.js'
import Vue from 'vue'
export const http = (params) => {
	console.log(Vue.prototype.$api, Vue.prototype.$o2oApi)
	loadingNum++
	// loading
	uni.showLoading({
		title: '加载中',
		mask: true,
	})
	let header = {}
	params.type === 'formData'
		? (header = {
				token: uni.getStorageSync('auth-token'),
				os: 'wxShareLogin',
				'content-type': 'application/x-www-form-urlencoded',
		  })
		: (header = {
				os: 'wxShareLogin',
				token: uni.getStorageSync('auth-token'),
		  })
	return new Promise((resolve, reject) => {
		uni.request({
			url: params.path,
			...params,
			header,
			success: (result) => {
				if (result.data.code === 200 || result.data.status === '200') {
					loadingNum--
					!loadingNum && uni.hideLoading()
					resolve(result)
				} else if (
					// params.path.slice(0, 29) == 'https://api.51lzt.com/v4.2.0'//正式
					// params.path.slice(0, 29) == parseInt(GetUrlParam('share')) === 1  ? 'http://api.51lzt.com/v4.2.0/' : 'https://api.51lzt.com/v4.2.0'//正式分享
					// params.path.slice(0, 29) == 'https://api1.51lzt.com/v4.2.0' //测试
					params.path.match(RegExp(Vue.prototype.$api))
				) {
					if (result.data.status == 429) {
						loadingNum--
						!loadingNum && uni.hideLoading()
						uni.showToast({
							title: result.data.msg,
							icon: 'none',
							duration: 2000,
						})
						uni.navigateTo({
							url: '/pages/check-register-code/check-register-code',
						})
						uni.removeStorageSync('auth-token')
					} else {
						loadingNum--
						!loadingNum && uni.hideLoading()
						uni.showToast({
							title: result.data.msg,
							icon: 'none',
							duration: 2000,
						})
					}
				} else {
					if (result.data.status == 429) {
						loadingNum--
						!loadingNum && uni.hideLoading()
						uni.showToast({
							title: result.data.msg,
							icon: 'none',
							duration: 2000,
						})
						uni.navigateTo({
							url: '/pages/check-register-code/check-register-code',
						})
						uni.removeStorageSync('auth-token')
					}
					loadingNum--
					!loadingNum && uni.hideLoading()
					uni.showToast({
						title: result.data.message,
						icon: 'none',
						duration: 2000,
					})
				}
			},
			fail: (err) => {
				reject(err)
			},
		})
	})
}
