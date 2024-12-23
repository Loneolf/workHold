/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：行情菜单方法处理
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
const getMarket = function (no) {
  var obj = {};
  var MarketMenu = utils.getLocalStorage(['tztMarketMenu']).tztMarketMenu;
  if(MarketMenu){
    var data = JSON.parse(MarketMenu);
    var ln = data.GRID0.length;
    for(var i=0;i<ln;i++){
      var list = data.GRID0[i].split('|');
      if(list[0] == no){
        obj.title = list[2];
        obj.action = 'require'+list[3];
        obj.stockcode = list[4];
        break;
      }
    }
  }
  return obj;
};
const getchildMarket = function (no) {
  var array = [];
  var MarketMenu = utils.getLocalStorage(['tztMarketMenu']).tztMarketMenu;
  if(MarketMenu){
    var data = JSON.parse(MarketMenu);
    var ln = data.GRID0.length;
    var parentName = '';
    for(var i=0;i<ln;i++){
      var list = data.GRID0[i].split('|');
      if(list[7] == no && list[0] == no){
        parentName = list[2];
      }
      if(list[7] == no && list[0] != no){
        var obj = {};
        obj.title = list[2];
        obj.market = list[0];
        obj.stockcode = list[4];
        array.push(obj);
      }
    }
  }
  return {grid:array,parentName:parentName};
};
const rgb = function (color) {
  var colors = color;
  if (colors === null){
    return '';
  }
  if(typeof colors !== 'object'){
    colors = [colors];
  }
  var m_pRGB = [];
  for (var t = 0; t < colors.length; t++) {
    var i = colors[t];
    var r = ((((i >> 5) % 8) << 3) + ((i >> 5) % 8)) * 4;
    var g = ((((i >> 2) % 8) << 3) + ((i >> 2) % 8)) * 4;
    var b = (((i % 4) << 4) + ((i % 4) << 2) + (i % 4)) * 4;
    var rgb = ''+r.toString(16)+g.toString(16)+b.toString(16);
    m_pRGB.push(colorHex([r,g,b]));
  }
  if(typeof color === 'object'){
    return m_pRGB;
  }else {
    return m_pRGB[0];
  }
};
function colorHex(aColor){
  var strHex = '#';
  for(var i=0; i<aColor.length; i++){
    var hex = Number(aColor[i]).toString(16);
    if(hex === "0"){
      hex += hex;
    }
    strHex += hex;
  }
  return strHex;
}
//0涨幅 1振幅 2成交量 3量比 4总金额 5委比 6换手率7原序 8最新价 9不排序(Direction无效) 10涨跌
const SortColInfo = {
  '幅度':0,
  '涨幅':0,
  '涨跌幅':0,
  '今日涨幅':0,
  '今日跌幅':0,
  '振幅':1,
  '成交量':2,
  '总手':2,
  '总量':2,
  '量比':3,
  '总金额':4,
  '总额':4,
  '委比':5,
  '换手':6,
  '换手率':6,
  '最新价':8,
  '最新':8,
  '涨跌':10,
};

export default {
  getMarket:getMarket,
  rgb:rgb,
  SortColInfo:SortColInfo,
  getchildMarket:getchildMarket
}
