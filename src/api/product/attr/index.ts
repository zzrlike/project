// 属性相关的api文件
import request from "../../../utils/request";
import type {CategoryResponseData,AttrResponseData } from './type.ts'
enum API { 
  // 获取一级分类的接口地址
  C1_URL = '/admin/product/getCategory1',
    // 获取二级分类的接口地址
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类的接口地址
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下已有的属性与属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或者修改已有的属性接口
  ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
  // 删除某一个已有的属性
  DELETE_URL='/admin/product/deleteAttr/'
}
// 获取一级分类的接口方法
export const reqC1 = () => request.get(API.C1_URL)
// 获取二级分类的接口方法
export const reqC2 = (category1Id: number) => request.get<CategoryResponseData>(API.C2_URL + category1Id)
// 获取三级分类的接口方法
export const reqC3 = (category2Id: number) => request.get(API.C3_URL + category2Id)
// 获取对应分类下已有的属性与属性值接口
export const reqAttr = (category1Id: any, category2Id: any, category3Id: any) => request.get<AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)

// 新增或者修改已有的属性接口
export const reqAddOrUpdateAttr = (data: any) => request.post(API.ADDORUPDATE_URL, data)
// 删除某一个已有的属性业务
export const reqRemoveAttr=(attrId:number)=>request.delete(API.DELETE_URL+attrId)