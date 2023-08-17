// 服务器全部接口返回的数据类型
export interface ResponseData { 
  code: number,
  message: string,
  ok:boolean
}
// spu数据的ts类型
export interface SpuData { 
  id?: number,
  spuName: string,
  description: string,
  category3Id: string | number,
  tmId: number,
  spuSaleAttrList: null,
  spuImageList:null
}
// 数组：元素都是已有的SPU数据类型
export type Records = SpuData[]
// 定义获取已有的SPU接口返回的数据TS类型
export interface HasSpuResponseData extends ResponseData { 
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages:number
  }
}