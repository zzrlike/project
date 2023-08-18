import request from '@/utils/request'
import type {HasSpuResponseData,AllTrademark ,SpuHasImg,SaleAttrResponseData,HasSaleAttrResponseData} from './type.ts'
enum API{ 
  // 获取已有的SPU数据
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某一个spu下全部的售卖商品图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某一个spu下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性【颜色，版本，尺码】
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  //追加一个新的spu
  ADDSPU_URL='/admin/product/saveSpuInfo',
  // 更新已有的spu
  UPDATESPU_URL='/admin/product/updateSpuInfo'
}
// 获取某一个三级分类下的已有SPU数据
export const reqHasSpu = (page: number, limit: number, categoty3Id: string | number) => request.get<HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${categoty3Id}`)

// 获取全部spu品牌的数据
export const reqAllTrademark = () => request.get<AllTrademark>(API.ALLTRADEMARK_URL)

// 获取某一个已有spu下全部商品的图片地址
export const reqSpuImageList = (spuId: number) => request.get<SpuHasImg>(API.IMAGE_URL + spuId)

// 获取某一个已有的spu拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) => request.get<SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

// 获取全部的销售属性
export const reqALlSaleAttr = () => request.get<HasSaleAttrResponseData>(API.ALLSALEATTR_URL)

// 添加spu
export const reqAddOrUpdateSpu = (data: any) => { 
  // 如果id存在，就修改反之就执行添加
  if (data.id) {
    return request.post(API.UPDATESPU_URL, data)
  } else { 
    return request.post(API.ADDSPU_URL,data)
  }
}