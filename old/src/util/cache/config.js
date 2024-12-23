var random = Math.random();

export const cacheTime =  {
  jizhongjiaoyixianjinzichan: parseInt(3000000 + 600000 * random), //集中交易现金资产
  otcxiuzheng: parseInt(3000000 + 600000 * random), //OTC产品在途资金
  xianjinguanlizichan: parseInt(3000000 + 600000 * random), //现金类理财资产
  tiantianlicailixi: parseInt(3000000 + 600000 * random), //天天利财利息
  licaizichan: parseInt(3000000 + 600000 * random), //理财资产
  licaikeyongzijin: parseInt(3000000 + 600000 * random), //理财资产可用资金
  otcchicang: parseInt(3000000 + 600000 * random), //理财资产可用资金
  chiCangLieBiaoWithCache: 3600000, //持仓列表
  guPiaoZongShiZhiWithCache: 3600000, //股票总市值 已失效
  gangGuTongChiCangXinXiWithCache: 3600000, //港股通持仓列表 
  keJianZhangHuLieBiaoWithCache: 3*60*1000, //灰度上线缓存
  OTCchiangHeOTCxiuZheng : 5*60*1000, //独立的获取OTC持仓和OTC修正复合同步函数
  tiantianlicaishuju: 1*60*1000,//天天利财相关数据
  isTradeDate: 8*60*60*1000,//是否交易日
  stockBussinessData: 10*60*60*1000//客户盘后持仓成交数据
}