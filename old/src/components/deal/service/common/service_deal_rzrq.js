/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from './service_common'
import localService from '../../../../services/localService'

/**
 * 对应后端涉及到用户认证的 API
 */
class service_deal_often {

  //买入
  require400(obj){
    let oSendData = {
      action:'400'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,logintype:2, oConfig:function(){}})
        .then((data)=> {
          if (!data) {
            return resolve(null);
          }
          return resolve(data);
        })
    })
  }
  //
  require418(obj){
    let oSendData = {
      action:'418'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,logintype:2, oConfig:function(){}})
        .then((data)=> {
          if (!data) {
            return resolve(null);
          }
          return resolve(data);
        })
    })
  }
  //
  require417(obj){
    let oSendData = {
      action:'417'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,logintype:2, oConfig:function(){}})
        .then((data)=> {
          if (!data) {
            return resolve(null);
          }
          return resolve(data);
        })
    })
  }

  /*
  * 查询可买量
  * */
  require428 (obj) {
    let oSendData = {
      action:'428'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,logintype:2})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          var GRID0 = data.GRID0;
          var GDZH  = [];
          if(GRID0){
            localService.getAccountList({logintype:2})
              .then((oData)=>{
                console.log(oData);

                GRID0.forEach((item,index)=>{
                  if(index > 0){
                    let listzh = item.split('|');
                    let listObj = {
                      wtaccount:listzh[0],
                      wtaccounttype:listzh[1],
                      name:(oData[listzh[1]]?oData[listzh[1]]:''),
                      volume:listzh[2]
                    };
                    GDZH.push(listObj);
                  }
                });
                data.wtaccountlist = GDZH;
                resolve( data )
              });
          }else {
            resolve( null );
          }
        })
    })
  }
  /*
  * 查询可卖量
  * */
  require429 (obj) {
    let oSendData = {
      action:'429'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,logintype:2})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          var GRID0 = data.GRID0;
          var GDZH  = [];
          if(GRID0){
            localService.getAccountList({logintype:2})
              .then((oData)=>{
                console.log(oData);

                GRID0.forEach((item,index)=>{
                  if(index > 0){
                    let listzh = item.split('|');
                    let listObj = {
                      wtaccount:listzh[0],
                      wtaccounttype:listzh[1],
                      name:(oData[listzh[1]]?oData[listzh[1]]:''),
                      volume:listzh[2]
                    };
                    GDZH.push(listObj);
                  }
                });
                data.wtaccountlist = GDZH;
                resolve( data )
              });
          }
        })
    })
  }
  /*
  * 查询资金
  * */
  require116 (obj) {
    let oSendData = {
      action:'116'
    };
    $.extend(oSendData,obj);
    // return service_common.getData({oSendData:oSendData})
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,logintype:2})
        .then((data)=>{
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);
          let gridData = data.GRID0;
          let obj = {};
          let moneyType = ['RMB','USD','HK','HKD'];
          let val = ['MONEYNAMEINDEX','BALANCEINDEX','AVAILABLEINDEX','USABLEINDEX','TOTALASSETSINDEX','STOCKVALUEINDEX','FUNDVALUEINDEX','FROZENINDEX','FUNDACCOUNTINDEX','MONEYTYPEINDEX','MAINFLAGINDEX'];
          gridData.shift();
          gridData.forEach((item,index)=>{
            let listArray = item.split('|');
            let key = listArray[data.MONEYTYPEINDEX].indexOf(moneyType);
            if(key<0){
              key = listArray[data.MONEYTYPEINDEX];
            }
            let objIndex = {};
            val.forEach((IndexItem,Index)=>{
              objIndex[IndexItem] = listArray[Index]
            });
            if(!obj[key]){
              obj[key] = {};
            }
            if(objIndex.MAINFLAGINDEX === '1'){
              obj[key]['1'] = objIndex;
            }else{
              if(!obj[key]['2']){
                obj[key]['2'] = [];
              }
              obj[key]['2'].push(objIndex);
            }
          });
          resolve( obj );
        })
    });
  }
  /*
  * 查询股东列表
  * */
  require5061(obj){
    let oSendData = {
      action:'5061'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:2, oConfig:function(){}});
  }

  /*
   *说明：新股查询
    */
  require686(obj){
    let oSendData = {
      action:'686'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
  /*
  *说明：查询资金
  *oSend.listNamber  起始记录号
  *oSend.MaxCount  取几条记录
  */
  require402(obj,fn) {
      // var oSend =$.extend({
      //     action:402,
      //     //账号
      //     Account: '($account)'
      // },oSend);
      // func.getData(oSend, fn);
    let oSendData = {
      action:'402',
      Account: '($account)'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
  /*
   *说明：资产负债查询
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   *oSend.StockCode--股票代码
   */
  require406(obj){
    let oSendData = {
      action:'406'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:2});
  }
  //获取检验信息
  require7212(obj,logintype){
    let oSendData = {
      action:'7212'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,logintype:logintype, oConfig:function(){}})
        .then((data)=> {
          if (!data) {
            return resolve(null);
          }
          return resolve(data);
        })
    })
  }
}

// 实例化后再导出
export default new service_deal_often()
