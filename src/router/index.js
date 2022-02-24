// 路由器创建
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

// 重写push方法，根本上解决多次跳转同一地址报错
let originPush = VueRouter.prototype.push //备份路由实例上的方法
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

// 重写replace方法，根本上解决多次跳转同一地址报错
let originReplace = VueRouter.prototype.replace //备份路由实例上的方法
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 引入路由配置信息
import routes from './routes'

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 前置路由守卫
router.beforeEach(async(to, from, next) => {
    next()
        // 判断用户是否已经登录，已登录不能再访问login 和 register
    let token = store.state.user.token
    let userName = store.state.user.userInfo.name
        // 已登录
    if (token) {
        // 去往注册页或登录页
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            // 去其他的页面 若是无用户信息需要再发送请求
            if (userName) {
                next()
            } else {
                try {
                    // 没有用户信息需先获取再放行
                    await store.dispatch('user/getUserInfo')
                        // 获取成功放行
                    next()
                } catch (error) {
                    // token失效先退出登录
                    await store.dispatch('user/logout')
                    next('/login')
                }
            }
        }

    } else {
        //   未登录对跳转到trade、pay/paySuccess、center/myOrder相关的页面进行拦截送去登录页面
        let toPath = to.path
        if (toPath.indexOf('trade') !== -1 || toPath.indexOf('pay') !== -1 || toPath.indexOf('center') !== -1) {
            next(`/login?redirect=${toPath}`)
        } else {
            // 去其他页面放行
            next()
        }
    }
})

// 后置路由守卫，切换路由跳转后的title
router.afterEach((to) => {
    document.title = to.meta.title
})

export default router