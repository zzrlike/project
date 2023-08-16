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
      redirect:'/home',
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
  }, {
      path: '/screen',
      component: () => import('@/view/screen/index.vue'),
      name: 'Screen',
      meta: {
        hidden: false,
        title: '数据大屏',
        icon:'Platform'
      }
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon:'Lock'
    },
    redirect:'/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/view/acl/user/index.vue'),
        name: 'Acl',
        meta: {
          title: '用户管理',
          hidden: false,
          icon:'User'
        }
      },
       {
        path: '/acl/role',
        component: () => import('@/view/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon:'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/view/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon:'Monitor'
        }
      },
     
    ]
  },
   {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
          title: '商品管理',
          hidden: false,
          icon:'Goods'
        },
        redirect:'/product/trademark',
        children: [
          {
            path: '/product/trademark',
            component: () => import('@/view/product/trademark/index.vue'),
            name: 'Trademark',
            meta: {
              title: '品牌管理',
              icon: "ShoppingCartFull",
              hidden:false
            }
          },
          {
            path: '/product/attr',
            component: () => import('@/view/product/attr/index.vue'),
            name: 'Attr',
            meta: {
              title: '属性管理',
              icon: "ChromeFilled",
              hidden:false
            }
          },
          {
            path: '/product/spu',
            component: () => import('@/view/product/spu/index.vue'),
            name: 'Spu',
            meta: {
              title: 'spu管理',
              icon: "Calendar",
              hidden:false
            }
          },
          {
            path: '/product/sku',
            component: () => import('@/view/product/sku/index.vue'),
            name: 'Sku',
            meta: {
              title: 'sku管理',
              icon: "Orange",
              hidden:false
            }
          }
        ]
      }
]