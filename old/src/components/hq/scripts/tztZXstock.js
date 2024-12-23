/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：行情自选股方法处理
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/12/13
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
import utils from '../../../util/util'
import config from './config';
import service_hq_often from '../service/common/service_hq_often'
const getZXList = function (callback,isArray) {
  var local = utils.getLocalStorage(['tztZXlist']);
  var tztZXlist = local.tztZXlist;
  if(config.isServerZX){
    //请求服务器的自选股
  }else {
    if(!tztZXlist){
      tztZXlist = config.zxlist+',||';
      utils.setLocalStorage({'tztZXlist':tztZXlist});
    }
  }
  if(isArray === 1){
    var zxArray = [];
    var listArray = tztZXlist.split(',');
    for(var i=0;i<listArray.length;i++){
      var list = listArray[i].split('|');
      zxArray.push(list[0]);
    }
    tztZXlist = zxArray;
  }
  callback && callback(tztZXlist);
};
const setZXList = function (code,market,name) {
  if(market){
    var local = utils.getLocalStorage(['tztZXlist']);
    var tztZXlist = local.tztZXlist;
    console.log(tztZXlist)
    if(tztZXlist.indexOf(code)<0 && code!='0'&&code!=""){ //防止重复添加自选股
      utils.setLocalStorage({'tztZXlist':code+'|'+market+'|'+name+','+tztZXlist});
    }
  }
};
const setAllZXList = function (Array) {
  var listArray = Array;
  var ln = listArray.length;
  var str = '';
  for(var i=0;i<ln;i++){
    var obj = listArray[i];
    str+=obj.stockcode+'|'+obj.markettype+'|'+obj.stockname+',';
  }
  if(str){
    str = str.slice(0,-1);
    utils.setLocalStorage({'tztZXlist':str});
  }
};
const delZXList = function (code) {
  var local = utils.getLocalStorage(['tztZXlist']);
  var tztZXlist = local.tztZXlist;
  var zxObj = [];
  var listArray = tztZXlist.split(',');
  for(var i=0;i<listArray.length;i++){
    var list = listArray[i].split('|');
    if(code.indexOf(list[0])>-1){
      continue;
    }else {
      zxObj.push(listArray[i])
    }
  }
  var newZXlist = zxObj.join(',');
  utils.setLocalStorage({'tztZXlist':newZXlist});
};
const setHistoryZx = function (str) {
    var local = utils.getLocalStorage(['tztZXHistory']);
    var tztZXHistory = local.tztZXHistory || '';
    var zxHistory = '';
    if(tztZXHistory == ''){
      zxHistory = str;
    }else {
      zxHistory = str+','+tztZXHistory;
    }
    if(str == ''){
      zxHistory = '';
    }
    var HisArrays = zxHistory.split(',');
    var Hisobj   = {};
    var HisArray = [];
    for(var i=0;i<HisArrays.length;i++){
      var listArray = HisArrays[i].split('|');
      if(!(listArray[0] in Hisobj)){
        Hisobj[listArray[0]] = '';
        HisArray.push(HisArrays[i]);
      }
    }
    utils.setLocalStorage({'tztZXHistory':HisArray.join(',')});
};
const getHistoryZx = function (fn) {
  getZXList(function (zxArrays) {
    var local = utils.getLocalStorage(['tztZXHistory']);
    var tztZXHistory = local.tztZXHistory || '';
    if(tztZXHistory == ''){
      fn && fn('');
      return;
    }
    var zxArray = tztZXHistory.split(',');
    var ln = zxArray.length;
    var HArray = [];
    for(var i=0;i<ln;i++){
      var list = zxArray[i].split('|');
      var obj = {
        stockcode:list[0],
        stockname:list[2],
        markettype:list[1]
      };
      if(zxArrays.indexOf(obj.stockcode)>-1){
        obj.isshow = false;
      }else {
        obj.isshow = true;
      }
      HArray.push(obj);
    }
    fn && fn(HArray);
  });

};

export default {
  getZXList:getZXList,
  delZXList:delZXList,
  setZXList:setZXList,
  setHistoryZx:setHistoryZx,
  getHistoryZx:getHistoryZx,
  setAllZXList:setAllZXList
}
