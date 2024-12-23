/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from './service_common'
/**
 * 对应后端涉及到用户认证的 API
 */
class service_information_often {
  /*
  * 资讯请求
  * */
  require46101 (obj) {
    let oSendData = {
      action:'46101'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }
  //zhonghe zixun 
  require46116 (obj) {
    let oSendData = {
      action:'46116'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
          .then((data) => { // 从封装体中解构出data字段
            if (!data) // 读取 undefined/null 的属性会报错
              return resolve(null);

            resolve( data )
          })
    })
  }
  require46103 (obj) {
    let oSendData = {
      // action:'46103' //需要做A股和港股兼容
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }

  require46104 (obj) {
    let oSendData = {
      action:'46104'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }
/*权益*/
  require46109(obj) {
    let oSendData = {
      action:'46109'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
          .then((data) => { // 从封装体中解构出data字段
            if (!data) // 读取 undefined/null 的属性会报错
              return resolve(null);

            resolve( data )
          })
    })
  }

  require46105 (obj) {
    let oSendData = {
      // action:'46105'  //需要做A股和港股兼容
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }

  // cms接口
  require494678(obj) {
    var actionNo = '49468';
    var param = ['cmsState', ''];
    var result = CiticsNative.NativeCall('getCSValueForKey', param);
    try{
        var res = JSON.parse(result);
        if (res.errorNo == '0' || res.errorNo == 0){
            res = res.result;
            if (res === 0 || res === '0') {
                actionNo = '49467';
            }
        }
    }catch(e){

    }

    let oSendData = {
      action: actionNo
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
        .then((data) => { // 从封装体中解构出data字段
          if (!data) // 读取 undefined/null 的属性会报错
            return resolve(null);

          resolve( data )
        })
    })
  }

  
  /*
  *说明：查询是否交易日
  */
  require41083(obj){
    let oSendData = {
      action:'41083'
    };
    $.extend(oSendData,obj);

    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
          .then((data) => { // 从封装体中解构出data字段
            if (!data) // 读取 undefined/null 的属性会报错
              return resolve(null);

            resolve( data )
          })
    });
  }

  /*
  *说明：获取服务器时间
  */
  require5(obj){
    let oSendData = {
      action:'5'
    };
    $.extend(oSendData,obj);
    
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
          .then((data) => { // 从封装体中解构出data字段
            if (!data) // 读取 undefined/null 的属性会报错
              return resolve(null);

            resolve( data )
          })
    });
  }

  
  /*
  *说明：数据库接口
  */
  require49001(obj){
    let oSendData = {
      action:'49001'
    };
    $.extend(oSendData,obj);
    
    return new Promise((resolve, reject) => {
      service_common.getData({oSendData:oSendData})
          .then((data) => { // 从封装体中解构出data字段
            if (!data) // 读取 undefined/null 的属性会报错
              return resolve(null);

            resolve( data )
          })
    });
  }
}

// 实例化后再导出
export default new service_information_often()
