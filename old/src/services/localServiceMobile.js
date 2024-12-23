/**
 * Created by zhonglu on 2016/10/18.
 */
import util from '../util/util'
/**
 * 对应客户端端的所有 API
 */
var oPrefix = {
  1:'',
  2:'rzrq_',
  9:'dbphz_'
};
class localService {

  /**
   * 保存数据到缓存 saveMapMesg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  saveLocalMesg (msgBody) {
    var newObj = {};
    if('logintype' in msgBody){
      if(msgBody.logintype == 2){
        for(var n in msgBody){
          if(n == 'logintype'){
            continue;
          }
          newObj[oPrefix[msgBody.logintype]+n] = msgBody[n];
        }
      }else {
        newObj = msgBody;
      }
    }else {
      newObj = msgBody;
    }
    util.setLocalStorage(newObj);
  }

  saveFileMesg(msgBody){
    this.saveLocalMesg(msgBody);
  }

  /**
   * 读取本地数据 readLocalMesg
   * @param  {String} sArray   字符串
   * @param  {Array} sArray  数组
   * @return {Promise}
   */
  readLocalMesg (sArray) {

    let sSendURL = [];

    if(typeof sArray == 'string'){
      sSendURL[0] = sArray;
    }else {
      sSendURL = sArray;
    }
    return new Promise((resolve, reject) => {
      var str = sSendURL.join('=&');
      var isLoginType = false;
      if(str.indexOf('logintype')>-1){
        isLoginType = true;
      }
      if(isLoginType){
        var newArray = [];
        var logintype = parseInt(util.getUrlParameter('logintype',str)) || 1;
        for(var i=0;i<sSendURL.length;i++){
          if(sSendURL[i].indexOf('logintype')>-1){
            continue;
          }
          newArray.push(oPrefix[logintype]+sSendURL[i]);
        }
        var obj = {};
        var newObj = util.getLocalStorage(newArray);
        var ln = oPrefix[logintype].length;
        for(var n in newObj){
          obj[n.substring(ln)] = newObj[n];
        }
        resolve (obj);
      }else {
        resolve (util.getLocalStorage(sSendURL));
      }
    });
  }

  readFileMesg(sArray){
    return this.readLocalMesg(sArray);
  }

  /**
   * 保存数据到缓存 saveMapMesg
   * @param  {Object} msgBody { title:{String}, content:{String} }
   * @return {Promise}
   */
  saveMapMesg (msgBody) {
    var newObj = {};
    if('logintype' in msgBody){
      if(msgBody.logintype == 2 || msgBody.logintype == 9){
        for(var n in msgBody){
          if(n == 'logintype'){
            continue;
          }
          newObj[oPrefix[msgBody.logintype]+n] = msgBody[n];
        }
      } else {
        newObj = msgBody;
      }
    }else {
      newObj = msgBody;
    }
    // util.setSessionStorage(newObj);
    util.setLocalStorage(newObj); //同时在localStorage里面也存一份 为了兼容app页面中数据存储
  }

  /**
   * 读取缓存数据 readmapMesg
   * @param  {String} sArray   字符串
   * @param  {Array} sArray  数组
   * @return {Promise}
   */
  readMapMesg (sArray) {
    var sSendURL = [];

    if(typeof sArray == 'string'){
      sSendURL[0] = sArray;
    }else {
      sSendURL = sArray;
    }
    return new Promise((resolve, reject) => {
      var str = sSendURL.join('=&');
      var isLoginType = false;
      if(str.indexOf('logintype')>-1){
        isLoginType = true;
      }
      if(isLoginType){
        var newArray = [];
        var logintype = parseInt(util.getUrlParameter('logintype',str));
        for(var i=0;i<sSendURL.length;i++){
          if(sSendURL[i].indexOf('logintype')>-1){
            continue;
          }
          newArray.push(oPrefix[logintype]+sSendURL[i]);
        }
        var obj = {};
        // var newObj = util.getSessionStorage(newArray);
        var newObj = util.getLocalStorage(newArray);
        var ln = oPrefix[logintype].length;
        for(var n in newObj){
          obj[n.substring(ln)] = newObj[n];
        }
        resolve (obj);
      }else {
        // resolve (util.getSessionStorage(sSendURL));
        resolve (util.getLocalStorage(sSendURL));
      }

    });
  }
  /**
   * 移除缓存数据 removemapMesg
   * @param  {String} sArray   字符串
   * @param  {Array} sArray  数组
   * @return {Promise}
   */
  removemapMesg (sArray,obj) {
    let sSendURL = [];

    if(typeof sArray == 'string'){
      sSendURL[0] = sArray;
    }else {
      sSendURL = [].concat(sArray); //修复值污染问题
    }
    if(obj && 'logintype' in obj){
      for(var i=0;i<sSendURL.length;i++){
        sSendURL[i] = oPrefix[obj.logintype]+sSendURL[i];
      }
    }
    // util.removeSessionStorage(sSendURL);
    util.removeLocalStorage(sSendURL); //同时删除sessionStorage和localStorage的数据
  }

  getAccountList (obj,type) {
    var newArray = ['ACCOUNTLIST'];
    if(obj){
      for(var x in obj){
        if(obj[x] && obj[x] != ''){
          newArray.push(x+'='+obj[x]);
        }else{
          newArray.push(x);
        }
      }
    }
    var _this = this;
    return new Promise((resolve, reject) => {
      _this.readMapMesg(newArray)
        .then((oData)=>{
          var acclist = oData.ACCOUNTLIST.replace(/\r\n/g,'&').replace(/\3/g,'&').split('&');
          var account={};
          if(acclist){
            for(var i=0;i<acclist.length;i++){
              var list = acclist[i].split('|');
              if(list[0] && list[0]!= '' && list[2] && list[2] != ''){
                if(!(list[0] in account)){
                  if(type){
                    account[list[0]] = {
                      wtaccount:list[1],
                      name:list[2],
                      wtaccounttype:list[0],
                    }
                  }else {
                    account[list[0]] = list[2];
                  }

                }
              }
            }
          }
          resolve (account);
        });
    });
  }
}

// 实例化后再导出
export default new localService()
