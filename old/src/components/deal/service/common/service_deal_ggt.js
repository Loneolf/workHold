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
  require5102(obj){
    let oSendData = {
      action:'5102'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,oConfig:function(){}})
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
  require5100 (obj) {
    let oSendData = {
      action:'5100'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData, oConfig:function(){}})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          var GRID0 = data.GRID0;
          var LEVELS  = {};
          var LEVELSARR = [];
          if(GRID0){
            GRID0.forEach((item,index)=>{
              if(index > 0){
                let listzh = item.split('|');
                let listObj = {
                  DOWNPRICEINDEX:listzh[data.DOWNPRICEINDEX],
                  UPPRICEINDEX:listzh[data.UPPRICEINDEX],
                  PRICESTEPINDEX:listzh[data.PRICESTEPINDEX]
                };
                LEVELS[listObj.DOWNPRICEINDEX] = listObj;
                LEVELSARR.push(listObj.DOWNPRICEINDEX);
              }
            });
            data.LEVELSDATA = LEVELS;
            data.LEVELSARR = LEVELSARR;
            resolve( data )
          }else {
            resolve( data )
          }
        })
    })
  }
  /*
  * 查询可卖量
  * */
  require5101 (obj) {
    let oSendData = {
      action:'5101'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          var GRID0 = data.GRID0;
          var GDZH  = [];
          if(GRID0){
            localService.getAccountList()
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
    return service_common.getData({oSendData: oSendData,oConfig:function(){}});
  }
}

// 实例化后再导出
export default new service_deal_often()
