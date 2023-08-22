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

// 所有品牌数据的ts类型
export interface Trademark { 
  id: number,
  tmName: string,
  logoUrl:string
}
// 品牌接口返回的数据类型
export interface AllTrademark extends ResponseData { 
  data:Trademark[]
}

// 商品图片的ts类型
export interface SpuImg { 
  id: number,
  createTime: string,
  updateTime: string,
  spuId: number,
  imgName: string,
  imgUrl:string
}
// 图片返回的ts类型
export interface SpuHasImg extends ResponseData { 
  data:SpuImg[]
}

// 已有的销售属性值对象的ts类型
export interface SaleAttrValue { 
  id?: number,
  createTime: null,
  updateTime: null,
  spuId: number,
  baseSaleAttrId: number,
  saleAttrValueName: string,
  saleAttrName: string,
  isChecked:null
}
// 存储已有的销售属性值数组类型
export type spuSaleAttrList = SaleAttrValue[]

// 销售属性对象的ts类型
export interface SaleAttr { 
  id?: number,
  createTime: null,
  updateTime: null,
  spuId: number,
  baseSaleAttrId: number,
  saleAttrName: string,
  spuSaleAttrValueList:spuSaleAttrList
}
// spu已有的销售属性接口返回的数据ts类型
export interface SaleAttrResponseData extends ResponseData { 
  data:SaleAttr[]
}

// 已有的全部的spu的返回数据的ts类型
export interface HasSaleAttr { 
  id: number,
  name:string
}

export interface HasSaleAttrResponseData extends ResponseData{
  data: HasSaleAttr[]
}


export interface SkuData { 
  category3Id: string | number,
  spuId: string | number,
  tmId: string | number,
  skuName: string,
  price: string | number,
  weight: string,
  skuDesc: string,
  skuAttrValueList: [{
    attrId: number|string,
    valueId:number|string
  }],
  skuSaleAttrValueList: [{
    saleAttrId: number|string,
    saleAttrValueId:number|string
  }],
  skuDefaultImg:string
}
// 获取sku接口的ts类型
export interface SKuInfoData extends ResponseData { 
  data:SkuData[]
}