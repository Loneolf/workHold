/**
 * Created by zhonglu on 2016/10/18.
 */
export default {
    '/hq/index': {//行情-首页
        component(resolve) {
            require(['components/hq/views/index'], resolve)
        },
        meta: {
            name: '行情'
        }
    },
    '/hq/list': {//行情-列表
        component(resolve) {
            require(['components/hq/views/list'], resolve)
        },
        meta: {
            name: ''
        }
    },
    '/hq/hlist': {//行情-列表
        component(resolve) {
            require(['components/hq/views/hlist'], resolve)
        },
        meta: {
            name: 'H股全流通'
        }
    },
    '/hq/ggStockInfo': {//行情-个股
        component(resolve) {
            require(['components/hq/views/ggStockInfo'], resolve)
        },
        meta: {
            name: ''
        }
    },
    '/hq/geguhangqing': {//行情-个股
        component(resolve) {
            require(['components/hq/views/geguhangqing'], resolve)
        },
        meta: {
            name: ''
        }
    },
    '/hq/geguhangqingchart': {//行情-个股
        component(resolve) {
            require(['components/hq/views/geguhangqingchart'], resolve)
        },
        meta: {
            name: ''
        }
    },
    '/hq/hggStockInfo': {//行情-个股
        component(resolve) {
            require(['components/hq/views/hggStockInfo'], resolve)
        },
        meta: {
            name: ''
        }
    },
    '/hq/market': {//行情-市场一级菜单
        component(resolve) {
            require(['components/hq/ons/market'], resolve)
        },
        meta: {
            name: ''
        }
    },
    '/hq/index/zxlist': {//行情-自选股
        component(resolve) {
            require(['components/hq/ons/zxlist'], resolve)
        },
        meta: {
            name: '自选'
        }
    },
    '/hq/editzxg': {//行情-编辑自选股
        component(resolve) {
            require(['components/hq/ons/editzxg'], resolve)
        },
        meta: {
            name: '编辑自选股'
        }
    },
    '/hq/search': {//行情-查询股票
        component(resolve) {
            require(['components/hq/ons/search'], resolve)
        },
        meta: {
            name: '查询股票'
        }
    },
    '/hq/geguhangqingNew': {//行情-个股
        component(resolve) {
            require(['components/hq/views/geguhangqingNew'], resolve)
        },
        meta: {
            name: ''
        }
    },
}
