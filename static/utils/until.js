/**
 * @param {String} url
 * @description 获取url参数
 */
export const GetUrlParam = paraName => {
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
}

/**
 * app方法调用
 * @param {String} -method 协定方法
 * @param {Object} -val data
 * @description
 *
 * 分享
 * lztShareAction:  分享
 *  {title:  标题,desc: 描述,icon: '',url:  分享地址 window.location.href.split('?')[0]}
 *
 * 跳往登录
 * lztLoginAction：登录
 *
 * 原生导航右按钮
 * lztCustomTitle：原生导航右按钮
 * {title:'兑换记录',url:'跳转的url'}
 *
 * 支付
 * lztPayAction：支付
 * {orderId:'订单号',goodsDes:'商品描述',payPrice:'金额'}
 *
 * 跳转商品详情
 * lztCommodityAction: 跳转商品详情
 * {_id:'商品id',type: 1}
 *
 *
 */
export const nativeMethods = (method, val) => {
	const u = navigator.userAgent
	const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

	if (isAndroid) {
		try {
			if (val) {
				console.log(val)
				window.lztLoginAction[method](JSON.stringify(val))
			} else {
				window.lztLoginAction[method]()
			}
		} catch (e) {
			// console.log(e)
		}
	} else {
		try {
			var data = val ? JSON.stringify(val) : 'xxxxxxx'
			window.webkit.messageHandlers[method].postMessage(data)
		} catch (error) {
			// alert(error)
		}
	}
}

export const checkMobile = mobile => {
	return RegExp(/^1[34578]\d{9}$/).test(mobile);
}

export const isApp = () => {
  if (parseInt(GetUrlParam('share')) === 1) {
    goNativeApp()
  } else {
    console.log('在APP')
  }
}
// 微信小程序获取当前页url
/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length-1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  
  //拼接url的参数
  var urlWithArgs = url + '?'
  for(var key in options){
      var value = options[key]
      urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)
  
  return urlWithArgs
}
// h5 复制剪贴板
import Clipboard from 'clipboard'
 
export function handleClipboard (text, event, onSuccess, onError) {
  event = event || {}
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    onSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    onError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

import wx from 'weixin-js-sdk'
export function wxShare(obj) {
	debugger
	wx.ready(function () {
		wx.updateAppMessageShareData({
			title: obj.title, // 分享标题
			desc: obj.desc, // 分享描述
			link: obj.url, // 分享链接
			imgUrl: obj.img, // 分享图标
			success () {
				// 用户成功分享后执行的回调函数
				option.success()
				console.log('成功')
			},
			cancel () {
				// 用户取消分享后执行的回调函数
				option.error()
				console.log('取消')
			}
		})
		wx.updateTimelineShareData({
			title: obj.title, // 分享标题
			link: obj.url, // 分享链接
			imgUrl: obj.img, // 分享图标
			success () {
				// 用户成功分享后执行的回调函数
				option.success()
				console.log('成功')
			},
			cancel () {
				// 用户取消分享后执行的回调函数
				option.error()
				console.log('取消')
			}
		})
	})
}