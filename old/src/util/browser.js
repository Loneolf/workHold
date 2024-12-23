/*
*判断访问终端
*/
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq", //是否QQ
      chrome:u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/),
      webview: u.toLowerCase().match(/www\.tzt\.cn/i) == 'www.tzt.cn', //是否webview
      // webview: !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) && u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
			winphone: u.indexOf("windows phone")>-1 //是否winphone
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
function isMobile() {
  var sUserAgent = navigator.userAgent.toLowerCase(),
    bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
    bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
    bIsMidp = sUserAgent.match(/midp/i) == "midp",
    bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
    bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
    bIsAndroid = sUserAgent.match(/android/i) == "android",
    bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
    bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
    bIsWebview = sUserAgent.match(/webview/i) == "webview";
  return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsWebview);
}

export default {
  browser:browser,
  isMobile:isMobile
}
