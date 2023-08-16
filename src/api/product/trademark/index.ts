// 品牌管理模块的接口
import request from "@/utils/request.ts"
import type {TradeMarkResponseData,TradeMark } from './type.ts'
// 品牌管理模块接口地址
enum API { 
  // 获取已有商品的接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加
  ADDTRADEMARK = '/admin/product/baseTrademark/save',
  // 修改
  UPDATETRADEMARK = '/admin/product/baseTrademark/update',
  // 删除
  DELETE_URL='/admin/product/baseTrademark/remove/'
}
// 获取已有的品牌的接口方法
// page:'第几页的数据'
// limit获取几个品牌的数据
export const reqHasTrandemark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

// 添加与修改已有品牌的接口方法
export const reqADDorUPdateTRademark = (data: TradeMark) => { 
  if (data.id) {
    return request.put<any>(API.UPDATETRADEMARK,data)
  } else { 
    return request.post<any>(API.ADDTRADEMARK,data)
  }
}
export const reqDeleteTrademark=(id:number)=>request.delete<any>(API.DELETE_URL+id)