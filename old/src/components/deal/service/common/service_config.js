/**
 * Created by zhonglu on 2016/10/19.
 */
export default {
  aChangeError:['-204007','-204009','-207001','-204001','-10001'],
  tztComFields:['channels'], //整个交易公共字段，不属于某一个
  tztReplace:['TOKEN','acitve_phone','account'/*,'channels'*/,'USERCODE','KHBRANCH','FUNDACCOUNT'],//请求需要替换的字段
  tztRemoveKey:['TOKEN','jyloginflag','modulusKey','modulus_id','tztrzrqloginflag','DBPHZLOGINFLAG','UNIFIELOGINFLAG','UNIFIELOGINUSERCODE'],//登出需要移除的字段
  tradeaction:{
    '12310':{logintype:1,url:'/deal/stock?tab=0',name:'view_buy'},
    '12311':{logintype:1,url:'/deal/stock?tab=1',name:'view_sell'},
    '12320':{logintype:1,url:'/deal/hstock',name:'view_sell'},
    '12340':{logintype:1,url:'/deal/stock?tab=2'},
    '12342':{logintype:1,url:'/deal/stock?tab=3'},
    '12343':{logintype:1,url:'/deal/reverseRepo/newchicang'},  //国债逆回购持仓
    '15010':{logintype:2,url:'/deal/rzrqstock?tab=0&type=1',name:'view15010'},
    '15011':{logintype:2,url:'/deal/rzrqstock?tab=1&type=2',name:'view15011'},
    '15012':{logintype:2,url:'/deal/rzrqstock?tab=0&type=3',name:'view15012'},
    '15013':{logintype:2,url:'/deal/rzrqstock?tab=1&type=4',name:'view15013'},
    '15014':{logintype:2,url:'/deal/rzrqstock_alone?tab=0&type=5',name:'view15014'},
    '15015':{logintype:2,url:'/deal/rzrqstock_alone?tab=1&type=6',name:'view15015'},
    '16010':{logintype:1,url:'/deal/ggtstock?tab=0&url=ggt/chicang',name:'view16010'}, //港股通买入
    '16011':{logintype:1,url:'/deal/ggtstock?tab=1&url=ggt/chicang',name:'view16011'}, //港股通卖出
    '16012':{logintype:1,url:'/deal/ggtstock?tab=2&url=ggt/chicang',name:'view16012'}, //港股撤单
    '16013':{logintype:1,url:'/deal/ggtstock?tab=3&url=ggt/chicang',name:'view16013'}, //港股查询持仓
    '16016':{logintype:1,url:'/deal/ggtstock_alone?tab=0&type=6&url=ggt/chicang',name:'view16016'}, //零股卖出
    '13010':{logintype:1,url:'/deal/gz/stock?tab=0&type=1',name:'view13010'},
    '13011':{logintype:1,url:'/deal/gz/stock?tab=1&type=2',name:'view13011'},
    '13014':{logintype:1,url:'/deal/gz/stock?tab=0&type=3',name:'view13014'},
    '13015':{logintype:1,url:'/deal/gz/stock?tab=1&type=4',name:'view13015'},
    '13016':{logintype:1,url:'/deal/gz/stock_alone?tab=0&type=5',name:'view13016'},
    '13017':{logintype:1,url:'/deal/gz/stock_alone?tab=1&type=6',name:'view13017'},
    '13012':{logintype:1,url:'/deal/gz/stock_cjalone?tab=0&tab=5',name:'view13012'},
    '13013':{logintype:1,url:'/deal/gz/stock_cjalone?tab=1&tab=6',name:'view13013'},
    '13018':{logintype:1,url:'/deal/gz/stock?tab=2&type=1'},
  },
  SHACCOUNT:[
    {id:'0',name:'限价委托'},
    {id:'U',name:'最优五档即时成交剩余撤销'},
    {id:'R',name:'五档成交剩余转限'}
  ],
  SHBACCOUNT:[
    {id:'0',name:'限价委托'},
    {id:'U',name:'最优五档即时成交剩余撤销'},
    {id:'R',name:'五档成交剩余转限'}
  ],
  SZACCOUNT:[
    {id:'0',name:'限价委托'},
    {id:'Q',name:'对手方最优价格'},
    {id:'S',name:'本方最优价格'},
    {id:'U',name:'最优五档即时成交剩余撤销'},
    {id:'T',name:'即时成交剩余撤销'},
    {id:'V',name:'全额成交或撤销'}
  ],
  SZBACCOUNT:[
    {id:'0',name:'限价委托'},
    // {id:'Q',name:'对手方最优价格'},
    // {id:'S',name:'本方最优价格'},
    // {id:'U',name:'最优五档即时成交剩余撤销'},
    // {id:'T',name:'即时成交剩余撤销'},
    // {id:'V',name:'全额成交或撤销'}
  ],
  HKACCOUNT:[
    {id:'0',name:'增强限价'},
    {id:'1',name:'竞价限价'}
  ],
  HKSZACCOUNT:[
    {id:'0',name:'增强限价'},
    {id:'1',name:'竞价限价'}
  ],
  QTACCOUNT:[
    {id:'0',name:'限价委托'}
  ],
  RQMCACCOUNT:[ //融券卖出 特殊处理
    {id:'0',name:'限价委托'}
  ],
  GGTLGMCACCOUNT:[ //港股通 零股卖出 特殊处理
    {id:'0',name:'限价盘'}
  ],
  downCount:80,//倒计时
  yybcode:'11264',//中信11264，18176，德邦10496,南京16384,3841，中投14080
  rzrqyybcode:'11265',//中信11265，18177，德邦10497，中投14081
  pagecount:10,
  sdxflag:true,
  appropUrl : {
    // 适当性管理url
    // 登录 基本信息统一入口
    "tzturl_suitable_userInfocheck" : "/c_modules/nodeControl/nodeIndex.htm?transmitType=webview",
    // 电子签名约定书 1
    "tzturl_suitable_electorn" : "/c_modules/nodeControl/nodeIndex.htm?transmitType=webview",
    // 风险揭示书 2
    "tzturl_suitable_fxjs" : "/c_modules/nodeControl/nodePage/fxjshht.htm?transmitType=webview",
    // 适当性评估结果确认书 3
    "tzturl_suitable_aptness" : "/c_modules/nodeControl/nodePage/aptness.htm?transmitType=webview",
    // 不适当警示投资确认书 4
    "tzturl_suitable_noaptness" : "/c_modules/nodeControl/nodePage/noaptness.htm?transmitType=webview",
    // 风险测评 5
    "tzturl_suitable_risktest" : "/c_modules/nodeControl/nodePage/riskeva.htm?transmitType=webview",
    //信息修改
    "tzturl_suitable_personalInfo" : "/c_modules/nodeControl/nodePage/personalInfo.html?transmitType=webview",
    //风测提示
    "tzturl_suitable_riskTip" : "/c_modules/nodeControl/nodePage/riskTip.htm?transmitType=webview"
  },
  TIPINFO:{
    'ggt':'尊敬的用户，您尚未开通权限，请至所属营业部办理。'
  }
}