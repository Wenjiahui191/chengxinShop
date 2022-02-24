export default [{
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        children: [{
                path: 'myOrder',
                component: () =>
                    import ('@/pages/Center/myOrder'),
            },
            {
                path: 'groupOrder',
                component: () =>
                    import ('@/pages/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myOrder'
            }
        ]
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        beforeEnter: (to, from, next) => {
            // 必须从结算页面来
            if (from.path == '/pay ') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: '/pay',
        name: 'pay',
        component: () =>
            import ('@/pages/Pay'),
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 必须从结算页面来
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            title: '支付中心',
            isShowFooter: false
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: () =>
            import ('@/pages/Trade'),
        // 路由独享导航
        beforeEnter: (to, from, next) => {
            //    要求从shopcart跳转而来
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            title: '订单支付',
            isShowFooter: false
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: {
            title: '购物车',
            isShowFooter: false
        }
    },
    {
        path: '/addshopcartsuccess',
        name: 'addshopcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: {
            isShowFooter: true,
            title: '加入购物车成功'
        }
    },
    {
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        name: 'home',
        meta: {
            isShowFooter: true,
            title: '橙心爱购'
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
        meta: {
            isShowFooter: true,
            title: '搜索'
        }
    },
    {
        path: '/detail/:skuId',
        component: () =>
            import ('@/pages/Detail'),
        name: 'detail',
        meta: {
            isShowFooter: true,
            title: '详情页'
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: {
            isShowFooter: false,
            title: '登录'
        }
    },
    {
        name: 'register',
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: {
            isShowFooter: false,
            title: '注册'
        }
    },
    // 重定向，默认访问网站主页
    {
        path: '/',
        redirect: '/home',
    },
]