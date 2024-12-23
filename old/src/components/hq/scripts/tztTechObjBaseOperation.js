/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：tztTechObjBaseOperation.js
 * 文件标识：
 * 摘    要：行情基础定义
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016.9.20
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/

import tztTechObjBase from './tztTechObjBase.js';
import dataStream from './dataStream.js';
import tztStockType from './tztStockType.js';
import util from '../../../util/util.js';

const getDivByDecimal = function(nStockType){
    if (tztStockType.MakeWHMarket(nStockType) || tztStockType.MakeGGQQMarket(nStockType))
    {
        return 10000;
    }
    else
        return 1000;
}


const setTNewPriceData = function(pTNewPriceData,NEWMARKETNO,structure,num){
  // console.log('入参',pTNewPriceData)
    //分割报价数据
    var priceData = pTNewPriceData.split('|'),
        struct    = {},
        isZs      = tztStockType.MakeIndexMarket(NEWMARKETNO) || tztStockType.MakeBlockIndex(NEWMARKETNO),
        structure = structure || 'TNewPriceData',
        abase64   = tztTechObjBase.clearBase64[structure] || [],
        tztTech   = tztTechObjBase[structure];
  

    for(var i=0;i<priceData.length;i++){
     
        var data           = priceData[i],
            stream         = null,
            TNewPriceData  = tztTech[i],
            end            = 0;

        if(!data || !TNewPriceData){
            continue;
        }
        var lns = 0;
        //进行解base64
        if(abase64.indexOf(i.toString())<0){
            stream = dataStream.stringToBytes(window.atob(data));
            if(num && num > 0){
              lns = num;
              struct = []
            }else{
              lns = TNewPriceData.length
            }
        }else{
            //转成Bytes数组
            stream = data;
            lns = TNewPriceData.length;
        }
        // console.log('stream',stream)
        //循环定义好的结构体
        for(var t = 0;t<lns;t++){

            var listPriceData = num ? TNewPriceData[0]:TNewPriceData[t];
            var isType = 0; //0数字 1字符串 2是浮点数
            var addBkzs = 0;
            var addBkStart = 0;

            if('type' in listPriceData){
                isType = listPriceData.type;
                //delete listPriceData.type;
            }
            for(var x in listPriceData){
                var start = end;
                if(x === 'type'){
                  continue;
                }
                //11111
                if(x === 'indexData' && !isZs){
                  continue;
                }
                if(x === 'StockData' && isZs && ('indexData' in listPriceData)){
                  continue;
                }
                //11111
                if(x === 'StockData' || x === 'indexData'){
                    addBkzs++;
                    if(addBkzs == 1){
                      addBkStart = start;
                    }
                    if(addBkzs == 2){
                      end = addBkStart;
                    }
                    if(num){
                      struct[t] = {};
                    }else{
                      struct[x] = {};
                    }
                    for(var j = 0;j<listPriceData[x].length;j++){
                        var netlistPriceData = listPriceData[x][j];
                        for(var k in netlistPriceData){
                            if((t == 0 && k == 'isone')||(t>0 && ('isone' in netlistPriceData))){
                              continue;
                            }
                            var start = end;
                            end = start + parseInt(netlistPriceData[k]);
                            if(num && num > 0){
                              struct[t][k] = dataStream.readint(stream.slice(start,end));
                            }else {
                              struct[x][k] = dataStream.readint(stream.slice(start, end));
                            }
                        }
                    }
                    continue;
                }else{
                    end = start + parseInt(listPriceData[x]);
                    if(isType === 0){
                        if(listPriceData[x] === 1){
                            struct[x] = stream[start];
                            continue;
                        }
                        struct[x] = dataStream.readint(stream.slice(start,end));
                    }else if(isType === 2){
                        struct[x] = dataStream.getFloat(stream.slice(start,end));
                    }else {
                        if(abase64.indexOf(i.toString())>-1){
                            struct[x] = stream;
                        }else{
                            struct[x] = dataStream.bin2String(stream.slice(start,end));
                        }
                    }
                }
            }
        }
    }

    // console.log('分解出的',struct)
    // console.log(struct,1);
    return struct;
};

