/**
 * Created by zhonglu on 2016/10/18.
 */
// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现

// 后端 API 地址，最好以 http(s):// 打头
export const rootPath = 'http://localhost:8989';

export const errHandler = (e) => {
  // alert('[ XHR:Failed ] 详情请看控制台');
  console.error('请求超时,请检查接口是否异常或者网络不通');
  // $.toast('请求超时,请检查接口是否异常或者网络不通');
  // 持仓页增加http失败回调
  if(window.location.href.indexOf('/deal/views/ptjy/ons/stockHoldingNew') > -1){
    window.timeoutfn && window.timeoutfn();
  }
  console.error(e)
};
