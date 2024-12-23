/**
 * Created by zhonglu on 2016/10/18.
 */
import service_common from '../common/service_common'

/**
 * 对应后端涉及到普通交易的 API
 */
class service_ggt {

  /*
   *说明：委托撤单
   *oSend.contactid--id
   *oSend.wtaccounttype--类型
   *oSend.wtaccount--账号
   *oSend.entrustdate--日期
   */
  require5103(obj){
    let oSendData = {
      action:'5103'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:1});
  }

  /*
   *说明：查询当日委托
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   */
  require5104(obj){
    let oSendData = {
      action:'5104'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:1});
  }
  /*
   *说明：查询当日成交
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   */
  require114(obj){
    let oSendData = {
      action:'114'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:1});
  }

  /*
   *说明：查询历史成交
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   */
  require514(obj){
    let oSendData = {
      action:'514'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:1});
  }

  /*
   *说明：查询持仓
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   *oSend.StockCode--股票代码
   */
  require5106(obj){
    let oSendData = {
      action:'5106'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData});
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
    return service_common.getData({oSendData: oSendData,logintype:1});
  }

  /*
   *说明：证券可撤委托查询
   *oSend.StartPos--起始位置
   *oSend.MaxCount--最大条数
   */
  require152(obj){
    let oSendData = {
      action:'152'
    };
    $.extend(oSendData,obj);
    return service_common.getData({oSendData: oSendData,logintype:1});
  }
}

// 实例化后再导出
export default new service_ggt()
