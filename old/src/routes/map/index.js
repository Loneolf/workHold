/**
 * Created by zhonglu on 2016/10/18.
 */
// 不同模块应代码分离

import hqRoutes from './hq';
import hqF10Routes from './hqF10';
import dealRoutes from './deal';
import stockmarketRoutes from './stockmarket';
import information from './information';

export default {
  '*': {
    component(resolve) {
      //require(['./'], resolve)
    }
  },
  '/': {
    component(resolve) {
      //require(['./views/welcome'], resolve)
    }
  },
  // Vue 没有强制刷新操作，这算是 hack（使用 canReuse 可以解决部分问题）
  // 用法1：<a v-link="{ path: '/redirect', query: { dest: '/msg' } }">
  // 用法2：<a v-link="{ path: '/redirect?dest=/msg' }">
  // 用法3：<a v-link="`/redirect?dest=/msg`">
  // v-link 的用法有很多种，详情 http://router.vuejs.org/zh-cn/link.html
  '/redirect': {
    name: 'redirect',
    component: {
      ready () {
        this.$router.replace(this.$route.query.dest)
      }
    }
  },
  ...dealRoutes,
  ...hqRoutes,
  ...hqF10Routes,
  ...information,
  ...stockmarketRoutes
}
