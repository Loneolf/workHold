/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from '../common/service_common'
/**
 * 对应后端涉及到用户认证的 API
 */
class service_information_often {
  require44080 (obj) {
    let oSendData = {
      action:'44080'
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
  require46102 (obj) {
    let oSendData = {
      action:'46102'
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
  require46115 (obj) {
    let oSendData = {
      action:'46115'
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
  require46121 (obj) {
    let oSendData = {
      action:'46121'
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
  require46122 (obj) {
    let oSendData = {
      action:'46122'
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
  require46123 (obj) {
    let oSendData = {
      action:'46123'
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
  require46124 (obj) {
    let oSendData = {
      action:'46124'
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

  require46113 (obj) {
    let oSendData = {
      action:'46113'
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


}

// 实例化后再导出
export default new service_information_often()
