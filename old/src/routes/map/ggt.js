/**
 * Created by zhonglu on 2016/10/18.
 */
// 不同模块应代码分离

export default {
  '/deal/ggt/index': {//港股通交易
    component(resolve) {
      require(['components/deal/views/ggt/ggt_index'], resolve)
    },
    meta:{
      name:'港股通交易'
    }
  },
  '/deal/ggtstock': {//港股通交易
    component(resolve) {
      require(['components/deal/views/ggt/ggtstock'], resolve)
    },
    meta:{
      name:'港股通交易'
    }
  },
  '/deal/ggtstock_alone': {//零股卖出
    component(resolve) {
      require(['components/deal/views/ggt/ggtstock_alone'], resolve)
    },
    meta:{
      name:'零股卖出'
    }
  }
}
