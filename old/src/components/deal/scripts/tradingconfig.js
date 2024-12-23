/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：计算交易日期
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2017/3/9
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
var Holiday = [
  '2017-01-02',
  '2017-01-27',
  '2017-01-30',
  '2017-01-31',
  '2017-02-02',
  '2017-04-03',
  '2017-04-04',
  '2017-05-01',
  '2017-05-29',
  '2017-05-30',
  '2017-10-02',
  '2017-10-03',
  '2017-10-04',
  '2017-10-05',
  '2017-10-06',
  '2017-10-02'
];

var tradingDay = function () {
  var tradingDayArray = [];
  var tradingArray = [];
  var tradingDayObj = {};
  for(var curMonth=1;curMonth<=24;curMonth++){
    var curDate = new Date();
    var year = curDate.getFullYear();
    var month = curMonth;
    if(curMonth>12){
      year++;
      curDate.setFullYear(year);
      month = curMonth-12;
    }
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(month);
    /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
    curDate.setDate(0);
    var days = curDate.getDate();
    for(var i=1;i<=days;i++){
      var trad = year+'-'+(month<10?'0'+month:month)+'-'+(i<10?'0'+i:i);
      var endDay = new Date(trad.replace(/-/g,'/'));
      var tradObj = {};
      if ((endDay.getDay() > 0 && endDay.getDay() < 6) && Holiday.indexOf(trad)<0){
        tradObj = {
          isTrading:1
        };
        // tradingDayArray.push(trad);
      }else {
        tradObj = {
          isTrading:0
        }
      }
      tradingArray.push(trad);
      tradingDayObj[trad]=tradObj;
    }
  }
  return {
    tradingArray:tradingArray,
    tradingDayObj:tradingDayObj
  }
};
 //s:传入的float数字 ，n:希望返回小数点几位 
var fmoney = function(s, n){ 
n = n > 0 && n <= 20 ? n : 2; 
s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
var l = s.split(".")[0].split("").reverse(), 
r = s.split(".")[1]; 
var t = ""; 
for(var i = 0; i < l.length; i ++ ) { 
t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
} 
return t.split("").reverse().join("") + "." + r; 
};
var nextTradeDate = function (date) {
  var y = new Date();
  var year = y.getFullYear();
  var month = y.getMonth()+1;
  var day = y.getDate();
  date = date || (year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day));
  var trad = tradingDay();
  var dateIndex = trad.tradingArray.indexOf(date);
  if(dateIndex<0){
    return date;
  }
  var ln = trad.tradingArray.length;
  var ky,kq;
  var isOne = 0;
  for(;dateIndex<ln;dateIndex++){
    var dates = trad.tradingArray[dateIndex];
    if(trad.tradingDayObj[dates].isTrading == 1){
      if(isOne == 0){
        ky = dates;
        isOne++;
      }else {
        kq = dates;
        break;
      }
    }
  }
  return {
    ky:ky,
    kq:kq
  }
};

export default {
  tradingDay:tradingDay,
  nextTradeDate:nextTradeDate,
  fmoney:fmoney
}
