// 用户管理模块的接口
import request from "../../../utils/request";
import type { UserResponseData} from './type.ts'
// 枚举地址
enum API { 
  // 获取全部已有的账户信息
  ALLUSER_URL = '/admin/acl/user/',
  // 新增用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户
  UPDATE_URL = '/admin/acl/user/update',
  // 获取全部职位，当前职位的接口
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 给已有的用户分配权限的接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除的接口
  DELETEALLUSER_URL ='/admin/acl/user/batchRemove'
}
// 获取全部已有账户信息的方法
export const reqUserInfo = (page: number, limit: number,username:string) => request.get<UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)
// 新增或修改
export const reqAddOrUpdate = (data:any) => { 
  if (data.id) {
    return request.put(API.UPDATE_URL, data)
  } else { 
    return request.post(API.ADDUSER_URL,data)
  }
}
// 获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (adminId: number) => request.get(API.ALLROLE_URL + adminId)
// 分配职务
export const reqSetUserRole = (data: any) => request.post(API.SETROLE_URL, data)
// 删除某一个账号的信息
export const RomoveUser = (id: number) => request.delete(API.DELETEUSER_URL + id)
// 批量删除的接口、
export const reqSelectUser = (idList: any) => request.delete(API.DELETEALLUSER_URL,{data:idList})
