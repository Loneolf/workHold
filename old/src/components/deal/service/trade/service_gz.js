/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from '../common/service_common'

/**
 * 对应后端涉及到普通交易的 API
 */
class service_ptjy {

  //持仓
  require5173(obj){
    let oSendData = {
      action:'5173'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
  //委托买入
  require178(obj){
    let oSendData = {
      action:'178'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
  //当日委托
  require179(obj){
    let oSendData = {
      action:'179'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
  //撤单
  require198(obj){
    let oSendData = {
      action:'198'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
  //意向单
  require199(obj){
    let oSendData = {
      action:'199'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
  }
}

// 实例化后再导出
export default new service_ptjy()
