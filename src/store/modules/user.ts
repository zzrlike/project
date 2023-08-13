import { defineStore } from "pinia";
import { ref } from "vue";
// 引入接口
import { reqLogin } from "../../api/user";
// 引入数据类型
import type { loginForm, loginReqData } from "../../api/user/type"; 
// 引入路由（常量路由）
import { constantRoute} from '@/router/routes.ts'
// 创建小仓库
const useUserStore = defineStore('User', () => {
  // 唯一的token标识符
  const token: any = ref('')
  // 存放路由
  const meanRoutes=constantRoute
  // 用户登录的方法
  const userLogin = async (data:loginForm) => { 
    const res: loginReqData = await reqLogin(data)
    if (res.code == 200) {
      token.value = res.data.token
      return 'ok'
    } else { 
      return Promise.reject(new Error(res.data.message))
    }
    
  }
  return {
    userLogin,
    token,
    meanRoutes
  }
},
  {
    persist:true
  }
)
export default useUserStore