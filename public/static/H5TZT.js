/*
该js 用于vue嵌入APP页面
 */
var H5TZT = {},
    core_strundefined = typeof undefined;
    
H5TZT.tztwkwebviewObj = {}; //队列
H5TZT.appversion = {
    v:navigator.appVersion.toLocaleLowerCase(),
    iphone:function(){
        if(appversion.indexOf("iphone")>0){
            return true;
        }else{
            return false;
        }
    },
    andriod:function(){
        if(appversion.indexOf("android")>0){
            return true;
        }else{
            return false;
        }
    },
    win:function(){
        if(appversion.indexOf("windows phone")>0){
            return true;
        }else{
            return false;
        }
    }
}
/**
 * [readLocalMesg 读取客户端内容]
 * @param  {[type]} sArray    [description]
 * @param  {[type]} fnSuccess [description]
 * @return {[type]}           [description]
 */
H5TZT.readLocalMesg = function(sArray, fnSuccess){
    var sSendURL = "",
        oThis = this,
        isSlice=true;
    if(typeof sArray == 'string'){
        sSendURL = sArray;
    }else{
        for (var x = 0; x < sArray.length; x++) {
            if(sArray[x].indexOf('=')>0){
                sSendURL += sArray[x]+"&";
                isSlice = false;
            }else{
                sSendURL += sArray[x] + "=" + "&";
                isSlice = true;
            }
        }
        sSendURL = sSendURL.slice(0, -1);
    }
    var config = {
        newUrl:'/reqlocal?',
        fnSuccess:fnSuccess,
        tztWebdataEncrypt:1
    };
    H5TZT.tztWebdataEncrypt(config,sSendURL,'H5SetDataEncrypt');
}

H5TZT.saveMapMesg = function(obj, fnSuccess) {
    var sSendURL = "",
        oThis = this,
        isSlice=true;
    if(typeof obj == 'string'){
        sSendURL = obj;
    }else{
        for (var x in obj) {
            sSendURL += x +'='+encodeURI(obj[x])+'&'
        }
        sSendURL = sSendURL.slice(0, -1);
    }
    var config = {
        newUrl:'/reqsavemap?',
        fnSuccess:fnSuccess,
        tztWebdataEncrypt:1
    };
    H5TZT.tztWebdataEncrypt(config,sSendURL,'H5SetDataEncrypt');
}

H5TZT.readMapMesg = function(sArray, fnSuccess) {
    var sSendURL = "",
        oThis = this;
    if(typeof sArray != 'string'){
        for (var x = 0; x < sArray.length; x++) {
            sSendURL += sArray[x] + "=" + "&"
        }
        sSendURL = sSendURL.slice(0, -1);
    }else{
        sSendURL = sArray;
    }
    var config = {
        newUrl:'/reqreadmap?',
        fnSuccess:fnSuccess,
        tztWebdataEncrypt:1
    };
    H5TZT.tztWebdataEncrypt(config,sSendURL,'H5SetDataEncrypt');
}

H5TZT.saveFileMesg = function(saveMesg, fileName, fnSuccess) {
    var SAVEDATA = '';
    if(typeof saveMesg == 'string'){
        SAVEDATA = saveMesg;
    }else{
        SAVEDATA = JSON.stringify(saveMesg);
    }
    var sSendURL = "/reqsavefile?filename=" + fileName;
    var config = {
        newUrl:sSendURL,
        fnSuccess:fnSuccess,
        tztWebdataEncrypt:1
    };
    H5TZT.tztWebdataEncrypt(config,encodeURI(SAVEDATA),'H5SetDataEncrypt');
}
H5TZT.readFileMesg = function(fileName, fnSuccess) {
    var sSendURL = "/reqreadfile?filename=" + fileName;
    var config = {
        newUrl:sSendURL,
        fnSuccess:fnSuccess,
        tztWebdataEncrypt:1
    };
    H5TZT.tztWebdataEncrypt(config,'','H5SetDataEncrypt');
}
H5TZT.loadFileMesg = function(str, fnSuccess) {
    var sSendURL = "/reqloadfile?";
    if(typeof str == 'string'){
        sSendURL = sSendURL + str;
    }else{
        for(var t in str){
            sSendURL+=t+'='+str[t]+'&'
        }
        sSendURL = sSendURL.slice(0, -1);
    }
    var config = {
        newUrl:sSendURL,
        fnSuccess:fnSuccess,
        tztWebdataEncrypt:1
    };
    H5TZT.tztWebdataEncrypt(config,'','H5SetDataEncrypt');
}
H5TZT.reqsofttodo = function(obj, fnSuccess) {
    var sSendURL = "/reqsofttodo?";
    if(obj == ''){
        return;
    }
    if(typeof obj == 'string'){
        sSendURL = sSendURL + obj;
    }else{
        for (var x in obj) {
            sSendURL += x + "=" + obj[x] + "&"
        }
        sSendURL = sSendURL.slice(0, -1);
    }
    var config = {
        newUrl:sSendURL,
        fnSuccess:fnSuccess,
        tztWebdataEncrypt:1
    };
    H5TZT.tztWebdataEncrypt(config,'','H5SetDataEncrypt');
}

