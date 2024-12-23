/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from './service_common'
import localService from '../../../../services/localService'

/**
 * 对应后端涉及到用户认证的 API
 */
class service_deal_often {
  //登陆 普通登录兼容担保品登录
  require100(obj,logintype){
    let oSendData = {
      action:'100'
    };
    $.extend(oSendData,obj);
    logintype = (!!logintype?logintype:1);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,isToken:false,logintype:logintype,oConfig:function(){}})
        .then((data)=> {
          if (!data) {
            return resolve(null);
          }
          return resolve(data);
        })
    })
  }
  //登陆
  require104(obj){
    let oSendData = {
      action:'104'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,isToken:false,logintype:2, oConfig:function(){}})
        .then((data)=> {
          if (!data) {
            return resolve(null);
          }
          return resolve(data);
        })
    })
  }
  //客户信息
  require187(obj){
    let oSendData = {
      action:'187'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData, oConfig:function(){}})
          .then((data)=> {
            if (!data) {
              return resolve(null);
            }
            return resolve(data);
          })
    })
  }
  //买入
  require110(obj){
    let oSendData = {
      action:'110'
    };
    $.extend(oSendData,obj);
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData, oConfig:function(){}})
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
  require150 (obj) {
    let oSendData = {
      action:'150'
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
  * 查询可卖量
  * */
  require151 (obj) {
    let oSendData = {
      action:'151'
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
      service_common.getData({oSendData:oSendData})
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
              objIndex[IndexItem] = listArray[data[IndexItem]]
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
  * 查询下一交易日
  * */
  require5015(obj){
    let oSendData = {
      action:'5015'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
  /*
  * 查询股东列表
  * */
  require5061(obj){
    let oSendData = {
      action:'5061'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData, oConfig:function(){}});
  }
  /*
  * 查询股东列表
  * */
  require5124(obj){
    let oSendData = {
      action:'5124'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData, oConfig:function(){}});
  }
  /*
   * 图片验证码
   * */
  require41092 (obj) {
    let oSendData = {
      action:'41092'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,isToken:false})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }
  /*
   * 获取短信验证码
   * */
  require40143 (obj) {
    let oSendData = {
      action:'40143'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,isToken:false,oConfig:function(){}})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }
  /*
   * 校验短信验证码
   * */
  require44051 (obj) {
    let oSendData = {
      action:'44051'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,isToken:false,oConfig:function(){}})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }
  /*
   * 获取ssl id
   * */
  require40141 (obj) {
    let oSendData = {
      action:'40141'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData,isToken:false,oConfig:function(){}})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }
  //适当性匹配信息
  require6796(obj){
    let oSendData = {
      action:'6796'
    };
    $.extend(oSendData,obj);
    var logintype = oSendData.logintype || 1;
    return new Promise((resolve, reject) => {
      service_common.getData({
        oSendData: oSendData,logintype:logintype,oConfig:function(){}})
          .then((data)=> {
            if (!data) {
              return resolve(null);
            }
            return resolve(data);
          })
    })
  }
  //采用actionsetting 查询升级公共内容
  require41097(obj){
    let oSendData = {
      action:'41097',
      ReqlinkType:'2',//走资讯通道
    }
    $.extend(oSendData,obj);
    var logintype = oSendData.logintype || 1;
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData: oSendData,logintype:logintype,oConfig:function(){}}).then((data)=> {
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
