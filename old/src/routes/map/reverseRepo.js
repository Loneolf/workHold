/*******************************************************************************
 * Copyright (c)2016, 杭州中焯信息技术股份有限公司
 * All rights reserved.
 *
 * 文件名称：
 * 文件标识：
 * 摘    要：
 *
 * 当前版本：
 * 作    者：九指神丐
 * 完成日期：2017/2/15
 *
 * 备    注：
 *
 * 修改记录：
 *
 *******************************************************************************/
export default {
  '/deal/reverseRepo/index':{//国债逆回购
    component(resolve) {
      require(['components/deal/views/reverseRepo/index'], resolve)
    },
    meta:{
      name:'国债逆回购'
    }
  },
   '/deal/details':{//交易登录
    component(resolve) {
      require(['components/deal/views/reverseRepo/details'], resolve)
    },
    meta:{
      name:'交易详情'
    }
  },
   '/deal/reverseRepo/tradeRecord':{//交易登录
    component(resolve) {
      require(['components/deal/views/reverseRepo/tradeRecord'], resolve)
    },
    meta:{
      name:'交易详情'
    }
  },
  '/deal/reverseRepo/repoList':{//国债逆回购-选择交易品种
    component(resolve) {
      require(['components/deal/views/reverseRepo/repoList'], resolve)
    },
    meta:{
      name:'国债逆回购'
    }
  },
  '/deal/reverseRepo/newchicang':{//国债逆回购-选择交易品种
    component(resolve) {
      require(['components/deal/views/reverseRepo/newchicang'], resolve)
    },
    meta:{
      name:'逆回购持仓'
    }
  },
  '/deal/reverseRepo/repoQuery':{//国债逆回购-查询
    component(resolve) {
      require(['components/deal/views/reverseRepo/repoQuery'], resolve)
    },
    meta:{
      name:'交易记录'
    }
  },
  '/deal/reverseRepo/repoLending':{//国债逆回购-借钱
    component(resolve) {
      require(['components/deal/views/reverseRepo/repoLending'], resolve)
    },
    meta:{
      name:'逆回购交易'
    }
  },
  '/deal/reverseRepo/repoIntroduction':{//国债逆回购-产品介绍
    component(resolve) {
      require(['components/deal/views/reverseRepo/repoIntroduction'], resolve)
    },
    meta:{
      name:'产品介绍'
    }
  },
  '/deal/reverseRepo/repoHelp':{//国债逆回购-交易帮助
    component(resolve) {
      require(['components/deal/views/reverseRepo/repoHelp'], resolve)
    },
    meta:{
      name:'交易帮助'
    }
  },
  '/deal/info':{//详情
    component(resolve) {
      require(['components/deal/views/info.vue'], resolve)
    },
    meta:{
      name:'详情'
    }
  },
  '/deal/reverseRepo/drwt':{//国债逆回购-当日委托
    component(resolve) {
      require(['components/deal/views/reverseRepo/ons/drwt.vue'], resolve)
    },
    meta:{
      name:'当日委托'
    }
  },
  '/deal/reverseRepo/drcj':{//国债逆回购-当日成交
    component(resolve) {
      require(['components/deal/views/reverseRepo/ons/drcj.vue'], resolve)
    },
    meta:{
      name:'当日成交'
    }
  },
  '/deal/reverseRepo/hiswt':{//国债逆回购-历史委托
    component(resolve) {
      require(['components/deal/views/reverseRepo/ons/hiswt.vue'], resolve)
    },
    meta:{
      name:'历史委托'
    }
  },
  '/deal/reverseRepo/hiscj':{//国债逆回购-历史成交
    component(resolve) {
      require(['components/deal/views/reverseRepo/ons/hiscj.vue'], resolve)
    },
    meta:{
      name:'历史成交'
    }
  },
}