/*
 *tztWebdataEncrypt 处理加解密
 *@config config对象
 *@newData 加解密的数据
 *@func 回调函数名
 *@webViewFunc webview的方法 onWebdataEncrypt(加密)、OnWebDataDecrypt(解密)
*/
H5TZT.tztWebdataEncrypt = function(config,newData,func,webViewFunc){
    webViewFunc = webViewFunc || 'onWebdataEncrypt'
    if(config.tztWebdataEncrypt && typeof newData === 'string' && newData.indexOf('tztwkwebview')<0 && newData.indexOf('TZTWKWEBVIEW')<0){
        if (H5TZT.appversion.v.indexOf("android") > 0) {
            if(webViewFunc == 'OnWebDataDecrypt' && func == 'H5Success'){
                func = 'H5WebViewSuccess'
            }
            try {
                newData = window.MyWebView[webViewFunc](newData);

                window[func](newData,config);
            } catch (e) {
                window[func](newData,config);
            }
        }else{
            H5TZT.readLocalMesg(['tztwkwebview'],function(data){
                if(webViewFunc == 'OnWebDataDecrypt' && func == 'H5Success'){
                    func = 'H5WebViewSuccess'
                }
                if(data.TZTWKWEBVIEW == 1){
                    var reqno = new Date().getTime();
                    while(reqno in H5TZT.tztwkwebviewObj){
                        reqno = reqno+''+Math.floor(Math.random()*1000); //避免重复;
                    }
                    H5TZT.tztwkwebviewObj[reqno] = config;
                    window.webkit.messageHandlers[webViewFunc].postMessage({
                        func: func, //回调函数名
                        data: newData, //数据
                        reqno:reqno
                    });
                }else{
                    try {
                        newData = window[webViewFunc](newData);
                    } catch (e) {
                    }
                    window[func](newData,config);
                }
            });
        }
    }else{
        window[func](newData,config);
    }
}

