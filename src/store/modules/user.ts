import { defineStore } from "pinia";
import { ref } from "vue";
// 引入接口
import { reqLogin ,reqUserInfo,reqLogout} from "../../api/user";
// 引入路由（常量路由）
import type { loginFormData,loginResponseData,userInfoResponseData } from "@/api/user/type.ts";
import { constantRoute} from '@/router/routes.ts'
// 创建小仓库
const useUserStore = defineStore('User', () => {
  // 唯一的token标识符
  const token: any = ref('')
  // 存放路由
  const meanRoutes=constantRoute
  // 用户登录的方法
  const userLogin = async (data:loginFormData) => { 
    const res: loginResponseData = await reqLogin(data)
    if (res.code == 200) {
      token.value = res.data
      return 'ok'
    } else { 
      return Promise.reject(new Error(res.message))
    }
    
  }
  const username = ref('')
  const avatar=ref('')
  // 获取用户信息的方法
  const userinfo = async () => { 
    let res:userInfoResponseData = await reqUserInfo();
    if (res.code == 200) {
      username.value = res.data.name;
      avatar.value = res.data.avatar;
      return 'ok'
    } else { 
      return Promise.reject('获取用户信息失败')
    }
  }
  // 退出登录
  const userlogout = async () => { 
    // const res = await reqLogout()
    token.value = '',
    username.value = '',
    avatar.value = ''
  }
  return {
    userLogin,
    token,
    meanRoutes,
    userinfo,
    username,
    avatar,
    userlogout
  }
},
  {
    persist:true
  }
)
export default useUserStore