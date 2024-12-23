/**
 * Created by zhonglu on 2016/10/18.
 */
// 不同模块应代码分离

export default {
  '/stockmarket/gainlossstatistics': {//行情-股民盈亏统计1
    component(resolve) {
      require(['components/stockmarket/views/gainlossstatistics'], resolve)
    }
  },
  '/stockmarket/optional': {//行情-我的自选编辑
    component(resolve) {
      require(['components/stockmarket/views/optional'], resolve)
    }
  },
  '/stockmarket/stockswitch': {//行情-我的自选股市心情开关
    component(resolve) {
      require(['components/stockmarket/views/stockswitch'], resolve)
    }
  }
}