function setPriceData(data,NEWMARKETNO){
    var struct = data;
    // console.log('setpricedata struct',struct)
    var unit   = getDivByDecimal(NEWMARKETNO);
    var isUnit = tztStockType.MakeQHMarket(NEWMARKETNO) || tztStockType.MakeWPMarket(NEWMARKETNO) || tztStockType.MakeBlockIndex(NEWMARKETNO);
    var pos    = data.nDecimal;
    var difshou= data.m_nUnit;
    struct.Close_p = util.toDecimal2(data.Close_p/unit,pos);
    struct.Open_p  = util.toDecimal2(data.Open_p/unit,pos);
    struct.High_p  = util.toDecimal2(data.High_p/unit,pos);
    struct.Low_p   = util.toDecimal2(data.Low_p/unit,pos);
    struct.Last_p  = util.toDecimal2(data.Last_p/unit,pos);


    if('StockData' in struct){
        for(var x in struct.StockData){
            if(x.toUpperCase().indexOf('P') === 0){
                var stockdata_list = data.StockData[x];
                if(!isUnit){
                  stockdata_list = util.toDecimal2(stockdata_list/unit,pos);
                }
                struct.StockData[x] = stockdata_list;
            }
            if(x.toUpperCase().indexOf('Q') === 0){
                // struct.StockData[x] = util.toDecimal2(data.StockData[x]/difshou,0);
                var stockdata_list = data.StockData[x];
                if(!isUnit){
                  stockdata_list = util.toDecimal2(stockdata_list/difshou,0);
                }
                struct.StockData[x] = stockdata_list;
            }
        }
    }

    if('indexData' in struct){

    }

    struct.nHuanshoulv  = util.toDecimal2(data.nHuanshoulv/100,2)+'%';

    struct.m_lAvgPrice  = util.toDecimal2(data.m_lAvgPrice/unit,pos);
    struct.m_lUpPrice   = util.toDecimal2(data.m_lUpPrice/unit,pos);
    struct.m_lUpIndex   = util.toDecimal2(data.m_lUpIndex/100,2)+'%';

    struct.m_lInside    = util.toDecimal2(data.m_lInside/difshou,0);
    struct.m_lOutside   = util.toDecimal2(data.m_lOutside/difshou,pos);
    struct.Total_h   = util.toDecimal2(data.Total_h/difshou,0);

    struct.m_lLiangbi   = util.toDecimal2(data.m_lLiangbi/100,2);
    struct.m_lMaxUpIndex= util.toDecimal2(data.m_lMaxUpIndex/100,2)+'%';
    struct.m_lBlockUpIndex= util.toDecimal2(data.m_lBlockUpIndex/100,2);


    //动态市盈率
    struct.m_ldtsyl     = util.toDecimal2(data.m_ldtsyl/1000,pos);
    struct.m_ljzc       = util.toDecimal2(data.m_ljzc/10000,4);
    struct.m_zgb        = util.toDecimal2(data.m_zgb*10000);
    struct.m_ltb        = util.toDecimal2(data.m_ltb*10000);
    struct.m_nWB        = util.toDecimal2(data.m_nWB/100,2)+'%';
    struct.m_nWC        = util.toDecimal2(data.m_nWC/difshou,0);

    struct.m_mgsy       = util.toDecimal2(data.m_mgsy/10000,4);
    struct.m_jtsyl      = util.toDecimal2(data.m_jtsyl/1000,2);
    struct.m_zt         = util.toDecimal2(data.m_zt/unit,2);
    struct.m_dt         = util.toDecimal2(data.m_dt/unit,2);
    struct.m_AHPrice    = util.toDecimal2(data.m_AHPrice/unit,3);
    struct.m_AHRatio    = util.toDecimal2(data.m_AHRatio/100,pos)+'%';

    struct.m_quantity = util.toDecimal2(data.m_quantity / 100, pos); // 匹配量
		struct.m_unquantity = util.toDecimal2(data.m_unquantity / 100, pos); // 未匹配量

    if(data.m_AHPremiumRate == 0){
      struct.m_AHPremiumRate    = '--%';
    }else {
      struct.m_AHPremiumRate    = util.toDecimal2(data.m_AHPremiumRate/100,pos)+'%';
    }


    return struct;
}
//解析43报价数据结构体
/*
 * @pTNewPriceData 二进制数据流
 * @NEWMARKETNO    新市场号
 * */
