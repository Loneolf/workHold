/**
 * Created by zhonglu on 2016/10/18.
 */
// 不同模块应代码分离

export default {
  '/home/index': {//home-首页
    component(resolve) {
      require(['components/home/views/index'], resolve)
    },
    meta:{
      name:'首页'
    }
  },
  '/information/index': {//资讯-首页
    component(resolve) {
      require(['components/information/views/index'], resolve)
    },
    meta:{
      name:'资讯'
    }
  },
  '/information/cont': {//资讯-首页
    component(resolve) {
      require(['components/information/views/cont'], resolve)
    },
    meta:{
      name:'资讯'
    }
  }
}
