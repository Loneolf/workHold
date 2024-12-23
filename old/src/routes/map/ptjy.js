/**
 * Created by zhonglu on 2016/10/18.
 */
// 不同模块应代码分离

export default {
  '/deal/stock': {//股票交易
    component(resolve) {
      require(['components/deal/views/ptjy/stock'], resolve)
    },
    meta:{
      name:'股票交易'
    }
  },
  '/deal/hstock': {//股票交易
      component(resolve) {
          require(['components/deal/views/ptjy/hstock'], resolve)
      },
      meta:{
          name:'普通卖出'
      }
  },
  '/deal/views/ptjy/ons/stockHoldingNew': {//股票交易
      component(resolve) {
          require(['components/deal/views/ptjy/ons/stockHoldingNew'], resolve)
      },
      meta:{
          name:'查询持仓'
      }
  }
}