function WTHead(pTNewPriceData,NEWMARKETNO) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'TNewPriceData');
  console.log('struct',struct)
  return setPriceData(struct,NEWMARKETNO);
}
//解析分时数据
/*
* @pTNewPriceData 二进制数据流    Y
* @NEWMARKETNO    新市场号        Y
* @num            共有多少条数据   Y
* @consult        参考值，最小值   Y
* @units          单位            N
* @size           保留小数位       N
* */
function TIMEHead(pTNewPriceData,NEWMARKETNO,num,consult,units,size,CLOSE_P) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'TNewMinData',num);
  var i = 0,ln = struct.length;
  var total = [];
  for(i;i<ln;i++){
    var last      = parseFloat(struct[i]['Last_p']) + parseFloat(consult);
    var averprice = parseFloat(struct[i]['averprice']) + parseFloat(consult);
    var m_lUpPrice = last-parseFloat(CLOSE_P);
    var m_lUpIndex = m_lUpPrice/CLOSE_P*100;
    if(units){
      var unit   = Math.pow(10,(units));
      last      = last/unit;
      averprice = averprice/unit;
      m_lUpPrice = m_lUpPrice/unit;
    }
    if(size){
      last      = util.toDecimal2(last,size);
      averprice = util.toDecimal2(averprice,size);
      m_lUpPrice = util.toDecimal2(m_lUpPrice,size);
      m_lUpIndex = util.toDecimal2(m_lUpIndex,size)+'%';
    }
    struct[i]['Last_p']    = last;
    struct[i]['averprice'] = averprice;
    struct[i]['m_lUpPrice'] = m_lUpPrice;
    struct[i]['m_lUpIndex'] = m_lUpIndex;
    total.push(struct[i]['total_h']);
  }
  var max = Math.max.apply({}, total);
  return {struct:struct,total:total,total_max:max};
}

//解析分时数据--成交额（BUYSELL）
/*
* @pTNewPriceData 二进制数据流    Y
* @NEWMARKETNO    新市场号        Y
* @num            共有多少条数据   Y
* @consult        参考值，最小值   Y
* @units          单位            N
* @size           保留小数位       N
* */
function BUYSELL(pTNewPriceData,NEWMARKETNO,num,consult,units,size,CLOSE_P) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'Level2BUYSELL',num);
  var i = 0,ln = struct.length;
  var total = [];
  for(i;i<ln;i++){
    total.push(struct[i]);
  }
  return total;
}
//解析BINDATA结构体数据 分时
/*
 * @pTNewPriceData 二进制数据流
 * @NEWMARKETNO    新市场号
 * @AMOUNT         手的单位
 * */
function BINHead(pTNewPriceData,NEWMARKETNO,AMOUNT) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'TNewBinData');
  // console.log('binhead方法struct',struct)
 
  var unit   = Math.pow(10,(struct.Units || 0));
  var pot    = struct.total_size || 0;
  // console.log('structttttttttttttttt',struct)
  var obj = {
    Consult   : util.toDecimal2(struct.Consult/unit,pot),    //参考值取最小值
    consult   : struct.Consult,                              //参考值取最小值
    Last_h    : AMOUNT?(struct.Last_h/AMOUNT):struct.Last_h, //现手 需要除以amount 就是手
    Open_p    : util.toDecimal2(struct.Open_p/unit,pot),     //开盘价
    StockName : struct.StockName,                            //股票名称
    Units     : struct.Units,                                //单位
    close_p   : util.toDecimal2(struct.close_p/unit,pot),    //昨收盘价
    CLOSE_P   : struct.close_p,                              //昨收盘价
    is_rest   : struct.is_rest,                              //是否重置分时图
    m         : struct.m,                                    //流通盘
    max_p     : util.toDecimal2(struct.max_p/unit,pot),      //最大值
    total_size: struct.total_size                            //小数点位数
  };
  return obj;
}

//解析BINDATA结构体数据 k线
/*
 * @pTNewPriceData 二进制数据流
 * @NEWMARKETNO    新市场号
 * */
