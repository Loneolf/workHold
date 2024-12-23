/* ***** BEGIN LICENSE BLOCK *****
# Copyright 2010 Alexandre Poirot
#
# Contributor(s):
#   Alexandre poirot <poirot.alex@gmail.com>
# 
# 
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either 
# version 2.1 of the License, or (at your option) any later version.
# 
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
# 
# You should have received a copy of the GNU Lesser General Public 
# License along with this library.  If not, see <http://www.gnu.org/licenses/>.
#
# ***** END LICENSE BLOCK *****/

/*使用方法
var unreadMsgCount = NativeBridge.call("getUnReadMsgCount");
NativeBridge.call("bindAccount",{}, function(result){
    if (result.isSucceed){
        alert("绑定成功")；
    }
});
*/
(function (win, doc) {
    win.NativeBridge = {};
    var IS_IN_APP = false;
    var IS_ANDROID = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
    if (IS_ANDROID) {
        if ("undefined" != typeof (window.citicsnativejs)) {
            if ("undefined" != typeof (window.citicsnativejs.getToken)) {
                IS_IN_APP = true;
            }
        }
    } else {
        if ("undefined" != typeof (citics_native_js_getToken)) {
            IS_IN_APP = true;
        }
    }

    function gotoDownloadPage() {
        // 下载信E投app引导页地址
        var pageLocation = "https://kong.citics.com/citics/download/H5/user/html/leading_index.html";

        cNative.closeAndOpenPage(pageLocation);
    }

    NativeBridge = {
        callbacks: {},

        //原生的回调方法
        //原生需要回调时，调用此方法
        //iOS范例：
        //[UIWebView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"NativeBridge.resultForCallback(%d,%@);",callbackId,resultObject]];
        resultForCallback: function resultForCallback(callbackId, resultObject) {
            try {
                var callback = NativeBridge.callbacks[callbackId];
                if (!callback) return;

                callback.call(null, resultObject);
            } catch (e) {
                alert(e)
            }
        },

        // 调用原生方法
        // functionName : string 方法名
        // args : 方法的参数（使用key:value对象方式传送）
        // callback : 回调方法 （对于不需回调的原生调用，可以不传此参数）
        call: function call(functionName, args, callback) {
            // alert('执行native bridge call');
            if (!IS_IN_APP) {
                if (functionName == 'getToken') {
                    var _token;
                    if (isSupportH5Localstorage()) {
                        //console.log('存localstorage');
                        _token = localStorage.getItem('token') || null;
                        return _token
                    }
                    ;
                    //yubai:to speed up, not using cookie
                    /*if (isSupportCookie()) {
                        //console.log('存cookie');
                        _token = $.cookie('token') || null;
                        return _token
                    };*/
                } else {
//                 gotoDownloadPage();
                    return;
                }
            }
            var hasCallback = callback && typeof callback == "function";
            var callbackId = hasCallback ? NativeBridge.uniqueId() : "-1";

            if (hasCallback) {
                NativeBridge.callbacks[callbackId] = callback;
            }

            if (IS_ANDROID) {
                return window.citicsnativejs.nativeBridge(functionName, callbackId, args);
            } else {
                return citics_native_js_nativeBridge(functionName, callbackId, args);
            }
            // return NATIVE_CALL(functionName, callbackId, args);
        },

        uniqueId: function uniqueId() {
            var mydate = new Date();
            return '' + mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
        }

    };

    //判断支持localstorage
    function isSupportH5Localstorage() {
        return !!window.localStorage;
    }

    win.resultForCallback = NativeBridge.resultForCallback;
//  window.trackEvent = function (action){
//		trackEventWithParam(action,{});
//  }
//  window.trackEventWithParam = function (action,param){
//  	if(typeof action === 'undefined' || !CiticsNative.isSupportNativeBridge()){
//  		return;
//  	}
//  	try{
//  		var param = [{"action":action,"param":param}];
//			CiticsNative.NativeCall("sendEventInfo",JSON.stringify(param));	
//  	}catch(e){
//  	}
//  }

    /*TODO
(1)封装成sea.js
(2)同步调用和异步调用对H5工程师，取决于是否传callback
(3)封装对于原生无此函数时的提示（errorMsg）if errorNo= "-1"
(4)封装在浏览器中调用此方法不会产生异常或崩溃的现象。
(5)版本控制
 */
    win.CiticsNative = {};
    CiticsNative = {
        NativeCall: function NativeCall(functionName, args, callback) {
            // alert('执行call');
            // 将args数组转化为string类型
            var strArgs = '';
            if (undefined != args && 'string' != typeof args && !(args instanceof Array)) {
                alert('NativeBridge传参args错误!');
                return;
            }
            if (undefined == args) {
                // 未传参数args
            } else if ('string' == typeof args) {
                strArgs = args;
            } else if (args instanceof Array) {
                strArgs = JSON.stringify(args);
            }

            var result = NativeBridge.call(functionName, strArgs, callback);
            if (typeof (result) == "undefined") {
                return;
            }
            if (result.errorNo == '-1') {
                alert('请先前往应用市场更新至最新版本，再回来开启该功能呦。');
                console.log(result.errorMsg);
                return;
            }
            if (result.errorNo == '0') {
                console.log(result.errorMsg);
                return result.result;
            }

            return result
        },
        isSupportNativeBridge: function isSupportNativeBridge() {
            var isSupportNB = false;
            if (IS_ANDROID) {
                if ("undefined" != typeof (window.citicsnativejs)) {
                    if ("undefined" != typeof (window.citicsnativejs.nativeBridge)) {
                        isSupportNB = true;
                    }
                }
            } else {
                if ("undefined" != typeof (citics_native_js_nativeBridge)) {
                    isSupportNB = true;
                }
            }
            return isSupportNB;
        }
    }

})(window, document);
// // 封装
// define(function(require, exports, module) {
//
// });