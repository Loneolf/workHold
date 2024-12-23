/**
 * Created by zhonglu on 2016/10/18.
 */
export default {
  '/hq/more': {//行情-更多
    component(resolve) {
      require(['components/hq/views/hqF10/more'], resolve)
    },
    meta:{
      name:'相关板块'
    }
  },
  '/hq/capitalflows': {//行情-资金流向
    component(resolve) {
      require(['components/hq/views/hqF10/capitalflows'], resolve)
    },
    meta:{
      name:'资金流向'
    }
  },
  '/hq/positions': {//行情-持仓
    component(resolve) {
      require(['components/hq/views/hqF10/positions'], resolve)
    },
    meta:{
      name:'持仓'
    }
  },
  '/hq/blocktrade': {//行情-大宗交易
    component(resolve) {
      require(['components/hq/views/hqF10/blocktrade'], resolve)
    },
    meta:{
      name:'大宗交易'
    }
  },
  '/hq/highranking': {//行情-龙虎榜
    component(resolve) {
      require(['components/hq/views/hqF10/highranking'], resolve)
    },
    meta:{
      name:'龙虎榜'
    }
  },
  '/hq/marginbalance': {//行情-融资余额与融券余额差值
    component(resolve) {
      require(['components/hq/views/hqF10/marginbalance'], resolve)
    }
  },
  '/hq/shareholder': {//行情-股东
    component(resolve) {
      require(['components/hq/views/hqF10/shareholder'], resolve)
    },
    meta:{
      name:'股东'
    }
  },
  '/hq/shareHolderDetails': {//行情-股东-股本明细
    component(resolve) {
      require(['components/hq/views/hqF10/shareHolderDetails'], resolve)
    }
  },
  '/hq/introduction': {//行情-简况
    component(resolve) {
      require(['components/hq/views/hqF10/introduction'], resolve)
    }
  },
  '/hq/companyMore': {//行情-公司更多信息
    component(resolve) {
      require(['components/hq/views/hqF10/companyMore'], resolve)
    }
  },
  '/hq/coreTheme': {//行情-核心题材
    component(resolve) {
      require(['components/hq/views/hqF10/coreTheme'], resolve)
    }
  },
  '/hq/finance': {//行情-财务
    component(resolve) {
      require(['components/hq/views/hqF10/finance'], resolve)
    }
  },
  '/hq/financeIndex': {//行情-财务-关键指标
    component(resolve) {
      require(['components/hq/views/hqF10/financeIndex'], resolve)
    }
  },
  '/hq/zxInfo': {//F10资讯详情
    component(resolve) {
      require(['components/hq/views/hqF10/zxInfo'], resolve)
    },
    meta:{
      name:'资讯详情'
    }
  },
  '/hq/newlists': {//F10资讯详情
    component(resolve) {
      require(['components/hq/views/hqF10/newslists'], resolve)
    },
    meta:{
      name:'资讯'
    }
  }
}
