/**
 * Created by zhonglu on 2016/10/18.
 */
import xhr from '../../../../services/xhr/'
import browser from '../../../../util/browser'
import service_config from './service_config'

/**
 * 对应后端涉及到用户认证的 API
 */
class tradeService {
  getData(obj,oSendData,oConfig){
    return new Promise((resolve, reject) => {

      var config = {
        sURL:'/reqxml?',//默认请求服务器数据
        oSendData:{
          // MobileCode: '($MobileCode)',
          //时间戳
          Reqno: +new Date().getTime(),
          //请求服务器标示
          ReqlinkType: 0
        },//发送数据
        copyIsArray:true,//深拷贝还是潜拷贝
        Error:null,//去除错误编号
        isload:true,//loading加载图
        tztWebdataEncrypt:true//是否需要解密，默认解密
      };
      if(oConfig){
        config.oConfig = oConfig;
      }
      if(typeof obj == 'object'){
        var iscopy = config.copyIsArray;
        if(typeof obj.copyIsArray != 'undefined'){
          iscopy = obj.copyIsArray;
        }
        config = $.extend(iscopy,config,obj);
      }
      var newUrl = config.sURL,newData = '';

      if (config.oSendData != '') {
        if(typeof config.oSendData == "object"){
          // alert("原数据：" + JSON.stringify(oSendData));
          for (var x in config.oSendData) {
            if (newData == "") {
              newData += x + '=' + encodeURIComponent(config.oSendData[x]);
            } else {
              newData += '&' + x + '=' + config.oSendData[x];
            }
          }
          newData = newData.replace(/\%24MobileCode/g,'$MobileCode');
        }else if(typeof config.oSendData == "string"){
          newData+='&'+config.oSendData;
        }
      }
      newData = newData.replace(/undefined/g,'');
      // if(config.tztWebdataEncrypt){
      //   if (browser.browser.versions.android) {
      //     try {
      //       newData = window.MyWebView.onWebdataEncrypt(newData);
      //     } catch (e) {
      //
      //     }
      //   }else{
      //     try {
      //       newData = window.onWebdataEncrypt(newData);
      //     } catch (e) {
      //
      //     }
      //   }
      // }
      xhr({url:newUrl,body:newData}).then((oData)=>{

        if(oData.ERRORNO=='-10000'){
          alert("请求超时");
          return;
        }
        if (oData.ERRORNO < 0) {
          if(config.oConfig){
            if(typeof config.oConfig === 'function'){
              resolve(oData);
            }
            config.oConfig && resolve(oData);
            return;
          }
          if(oData.ERRORMESSAGE != null && oData.ERRORMESSAGE != "" && (typeof oData.ERRORMESSAGE != 'undefined')){
            if(oData.ACTION != '' && oData.ACTION != '65535'){
              // alert(oData.ERRORMESSAGE);
            }
            resolve(oData)
          }else{
            resolve(oData)
          }

        } else {
          resolve(oData)
        }

      })
    })
  }
}

// 实例化后再导出
export default new tradeService()
