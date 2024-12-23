/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from '../common/service_common'
/**
 * 对应后端涉及到用户认证的 API
 */
class service_index {
  /*
  * 资讯请求
  * */
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

  require46117 (obj) {
    let oSendData = {
      action:'46117'
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

  require46118 (obj) {
      let oSendData = {
        action:'46118'
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

    require46119 (obj) {
      let oSendData = {
        action:'46119'
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

  require46127 (obj) {
    let oSendData = {
      action:'46127'
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
export default new service_index()
