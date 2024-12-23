/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from './service_common'
import tztTechObjBaseOperation from '../../scripts/tztTechObjBaseOperation';

/**
 * 对应后端涉行情 API
 */
class service_hq_often {
  /*
  * 搜索股票
  * */
  require32 (obj) {
    let oSendData = {
      action:'32'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,oConfig:true})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          resolve( data )
        })
    })

  }
  /*
  * 查询委托价
  * */
  require33 (obj) {
    let oSendData = {
      action:'33'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,oConfig:true})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          let fiveName = [
            '',
            'sBuyPrice1',
            'sBuyAmount1',
            'sSellPrice1',
            'sSellAmount1',
            'sPrec',
            'upPrice',
            'downPrice',
            'sBuyPrice2',
            'sBuyAmount2',
            'sBuyPrice3',
            'sBuyAmount3',
            'sBuyPrice4',
            'sBuyAmount4',
            'sBuyPrice5',
            'sBuyAmount5',
            'sSellPrice2',
            'sSellAmount2',
            'sSellPrice3',
            'sSellAmount3',
            'sSellPrice4',
            'sSellAmount4',
            'sSellPrice5',
            'sSellAmount5'
          ];
          var aResult  = data.BUYSELL;
          var fiveData = {};
          if(aResult){
            var aDatList = aResult.split('|');
            fiveName.forEach((item,index)=>{
              if(item != ''){
                fiveData[item] = aDatList[index];
              }
            });
            data.fiveData = fiveData;
          }
          resolve( data )
        })
    })

  }
  /*
   * 分价量表
   * @newmarketno新市场号
   * @stockcode 股票代码
   * @startpos  起始位置
   * @level
   * @accountindex 是否返回报价数据，新客户端为2，返回
   * */
  require35 (obj) {
    let oSendData = {
      action       :'35',
      MaxCount     :'14',
      accountIndex :2
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data)=>{
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          //GRID0结构体数据解析出来
          if(data.GRID0){
            let num = Math.min(oSendData.MaxCount ,data.MAXCOUNT);
            data.ThePriceData = tztTechObjBaseOperation.thePriceData(data.GRID0[0],data.NEWMARKETNO,num,data.VOLUME)
          }
          resolve( data )
        })
    })
  }
  /*
   * 分时走势图数据
   * @newmarketno新市场号
   * @stockcode 股票代码
   * @startpos  起始位置
   * @level
   * @accountindex 是否返回报价数据，新客户端为2，返回
   * */
  require43(obj) {
    let oSendData = {
      action      :'43',
      accountIndex:2
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          //BINDATA报价数据 WTHead
          if(data.BINDATA){
            data.WTHead = tztTechObjBaseOperation.WTHead(data.BINDATA,data.NEWMARKETNO);
          }
          resolve( data )
        })
    })
  }

  /*
   * 成交明细
   * @newmarketno新市场号
   * @stockcode 股票代码
   * @startpos  起始位置
   * @level
   * @accountindex 是否返回报价数据，新客户端为2，返回
   * */
  require44 (obj) {
    let oSendData = {
      action       :'44',
      MaxCount     :'10',
      accountIndex :2
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data)=>{
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          //GRID0结构体数据解析出来 K线头数据 TkLineHead
          if(data.GRID0){
            let num = Math.min(oSendData.MaxCount ,data.MAXCOUNT);
            data.DetailedData = tztTechObjBaseOperation.DetailedData(data.GRID0[0],data.NEWMARKETNO,num,data.VOLUME,data.LEVEL2BIN);
          }
          resolve( data )
        })
    })
  }

  /*
   * 下载自选股
   * */
  require56 (obj) {
    let oSendData = {
      action:'56'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,oConfig:true})
          .then((data) => { // 从封装体中解构出data字段
            if (!data) // 读取 undefined/null 的属性会报错
              return resolve(null);
            resolve( data )
          })
    })
  }
  /*
   * 上传合并自选股
   * */
  require55 (obj) {
    let oSendData = {
      action:'55'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,oConfig:true})
          .then((data) => { // 从封装体中解构出data字段
            if (!data) // 读取 undefined/null 的属性会报错
              return resolve(null);
            resolve( data )
          })
    })
  }
  /*
   * 用户自定义股票列表
   * */
  require60 (obj) {
    let oSendData = {
      action:'60'
    };
    $.extend(oSendData,obj);

    return service_common.getData({oSendData:oSendData})

  }

  /*
   * 分时走势图数据
   * @newmarketno新市场号
   * @stockcode 股票代码
   * @startpos  起始位置
   * @level
   * @accountindex 是否返回报价数据，新客户端为2，返回
   * */
  require64 (obj) {
    let oSendData = {
      action       :'64',
      accountIndex :2,
      stockNumIndex:1,
      NewMarketNo  :'0',
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data)=>{
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          //BINDATA结构体数据解析出来 K线头数据 TkLineHead
          if(data.BINDATA){
            data.TkLineHead = tztTechObjBaseOperation.TkLineHead(data.BINDATA,data.NEWMARKETNO)
          }

          if(data.WTACCOUNT){
            data.WTHead = tztTechObjBaseOperation.WTHead(data.WTACCOUNT,data.NEWMARKETNO)
          }

          //GRID0结构体数据解析出来  k线数据 TkLineData
          if(data.GRID0){
            let units = data.TkLineHead ? data.TkLineHead.Units : '0';
            let size  = data.TkLineHead? data.TkLineHead.total_size : '';
            let obj   = tztTechObjBaseOperation.TkLineData(data.GRID0[0],data.NEWMARKETNO,(data.MAXCOUNT || data.ERRORNO),units,size,data.VOLUME);
            data.TkLineData = obj.struct;
            data.total_max  = obj.total_max;
            data.total_array  = obj.total;
          }
          //股票或其他非期货时，是成交金额，需要乘volume才是真正的值，期货是持仓量
          if(data.CHICANGL){

          }
          resolve( data )
        })
    })
  }

  /*
   * 分时走势图数据
   * @newmarketno新市场号
   * @stockcode 股票代码
   * @startpos  起始位置
   * @level
   * @accountindex 是否返回报价数据，新客户端为2，返回
   * */
  require20109 (obj) {
    let oSendData = {
      action      :'20109',
      accountIndex:2
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          //BINDATA结构体数据解析出来 TFSZSHead数据流 BINHead
          if(data.BINDATA){
            data.BINHead = tztTechObjBaseOperation.BINHead(data.BINDATA,data.NEWMARKETNO,data.AMOUNT)
          }
          //GRID0结构体数据解析出来  分时数据 TIMEHead
          if(data.GRID0){
            let consult = data.BINHead ? data.BINHead.consult : '';
            let units   = data.BINHead ? data.BINHead.Units : '0';
            let size    = data.BINHead ? data.BINHead.total_size : '';
            let CLOSE_P = data.BINHead ? data.BINHead.CLOSE_P : '';
            data.TIMEHead = tztTechObjBaseOperation.TIMEHead(data.GRID0[0],data.NEWMARKETNO,data.MAXCOUNT,consult,units,size,CLOSE_P);
          }

          if (data.BUYSELL) {
            data.buySell = tztTechObjBaseOperation.BUYSELL(data.BUYSELL,data.NEWMARKETNO,data.MAXCOUNT)
          }

          //WTACCOUNT结构体数据解析出来 43功能报价数据 WTHead
          if(data.WTACCOUNT){
            data.WTHead = tztTechObjBaseOperation.WTHead(data.WTACCOUNT,data.NEWMARKETNO)
          }
          //报价数据附加解析
          if (data.QUOTEADD) {
            data.quoteAdd = tztTechObjBaseOperation.dayQuoteAdd(data.QUOTEADD,data.NEWMARKETNO,data.BINHead.Units,data.BINHead.total_size)
          }
          
          resolve( data )
        })
    })
  }

  /*
   * 资金流向
   * @stockcode 股票代码
   * @StartPos 999999 只返回一条数据
   * */
  require20131 (obj) {
    let oSendData = {
      action       :'20131'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data)=>{
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          resolve( data )
        })
    })
  }

  /*
   * 获取菜单列表
   * @BankIndent 版本号
   * @accountType 客户端类型
   * @volume crc校验码
   * @server 是否为行情服务器取数据的客户端1是，0不是，默认0
   * */
  require20190 (obj) {
    let oSendData = {
      action       :'20190'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data)=>{
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          resolve( data )
        })
    })
  }
  /*
   * 取指定市场下所有股票的表格行情
   * */
  require20191(obj) {
    let oSendData = {
      action:'20191'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData,oConfig:true})
  }
  /*
   * 取指定板块下所有股票的表格行情
   * */
  require20192(obj) {
    let oSendData = {
      action:'20192'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData,oConfig:true})
  }
  /*
   * 取指定板块下所有股票的表格行情
   * */
  require20193(obj) {
    let oSendData = {
      action:'20193'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
  /*
   * 取指定板块下所有股票的表格行情
   * */
  require20194(obj) {
    let oSendData = {
      action:'20194'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData,oConfig:true})
  }
  /*
   * 取指定板块下所有股票的表格行情
   * */
  require20195(obj) {
    let oSendData = {
      action:'20195'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
  /*
   * 取板块指数的表格行情
   * */
  require20196 (obj) {
    let oSendData = {
      action:'20196'
    };
    $.extend(oSendData,obj);

    return service_common.getData({oSendData:oSendData})

  }
  /*
   * 取板块指数的表格行情
   * */
  require20197 (obj) {
    let oSendData = {
      action:'20197'
    };
    $.extend(oSendData,obj);

    return service_common.getData({oSendData:oSendData})

  }
  /*
   * 取板块指数的表格行情
   * */
  require20198 (obj) {
    let oSendData = {
      action:'20198'
    };
    $.extend(oSendData,obj);

    return service_common.getData({oSendData:oSendData})

  }/*
   * 取板块指数的表格行情
   * */
  require20199 (obj) {
    let oSendData = {
      action:'20199'
    };
    $.extend(oSendData,obj);

    return service_common.getData({oSendData:oSendData})

  }
  /*
   * 取板块指数的表格行情
   * */
  require20620 (obj) {
    let oSendData = {
      action:'20620'
    };
    $.extend(oSendData,obj);

    return service_common.getData({oSendData:oSendData})

  }

  checkMarketAva (markettype,marketcode) {
    var market_code_map = {
      'SHACCOUNT':'|4352|4367|4353|4356|4365|4355|4359|4361|4360|4364|4354|',
      'SZACCOUNT':'|4608|4609|4611|4617|4614|4612|4616|4618|4619|4610|4620|4613|4623|',
      'SBACCOUNT':'|5120|5121|5135|',
      'SHBACCOUNT':'',
      'SZBACCOUNT':'',
      'SBBACCOUNT':'',
      'HKACCOUNT':'',
      'HKSZACCOUNT':''
    }
    var result = true;
    // 对返回的不足4位市场代码过滤
    if(marketcode && marketcode.length<4) {
        result = false;
    }
    // 目前仅沪深有重复代码，仅作沪深市场的校验
    if(!!marketcode && !!markettype && (markettype.toUpperCase()=='SHACCOUNT' || markettype.toUpperCase()=='SZACCOUNT')) {
        var all_code = market_code_map[markettype.toUpperCase()];
        if(all_code.indexOf('|'+marketcode+'|')>-1) {
            result = true;
        }else{
            result = false;
        }
    }
    return result;
  }
}

// 实例化后再导出
export default new service_hq_often()