function TkLineHead(pTNewPriceData,NEWMARKETNO) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'TkLineHead');
  var unit   = Math.pow(10,(struct.Units || 0));
  var pot    = struct.total_size || 0;
  var obj = {
    StockName : struct.StockName,                            //股票名称
    HighPrice : struct.HighPrice,  //最高util.toDecimal2(struct.HighPrice/unit,pot)
    LowPrice  : struct.LowPrice,   //最低util.toDecimal2(struct.LowPrice/unit,pot)
    WeekUp    : util.toDecimal2(struct.WeekUp/100,pot)+'%',  //周涨幅
    MonthUp   : util.toDecimal2(struct.MonthUp/100,pot)+'%', //月涨幅
    Units     : struct.Units,                                //单位
    WFSY      : struct.WFSY,                                 //万份收益，单位元
    QRNH      : util.toDecimal2(struct.QRNH/100000,pot)+'%', //七日年华收益率
    m         : struct.m,                                    //流通盘
    total_size: struct.total_size                            //小数点位数
  };
  return obj;
}

//解析分时数据
/*
 * @pTNewPriceData 二进制数据流    Y
 * @NEWMARKETNO    新市场号        Y
 * @num            共有多少条数据   Y
 * @units          单位            N
 * @size           保留小数位       N
 * */
function TkLineData(pTNewPriceData,NEWMARKETNO,num,units,size,VOLUME) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'TkLineData',num);
  var i = 0,ln = struct.length;
  if(!VOLUME || VOLUME==0 || VOLUME == ''){
    VOLUME = 1;
  }
  var total = [];
  for(i;i<ln;i++){
    var ClosePrice = struct[i].ClosePrice;
    var HighPrice  = struct[i].HighPrice;
    var LowPrice   = struct[i].LowPrice;
    var OpenPrice  = struct[i].OpenPrice;

    /*if(units){
      var unit   = Math.pow(10,(units));
      ClosePrice = ClosePrice/unit;
      HighPrice  = HighPrice/unit;
      LowPrice   = LowPrice/unit;
      OpenPrice  = OpenPrice/unit;
    }
    if(size){
      ClosePrice = util.toDecimal2(ClosePrice,size);
      HighPrice  = util.toDecimal2(HighPrice,size);
      LowPrice   = util.toDecimal2(LowPrice,size);
      OpenPrice  = util.toDecimal2(OpenPrice,size);
    }*/
    struct[i]['ClosePrice']= ClosePrice;
    struct[i]['HighPrice'] = HighPrice;
    struct[i]['LowPrice']  = LowPrice;
    struct[i]['OpenPrice'] = OpenPrice;
    struct[i]['Total_h'] *= VOLUME;
    total.push(struct[i]['Total_h']);
  }
  var max = Math.max.apply({}, total);
  return {struct:struct,total:total,total_max:max};
  // return struct;
}

//解析质押数据
/*
 * @pTNewPriceData 二进制数据流    Y
 * @NEWMARKETNO    新市场号        Y
 * @num            共有多少条数据   Y
 * */
function dayQuoteAdd(pDayQuoteData,NEWMARKETNO,Units,total_size) {
  var obj = {};
  if(tztStockType.MakeStockMarketStock(NEWMARKETNO) && tztStockType.MakeHSMarket(NEWMARKETNO) && tztStockType.MakeThreeBordMarket(NEWMARKETNO)){
    var struct = setTNewPriceData(pDayQuoteData,NEWMARKETNO,'yxgQuotoAdd');
    obj.dividendYield = (!!struct.dividendYield?(util.toDecimal2(struct.dividendYield/1000,2)+'%'):'--');
    obj.isKehuis = (!!struct.isKehuis?struct.isKehuis:'--');
    obj.isKezhuangg = (!!struct.isKezhuangg?struct.isKezhuangg:'--');
    obj.valueDate = (!!struct.valueDate?(struct.valueDate+'').replace(/([\d]{4})([\d]{2})([\d]{2})/,'$1-$2-$3'):'--');
  }else{
    var struct = setTNewPriceData(pDayQuoteData,NEWMARKETNO,'dayQuoteAdd');
    var unit   = Math.pow(10,(Units || 0));
    var pot    = total_size || 0;
    
    obj = {
      averPrice    : util.toDecimal2(struct.averPrice/unit,pot),     //加权平均价
      oldAverPrice    : util.toDecimal2(struct.oldAverPrice/unit,pot),     //昨收盘加权平均价
      total_size: struct.total_size                            //小数点位数
    };
    for (var x in struct) {
      if (x in obj) continue;
      obj[x] = struct[x];
    }
  }
  return obj;
}

