// 路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
import useUserStore from './store/modules/user.ts'
import pinia from './store/index.ts'
//引入进度条的样式
import 'nprogress/nprogress.css'
// console.log(123)
// 全局前置首位
router.beforeEach(async (to: any, from: any, next: any) => { 
  document.title = '硅谷甄选-' + to.meta.title
  const userstore = useUserStore(pinia)
  nprogress.start();
  // 获取token判断用户
  let token = userstore.token
  let username=userstore.username
  console.log(token)
  if (token) { 
    if (to.path == '/login') {
      next('/home')
    } else { 
      if (username) {
        next()
      } else { 
        // 如果没有信息，在守卫这里发请求获取用户信息再放行
        try {
          await userstore.userinfo()
          next()
        } catch (error) {
          userstore.userlogout()
          next('/login')
        }
      }
    }
   
  } else { 
    if (to.path == '/login') {
      next()
    } else { 
      next('/login')
    }
    
  }
})
// 全局后置首位
router.afterEach((to: any, from: any) => { 
  nprogress.done()
})