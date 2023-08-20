// sku模块的接口管理
import request from '@/utils/request'
// 枚举地址
enum API { 
  // 获取已有全部的数据sku
  SKU_URL = '/admin/product/list/',
  //商品上架
  SALE_URL = '/admin/product/onSale/',
  // 商品下架
  CANCELSALE_url = '/admin/product/cancelSale/',
  // 根据商品id获取商品详情
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除已有的sp
  DELETESKU_URL='/admin/product/deleteSku/'
  
}
// 获取商品sku的接口
export const reqSkuList = (page: number, limit: number) => request.get<any>(API.SKU_URL + `${page}/${limit}`)

// 已有商品上架的请求
export const reqSaleSKu = (skuId: number) => request.get(API.SALE_URL + skuId)
// 已有商品下架的请求 
export const reqCancelSale = (skuId: number) => request.get(API.CANCELSALE_url + skuId)
// 获取商品详情的接口
export const reqSkuInfo = (skuId: number) => request.get(API.SKUINFO_URL + skuId)
// 删除某一个商品
export const reqRemoveSku=(skuId: number)=>request.delete(API.DELETESKU_URL + skuId)