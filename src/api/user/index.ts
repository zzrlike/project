import request from "../../utils/request";
import type { loginForm,loginReqData,userResopnenseData } from "./type";
// 统一管理接口
enum API { 
  LOGIN_URL = "/user/login",
  USERINFO_URL="/user/info"
}
// 暴露接口
// 登录的接口方法
export const reqLogin = (data: loginForm) => request.post<any,loginReqData>(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo=()=>request.get<userResopnenseData>(API.USERINFO_URL)