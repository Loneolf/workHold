import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('../page/Home')
        },
        {
            path: '/home',
            component: () => import('../page/Home')
        },
        {
            path: '/about',
            component: () => import('../page/About')
        },
        {
            path: '/jkf10',
            component: () => import('../page/jkf10')
        },
    ]
})

// router.beforeEach((to, from, next)=> {
//     console.log('aaarouter', to, from)
//     if (!("stockcode" in to.query)) {
//         next(Object.assign({}, to, {query: from.query}))
//     } else {
//         next()
//     }
// })

export default router