H5TZT.getData = function(obj,oSendData,fnSuccess,oConfig){
    var req = {
        XML: "/reqxml?",//请求服务器数据
        LOCAL: "/reqlocal?",//请求本地数据
        BINARY: "/reqbinary?",//请求服务器文件数据
        SAVEMAP: "/reqsavemap?",//请求本地保存数据
        READMAP: "/reqreadmap?",//读取本地保存数据
        SAVEFILE: "/reqsavefile?",//请求本地保存文件
        READFILE: "/reqreadfile?",//读取本地保存文件
        SOFTTODO: "/reqsofttodo?",//设置本地数据
        LOADFILE: "reqloadfile?",//加载本地文件
        SIGNATURE: "reqsignature?"//请求签名数据
    };

    var config = {
        logintype:1,//1普通交易2是融资融券交易8是个股期权交易9担保品划转
        sURL:req.XML,//默认请求服务器数据
        oSendData:{
            MobileCode: '($MobileCode)',
            IntactToServer: '($IntactToServer)',
            //时间戳
            Token: '($Token)',
            //请求标识
            Reqno: +new Date().getTime(),
            //请求服务器标示
            ReqlinkType: 1,
            newindex:1
        },//发送数据
        copyIsArray:true,//深拷贝还是潜拷贝
        fnSuccess:null,//errorno大于0的回调函数
        oConfig:null,//errorno小于o回调函数
        Error:null,//去除错误编号
        isload:true,//loading加载图
        isURL:false,//使用url传参
        isToken:true,//使用url传参
        tztWebdataEncrypt:true,//是否需要解密，默认解密
        timeout:30000
    };

    if(typeof obj == 'string'){
        config.sURL = obj;
    }
    if(oSendData && (typeof oSendData == 'object')){
        for(var oSend in oSendData){
            config.oSendData[oSend] = oSendData[oSend];
        }
    }
    if(fnSuccess){
        config.fnSuccess = fnSuccess;
    }
    if(oConfig){
        config.oConfig = oConfig;
    }
    if(typeof obj == 'object'){
        var iscopy = config.copyIsArray;
        if(typeof obj.copyIsArray != core_strundefined){
            iscopy = obj.copyIsArray;
        }
        config = $.extend(iscopy,config,obj);
    }
    //行情的功能号，去掉手机号 修改时间：20171020
    if(config.oSendData.ReqlinkType == 0 || config.oSendData.reqlinkType == 0 || config.oSendData.reqLinkType == 0 || config.oSendData.reqlinktype == 0){
        delete config.oSendData.MobileCode;
    }
    if(config.isload){
        // T.loadTips({istip:true}); //加载框
    }
    if(config.isURL){
        if('action' in config.oSendData){
            for(var x in config.oSendData){
                if(!config.isToken && config.oSendData[x] == 'Token'){
                    continue;
                }
                config.sURL += config.oSendData[x]+'&';
            }
            config.sURL = config.sURL.slice(0,-1);
        }
        config.oSendData = '';
    }
    var newUrl = '',newData = '';
    if (config.sURL.indexOf('?') >= 0 && (config.sURL.indexOf('reqsavefile')<0) && (config.sURL.indexOf('reqreadfile')<0)) {
        var dataSurl = config.sURL.split('?');
        newUrl = dataSurl[0];
        newData = dataSurl[1];
    } else {
        newUrl = config.sURL;
    }
    config.newUrl = newUrl;
    if (config.oSendData != '') {
        if(typeof config.oSendData == "object"){
            // alert("原数据：" + JSON.stringify(oSendData));
            for (var x in config.oSendData) {
                if(!config.isToken && x == 'Token'){
                    continue;
                }
                newData += x + '=' + encodeURIComponent(config.oSendData[x])+'&';
            }
            newData = newData.replace(/\%24MobileCode/g,'$MobileCode').slice(0,-1);
        }else if(typeof config.oSendData == "string"){
            newData+='&'+config.oSendData;
        }
    }
    //回调函数 data 原文 encrypt 加密数据
    newData = newData.replace(/undefined/g,'');
    
    H5TZT.tztWebdataEncrypt(config,newData,'H5SetDataEncrypt');
    //sRequestURL, oSendData, fnSuccess, oConfig

};
window.H5SetDataEncrypt = function(newData,config){
    if(typeof config != 'object' && config){
        config = H5TZT.tztwkwebviewObj[config] || {};
    }
    //发送请求
    var oDefConfig = {
        type: "POST",
        url: config.newUrl,
        data: newData,
        timeout:config.timeout || 30000,
        processData:false,
        contentType: "application/x-www-form-urlencoded;",//beforeSend发送之前complete应答之后
        success: function(oData) {
            if(typeof oData === 'string' && oData != ''){
                try{
                    oData = JSON.parse(oData);
                }catch(e){
                    try{
                        oData = eval("("+oData+")");
                    }catch(e){}
                }
            }
            if(oData && (typeof oData === 'object') && ('tztAjaxData' in oData)){
                oData = oData.tztAjaxData;
                H5TZT.tztWebdataEncrypt(config,oData,'H5Success','OnWebDataDecrypt');
            }else{
                window.H5Success(oData,config);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            //暂时屏蔽所有error弹出来的问题 修改时间：2017-12-28
            // TZT.ajaxError(XMLHttpRequest, textStatus, errorThrown);
        }
    },
    oAjaxParm = {},
    oParam = config.oSendData || {};
    if (oParam) {
        delete oParam.url;
        delete oParam.success
    }
    if(config.tztWebdataEncrypt){
        oDefConfig.headers = {'tztWebdataEncrypt':1};
    }
    //oAjaxParm = $.extend(oAjaxParm, oParam);
    $.ajax(oDefConfig);
};
window.H5WebViewSuccess = function(oData,config){
    if(typeof oData === 'string' && oData != ''){
        try{
            oData = decodeURIComponent(oData);
        }catch(e){
            
        }
    }
    window.H5Success(oData,config);
}
/*
 *success 全局的方法 ajax请求成功之后的回调
 *@oData 返回的数据
 *@config config
*/
window.H5Success = function(oData,config){
    if(typeof oData === 'string' && oData != ''){
        try{
            oData = JSON.parse(oData);
        }catch(e){
            try{
                oData = eval("("+oData+")");
            }catch(e){}
        }
    }
    if(typeof config != 'object' && config){
        config = H5TZT.tztwkwebviewObj[config] || {};
    }

    config.fnSuccess && config.fnSuccess(oData);
}