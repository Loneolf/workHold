/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from '../common/service_common'

/**
 * 对应后端涉及到融资融券的 API
 */
class service_ptjy {

  //委托撤单
  require401(obj){
    let oSendData = {
      action:'401'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:2});
  }

  /*
   *说明：查询当日委托
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   */
  require404(obj){
    let oSendData = {
      action:'404'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:2});
  }


  /*
   *说明：查询持仓
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   *oSend.StockCode--股票代码
   */
  require403(obj){
    let oSendData = {
      action:'403'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:2});
  }
  /*
   *说明：可融证券
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   *oSend.StockCode--股票代码
   */
  require416(obj){
    let oSendData = {
      action:'416'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:2});
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

  /*
   *说明：历史委托
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   *oSend.BeginDate--开始日期
   *oSend.EndDate--结束日期
   */
  require5018(obj){
    let oSendData = {
      action:'5018'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:2});
  }

}

// 实例化后再导出
export default new service_ptjy()
