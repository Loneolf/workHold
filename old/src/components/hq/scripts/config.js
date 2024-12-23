/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：行情配置文件
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2016/12/20
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
export default {
  zxlist:'1A0001|4352|上证指数,2A01|4608|深证成指',
  nationalFlag:{
    Australia:['AXJO'],
    Brazil:['BVSP'], //巴西
    Canada:['GSPTSE'],
    France:['FCHI'],
    German:['GDAXI'],
    India:['SENSEX'], //印度
    Indonesia:[''], //印度尼西亚
    Italia:[''], //意大利
    Japan:['N225'],
    Korea:['KS11'],
    Singapore:['STI'],
    UK:['FTSE'],
    USA:['DJI','IXIC','GSPC'],
  },
  isServerZX:false,
  hqHeartTime:5000
}
