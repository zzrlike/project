import request from "../../../utils/request";
enum API { 
  // 获取用户信息
  GETUSERINFO_URL = '/admin/acl/role/',
  // 新增用户信息
  ADDUSERINFO_URL = '/admin/acl/role/save',
  // 修改用户信息
  UPDATEUSERINFO_URL = '/admin/acl/role/update',
  // 获取全部的菜单与按钮的数据
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',
  //给相应的职位分配权限
  SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
  // 删除已有的职位
  REMOVEBYID_URL='/admin/acl/role/remove/'
}
// 获取用户信息的接口的方法
export const reqGetUserInfo = (page: number, limit: number, roleName: string) => request.get(API.GETUSERINFO_URL + `${page}/${limit}?roleName=${roleName}`)
// 添加或者修改接口的方法
export const reqAddUpdate = (data: any) => { 
  if (data.id) {
    return request.put(API.UPDATEUSERINFO_URL,data)
  } else { 
    return request.post(API.ADDUSERINFO_URL,data)
  }
}
// 获取全部菜单按钮权限数据接口
export const reqAllMenuList = (roleId: number) => request.get(API.ALLPERMISSTION_URL + roleId)
// 给相应的职位下发权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) => request.post(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`)
// 删除已有的职位
export const reqRemoveRole = (roleId: number) => request.delete(API.REMOVEBYID_URL+roleId)
