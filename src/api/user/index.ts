import request from "../../utils/request";
import type { loginFormData,loginResponseData,userInfoResponseData } from "./type";
// 统一管理接口
enum API { 
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = '/admin/acl/index/logou',
}
// 暴露接口
// 登录的接口方法
export const reqLogin = (data: loginFormData) => request.post<any,loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<userInfoResponseData>(API.USERINFO_URL)
// 退出登录
export const reqLogout=()=>request.post<any,any>(API.LOGOUT_URL)