// 账户信息的ts类型
export interface ResposneData { 
  code: number,
  message: string,
  ok:boolean
}
// 代表一个账号信息的ts类型
export interface User { 
  id?: number,
  createTime: string,
  updateTime: string,
  username: string,
  password: string,
  name: string,
  phone: null,
  roleName:string
}
// 数据包含全部的信息
export type Records = User[]
// 获取全部用户信息接口返回的ts类型
export interface UserResponseData extends ResposneData { 
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    pages:number
  }
}