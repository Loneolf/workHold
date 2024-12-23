/**
 * Created by zhonglu on 2016/10/18.
 */
import ptjy from './ptjy'
import rzrq from './rzrq'
import ggt from './ggt'
import reverseRepo from './reverseRepo'
import gz from './gz'
export default {
  '/deal/activePhone':{//手机校验
    component(resolve) {
      require(['components/deal/views/account/activePhone'], resolve)
    },
    meta:{
      name:'手机校验'
    }
  },
  '/deal/login':{//交易登录
    component(resolve) {
      require(['components/deal/views/account/login'], resolve)
    },
    meta:{
      name:'普通交易登录'
    }
  },
  '/deal/dbqhzlogin':{//担保品划转登录
    component(resolve) {
      require(['components/deal/views/account/dbqhzlogin'], resolve)
    },
    meta:{
      name:'担保品普通登录'
    }
  },
  '/deal/index':{//首页
    component(resolve) {
      require(['components/deal/views/index'], resolve)
    },
    meta:{
      name:'交易'
    }
  },
  '/deal/ztindex':{//掌厅首页
    component(resolve) {
      //require(['components/deal/views/ztindex'], resolve)
      require(['components/deal/views/mine'], resolve)
    },
    meta:{
      name:'我的账户'
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
  ...ptjy,
  ...rzrq,
  ...ggt,
  ...reverseRepo,
  ...gz,
}
