/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from '../common/service_common'

/**
 * 对应后端涉行情 API
 */
class service_hq_other {
  /*
  * 搜索股票
  * */
  require20604 (obj) {
    let oSendData = {
      action:'20604'
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
}

// 实例化后再导出
export default new service_hq_other()
