/**
 * Created by zhonglu on 2016/10/18.
 */
// 不同模块应代码分离

export default {
  '/deal/gz/gz_index':{//股转
    component(resolve) {
      require(['components/deal/views/gz/gz_index.vue'], resolve)
    },
    meta:{
      name:'股转交易'
    }
  },
  '/deal/gz/stock': {//股转交易
    component(resolve) {
      require(['components/deal/views/gz/stock.vue'], resolve)
    },
    meta:{
      name:'股转交易'
    }
  },
  '/deal/gz/stockHolding': {//股转交易持仓
    component(resolve) {
      require(['components/deal/views/gz/ons/stockHolding.vue'], resolve)
    },
    meta:{
      name:'股转持仓'
    }
  },
  '/deal/gz/stock_alone': {//股转交易  互报成交确认买卖
    component(resolve) {
      require(['components/deal/views/gz/stock_alone'], resolve)
    },
    meta:{
      name:'股转交易'
    }
  },
  '/deal/gz/stock_cjalone': {//股转交易  成交确认买卖
    component(resolve) {
      require(['components/deal/views/gz/stock_cjalone'], resolve)
    },
    meta:{
      name:'股转交易'
    }
  }
}
