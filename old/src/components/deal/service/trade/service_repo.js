/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from '../common/service_common'

/**
 * 对应后端涉及到用户认证的 API
 */
class service_repo {
  //持仓
  require6594 (obj) {
    let oSendData = {
      action:'6594'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
  require113 (obj) {
    let oSendData = {
      action:'114'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
  //;逆回购当日委托
  require6776 (obj) {
    let oSendData = {
      action:'6776'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
  //;逆回购历史委托
  require6777 (obj) {
    let oSendData = {
      action:'6777'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
  //;逆回购当日成交
  require6778 (obj) {
    let oSendData = {
      action:'6778'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
  //;逆回购历史成交
  require6779 (obj) {
    let oSendData = {
      action:'6779'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData:oSendData})
  }
}

// 实例化后再导出
export default new service_repo()
