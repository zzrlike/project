// 对外暴露配置的路由
export const constantRoute = [
   {
      path: '/login',
      component: () => import('@/view/login/index.vue'),
      name: 'login',//路由别名
      meta: {
        title: '登录',
        hidden: true,//代表路由标题是否隐藏，true：隐藏
        icon:'Promotion' //菜单左侧图标，支持element-plus全部图标
      }
    }, {
      path: '/',
      component: () => import('@/layout/index.vue'),
      name: 'layout',//路由别名
      meta: {
        title: 'layout',
        hidden: false,
        icon:'edit'
      },
      children: [
        {
          path: '/home',
          component: () => import('@/view/home/index.vue'),
          meta: {
            title: '首页',
            hidden: false,
            icon:'HomeFilled'
          }
        }
      ]
    },
     {
      path: '/404',
      component: () => import('@/view/404/index.vue'),
       name: '404',//路由别名
      meta: {
        title: '404',
        hidden: true,
         icon:'DocumentDelete'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any',
      meta: {
        title: '任意路由',
        hidden: true,
        icon:'DataLine'
      }
    }
]