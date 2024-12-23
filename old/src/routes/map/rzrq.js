/**
 * Created by zhonglu on 2016/10/18.
 */
// 不同模块应代码分离

export default {
  '/deal/rzrq/index': {//股票交易
    component(resolve) {
      require(['components/deal/views/rzrq/rzrq_index'], resolve)
    },
    meta:{
      name:'融资融券'
    }
  },
  '/deal/rzrqstock': {//股票交易
    component(resolve) {
      require(['components/deal/views/rzrq/rzrqstock'], resolve)
    },
    meta:{
      name:'信用交易'
    }
  },
  '/deal/rzrqstock_alone': {//股票交易  买券还券 卖券还款
    component(resolve) {
      require(['components/deal/views/rzrq/rzrqstock_alone'], resolve)
    },
    meta:{
      name:'信用交易'
    }
  }
}