//解析成交明细数据
/*
 * @pTNewPriceData 二进制数据流    Y
 * @NEWMARKETNO    新市场号        Y
 * @num            共有多少条数据   Y
 * @VOLUME         单位            N
 * @size           保留小数位       N
 * */
function DetailedData(pTNewPriceData,NEWMARKETNO,num,VOLUME,LEVEL2BIN) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'DetailedData',num);
  var i = 0,ln = struct.length,Level2Bin;
  if(!VOLUME || VOLUME==0 || VOLUME == ''){
    VOLUME = 1;
  }
  if(LEVEL2BIN){
    Level2Bin = setTNewPriceData(LEVEL2BIN,NEWMARKETNO,'Level2BinData',num);
  }
  var total = [],oldTime = '';
  for(i;i<ln;i++){
    var dealPrice = struct[i].dealPrice;
    var dealVolume  = struct[i].dealVolume;
    var falg   = struct[i].falg;
    var s = '';
    if(Level2Bin){
      s = ':'+((''+Level2Bin[i].s).length == 1?'0'+Level2Bin[i].s:Level2Bin[i].s);
    }
    var time  = struct[i].Time+':'+(struct[i].Minutes == 0?'00':struct[i].Minutes)+s;
    var obj = {};

    dealVolume = util.toDecimal2(dealVolume/VOLUME,0);
    dealPrice = util.toDecimal2(dealPrice/1000,2);
    obj['i'] = i;
    obj['price']= dealPrice;
    obj['amount'] = dealVolume;
    obj['falg']  = falg;
    obj['time'] = time;
    /*if(oldTime != time){
     obj['time'] = time;
     }else {
     obj['time'] = '';
     }
     oldTime = time;*/
    // total.push(obj);
    if(i<ln/2){
      total[i*2] = obj;
    }else {
      total[(2*i)-(ln-1)] = obj;
    }
  }
  return total;
  // return struct;
}

//解析成交明细数据
/*
 * @pTNewPriceData 二进制数据流    Y
 * @NEWMARKETNO    新市场号        Y
 * @num            共有多少条数据   Y
 * @VOLUME         单位            N
 * @size           保留小数位       N
 * */
function thePriceData(pTNewPriceData,NEWMARKETNO,num,VOLUME) {
  var struct = setTNewPriceData(pTNewPriceData,NEWMARKETNO,'ThePriceData',num);
  var i = 0,ln = struct.length;
  if(!VOLUME || VOLUME==0 || VOLUME == ''){
    VOLUME = 1;
  }
  var total = [];
  var paixu = [];
  var totObj = {};
  for(i;i<ln;i++){
    var dealPrice = struct[i].Price;
    var dealVolume  = struct[i].Hands;
    var obj = {};

    dealVolume = util.toDecimal2(dealVolume/VOLUME,0);
    dealPrice = util.toDecimal2(dealPrice/1000,2);
    obj['price']= dealPrice;
    obj['amount'] = util.numTosize(dealVolume);
    var key = dealVolume;
    if(dealVolume in totObj){
      key = key*1+(i*0.1);
    }
    totObj[key] = obj;
    paixu.push((key*1));
    /*if(i<ln/3){
      total[i*3] = obj;
    }else {
      total[(3*i)-(ln-1)] = obj;
    }*/
  }
  paixu.sort(function(a,b){return a-b}).reverse();
  for(var n=0;n<paixu.length;n++){
    total.push(totObj[paixu[n]]);
  }
  return total;
  // return struct;
}

export default {
  setTNewPriceData:setTNewPriceData,
  getDivByDecimal :getDivByDecimal,
  WTHead          :WTHead,
  BINHead         :BINHead,
  TIMEHead        :TIMEHead,
  TkLineHead      :TkLineHead,
  TkLineData      :TkLineData,
  DetailedData    :DetailedData,
  thePriceData    :thePriceData,
  dayQuoteAdd    :dayQuoteAdd,
  BUYSELL         :BUYSELL
}
