import request from '@/utils/request'
import type {HasSpuResponseData } from './type.ts'
enum API{ 
  // 获取已有的SPU数据
  HASSPU_URL='/admin/product/'
}
// 获取某一个三级分类下的已有SPU数据
export const reqHasSpu=(page:number,limit:number,categoty3Id:string|number)=>request.get<HasSpuResponseData>(API.HASSPU_URL+`${page}/${limit}?category3Id=${categoty3Id}`)