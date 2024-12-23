/**
 * Created by zhonglu on 2016/10/18.
 */
import xhr from '../../../../services/xhr/'
import userService from '../../../../services/userService'
import localService from '../../../../services/localService'
import service_config from './service_config'

/**
 * 对应后端涉及到用户认证的 API
 */
class tradeService {
  getData(obj,oSendData,oConfig){
    return new Promise((resolve, reject) => {

      var config = {
        logintype:1,//1普通交易2是融资融券交易8是个股期权交易9担保品划转
        sURL:'/reqxml',//默认请求服务器数据
        oSendData:{
          //渠道
          // channels:'($channels)',
          MobileCode: '($MobileCode)',
          //时间戳
          Token: '($Token)',
          //请求标识
          Reqno: +new Date().getTime()+(1*parseInt(Math.random()*1000,0)+''),
          //请求服务器标示
          ReqlinkType: 1,
          newindex:1
        },//发送数据
        copyIsArray:true,//深拷贝还是潜拷贝
        Error:null,//去除错误编号
        isload:true,//loading加载图
        isToken:true,//loading加载图
        tztWebdataEncrypt:true//是否需要解密，默认解密
      };
      if(typeof obj == 'string'){
        config.sURL = obj;
      }
      if(oSendData && (typeof oSendData == 'object')){
        for(var oSend in oSendData){
          config.oSendData[oSend] = oSendData[oSend];
        }
      }
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

      if (config.oSendData != '') {
        if(typeof config.oSendData == "object"){
          // alert("原数据：" + JSON.stringify(oSendData));
          for (var x in config.oSendData) {
            if(!config.isToken && x == 'Token'){
              continue;
            }
            if (newData == "") {
              newData += x + '=' + encodeURIComponent(config.oSendData[x]);
            } else {
              newData += '&' + x + '=' + config.oSendData[x];
            }
          }
          newData = newData.replace(/\%24/g,'$');
        }else if(typeof config.oSendData == "string"){
          newData+='&'+config.oSendData;
        }
      }
      newData+='&tfrom=h5&cfrom=mobile';
      // var tztReplace = localService.readMapMesg(service_config.tztReplace);
      var logintype = 'logintype='+config.logintype;
      var aReplace = service_config.tztReplace;
      var aRep = [].concat(aReplace);
      aRep.push(logintype);
      // console.log(aRep);
      //单独取渠道值
      localService.readMapMesg(service_config.tztComFields).then((tztComFields)=>{
        localService.readMapMesg(aRep).then((tztReplace)=>{
          newData = newData.replace(/undefined/g,'');
          if(!!tztComFields.channels) tztReplace.channels = tztComFields.channels; //赋值
          if(tztReplace.TOKEN){
            newData = newData.replace(/\(\$Token\)/g,tztReplace.TOKEN);
          }
          if(tztReplace.channels){
            newData = newData.replace(/\(\$channels\)/g,tztReplace.channels);
          }else{
            newData = newData.replace(/\(\$channels\)/g,"");
          }
          if(tztReplace.acitve_phone){
            newData = newData.replace(/\(\$MobileCode\)/g,tztReplace.acitve_phone);
          }
          if(tztReplace.USERCODE){
            newData = newData.replace(/\(\$usercode\)/g,tztReplace.USERCODE);
          }
          if(tztReplace.KHBRANCH){
            newData = newData.replace(/\(\$khbranch\)/g,tztReplace.KHBRANCH);
          }
          if(tztReplace.FUNDACCOUNT){
            newData = newData.replace(/\(\$fundaccount\)/g,tztReplace.FUNDACCOUNT);
          }
          if(tztReplace.account){
            newData = newData.replace(/\(\$fundaccount\)/g,tztReplace.account);
          }
          xhr({url:newUrl,body:newData}).then((oData)=>{

            oData.TOKEN && localService.saveMapMesg({TOKEN:oData.TOKEN,logintype:config.logintype});
            oData.INTACTTOSERVER && localService.saveMapMesg({INTACTTOSERVER:oData.INTACTTOSERVER});
            if(config.Error && (typeof config.Error != core_strundefined)){
              for(var i=0;i<config.Error.length;i++){
                var indexs = service_config.aChangeError.indexOf(config.Error[i]);
                if(indexs>=0){
                  service_config.aChangeError = service_config.aChangeError.slice(indexs,2).concat(aChangeError.slice(indexs+1,aChangeError.length));
                }
              }
            }

            if(oData.ERRORNO=='-10000'){
              $.alert("请求超时");
              return;
            }
            if (service_config.aChangeError.indexOf(oData.ERRORNO) >= 0) {

              // TZT.fn.action10402(TZT.fn.action10090({isExport:true,logintype:config.logintype}),{logintype:config.logintype});
              $.hidePreloader();
              userService.logout(config.logintype);
              // resolve(null)
            } else if (oData.ERRORNO < 0) {

              if(config.oConfig){
                if(typeof config.oConfig === 'function'){
                  return resolve(oData);
                }
                if(config.oConfig && config.oConfig.fnZeroLeft){
                  return resolve(oData);
                }
              }

              if(oData.ERRORMESSAGE != null && oData.ERRORMESSAGE != "" && (typeof oData.ERRORMESSAGE != 'undefined')){
                if(oData.ACTION != '' && oData.ACTION != '65535'){
                  // $.alert(oData.ERRORMESSAGE);
                  return resolve(oData);
                }
              }else{
                resolve(oData)
              }
            } else {
              resolve(oData)
            }
          })
        });
      })
      
    })
  }
}

// 实例化后再导出
export default new tradeService()
