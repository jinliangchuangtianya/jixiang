const routers = [
    {
        path: '/',
        meta: {
            title: '小游戏后台'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children : [
            {
                path: '',
                alias : '/publicset',
                meta: {
                    title: '公众号游戏设置'
                },
                component: (resolve) => require(['./views/public/public-set'], resolve),
            },
            {
                path: '/bannerset',
                meta: {
                    title: '轮播图设置'
                },
                component: (resolve) => require(['./views/public/banner-set'], resolve),
            },
            {
                path: '/appletsset',
                meta: {
                    title: '小程序游戏设置'
                },
                component: (resolve) => require(['./views/applets/applets-set'], resolve),
            }
        ]
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/layout.vue'], resolve),
    },
    /*{
        path: '/test',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/public/test'], resolve),
    },*/
    {
        path: '*',
        redirect:'/login'
    }
];
export default routers;