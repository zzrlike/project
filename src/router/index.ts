import { createRouter,createWebHashHistory} from 'vue-router'
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/view/login/index.vue'),
      name:'login'//路由别名
    }, {
      path: '/',
      component: () => import('@/view/home/index.vue'),
      name:'home'//路由别名
    },
     {
      path: '/404',
      component: () => import('@/view/404/index.vue'),
      name:'404'//路由别名
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name:'any'
    }
  ],
  // 滚动行为
  scrollBehavior() { 
    return {
      left: 0,
      top:0
    }
  }
})
export default router